"use strict";
/**
 * Email Service
 *
 * Bu dosya Nodemailer kullanarak email gönderme işlemlerini yönetir.
 * İletişim formu mesajları için otomatik email bildirimleri sağlar.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEmailService = exports.sendTestEmail = exports.sendContactEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const Contact_1 = require("../models/Contact");
dotenv_1.default.config();
// Email transporter konfigürasyonu
const createTransporter = () => {
    return nodemailer_1.default.createTransporter({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};
// Email template'leri
const getContactNotificationTemplate = (contact) => {
    return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Yeni İletişim Mesajı - Güllap Software</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563EB; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #374151; }
            .value { color: #111827; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📧 Yeni İletişim Mesajı</h1>
                <p>Güllap Software Web Sitesi</p>
            </div>
            
            <div class="content">
                <div class="field">
                    <div class="label">👤 İsim:</div>
                    <div class="value">${contact.name}</div>
                </div>
                
                <div class="field">
                    <div class="label">📧 Email:</div>
                    <div class="value">${contact.email}</div>
                </div>
                
                ${contact.phone ? `
                <div class="field">
                    <div class="label">📞 Telefon:</div>
                    <div class="value">${contact.phone}</div>
                </div>
                ` : ''}
                
                <div class="field">
                    <div class="label">📝 Konu:</div>
                    <div class="value">${contact.subject}</div>
                </div>
                
                <div class="field">
                    <div class="label">💬 Mesaj:</div>
                    <div class="value">${contact.message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="field">
                    <div class="label">🕒 Tarih:</div>
                    <div class="value">${new Date(contact.createdAt).toLocaleString('tr-TR')}</div>
                </div>
                
                <div class="field">
                    <div class="label">🌐 IP Adresi:</div>
                    <div class="value">${contact.ipAddress || 'Bilinmiyor'}</div>
                </div>
            </div>
            
            <div class="footer">
                <p>Bu email Güllap Software web sitesi iletişim formundan otomatik olarak gönderilmiştir.</p>
                <p>© ${new Date().getFullYear()} Güllap Software. Tüm hakları saklıdır.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};
const getContactConfirmationTemplate = (contact) => {
    return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mesajınız Alındı - Güllap Software</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #059669; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 20px; }
            .message { background: white; padding: 20px; border-left: 4px solid #059669; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            .cta { text-align: center; margin: 20px 0; }
            .cta a { background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✅ Mesajınız Alındı</h1>
                <p>Güllap Software</p>
            </div>
            
            <div class="content">
                <p>Merhaba <strong>${contact.name}</strong>,</p>
                
                <p>İletişim formunuzdan gönderdiğiniz mesaj başarıyla alınmıştır.</p>
                
                <div class="message">
                    <strong>Konu:</strong> ${contact.subject}<br>
                    <strong>Mesaj:</strong> ${contact.message}
                </div>
                
                <p>En kısa sürede size dönüş yapacağız. Genellikle 24 saat içinde yanıt veriyoruz.</p>
                
                <div class="cta">
                    <a href="http://localhost:3000">Web Sitemizi Ziyaret Edin</a>
                </div>
                
                <p>Teşekkürler,<br>
                <strong>Güllap Software Ekibi</strong></p>
            </div>
            
            <div class="footer">
                <p>Bu email Güllap Software web sitesi iletişim formundan otomatik olarak gönderilmiştir.</p>
                <p>© ${new Date().getFullYear()} Güllap Software. Tüm hakları saklıdır.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};
/**
 * İletişim formu bildirim email'i gönderir (admin'e)
 * @param contact Contact bilgileri
 * @returns Promise<void>
 */
const sendContactEmail = async (contact) => {
    try {
        const transporter = createTransporter();
        // Admin'e bildirim email'i
        const adminMailOptions = {
            from: `"Güllap Software" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Admin email'i
            subject: `📧 Yeni İletişim Mesajı: ${contact.subject}`,
            html: getContactNotificationTemplate(contact)
        };
        await transporter.sendMail(adminMailOptions);
        console.log('✅ Admin bildirim email\'i gönderildi');
        // Müşteriye onay email'i
        const customerMailOptions = {
            from: `"Güllap Software" <${process.env.EMAIL_USER}>`,
            to: contact.email,
            subject: '✅ Mesajınız Alındı - Güllap Software',
            html: getContactConfirmationTemplate(contact)
        };
        await transporter.sendMail(customerMailOptions);
        console.log('✅ Müşteri onay email\'i gönderildi');
    }
    catch (error) {
        console.error('❌ Email gönderimi başarısız:', error);
        throw new Error('Email gönderimi başarısız');
    }
};
exports.sendContactEmail = sendContactEmail;
/**
 * Test email'i gönderir
 * @param to Email adresi
 * @returns Promise<void>
 */
const sendTestEmail = async (to) => {
    try {
        const transporter = createTransporter();
        const mailOptions = {
            from: `"Güllap Software" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: '🧪 Test Email - Güllap Software',
            html: `
        <h1>Test Email</h1>
        <p>Bu bir test email'idir. Email servisi başarıyla çalışıyor.</p>
        <p>Gönderim zamanı: ${new Date().toLocaleString('tr-TR')}</p>
      `
        };
        await transporter.sendMail(mailOptions);
        console.log('✅ Test email\'i gönderildi');
    }
    catch (error) {
        console.error('❌ Test email gönderimi başarısız:', error);
        throw new Error('Test email gönderimi başarısız');
    }
};
exports.sendTestEmail = sendTestEmail;
/**
 * Email servisinin çalışıp çalışmadığını test eder
 * @returns Promise<boolean>
 */
const testEmailService = async () => {
    try {
        const transporter = createTransporter();
        await transporter.verify();
        console.log('✅ Email servisi hazır');
        return true;
    }
    catch (error) {
        console.error('❌ Email servisi hatası:', error);
        return false;
    }
};
exports.testEmailService = testEmailService;
//# sourceMappingURL=emailService.js.map