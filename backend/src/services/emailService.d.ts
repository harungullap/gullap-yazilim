/**
 * Email Service
 *
 * Bu dosya Nodemailer kullanarak email gönderme işlemlerini yönetir.
 * İletişim formu mesajları için otomatik email bildirimleri sağlar.
 */
import { IContact } from '../models/Contact';
/**
 * İletişim formu bildirim email'i gönderir (admin'e)
 * @param contact Contact bilgileri
 * @returns Promise<void>
 */
export declare const sendContactEmail: (contact: IContact) => Promise<void>;
/**
 * Test email'i gönderir
 * @param to Email adresi
 * @returns Promise<void>
 */
export declare const sendTestEmail: (to: string) => Promise<void>;
/**
 * Email servisinin çalışıp çalışmadığını test eder
 * @returns Promise<boolean>
 */
export declare const testEmailService: () => Promise<boolean>;
//# sourceMappingURL=emailService.d.ts.map