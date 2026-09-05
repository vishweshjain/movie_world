import '../css/EmptyState.css';

export default function EmptyState({ icon, title, message }) {
    return (
        <div className="empty-state">
            {icon && <div className="empty-state-icon">{icon}</div>}
            <h3 className="empty-state-title">{title || 'Nothing here yet'}</h3>
            {message && <p className="empty-state-message">{message}</p>}
        </div>
    );
}
