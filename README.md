# 🛍️ ClothStore - E-Commerce Clothing Platform

Modern e-commerce platform for selling clothing products, built with **Next.js 16**, **PostgreSQL**, and **Prisma ORM**.

## ✨ Features

### Core Features
- ✅ **CRUD API** - Full REST API for products
- ✅ **Product Listing** - Homepage & products page with grid display
- ✅ **Product Details** - Detailed view of each product
- ✅ **Create/Update Forms** - Beautiful forms with validation
- ✅ **Delete Functionality** - Confirmation modal before deletion
- ✅ **Navigation Menu** - Sticky header with navigation

### Bonus Features
- ✅ **Search** - Search products by name or description
- ✅ **Pagination** - Navigate through product pages
- ✅ **Image Support** - URL-based image display
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Dark Mode** - Modern dark theme with glassmorphism

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 16 (React 19) |
| Backend | Next.js API Routes |
| Database | PostgreSQL |
| ORM | Prisma 5 |
| Styling | Custom CSS (Dark Theme) |
| Language | TypeScript |

## 📁 Project Structure

```
clothing-store/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Sample data
├── src/
│   ├── app/
│   │   ├── api/products/         # API Routes
│   │   │   ├── route.ts          # GET all, POST
│   │   │   └── [id]/route.ts     # GET one, PUT, DELETE
│   │   ├── products/
│   │   │   ├── page.tsx          # Products listing
│   │   │   ├── new/page.tsx      # Create product
│   │   │   └── [id]/
│   │   │       ├── page.tsx      # Product detail
│   │   │       └── edit/page.tsx # Edit product
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Homepage
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductForm.tsx
│   │   ├── DeleteModal.tsx
│   │   ├── SearchBar.tsx
│   │   └── Pagination.tsx
│   ├── lib/
│   │   └── prisma.ts             # Prisma client
│   └── types/
│       └── index.ts              # TypeScript types
└── .env                          # Environment variables
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Step 1: Clone and Install

```bash
cd clothing-store
npm install
```

### Step 2: Setup PostgreSQL Database

#### Option A: Local PostgreSQL

1. **Install PostgreSQL** if not already installed
   - Windows: Download from https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql`
   - Linux: `sudo apt install postgresql`

2. **Start PostgreSQL service**
   ```bash
   # Windows (in Services or)
   pg_ctl -D "C:\Program Files\PostgreSQL\16\data" start
   
   # Mac
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   ```

3. **Create database**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE clothing_store;
   
   # Exit
   \q
   ```

4. **Update `.env` file**
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/clothing_store?schema=public"
   ```

#### Option B: Free Cloud PostgreSQL

**Supabase** (Recommended):
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings > Database > Connection string
4. Copy the URI and update `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres"
   ```

**Neon**:
1. Go to https://neon.tech
2. Create a project
3. Copy the connection string

**Render**:
1. Go to https://render.com
2. Create a new PostgreSQL database
3. Copy the External Database URL

### Step 3: Setup Database Schema

```bash
# Push schema to database
npx prisma db push

# (Optional) Add sample data
npm run db:seed
```

### Step 4: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with pagination & search) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Query Parameters (GET /api/products)
- `search` - Filter by name/description
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - asc or desc (default: desc)

### Request Body (POST/PUT)
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "image": "https://example.com/image.jpg"  // optional
}
```

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub

2. Go to https://vercel.com

3. Import your repository

4. Add environment variable:
   - `DATABASE_URL` = Your PostgreSQL connection string

5. Deploy!

### Database for Production

Use one of these free PostgreSQL services:
- **Supabase** - 500MB free tier
- **Neon** - 0.5GB free
- **Render** - 90 days free
- **PlanetScale** (MySQL) - 5GB free

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Push schema to database
npm run db:seed      # Seed sample data
npm run db:studio    # Open Prisma Studio (DB GUI)
```

## 🎨 UI Preview

- **Homepage**: Hero section with featured products
- **Products Page**: Grid with search & pagination
- **Product Detail**: Full product info with actions
- **Forms**: Create/Edit with validation
- **Dark Theme**: Modern glassmorphism design

## 👨‍💻 Author

PRN 232 - Assignment 1

---

**🎉 Good luck with your assignment!**
