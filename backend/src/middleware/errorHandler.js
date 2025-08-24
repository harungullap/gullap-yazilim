"use strict";
/**
 * Error Handling Middleware
 *
 * Bu middleware tüm hataları yakalar ve uygun HTTP response'ları döndürür.
 * Development ve production ortamları için farklı hata detayları sağlar.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.notFound = exports.errorHandler = exports.AppError = void 0;
const express_1 = require("express");
// Custom error class
class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
// Error handler middleware
const errorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Bir sunucu hatası oluştu';
    // AppError instance ise status code'u al
    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
    }
    // Mongoose validation error
    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validasyon hatası: ' + error.message;
    }
    // Mongoose cast error (invalid ObjectId)
    if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Geçersiz ID formatı';
    }
    // Mongoose duplicate key error
    if (error.name === 'MongoError' && error.code === 11000) {
        statusCode = 409;
        message = 'Bu kayıt zaten mevcut';
    }
    // JWT errors
    if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Geçersiz token';
    }
    if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token süresi dolmuş';
    }
    // Log error
    console.error(`[${new Date().toISOString()}] Error:`, {
        message: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    // Response
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && {
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        })
    });
};
exports.errorHandler = errorHandler;
// 404 handler
const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Endpoint bulunamadı: ${req.method} ${req.originalUrl}`
    });
};
exports.notFound = notFound;
// Async error wrapper
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=errorHandler.js.map