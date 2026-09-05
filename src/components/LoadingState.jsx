import '../css/LoadingState.css';

export default function LoadingState({ message = 'Loading...' }) {
    return (
        <div className="loading-state">
            <div className="loading-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
            </div>
            <p className="loading-message">{message}</p>
        </div>
    );
}
