/**
 * Contact Controller
 * 
 * Bu dosya iletişim formu API endpoint'lerini yönetir.
 * Form validasyonu, veri kaydetme ve email gönderme işlemlerini içerir.
 */

import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { Contact, createContact } from '../models/Contact';
import { AppError, asyncHandler } from '../middleware/errorHandler';

// Contact form validation schema
const contactValidationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'İsim en az 2 karakter olmalıdır',
      'string.max': 'İsim en fazla 50 karakter olabilir',
      'any.required': 'İsim alanı zorunludur'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Geçerli bir email adresi giriniz',
      'any.required': 'Email alanı zorunludur'
    }),
  phone: Joi.string()
    .pattern(/^(\+90|0)?[0-9]{10}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Geçerli bir Türk telefon numarası giriniz (örn: 05551234567)'
    }),
  subject: Joi.string()
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.min': 'Konu en az 5 karakter olmalıdır',
      'string.max': 'Konu en fazla 100 karakter olabilir',
      'any.required': 'Konu alanı zorunludur'
    }),
  message: Joi.string()
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
export const submitContact = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
      throw new AppError(error.details[0].message, 400);
    }

    // Spam kontrolü - aynı IP'den son 1 saatte kaç mesaj gönderilmiş
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentMessages = await Contact.countDocuments({
      ipAddress: req.ip,
      createdAt: { $gte: oneHourAgo }
    });

    if (recentMessages >= 5) {
      throw new AppError('Çok fazla mesaj gönderildi. Lütfen daha sonra tekrar deneyin.', 429);
    }

    // Contact verisini oluştur
    const contactData = {
      ...value,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    // Veritabanına kaydet
    const contact = await createContact(contactData);

    // Email gönder (async olarak) - Email service kaldırıldı
    // sendContactEmail(contact).catch(error => {
    //   console.error('Email gönderimi başarısız:', error);
    // });

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

  } catch (error) {
    next(error);
  }
});

// Get all contacts (admin için)
export const getAllContacts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Filter options
    const filter: any = {};
    if (status) {
      filter.status = status;
    }

    // Contacts'ları getir
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    // Total count
    const total = await Contact.countDocuments(filter);

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

  } catch (error) {
    next(error);
  }
});

// Get contact by ID
export const getContactById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id).select('-__v');

    if (!contact) {
      throw new AppError('İletişim mesajı bulunamadı', 404);
    }

    res.status(200).json({
      success: true,
      data: contact
    });

  } catch (error) {
    next(error);
  }
});

// Update contact status
export const updateContactStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Status validation
    const validStatuses = ['new', 'read', 'replied', 'archived'];
    if (!validStatuses.includes(status)) {
      throw new AppError('Geçersiz durum değeri', 400);
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!contact) {
      throw new AppError('İletişim mesajı bulunamadı', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Durum başarıyla güncellendi',
      data: contact
    });

  } catch (error) {
    next(error);
  }
});

// Delete contact
export const deleteContact = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      throw new AppError('İletişim mesajı bulunamadı', 404);
    }

    res.status(200).json({
      success: true,
      message: 'İletişim mesajı başarıyla silindi'
    });

  } catch (error) {
    next(error);
  }
});

// Get contact statistics
export const getContactStats = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await Contact.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayCount = await Contact.countDocuments({
      createdAt: { $gte: today }
    });

    const statsMap = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {} as any);

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

  } catch (error) {
    next(error);
  }
});
