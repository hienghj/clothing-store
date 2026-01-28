'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { Product, ApiResponse } from '@/types'
import { ProductForm } from '@/components'

interface PageProps {
    params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: PageProps) {
    const { id } = use(params)
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`)
                const data: ApiResponse<Product> = await response.json()

                if (data.success && data.data) {
                    setProduct(data.data)
                } else {
                    setError(data.error || 'Product not found')
                }
            } catch (err) {
                setError('Failed to load product')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    if (loading) {
        return (
            <div className="container" style={{ padding: '4rem 0' }}>
                <div className="loading">
                    <div className="loading-spinner" />
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="container" style={{ padding: '4rem 0' }}>
                <div className="empty-state">
                    <div className="empty-state-icon">😕</div>
                    <h3 className="empty-state-title">Product Not Found</h3>
                    <p className="empty-state-message">{error}</p>
                    <Link href="/products" className="btn btn-primary">
                        Back to Products
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container form-container">
            <div className="page-header" style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h1 className="page-title">Edit Product</h1>
                <p className="page-subtitle">Update the details for &quot;{product.name}&quot;</p>
            </div>

            <ProductForm product={product} isEdit />
        </div>
    )
}
