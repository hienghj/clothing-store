import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
    params: Promise<{ id: string }>
}

// GET /api/products/:id - Get a single product
export async function GET(request: NextRequest, { params }: Params) {
    try {
        const { id } = await params
        const productId = parseInt(id)

        if (isNaN(productId)) {
            return NextResponse.json(
                { success: false, error: 'Invalid product ID' },
                { status: 400 }
            )
        }

        const product = await prisma.product.findUnique({
            where: { id: productId },
        })

        if (!product) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true, data: product })
    } catch (error) {
        console.error('Error fetching product:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch product' },
            { status: 500 }
        )
    }
}

// PUT /api/products/:id - Update a product
export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const { id } = await params
        const productId = parseInt(id)

        if (isNaN(productId)) {
            return NextResponse.json(
                { success: false, error: 'Invalid product ID' },
                { status: 400 }
            )
        }

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

        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId },
        })

        if (!existingProduct) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            )
        }

        const product = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                price,
                image: image || null,
            },
        })

        return NextResponse.json({ success: true, data: product })
    } catch (error) {
        console.error('Error updating product:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update product' },
            { status: 500 }
        )
    }
}

// DELETE /api/products/:id - Delete a product
export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const { id } = await params
        const productId = parseInt(id)

        if (isNaN(productId)) {
            return NextResponse.json(
                { success: false, error: 'Invalid product ID' },
                { status: 400 }
            )
        }

        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId },
        })

        if (!existingProduct) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            )
        }

        await prisma.product.delete({
            where: { id: productId },
        })

        return NextResponse.json({ success: true, message: 'Product deleted successfully' })
    } catch (error) {
        console.error('Error deleting product:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to delete product' },
            { status: 500 }
        )
    }
}
