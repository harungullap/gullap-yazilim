"use strict";
/**
 * Güllap Software Backend Server
 *
 * Bu dosya Express.js server'ının ana giriş noktasıdır.
 * Tüm middleware'ler, route'lar ve error handling burada konfigüre edilir.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("./config/database");
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const swagger_1 = require("./config/swagger");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const errorHandler_1 = require("./middleware/errorHandler");
// Environment variables'ları yükle
dotenv_1.default.config();
// Express app oluştur
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware'leri uygula
app.use((0, helmet_1.default)()); // Güvenlik header'ları
app.use(express_1.default.json({ limit: '10mb' })); // JSON body parser
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' })); // URL encoded parser
// CORS konfigürasyonu
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Rate limiting middleware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 dakika
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // IP başına maksimum istek
    message: {
        error: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.'
    },
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api/', limiter);
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
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs, swagger_1.swaggerUiOptions));
// API routes
app.use('/api/contact', contactRoutes_1.default);
// 404 handler
app.use(errorHandler_1.notFound);
// Global error handler
app.use(errorHandler_1.errorHandler);
// Server'ı başlat
const startServer = async () => {
    try {
        // MongoDB bağlantısı
        await (0, database_1.connectDB)();
        app.listen(PORT, () => {
            console.log(`🚀 Güllap Software Backend Server ${PORT} portunda çalışıyor`);
            console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
        });
    }
    catch (error) {
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
//# sourceMappingURL=server.js.map