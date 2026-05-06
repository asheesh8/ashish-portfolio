// Renders inline markdown: **bold**, *italic*, `code`, [text](url)
export function renderInline(text, keyPrefix = '') {
  const parts = [];
  let remaining = text;
  let k = 0;

  while (remaining.length > 0) {
    const bold   = remaining.match(/\*\*(.+?)\*\*/);
    const italic = remaining.match(/(?<!\*)\*([^*\n]+?)\*(?!\*)/);
    const code   = remaining.match(/`([^`]+?)`/);
    const link   = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    const candidates = [
      bold   && { i: bold.index,   len: bold[0].length,   type: 'bold',   val: bold[1] },
      italic && { i: italic.index, len: italic[0].length, type: 'italic', val: italic[1] },
      code   && { i: code.index,   len: code[0].length,   type: 'code',   val: code[1] },
      link   && { i: link.index,   len: link[0].length,   type: 'link',   val: link[1], href: link[2] },
    ].filter(Boolean);

    if (!candidates.length) { parts.push(remaining); break; }

    const hit = candidates.reduce((a, b) => a.i <= b.i ? a : b);
    if (hit.i > 0) parts.push(remaining.slice(0, hit.i));

    const key = `${keyPrefix}-${k++}`;
    if (hit.type === 'bold')   parts.push(<strong key={key}>{hit.val}</strong>);
    if (hit.type === 'italic') parts.push(<em key={key}>{hit.val}</em>);
    if (hit.type === 'code')   parts.push(<code key={key}>{hit.val}</code>);
    if (hit.type === 'link')   parts.push(<a key={key} href={hit.href} target="_blank" rel="noreferrer">{hit.val}</a>);

    remaining = remaining.slice(hit.i + hit.len);
  }
  return parts;
}

// Parses markdown-like content into block objects
export function parseBlocks(content) {
  const lines = content.split('\n');
  const blocks = [];
  let codeLines = null;
  let codeLang = '';
  let listItems = [];
  let paraLines = [];

  const flushList = () => {
    if (listItems.length) { blocks.push({ type: 'list', items: [...listItems] }); listItems = []; }
  };
  const flushPara = () => {
    const t = paraLines.join(' ').trim();
    if (t) blocks.push({ type: 'p', content: t });
    paraLines = [];
  };

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (codeLines !== null) {
        blocks.push({ type: 'code', content: codeLines.join('\n'), lang: codeLang });
        codeLines = null; codeLang = '';
      } else {
        flushList(); flushPara();
        codeLines = []; codeLang = line.slice(3).trim();
      }
      continue;
    }
    if (codeLines !== null) { codeLines.push(line); continue; }

    if (line.startsWith('## '))       { flushList(); flushPara(); blocks.push({ type: 'h2', content: line.slice(3) }); }
    else if (line.startsWith('### ')) { flushList(); flushPara(); blocks.push({ type: 'h3', content: line.slice(4) }); }
    else if (line.startsWith('- '))   { flushPara(); listItems.push(line.slice(2)); }
    else if (line.trim() === '---')   { flushList(); flushPara(); blocks.push({ type: 'hr' }); }
    else if (line.trim() === '')      { flushList(); flushPara(); }
    else                              { if (listItems.length) flushList(); paraLines.push(line); }
  }

  flushList(); flushPara();
  return blocks;
}

// Renders parsed blocks to JSX
export function renderBlocks(blocks) {
  return blocks.map((b, i) => {
    switch (b.type) {
      case 'h2':   return <h2 key={i}>{renderInline(b.content, `h2-${i}`)}</h2>;
      case 'h3':   return <h3 key={i}>{renderInline(b.content, `h3-${i}`)}</h3>;
      case 'p':    return <p  key={i}>{renderInline(b.content, `p-${i}`)}</p>;
      case 'code': return <pre key={i} className="code-block"><code>{b.content}</code></pre>;
      case 'list': return (
        <ul key={i}>
          {b.items.map((item, j) => <li key={j}>{renderInline(item, `li-${i}-${j}`)}</li>)}
        </ul>
      );
      case 'hr': return <hr key={i} />;
      default: return null;
    }
  });
}
