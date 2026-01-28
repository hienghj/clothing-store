'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ProductFormData, Product, ApiResponse } from '@/types'

interface ProductFormProps {
    product?: Product
    isEdit?: boolean
}

export default function ProductForm({ product, isEdit = false }: ProductFormProps) {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        price: 0,
        image: '',
    })

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image || '',
            })
        }
    }, [product])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value,
        }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size must be less than 5MB')
            return
        }

        setUploading(true)
        setError('')

        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (data.success) {
                setFormData((prev) => ({
                    ...prev,
                    image: data.data.url,
                }))
            } else {
                setError(data.error || 'Failed to upload image')
            }
        } catch (err) {
            setError('Failed to upload image. Please try again.')
            console.error(err)
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const url = isEdit ? `/api/products/${product?.id}` : '/api/products'
            const method = isEdit ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data: ApiResponse<Product> = await response.json()

            if (!data.success) {
                throw new Error(data.error || 'Failed to save product')
            }

            router.push(`/products/${data.data?.id}`)
            router.refresh()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const removeImage = () => {
        setFormData((prev) => ({
            ...prev,
            image: '',
        }))
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-card">
            {error && (
                <div className="toast toast-error" style={{ marginBottom: '1rem', position: 'static' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    {error}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="name" className="form-label">
                    Product Name *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter product name"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description" className="form-label">
                    Description *
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Enter product description"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="price" className="form-label">
                    Price ($) *
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                />
            </div>

            {/* Image Upload Section */}
            <div className="form-group">
                <label className="form-label">
                    Product Image (Optional)
                </label>

                {/* Upload Button */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                    />
                    <label
                        htmlFor="image-upload"
                        className="btn btn-secondary"
                        style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}
                    >
                        {uploading ? (
                            <>
                                <span className="loading-spinner" style={{ width: '16px', height: '16px' }} />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                                Upload Image
                            </>
                        )}
                    </label>

                    <span style={{ color: 'var(--gray-500)', fontSize: '0.85rem', alignSelf: 'center' }}>
                        or enter URL below
                    </span>
                </div>

                {/* URL Input */}
                <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="https://example.com/image.jpg"
                />

                {/* Image Preview */}
                {formData.image && (
                    <div style={{
                        marginTop: '1rem',
                        position: 'relative',
                        display: 'inline-block'
                    }}>
                        <img
                            src={formData.image}
                            alt="Preview"
                            style={{
                                maxWidth: '200px',
                                maxHeight: '200px',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--dark-border)',
                            }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none'
                            }}
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: 'var(--error-500)',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading || uploading}>
                    {loading ? (
                        <>
                            <span className="loading-spinner" style={{ width: '20px', height: '20px' }} />
                            Saving...
                        </>
                    ) : (
                        <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                <polyline points="17 21 17 13 7 13 7 21" />
                                <polyline points="7 3 7 8 15 8" />
                            </svg>
                            {isEdit ? 'Update Product' : 'Create Product'}
                        </>
                    )}
                </button>

                <button
                    type="button"
                    className="btn btn-ghost btn-lg"
                    onClick={() => router.back()}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
