import './PhotoSlot.css';

/**
 * Drop-in image placeholder. Replace `src` prop with your actual image path
 * once you have the photos — the layout stays exactly the same.
 *
 * Props:
 *   src      — image path (leave undefined for placeholder)
 *   alt      — alt text
 *   label    — placeholder label shown when no src
 *   className — extra class names
 */
export default function PhotoSlot({ src, alt, label = 'Photo', className = '' }) {
  return (
    <div className={`photo-slot ${className}`}>
      {src ? (
        <img src={src} alt={alt || label} loading="lazy" />
      ) : (
        <div className="photo-placeholder">
          <span className="photo-icon">📷</span>
          <span className="photo-label">[ {label} ]</span>
          <span className="photo-hint">drop your image here</span>
        </div>
      )}
    </div>
  );
}
