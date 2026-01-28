export interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string | null
    createdAt: string
    updatedAt: string
}

export interface ProductFormData {
    name: string
    description: string
    price: number
    image: string
}

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}
