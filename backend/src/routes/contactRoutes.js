"use strict";
/**
 * Contact Routes
 *
 * Bu dosya iletişim formu API endpoint'lerini tanımlar.
 * Tüm contact-related HTTP istekleri burada yönetilir.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const router = (0, express_1.Router)();
// Public routes (herkese açık)
router.post('/submit', contactController_1.submitContact); // İletişim formu gönderimi
// Admin routes (gelecekte authentication eklenecek)
router.get('/all', contactController_1.getAllContacts); // Tüm mesajları getir
router.get('/stats', contactController_1.getContactStats); // İstatistikleri getir
router.get('/:id', contactController_1.getContactById); // ID'ye göre mesaj getir
router.put('/:id/status', contactController_1.updateContactStatus); // Mesaj durumunu güncelle
router.delete('/:id', contactController_1.deleteContact); // Mesajı sil
exports.default = router;
//# sourceMappingURL=contactRoutes.js.map