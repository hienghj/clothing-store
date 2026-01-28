import { ProductForm } from '@/components'

export const metadata = {
    title: 'Add New Product | ClothStore',
    description: 'Add a new product to your clothing store',
}

export default function NewProductPage() {
    return (
        <div className="container form-container">
            <div className="page-header" style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h1 className="page-title">Add New Product</h1>
                <p className="page-subtitle">Fill in the details to add a new product</p>
            </div>

            <ProductForm />
        </div>
    )
}
