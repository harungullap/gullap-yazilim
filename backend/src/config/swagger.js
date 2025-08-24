"use strict";
/**
 * Swagger API Documentation Configuration
 *
 * Bu dosya API endpoint'leri için Swagger/OpenAPI dokumentasyonunu konfigüre eder.
 * Interactive API documentation sağlar.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiOptions = exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Swagger options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Güllap Software API',
            version: '1.0.0',
            description: 'Güllap Software web sitesi için RESTful API',
            contact: {
                name: 'Güllap Software',
                email: 'info@gullapsoftware.com'
            },
            servers: [
                {
                    url: 'http://localhost:5000',
                    description: 'Development server'
                },
                {
                    url: 'https://api.gullapsoftware.com',
                    description: 'Production server'
                }
            ]
        },
        components: {
            schemas: {
                Contact: {
                    type: 'object',
                    required: ['name', 'email', 'subject', 'message'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'İsim',
                            minLength: 2,
                            maxLength: 50,
                            example: 'Ahmet Yılmaz'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email adresi',
                            example: 'ahmet@example.com'
                        },
                        phone: {
                            type: 'string',
                            description: 'Telefon numarası (opsiyonel)',
                            pattern: '^(\+90|0)?[0-9]{10}$',
                            example: '05551234567'
                        },
                        subject: {
                            type: 'string',
                            description: 'Konu',
                            minLength: 5,
                            maxLength: 100,
                            example: 'Web sitesi geliştirme hakkında bilgi'
                        },
                        message: {
                            type: 'string',
                            description: 'Mesaj',
                            minLength: 10,
                            maxLength: 1000,
                            example: 'Merhaba, web sitesi geliştirme hizmetleriniz hakkında detaylı bilgi almak istiyorum.'
                        }
                    }
                },
                ContactResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
                        },
                        data: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'string',
                                    example: '507f1f77bcf86cd799439011'
                                },
                                name: {
                                    type: 'string',
                                    example: 'Ahmet Yılmaz'
                                },
                                email: {
                                    type: 'string',
                                    example: 'ahmet@example.com'
                                },
                                subject: {
                                    type: 'string',
                                    example: 'Web sitesi geliştirme hakkında bilgi'
                                },
                                createdAt: {
                                    type: 'string',
                                    format: 'date-time',
                                    example: '2024-01-15T10:30:00.000Z'
                                }
                            }
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Bir hata oluştu'
                        },
                        error: {
                            type: 'string',
                            example: 'Validation error details'
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Contact',
                description: 'İletişim formu işlemleri'
            }
        ]
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'] // API dosyalarının yolları
};
// Swagger specs
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.specs = specs;
// Swagger UI options
const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Güllap Software API Documentation',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
        docExpansion: 'list',
        filter: true,
        showRequestHeaders: true,
        showCommonExtensions: true
    }
};
exports.swaggerUiOptions = swaggerUiOptions;
//# sourceMappingURL=swagger.js.map