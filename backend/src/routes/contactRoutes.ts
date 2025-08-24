/**
 * Contact Routes
 * 
 * Bu dosya iletişim formu API endpoint'lerini tanımlar.
 * Tüm contact-related HTTP istekleri burada yönetilir.
 */

import { Router } from 'express';
import {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats
} from '../controllers/contactController';

const router = Router();

// Public routes (herkese açık)
router.post('/submit', submitContact); // İletişim formu gönderimi

// Admin routes (gelecekte authentication eklenecek)
router.get('/all', getAllContacts); // Tüm mesajları getir
router.get('/stats', getContactStats); // İstatistikleri getir
router.get('/:id', getContactById); // ID'ye göre mesaj getir
router.put('/:id/status', updateContactStatus); // Mesaj durumunu güncelle
router.delete('/:id', deleteContact); // Mesajı sil

export default router;
