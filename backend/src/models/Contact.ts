/**
 * Contact Model Schema
 * 
 * Bu dosya iletişim formu verilerini MongoDB'de saklamak için Mongoose schema'sını tanımlar.
 * Form validasyonu ve veri tipleri burada belirlenir.
 */

import mongoose, { Document, Schema } from 'mongoose';

// Contact interface
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

// Contact schema
const contactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, 'İsim alanı zorunludur'],
    trim: true,
    minlength: [2, 'İsim en az 2 karakter olmalıdır'],
    maxlength: [50, 'İsim en fazla 50 karakter olabilir']
  },
  email: {
    type: String,
    required: [true, 'Email alanı zorunludur'],
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Geçerli bir email adresi giriniz'
    ]
  },
  phone: {
    type: String,
    trim: true,
    match: [
      /^(\+90|0)?[0-9]{10}$/,
      'Geçerli bir Türk telefon numarası giriniz (örn: 05551234567)'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Konu alanı zorunludur'],
    trim: true,
    minlength: [5, 'Konu en az 5 karakter olmalıdır'],
    maxlength: [100, 'Konu en fazla 100 karakter olabilir']
  },
  message: {
    type: String,
    required: [true, 'Mesaj alanı zorunludur'],
    trim: true,
    minlength: [10, 'Mesaj en az 10 karakter olmalıdır'],
    maxlength: [1000, 'Mesaj en fazla 1000 karakter olabilir']
  },
  status: {
    type: String,
    enum: {
      values: ['new', 'read', 'replied', 'archived'],
      message: 'Geçersiz durum değeri'
    },
    default: 'new'
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true, // createdAt ve updatedAt otomatik eklenir
  collection: 'contacts' // Collection adı
});

// Index'ler
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

// Virtual field - full name
contactSchema.virtual('fullName').get(function() {
  return this.name;
});

// Pre-save middleware - email'i lowercase yap
contactSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// Instance method - status güncelle
contactSchema.methods.updateStatus = function(newStatus: string) {
  this.status = newStatus;
  return this.save();
};

// Static method - email'e göre arama
contactSchema.statics.findByEmail = function(email: string) {
  return this.find({ email: email.toLowerCase() });
};

// Static method - duruma göre arama
contactSchema.statics.findByStatus = function(status: string) {
  return this.find({ status });
};

// JSON serialization
contactSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
    return ret;
  }
});

// Model export
export const Contact = mongoose.model<IContact>('Contact', contactSchema);

// Contact creation function
export const createContact = async (contactData: Partial<IContact>): Promise<IContact> => {
  const contact = new Contact(contactData);
  return await contact.save();
};

// Contact find functions
export const findContactById = async (id: string): Promise<IContact | null> => {
  return await Contact.findById(id);
};

export const findAllContacts = async (): Promise<IContact[]> => {
  return await Contact.find().sort({ createdAt: -1 });
};

export const findContactsByStatus = async (status: string): Promise<IContact[]> => {
  return await Contact.find({ status }).sort({ createdAt: -1 });
};

// Contact update functions
export const updateContactStatus = async (id: string, status: string): Promise<IContact | null> => {
  return await Contact.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
};

// Contact delete functions
export const deleteContact = async (id: string): Promise<IContact | null> => {
  return await Contact.findByIdAndDelete(id);
};
