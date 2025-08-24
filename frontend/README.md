# Güllap Yazılım - Frontend

Modern web teknolojileri ile geliştirilmiş kurumsal web sitesi.

## 🚀 GitHub Pages Deploy

Bu proje GitHub Pages üzerinde çalışacak şekilde konfigüre edilmiştir.

### 📋 Gereksinimler

- Node.js 18+
- npm veya yarn

### 🔧 Kurulum

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Production build
npm run build

# Static export (GitHub Pages için)
npm run export

# Deploy (build + export)
npm run deploy
```

### 🌐 GitHub Pages Deploy

1. **Repository ayarlarında GitHub Pages'i aktif edin**
   - Settings > Pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages` (otomatik oluşturulacak)

2. **Main branch'e push yapın**
   ```bash
   git add .
   git commit -m "Update for GitHub Pages"
   git push origin main
   ```

3. **GitHub Actions otomatik olarak deploy edecek**

### 📁 Build Çıktısı

- `out/` klasörü GitHub Pages'e yüklenecek
- Tüm statik dosyalar bu klasörde olacak

### ⚠️ Önemli Notlar

- Bu proje static export kullanır
- API routes çalışmaz
- Server-side rendering yok
- Sadece client-side özellikler

### 🔗 Canlı Site

Deploy tamamlandıktan sonra:
- `https://username.github.io/repo-name` adresinde erişilebilir
- Custom domain kullanıyorsanız: `https://yourdomain.com`

## 🛠️ Teknolojiler

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Flowbite React
- **Icons**: Lucide React

## 📱 Özellikler

- Responsive tasarım
- Lazy loading
- Neural network animasyonu
- Typewriter efektleri
- Glitch text animasyonları
- Mobile-first approach
