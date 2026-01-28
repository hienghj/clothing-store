'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Product, PaginatedResponse } from '@/types'
import { ProductCard, SearchBar, Pagination, DeleteModal } from '@/components'

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)

    // Delete modal state
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; product: Product | null }>({
        isOpen: false,
        product: null,
    })
    const [deleting, setDeleting] = useState(false)

    const fetchProducts = useCallback(async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '12',
                search,
            })

            const response = await fetch(`/api/products?${params}`)
            const data: PaginatedResponse<Product> = await response.json()

            if (data.success && data.data) {
                setProducts(data.data)
                setTotalPages(data.pagination.totalPages)
                setTotal(data.pagination.total)
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }, [currentPage, search])

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchProducts()
        }, 300)

        return () => clearTimeout(debounceTimer)
    }, [fetchProducts])

    const handleSearch = (value: string) => {
        setSearch(value)
        setCurrentPage(1)
    }

    const handleDelete = async () => {
        if (!deleteModal.product) return

        setDeleting(true)
        try {
            const response = await fetch(`/api/products/${deleteModal.product.id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                setDeleteModal({ isOpen: false, product: null })
                fetchProducts()
            }
        } catch (error) {
            console.error('Error deleting product:', error)
        } finally {
            setDeleting(false)
        }
    }

    const openDeleteModal = (productId: number) => {
        const product = products.find(p => p.id === productId)
        if (product) {
            setDeleteModal({ isOpen: true, product })
        }
    }

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">All Products</h1>
                    <p className="page-subtitle">
                        {total > 0 ? `${total} products in our collection` : 'Browse our collection'}
                    </p>
                </div>
            </div>

            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <SearchBar
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search by name or description..."
                    />

                    <Link href="/products/new" className="btn btn-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Product
                    </Link>
                </div>

                {loading ? (
                    <div className="loading">
                        <div className="loading-spinner" />
                    </div>
                ) : products.length > 0 ? (
                    <>
                        <div className="product-grid">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onDelete={openDeleteModal}
                                />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <h3 className="empty-state-title">
                            {search ? 'No products found' : 'No products yet'}
                        </h3>
                        <p className="empty-state-message">
                            {search
                                ? `No products match "${search}". Try a different search term.`
                                : 'Start by adding your first product to the store'
                            }
                        </p>
                        {!search && (
                            <Link href="/products/new" className="btn btn-primary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                Add First Product
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <DeleteModal
                isOpen={deleteModal.isOpen}
                productName={deleteModal.product?.name || ''}
                onConfirm={handleDelete}
                onCancel={() => setDeleteModal({ isOpen: false, product: null })}
                loading={deleting}
            />
        </>
    )
}
