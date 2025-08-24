/**
 * MongoDB Database Configuration
 * 
 * Bu dosya MongoDB veritabanı bağlantı konfigürasyonunu içerir.
 * Mongoose ODM kullanarak MongoDB ile bağlantı kurar.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gullap-yazilim';

/**
 * MongoDB veritabanına bağlanır
 * @returns Promise<void>
 */
export const connectDB = async (): Promise<void> => {
  try {
    // MongoDB'ye bağlan (basit seçenekler ile)
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB veritabanına başarıyla bağlanıldı');
    console.log(`🔗 Database URI: ${MONGODB_URI}`);

    // Bağlantı event listener'ları
    mongoose.connection.on('connected', () => {
      console.log('🟢 Mongoose bağlantısı kuruldu');
    });

    mongoose.connection.on('error', (err) => {
      console.error('🔴 Mongoose bağlantı hatası:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🟡 Mongoose bağlantısı kesildi');
    });

    // Graceful shutdown için process event listener
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('📴 MongoDB bağlantısı kapatıldı');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error);
    process.exit(1);
  }
};

/**
 * MongoDB bağlantısını kapatır
 * @returns Promise<void>
 */
export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('📴 MongoDB bağlantısı kapatıldı');
  } catch (error) {
    console.error('❌ MongoDB bağlantısı kapatılırken hata:', error);
  }
};

/**
 * MongoDB bağlantı durumunu kontrol eder
 * @returns boolean
 */
export const isConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

/**
 * MongoDB bağlantı bilgilerini döndürür
 * @returns object
 */
export const getConnectionInfo = () => {
  return {
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name,
    readyStateText: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
  };
};
