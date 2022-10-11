function Modal({ title, open, children, onClose = () => {} }) {
    return (
        <div className="modal" data-open={open}>
            <div className="inner">
                <div className="header">
                    <h1>{title}</h1>
                    <span className="close" onClick={onClose}>&times;</span>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;