/**
 * Contact Model Schema
 *
 * Bu dosya iletişim formu verilerini MongoDB'de saklamak için Mongoose schema'sını tanımlar.
 * Form validasyonu ve veri tipleri burada belirlenir.
 */
import mongoose, { Document } from 'mongoose';
export interface IContact extends Document {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    ipAddress?: string;
    userAgent?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Contact: mongoose.Model<IContact, {}, {}, {}, mongoose.Document<unknown, {}, IContact, {}, {}> & IContact & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export declare const createContact: (contactData: Partial<IContact>) => Promise<IContact>;
export declare const findContactById: (id: string) => Promise<IContact | null>;
export declare const findAllContacts: () => Promise<IContact[]>;
export declare const findContactsByStatus: (status: string) => Promise<IContact[]>;
export declare const updateContactStatus: (id: string, status: string) => Promise<IContact | null>;
export declare const deleteContact: (id: string) => Promise<IContact | null>;
//# sourceMappingURL=Contact.d.ts.map