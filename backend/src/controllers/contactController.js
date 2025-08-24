"use strict";
/**
 * Contact Controller
 *
 * Bu dosya iletişim formu API endpoint'lerini yönetir.
 * Form validasyonu, veri kaydetme ve email gönderme işlemlerini içerir.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactStats = exports.deleteContact = exports.updateContactStatus = exports.getContactById = exports.getAllContacts = exports.submitContact = void 0;
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const Contact_1 = require("../models/Contact");
const emailService_1 = require("../services/emailService");
const errorHandler_1 = require("../middleware/errorHandler");
// Contact form validation schema
const contactValidationSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(2)
        .max(50)
        .required()
        .messages({
        'string.min': 'İsim en az 2 karakter olmalıdır',
        'string.max': 'İsim en fazla 50 karakter olabilir',
        'any.required': 'İsim alanı zorunludur'
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.email': 'Geçerli bir email adresi giriniz',
        'any.required': 'Email alanı zorunludur'
    }),
    phone: joi_1.default.string()
        .pattern(/^(\+90|0)?[0-9]{10}$/)
        .optional()
        .messages({
        'string.pattern.base': 'Geçerli bir Türk telefon numarası giriniz (örn: 05551234567)'
    }),
    subject: joi_1.default.string()
        .min(5)
        .max(100)
        .required()
        .messages({
        'string.min': 'Konu en az 5 karakter olmalıdır',
        'string.max': 'Konu en fazla 100 karakter olabilir',
        'any.required': 'Konu alanı zorunludur'
    }),
    message: joi_1.default.string()
        .min(10)
        .max(1000)
        .required()
        .messages({
        'string.min': 'Mesaj en az 10 karakter olmalıdır',
        'string.max': 'Mesaj en fazla 1000 karakter olabilir',
        'any.required': 'Mesaj alanı zorunludur'
    })
});
// Contact form submission
exports.submitContact = (0, errorHandler_1.asyncHandler)(async (req, res, next) => {
    try {
        // Request body'yi al
        const { name, email, phone, subject, message } = req.body;
        // Validation
        const { error, value } = contactValidationSchema.validate({
            name,
            email,
            phone,
            subject,
            message
        });
        if (error) {
            throw new errorHandler_1.AppError(error.details[0].message, 400);
        }
        // Spam kontrolü - aynı IP'den son 1 saatte kaç mesaj gönderilmiş
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const recentMessages = await Contact_1.Contact.countDocuments({
            ipAddress: req.ip,
            createdAt: { $gte: oneHourAgo }
        });
        if (recentMessages >= 5) {
            throw new errorHandler_1.AppError('Çok fazla mesaj gönderildi. Lütfen daha sonra tekrar deneyin.', 429);
        }
        // Contact verisini oluştur
        const contactData = {
            ...value,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
        };
        // Veritabanına kaydet
        const contact = await (0, Contact_1.createContact)(contactData);
        // Email gönder (async olarak)
        (0, emailService_1.sendContactEmail)(contact).catch(error => {
            console.error('Email gönderimi başarısız:', error);
        });
        // Success response
        res.status(201).json({
            success: true,
            message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                subject: contact.subject,
                createdAt: contact.createdAt
            }
        });
    }
    catch (error) {
        next(error);
    }
});
// Get all contacts (admin için)
exports.getAllContacts = (0, errorHandler_1.asyncHandler)(async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        // Filter options
        const filter = {};
        if (status) {
            filter.status = status;
        }
        // Contacts'ları getir
        const contacts = await Contact_1.Contact.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)
            .select('-__v');
        // Total count
        const total = await Contact_1.Contact.countDocuments(filter);
        res.status(200).json({
            success: true,
            data: {
                contacts,
                pagination: {
                    currentPage: pageNum,
                    totalPages: Math.ceil(total / limitNum),
                    totalContacts: total,
                    hasNextPage: pageNum < Math.ceil(total / limitNum),
                    hasPrevPage: pageNum > 1
                }
            }
        });
    }
    catch (error) {
        next(error);
    }
});
// Get contact by ID
exports.getContactById = (0, errorHandler_1.asyncHandler)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact_1.Contact.findById(id).select('-__v');
        if (!contact) {
            throw new errorHandler_1.AppError('İletişim mesajı bulunamadı', 404);
        }
        res.status(200).json({
            success: true,
            data: contact
        });
    }
    catch (error) {
        next(error);
    }
});
// Update contact status
exports.updateContactStatus = (0, errorHandler_1.asyncHandler)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // Status validation
        const validStatuses = ['new', 'read', 'replied', 'archived'];
        if (!validStatuses.includes(status)) {
            throw new errorHandler_1.AppError('Geçersiz durum değeri', 400);
        }
        const contact = await Contact_1.Contact.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).select('-__v');
        if (!contact) {
            throw new errorHandler_1.AppError('İletişim mesajı bulunamadı', 404);
        }
        res.status(200).json({
            success: true,
            message: 'Durum başarıyla güncellendi',
            data: contact
        });
    }
    catch (error) {
        next(error);
    }
});
// Delete contact
exports.deleteContact = (0, errorHandler_1.asyncHandler)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact_1.Contact.findByIdAndDelete(id);
        if (!contact) {
            throw new errorHandler_1.AppError('İletişim mesajı bulunamadı', 404);
        }
        res.status(200).json({
            success: true,
            message: 'İletişim mesajı başarıyla silindi'
        });
    }
    catch (error) {
        next(error);
    }
});
// Get contact statistics
exports.getContactStats = (0, errorHandler_1.asyncHandler)(async (req, res, next) => {
    try {
        const stats = await Contact_1.Contact.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        const total = await Contact_1.Contact.countDocuments();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayCount = await Contact_1.Contact.countDocuments({
            createdAt: { $gte: today }
        });
        const statsMap = stats.reduce((acc, stat) => {
            acc[stat._id] = stat.count;
            return acc;
        }, {});
        res.status(200).json({
            success: true,
            data: {
                total,
                today: todayCount,
                byStatus: {
                    new: statsMap.new || 0,
                    read: statsMap.read || 0,
                    replied: statsMap.replied || 0,
                    archived: statsMap.archived || 0
                }
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=contactController.js.map