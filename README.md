# 🌸 Velvet n Vine — Handmade Pipe Cleaner Flowers

A beautiful website for Velvet n Vine by Shruti — handcrafted pipe cleaner bouquets.

## Features
- 🏠 **Home Page** — Animated hero, featured flowers, testimonials
- 🛍️ **Shop** — Browse all 12 flower types, filter by category, add to cart
- 💐 **Bouquet Builder** — Drag-and-drop interactive bouquet canvas
- 🛒 **Cart** — Order summary with WhatsApp checkout
- 📞 **Contact** — WhatsApp-integrated contact form

## Tech Stack
- React 18
- React Router v6
- Pure CSS animations (no external UI libs)
- Hand-drawn SVG flowers

---

## 🚀 Deploying to GitHub + Vercel

### Step 1: Push to GitHub
```bash
# From the extracted folder
git init
git add .
git commit -m "🌸 Initial commit — Velvet n Vine website"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/velvet-n-vine.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your `velvet-n-vine` repository
4. Vercel auto-detects Create React App — just click **"Deploy"**
5. Your site will be live at `https://velvet-n-vine.vercel.app`

### Step 3: Custom Domain (optional)
In Vercel dashboard → Settings → Domains → Add your domain

---

## 🔧 Local Development
```bash
npm install
npm start
```

## 📦 Build for Production
```bash
npm run build
```

---

## 📱 WhatsApp Configuration
Update the WhatsApp number in these files:
- `src/pages/CartPage.js` — Line with `wa.me/919876543210`  
- `src/pages/ContactPage.js` — Line with `wa.me/919876543210`

Replace `919876543210` with your actual WhatsApp number (country code + number, no spaces).

---

Made with 💜 for Velvet n Vine by Shruti · Tamil Nadu
