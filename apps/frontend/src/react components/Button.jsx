import React from 'react';

/**
 * Button.jsx
 * Reusable button used across the app. Keeps existing dashboard CSS classes
 * (db-btn-primary, db-btn-ghost) so the visual look is unchanged.
 */
export default function Button({ variant = 'primary', icon, children, className = '', ...props }) {
  const base = variant === 'ghost' ? 'db-btn-ghost' : 'db-btn-primary';

  return (
    <button className={`${base} ${className}`} {...props}>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
