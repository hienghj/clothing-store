'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/'
        return pathname.startsWith(path)
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link href="/" className="navbar-brand">
                    <svg viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#9333ea" />
                                <stop offset="50%" stopColor="#c084fc" />
                                <stop offset="100%" stopColor="#14b8a6" />
                            </linearGradient>
                        </defs>
                        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                    </svg>
                    ClothStore
                </Link>

                <ul className="navbar-nav">
                    <li>
                        <Link href="/" className={`navbar-link ${isActive('/') && pathname === '/' ? 'active' : ''}`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/products" className={`navbar-link ${isActive('/products') ? 'active' : ''}`}>
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link href="/products/new" className="btn btn-primary btn-sm">
                            + Add Product
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
