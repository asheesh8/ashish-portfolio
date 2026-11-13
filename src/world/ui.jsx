// Pressable block buttons: a raised face over a darker edge that sinks when pressed.

export function Btn({ as = 'a', tone = 'lantern', children, className = '', ...rest }) {
  const Tag = as;
  return (
    <Tag className={`btn btn--${tone} ${className}`} {...rest}>
      <span className="btn-shadow" aria-hidden="true" />
      <span className="btn-edge" aria-hidden="true" />
      <span className="btn-face">{children}</span>
    </Tag>
  );
}

export function Ext({ href, children, className = '' }) {
  return (
    <a className={`ext ${className}`} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <svg className="ext-ico" width="10" height="10" viewBox="0 0 5 5" shapeRendering="crispEdges" aria-hidden="true">
        <path d="M1 0h4v4H4V2H3v1H2v1H1V3h1V2h1V1H1z" fill="currentColor" />
      </svg>
    </a>
  );
}
