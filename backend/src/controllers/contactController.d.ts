/**
 * Contact Controller
 *
 * Bu dosya iletişim formu API endpoint'lerini yönetir.
 * Form validasyonu, veri kaydetme ve email gönderme işlemlerini içerir.
 */
import { Request, Response, NextFunction } from 'express';
export declare const submitContact: (req: Request, res: Response, next: NextFunction) => void;
export declare const getAllContacts: (req: Request, res: Response, next: NextFunction) => void;
export declare const getContactById: (req: Request, res: Response, next: NextFunction) => void;
export declare const updateContactStatus: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteContact: (req: Request, res: Response, next: NextFunction) => void;
export declare const getContactStats: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=contactController.d.ts.map