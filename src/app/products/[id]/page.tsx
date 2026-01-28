'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Product, ApiResponse } from '@/types'
import { DeleteModal } from '@/components'

interface PageProps {
    params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: PageProps) {
    const { id } = use(params)
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleting, setDeleting] = useState(false)

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

    const handleDelete = async () => {
        setDeleting(true)
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                router.push('/products')
                router.refresh()
            }
        } catch (err) {
            console.error('Error deleting product:', err)
        } finally {
            setDeleting(false)
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price)
    }

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
        <div className="container">
            {/* Breadcrumb */}
            <nav style={{ padding: '1.5rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-500)' }}>
                    <Link href="/" style={{ color: 'var(--gray-500)', textDecoration: 'none' }}>Home</Link>
                    <span>/</span>
                    <Link href="/products" style={{ color: 'var(--gray-500)', textDecoration: 'none' }}>Products</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--gray-300)' }}>{product.name}</span>
                </div>
            </nav>

            <div className="product-detail">
                {/* Product Image */}
                <div className="product-detail-image">
                    {product.image ? (
                        <img src={product.image} alt={product.name} />
                    ) : (
                        <div className="product-image-placeholder" style={{ height: '100%' }}>
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="product-detail-content">
                    <h1 className="product-detail-name">{product.name}</h1>

                    <div className="product-detail-price">
                        {formatPrice(product.price)}
                    </div>

                    <p className="product-detail-description">
                        {product.description}
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        padding: '1rem 0',
                        color: 'var(--gray-500)',
                        fontSize: '0.875rem'
                    }}>
                        <span>
                            <strong style={{ color: 'var(--gray-400)' }}>Added:</strong>{' '}
                            {new Date(product.createdAt).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>
                            <strong style={{ color: 'var(--gray-400)' }}>Updated:</strong>{' '}
                            {new Date(product.updatedAt).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="product-detail-actions">
                        <Link href={`/products/${product.id}/edit`} className="btn btn-primary btn-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit Product
                        </Link>

                        <button
                            onClick={() => setDeleteModal(true)}
                            className="btn btn-danger btn-lg"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            Delete
                        </button>

                        <Link href="/products" className="btn btn-ghost btn-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Back
                        </Link>
                    </div>
                </div>
            </div>

            <DeleteModal
                isOpen={deleteModal}
                productName={product.name}
                onConfirm={handleDelete}
                onCancel={() => setDeleteModal(false)}
                loading={deleting}
            />
        </div>
    )
}
