import '../css/MovieGrid.css';

export default function MovieGrid({ children, title, emptyMessage, isEmpty, emptyIcon }) {
    return (
        <div className="movie-grid-section">
            {title && <h2 className="movie-grid-title">{title}</h2>}
            {isEmpty ? (
                <div className="movie-grid-empty">
                    {emptyIcon && <span className="movie-grid-empty-icon">{emptyIcon}</span>}
                    <p className="movie-grid-empty-text">{emptyMessage || 'No movies found'}</p>
                </div>
            ) : (
                <div className="movie-grid">
                    {children}
                </div>
            )}
        </div>
    );
}
