// A pushable button: a raised face on a darker edge that presses down when you click.
export default function Button({ href, onClick, children, variant = 'maple', external, ...rest }) {
  const Tag = href ? 'a' : 'button';
  const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Tag className={`push push--${variant}`} href={href} onClick={onClick} {...extra} {...rest}>
      <span className="push-shadow" aria-hidden="true" />
      <span className="push-edge" aria-hidden="true" />
      <span className="push-face">{children}</span>
    </Tag>
  );
}
