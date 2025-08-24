"use strict";
/**
 * Contact Model Schema
 *
 * Bu dosya iletişim formu verilerini MongoDB'de saklamak için Mongoose schema'sını tanımlar.
 * Form validasyonu ve veri tipleri burada belirlenir.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContactStatus = exports.findContactsByStatus = exports.findAllContacts = exports.findContactById = exports.createContact = exports.Contact = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Contact schema
const contactSchema = new mongoose_1.Schema({
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
contactSchema.virtual('fullName').get(function () {
    return this.name;
});
// Pre-save middleware - email'i lowercase yap
contactSchema.pre('save', function (next) {
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    next();
});
// Instance method - status güncelle
contactSchema.methods.updateStatus = function (newStatus) {
    this.status = newStatus;
    return this.save();
};
// Static method - email'e göre arama
contactSchema.statics.findByEmail = function (email) {
    return this.find({ email: email.toLowerCase() });
};
// Static method - duruma göre arama
contactSchema.statics.findByStatus = function (status) {
    return this.find({ status });
};
// JSON serialization
contactSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        return ret;
    }
});
// Model export
exports.Contact = mongoose_1.default.model('Contact', contactSchema);
// Contact creation function
const createContact = async (contactData) => {
    const contact = new exports.Contact(contactData);
    return await contact.save();
};
exports.createContact = createContact;
// Contact find functions
const findContactById = async (id) => {
    return await exports.Contact.findById(id);
};
exports.findContactById = findContactById;
const findAllContacts = async () => {
    return await exports.Contact.find().sort({ createdAt: -1 });
};
exports.findAllContacts = findAllContacts;
const findContactsByStatus = async (status) => {
    return await exports.Contact.find({ status }).sort({ createdAt: -1 });
};
exports.findContactsByStatus = findContactsByStatus;
// Contact update functions
const updateContactStatus = async (id, status) => {
    return await exports.Contact.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
};
exports.updateContactStatus = updateContactStatus;
// Contact delete functions
const deleteContact = async (id) => {
    return await exports.Contact.findByIdAndDelete(id);
};
exports.deleteContact = deleteContact;
//# sourceMappingURL=Contact.js.map