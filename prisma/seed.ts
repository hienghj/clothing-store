import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleProducts = [
    {
        name: 'Classic White T-Shirt',
        description: 'Premium cotton t-shirt with a comfortable fit. Perfect for everyday casual wear. Made from 100% organic cotton with a soft touch finish.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    },
    {
        name: 'Slim Fit Denim Jeans',
        description: 'Modern slim fit jeans made from stretch denim for maximum comfort. Features a classic 5-pocket design with a contemporary fit.',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
    },
    {
        name: 'Leather Biker Jacket',
        description: 'Genuine leather jacket with a timeless biker design. Features asymmetric zipper, multiple pockets, and quilted lining.',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    },
    {
        name: 'Floral Summer Dress',
        description: 'Light and flowy summer dress with beautiful floral patterns. Perfect for beach days and casual outings.',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
    },
    {
        name: 'Wool Blend Overcoat',
        description: 'Elegant overcoat crafted from a premium wool blend. Features classic lapels, two-button closure, and satin lining.',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
    },
    {
        name: 'Athletic Running Shorts',
        description: 'Lightweight performance shorts with moisture-wicking fabric. Features elastic waistband and built-in brief liner.',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
    },
    {
        name: 'Cashmere Blend Sweater',
        description: 'Luxuriously soft sweater made from premium cashmere blend. Features ribbed cuffs and hem with a relaxed fit.',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    },
    {
        name: 'Vintage Hoodie',
        description: 'Comfortable vintage-style hoodie with distressed graphics. Made from heavyweight cotton fleece for extra warmth.',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    },
    {
        name: 'Striped Linen Shirt',
        description: 'Breathable linen shirt with classic stripes. Perfect for summer days with its relaxed fit and natural fabric.',
        price: 54.99,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
    },
    {
        name: 'High-Waist Yoga Pants',
        description: 'Stretchy yoga pants with high-waist design for extra support. Features 4-way stretch fabric and hidden pocket.',
        price: 44.99,
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    },
    {
        name: 'Silk Evening Blouse',
        description: 'Elegant silk blouse perfect for formal occasions. Features delicate draping and pearl button details.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800',
    },
    {
        name: 'Cargo Utility Pants',
        description: 'Functional cargo pants with multiple pockets. Made from durable cotton twill with a relaxed fit.',
        price: 74.99,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800',
    },
]

async function main() {
    console.log('🌱 Seeding database...')

    // Clear existing products
    await prisma.product.deleteMany()
    console.log('📦 Cleared existing products')

    // Create sample products
    for (const product of sampleProducts) {
        await prisma.product.create({
            data: product,
        })
    }

    console.log(`✅ Created ${sampleProducts.length} sample products`)
    console.log('🎉 Seeding complete!')
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
