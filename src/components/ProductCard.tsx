'use client'

import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
    product: Product
    onDelete?: (id: number) => void
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price)
    }

    return (
        <div className="product-card">
            <Link href={`/products/${product.id}`} className="product-image">
                {product.image ? (
                    <img src={product.image} alt={product.name} />
                ) : (
                    <div className="product-image-placeholder">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                        </svg>
                    </div>
                )}
            </Link>

            <div className="product-content">
                <Link href={`/products/${product.id}`}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>
                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                    <span className="product-price">{formatPrice(product.price)}</span>

                    <div className="product-actions">
                        <Link href={`/products/${product.id}/edit`} className="btn btn-ghost btn-sm">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </Link>

                        {onDelete && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    onDelete(product.id)
                                }}
                                className="btn btn-danger btn-sm"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
