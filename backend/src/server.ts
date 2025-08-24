/**
 * Güllap Yazılım Backend Server
 * 
 * Bu dosya Express.js tabanlı backend sunucusunu başlatır.
 * Ana özellikler:
 * - RESTful API endpoints
 * - MongoDB veritabanı bağlantısı
 * - Swagger API dokümantasyonu
 * - Error handling middleware
 * - CORS desteği
 * - Rate limiting
 * - Helmet güvenlik middleware
 * - Compression middleware
 * - Logging middleware
 * 
 * @author Güllap Yazılım
 * @version 1.0.0
 * @since 2024
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/database';
import contactRoutes from './routes/contactRoutes';
import { specs, swaggerUiOptions } from './config/swagger';
import swaggerUi from 'swagger-ui-express';
import { errorHandler, notFound } from './middleware/errorHandler';

// Environment variables'ları yükle
dotenv.config();

// Express app oluştur
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware'leri uygula
app.use(helmet()); // Güvenlik header'ları
app.use(express.json({ limit: '10mb' })); // JSON body parser
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // URL encoded parser

// CORS konfigürasyonu
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 dakika
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // IP başına maksimum istek
  message: {
    error: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// API routes
app.use('/api/contact', contactRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Server'ı başlat
const startServer = async () => {
  try {
    // MongoDB bağlantısı
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Güllap Yazılım Backend Server ${PORT} portunda çalışıyor`);
      console.log(`📚 API Dokümantasyonu: http://localhost:${PORT}/api-docs`);
      console.log(`🌐 Sunucu: http://localhost:${PORT}`);
      console.log(`📧 İletişim: info@gullapyazilim.com`);
      console.log(`🔗 Website: https://gullapyazilim.com`);
    });
  } catch (error) {
    console.error('Server başlatılamadı:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM sinyali alındı, server kapatılıyor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT sinyali alındı, server kapatılıyor...');
  process.exit(0);
});

startServer();
