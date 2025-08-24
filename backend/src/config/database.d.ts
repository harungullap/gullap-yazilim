/**
 * MongoDB Database Configuration
 *
 * Bu dosya MongoDB veritabanı bağlantı konfigürasyonunu içerir.
 * Mongoose ODM kullanarak MongoDB ile bağlantı kurar.
 */
import mongoose from 'mongoose';
/**
 * MongoDB veritabanına bağlanır
 * @returns Promise<void>
 */
export declare const connectDB: () => Promise<void>;
/**
 * MongoDB bağlantısını kapatır
 * @returns Promise<void>
 */
export declare const disconnectDB: () => Promise<void>;
/**
 * MongoDB bağlantı durumunu kontrol eder
 * @returns boolean
 */
export declare const isConnected: () => boolean;
/**
 * MongoDB bağlantı bilgilerini döndürür
 * @returns object
 */
export declare const getConnectionInfo: () => {
    readyState: mongoose.ConnectionStates;
    host: string;
    port: number;
    name: string;
    readyStateText: string | undefined;
};
//# sourceMappingURL=database.d.ts.map