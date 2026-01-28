export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <p className="footer-text">
                    © {new Date().getFullYear()} <span className="footer-brand">ClothStore</span>.
                    All rights reserved. | PRN 232 Assignment 1
                </p>
            </div>
        </footer>
    )
}
