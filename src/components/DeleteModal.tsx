'use client'

interface DeleteModalProps {
    isOpen: boolean
    productName: string
    onConfirm: () => void
    onCancel: () => void
    loading?: boolean
}

export default function DeleteModal({
    isOpen,
    productName,
    onConfirm,
    onCancel,
    loading = false,
}: DeleteModalProps) {
    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    style={{ margin: '0 auto 1rem' }}
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>

                <h3 className="modal-title">Delete Product</h3>

                <p className="modal-message">
                    Are you sure you want to delete <strong>&quot;{productName}&quot;</strong>?
                    <br />
                    This action cannot be undone.
                </p>

                <div className="modal-actions">
                    <button
                        className="btn btn-ghost"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading-spinner" style={{ width: '16px', height: '16px' }} />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                                Delete
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
