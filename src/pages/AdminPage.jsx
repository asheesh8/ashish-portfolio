import { useState, useEffect, useRef, useCallback } from 'react';
import { parseBlocks, renderBlocks } from '../utils/parsePost';
import {
  loadAllPosts, savePost, deletePost, slugify, formatDateDisplay,
} from '../utils/postStorage';
import './AdminPage.css';

const PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'ashish';
const SESSION_KEY = 'admin_authed';

function newDraft() {
  return {
    slug: '',
    title: '',
    date: new Date().toISOString().slice(0, 10),
    description: '',
    tags: '',
    content: '',
    published: false,
  };
}

function LoginGate({ onAuth }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (pw === PASS) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onAuth();
    } else {
      setErr(true);
      setPw('');
    }
  };

  return (
    <form className="admin-login-card" onSubmit={submit}>
      <div className="admin-login-label">// ashish.dev</div>
      <div className="admin-login-title">Admin</div>
      <label>Password</label>
      <input
        type="password"
        value={pw}
        onChange={e => { setPw(e.target.value); setErr(false); }}
        autoFocus
        placeholder="••••••••"
      />
      <button className="admin-login-btn" type="submit">Enter →</button>
      {err && <div className="admin-login-error">Wrong password.</div>}
    </form>
  );
}

function Toolbar({ textareaRef, onChange }) {
  const insert = useCallback((before, after = '', placeholder = '') => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const sel = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + sel + after + value.slice(e);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const c = s + before.length + sel.length;
      el.setSelectionRange(c, c);
    });
  }, [textareaRef, onChange]);

  const insertBlock = useCallback((text) => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: s, value } = el;
    const prefix = s > 0 && value[s - 1] !== '\n' ? '\n' : '';
    const next = value.slice(0, s) + prefix + text + '\n' + value.slice(s);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const c = s + prefix.length + text.length + 1;
      el.setSelectionRange(c, c);
    });
  }, [textareaRef, onChange]);

  const tools = [
    { label: 'H2',          action: () => insertBlock('## Section Header') },
    { label: 'H3',          action: () => insertBlock('### Subsection') },
    null,
    { label: 'B',           action: () => insert('**', '**', 'bold text') },
    { label: 'I',           action: () => insert('*', '*', 'italic text') },
    { label: '`code`',      action: () => insert('`', '`', 'code') },
    null,
    { label: '```block```', action: () => insertBlock('```js\n// code here\n```') },
    { label: '— list',      action: () => insertBlock('- List item') },
    { label: '———',         action: () => insertBlock('---') },
    null,
    { label: '[link](url)', action: () => insert('[', '](https://)', 'link text') },
  ];

  return (
    <div className="admin-toolbar">
      {tools.map((t, i) =>
        t === null
          ? <span key={i} className="admin-toolbar-sep" />
          : <button key={t.label} className="admin-toolbar-btn" type="button" onClick={t.action}>{t.label}</button>
      )}
    </div>
  );
}

function Editor({ post, onSave, onDelete }) {
  const [form, setForm] = useState(post);
  const [tab, setTab] = useState('write');
  const [toast, setToast] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => { setForm(post); setTab('write'); }, [post.slug, post.createdAt]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleTitleChange = (v) => {
    setForm(f => ({ ...f, title: v, slug: f.slug || slugify(v) }));
  };

  const handleSave = (publish = null) => {
    const updated = {
      ...form,
      published: publish !== null ? publish : form.published,
      slug: form.slug || slugify(form.title),
    };
    savePost(updated);
    setForm(updated);
    onSave(updated);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const handleDelete = () => {
    if (!window.confirm('Delete this post?')) return;
    deletePost(form.slug);
    onDelete(form.slug);
  };

  const blocks = parseBlocks(form.content || '');

  return (
    <div className="admin-editor-pane">
      <div className="admin-editor-topbar">
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', fontFamily: 'monospace' }}>
          {form.slug || 'untitled'}
        </span>
        <div className="admin-editor-actions">
          <button className="admin-delete-btn" type="button" onClick={handleDelete}>Delete</button>
          <button className="admin-save-btn" type="button" onClick={() => handleSave()}>Save Draft</button>
          <button
            className={`admin-publish-btn${form.published ? ' unpublish' : ''}`}
            type="button"
            onClick={() => handleSave(!form.published)}
          >
            {form.published ? 'Unpublish' : 'Publish →'}
          </button>
        </div>
      </div>

      <div className="admin-meta-grid">
        <div className="admin-field full">
          <label>Title</label>
          <input value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Post title…" />
        </div>
        <div className="admin-field">
          <label>Slug</label>
          <input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="auto-generated" />
        </div>
        <div className="admin-field">
          <label>Date</label>
          <input type="date" value={form.date} onChange={e => set('date', e.target.value)} />
        </div>
        <div className="admin-field full">
          <label>Description (card preview)</label>
          <input value={form.description} onChange={e => set('description', e.target.value)} placeholder="One-line summary…" />
        </div>
        <div className="admin-field full">
          <label>Tags (comma-separated)</label>
          <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="React, TypeScript, Build Tools" />
        </div>
      </div>

      <div className="admin-tabs">
        {['write', 'preview'].map(t => (
          <button key={t} className={`admin-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'write' ? (
        <>
          <Toolbar textareaRef={textareaRef} onChange={v => set('content', v)} />
          <div className="admin-write-area">
            <textarea
              ref={textareaRef}
              className="admin-textarea"
              value={form.content}
              onChange={e => set('content', e.target.value)}
              placeholder={`## What I built\n\nStart writing here…`}
              spellCheck
            />
          </div>
        </>
      ) : (
        <div className="admin-preview-area">
          <div className="post-body">
            {blocks.length ? renderBlocks(blocks) : (
              <p style={{ color: 'rgba(255,255,255,.25)', fontStyle: 'italic' }}>Nothing to preview yet.</p>
            )}
          </div>
        </div>
      )}

      {toast && <div className="admin-toast">Saved ✓</div>}
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(!!sessionStorage.getItem(SESSION_KEY));
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (authed) setPosts(loadAllPosts());
  }, [authed]);

  const handleNewPost = () => setSelected(newDraft());
  const handleSelect = (post) => setSelected({ ...post });
  const handleSaved = (updated) => { setPosts(loadAllPosts()); setSelected(updated); };
  const handleDeleted = () => { setPosts(loadAllPosts()); setSelected(null); };

  if (!authed) {
    return (
      <div className="admin-shell admin-login">
        <LoginGate onAuth={() => setAuthed(true)} />
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <div className="admin-topbar-dot" />
          <span className="admin-topbar-label">ashish.dev</span>
          <span className="admin-topbar-title">Admin</span>
        </div>
        <button
          className="admin-logout-btn"
          onClick={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }}
        >
          Log out
        </button>
      </div>

      <div className="admin-body">
        <div className="admin-sidebar">
          <div className="admin-sidebar-header">
            <span className="admin-sidebar-section">Posts</span>
            <button className="admin-new-btn" onClick={handleNewPost}>+ New</button>
          </div>
          <div className="admin-post-list">
            {posts.length === 0 && (
              <div className="admin-empty-state">No posts yet.<br />Hit "+ New" to write your first one.</div>
            )}
            {posts.map(p => (
              <div
                key={p.slug || p.createdAt}
                className={`admin-post-item${selected?.slug === p.slug ? ' selected' : ''}`}
                onClick={() => handleSelect(p)}
              >
                <div className="admin-post-item-title">{p.title || 'Untitled'}</div>
                <div className="admin-post-item-meta">
                  <span className="admin-post-item-date">{p.date ? formatDateDisplay(p.date) : '—'}</span>
                  <span className={`admin-status-badge ${p.published ? 'published' : 'draft'}`}>
                    {p.published ? 'Live' : 'Draft'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selected ? (
          <Editor
            key={selected.slug + (selected.createdAt || '')}
            post={selected}
            onSave={handleSaved}
            onDelete={handleDeleted}
          />
        ) : (
          <div className="admin-no-selection">
            <div className="admin-no-selection-icon">✦</div>
            <p>Select a post or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}
