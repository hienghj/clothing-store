import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products - List all products with search, filter, pagination
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const search = searchParams.get('search') || ''
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '12')
        const sortBy = searchParams.get('sortBy') || 'createdAt'
        const sortOrder = searchParams.get('sortOrder') || 'desc'

        const skip = (page - 1) * limit

        const where = search
            ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' as const } },
                    { description: { contains: search, mode: 'insensitive' as const } },
                ],
            }
            : {}

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            prisma.product.count({ where }),
        ])

        return NextResponse.json({
            success: true,
            data: products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products' },
            { status: 500 }
        )
    }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, description, price, image } = body

        // Validation
        if (!name || !description || price === undefined) {
            return NextResponse.json(
                { success: false, error: 'Name, description, and price are required' },
                { status: 400 }
            )
        }

        if (typeof price !== 'number' || price < 0) {
            return NextResponse.json(
                { success: false, error: 'Price must be a positive number' },
                { status: 400 }
            )
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                image: image || null,
            },
        })

        return NextResponse.json(
            { success: true, data: product },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to create product' },
            { status: 500 }
        )
    }
}
