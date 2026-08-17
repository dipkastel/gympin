import { useRef, useState } from 'react'
import Icon from './Icon'
import { useOutsideClick } from './utils'

/* ---------- عناصر پایه ---------- */

export function Divider() {
    return <span className="rte-divider" />
}

export function ToolbarButton({ onClick, active, disabled, title, children }) {
    return (
        <button
            type="button"
            className={`rte-btn ${active ? 'is-active' : ''}`}
            title={title}
            disabled={disabled}
            aria-pressed={!!active}
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

/* ---------- کشویی سبک متن (پاراگراف / عنوان‌ها) ---------- */

const HEADING_LABELS = { 0: 'متن معمولی', 1: 'عنوان ۱', 2: 'عنوان ۲', 3: 'عنوان ۳' , 4: 'عنوان ۴' , 5: 'عنوان ۵', 6: 'عنوان ۶' }

function HeadingDropdown({ editor }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    useOutsideClick(ref, () => setOpen(false))
    const current = [1, 2, 3, 4, 5, 6].find((l) => editor.isActive('heading', { level: l })) || 0

    return (
        <div className="rte-dd" ref={ref}>
            <button
                type="button"
                className="rte-btn rte-btn-wide"
                title="سبک متن"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setOpen((o) => !o)}
            >
                <span>{HEADING_LABELS[current]}</span>
                <Icon name="chevronDown" size={14} />
            </button>
            {open && (
                <div className="rte-dd-panel">
                    {[0, 1, 2, 3, 4, 5, 6].map((level) => (
                        <button
                            key={level}
                            type="button"
                            className={`rte-dd-item ${current === level ? 'is-active' : ''}`}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                if (level === 0) {
                                    editor.chain().focus().setParagraph().run()
                                    setOpen(false)
                                    return
                                }
                                editor.chain().focus().toggleHeading({ level }).run()
                                if ((level === 2 || level === 3) && editor.isActive('heading', { level })) {
                                    const existingId = editor.getAttributes('heading').id || ''
                                    const id = window.prompt('شناسه (id) برای این عنوان (اختیاری):', existingId)
                                    if (id !== null) {
                                        editor.chain().focus().updateAttributes('heading', { id: id.trim() || null }).run()
                                    }
                                }
                                setOpen(false)
                            }}
                        >
              <span className={level ? `rte-heading-preview h${level}` : 'rte-heading-preview'}>
                {HEADING_LABELS[level]}
              </span>
                            {current === level && <Icon name="check" size={14} />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

/* ---------- رنگ متن و هایلایت ---------- */

const TEXT_COLORS = ['#23272E', '#B4413C', '#C08A2E', '#2F6F4E', '#2B5B84', '#6B4FA0', '#9B2C36', '#6B7280']
const HIGHLIGHT_COLORS = ['#FDE68A', '#BBF7D0', '#BFDBFE', '#FBCFE8', '#FED7AA', '#E9D5FF']

function ColorPopover({ editor, mode }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    useOutsideClick(ref, () => setOpen(false))
    const colors = mode === 'text' ? TEXT_COLORS : HIGHLIGHT_COLORS
    const isActive = mode === 'text' ? editor.isActive('textStyle') : editor.isActive('highlight')

    const apply = (color) => {
        if (mode === 'text') editor.chain().focus().setColor(color).run()
        else editor.chain().focus().toggleHighlight({ color }).run()
        setOpen(false)
    }
    const clear = () => {
        if (mode === 'text') editor.chain().focus().unsetColor().run()
        else editor.chain().focus().unsetHighlight().run()
        setOpen(false)
    }

    return (
        <div className="rte-dd" ref={ref}>
            <ToolbarButton title={mode === 'text' ? 'رنگ متن' : 'هایلایت'} active={isActive} onClick={() => setOpen((o) => !o)}>
                <Icon name={mode === 'text' ? 'palette' : 'highlight'} />
            </ToolbarButton>
            {open && (
                <div className="rte-dd-panel rte-color-panel">
                    <div className="rte-swatches">
                        {colors.map((c) => (
                            <button
                                key={c}
                                type="button"
                                className="rte-swatch"
                                style={{ background: c }}
                                title={c}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => apply(c)}
                            />
                        ))}
                    </div>
                    <button type="button" className="rte-dd-item rte-clear-color" onMouseDown={(e) => e.preventDefault()} onClick={clear}>
                        <Icon name="close" size={14} />
                        <span>حذف رنگ</span>
                    </button>
                </div>
            )}
        </div>
    )
}

/* ---------- پیوند ---------- */

function LinkPopover({ editor }) {
    const [open, setOpen] = useState(false)
    const [url, setUrl] = useState('')
    const ref = useRef(null)
    useOutsideClick(ref, () => setOpen(false))

    const openPanel = () => {
        setUrl(editor.getAttributes('link').href || '')
        setOpen(true)
    }
    const apply = () => {
        const value = url.trim()
        if (!value) {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            setOpen(false)
            return
        }
        const href = /^https?:\/\//i.test(value) || /^mailto:/i.test(value) ? value : `https://${value}`
        editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
        setOpen(false)
    }
    const remove = () => {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()
        setOpen(false)
    }

    return (
        <div className="rte-dd" ref={ref}>
            <ToolbarButton title="افزودن پیوند" active={editor.isActive('link')} onClick={openPanel}>
                <Icon name="link" />
            </ToolbarButton>
            {open && (
                <div className="rte-dd-panel rte-input-panel">
                    <input
                        type="text"
                        className="rte-input"
                        placeholder="آدرس لینک را وارد کنید…"
                        value={url}
                        dir="ltr"
                        autoFocus
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') { e.preventDefault(); apply() }
                            if (e.key === 'Escape') setOpen(false)
                        }}
                    />
                    <div className="rte-input-actions">
                        {editor.isActive('link') && (
                            <button type="button" className="rte-mini-btn danger" title="حذف لینک" onMouseDown={(e) => e.preventDefault()} onClick={remove}>
                                <Icon name="unlink" size={14} />
                            </button>
                        )}
                        <button type="button" className="rte-mini-btn primary" title="ثبت" onMouseDown={(e) => e.preventDefault()} onClick={apply}>
                            <Icon name="check" size={14} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

/* ---------- تصویر ---------- */

function ImagePopover({ editor }) {
    const [open, setOpen] = useState(false)
    const [url, setUrl] = useState('')
    const ref = useRef(null)
    const fileRef = useRef(null)
    useOutsideClick(ref, () => setOpen(false))

    const insert = (src) => {
        if (!src) return
        editor.chain().focus().setImage({ src }).run()
        setOpen(false)
        setUrl('')
    }
    const onFile = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => insert(reader.result)
        reader.readAsDataURL(file)
        e.target.value = ''
    }

    return (
        <div className="rte-dd" ref={ref}>
            <ToolbarButton title="افزودن تصویر" onClick={() => setOpen((o) => !o)}>
                <Icon name="image" />
            </ToolbarButton>
            {open && (
                <div className="rte-dd-panel rte-input-panel">
                    <input
                        type="text"
                        className="rte-input"
                        placeholder="آدرس تصویر (URL)"
                        value={url}
                        dir="ltr"
                        autoFocus
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); insert(url.trim()) } }}
                    />
                    <div className="rte-input-actions">
                        <button type="button" className="rte-mini-btn" title="بارگذاری از سیستم" onMouseDown={(e) => e.preventDefault()} onClick={() => fileRef.current?.click()}>
                            <Icon name="upload" size={14} />
                        </button>
                        <button type="button" className="rte-mini-btn primary" title="افزودن" onMouseDown={(e) => e.preventDefault()} onClick={() => insert(url.trim())}>
                            <Icon name="check" size={14} />
                        </button>
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" className="rte-hidden-file" onChange={onFile} />
                </div>
            )}
        </div>
    )
}

/* ---------- نوار زمینه‌ای جدول ---------- */

export function TableBar({ editor }) {
    if (!editor.isActive('table')) return null
    const actions = [
        { icon: 'addRow', title: 'افزودن ردیف', run: () => editor.chain().focus().addRowAfter().run() },
        { icon: 'addCol', title: 'افزودن ستون', run: () => editor.chain().focus().addColumnAfter().run() },
        { icon: 'delRow', title: 'حذف ردیف', run: () => editor.chain().focus().deleteRow().run() },
        { icon: 'delCol', title: 'حذف ستون', run: () => editor.chain().focus().deleteColumn().run() },
        { icon: 'merge', title: 'ادغام / جدا کردن سلول‌ها', run: () => editor.chain().focus().mergeOrSplit().run() },
        { icon: 'trash', title: 'حذف جدول', run: () => editor.chain().focus().deleteTable().run(), danger: true },
    ]
    return (
        <div className="rte-tablebar">
            <span className="rte-tablebar-label">جدول</span>
            <div className="rte-tablebar-actions">
                {actions.map((a) => (
                    <button
                        key={a.icon}
                        type="button"
                        className={`rte-mini-btn ${a.danger ? 'danger' : ''}`}
                        title={a.title}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={a.run}
                    >
                        <Icon name={a.icon} size={15} />
                    </button>
                ))}
            </div>
        </div>
    )
}

/* ---------- نوار ابزار کامل ---------- */

export function MenuBar({ editor, onToggleHtml }) {
    return (
        <div className="rte-toolbar" role="toolbar" aria-label="ابزار ویرایشگر متن">
            <div className="rte-group">
                <ToolbarButton title="واگرد (Ctrl+Z)" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
                    <Icon name="undo" />
                </ToolbarButton>
                <ToolbarButton title="ازنو (Ctrl+Y)" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
                    <Icon name="redo" />
                </ToolbarButton>
            </div>

            <Divider />

            <div className="rte-group">
                <HeadingDropdown editor={editor} />
            </div>

            <Divider />

            <div className="rte-group">
                <ToolbarButton title="ضخیم (Ctrl+B)" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
                    <span className="rte-glyph rte-glyph-bold">B</span>
                </ToolbarButton>
                <ToolbarButton title="مورب (Ctrl+I)" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <span className="rte-glyph rte-glyph-italic">I</span>
                </ToolbarButton>
                <ToolbarButton title="زیرخط‌دار (Ctrl+U)" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
                    <span className="rte-glyph rte-glyph-underline">U</span>
                </ToolbarButton>
                <ToolbarButton title="خط‌خورده" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
                    <span className="rte-glyph rte-glyph-strike">S</span>
                </ToolbarButton>
                <ToolbarButton title="کد درون‌خطی" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}>
                    <span className="rte-glyph rte-glyph-code">{'</>'}</span>
                </ToolbarButton>
            </div>

            <Divider />

            <div className="rte-group">
                <ColorPopover editor={editor} mode="text" />
                <ColorPopover editor={editor} mode="highlight" />
            </div>

            <Divider />

            <div className="rte-group">
                <ToolbarButton title="راست‌چین" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                    <Icon name="alignRight" />
                </ToolbarButton>
                <ToolbarButton title="وسط‌چین" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                    <Icon name="alignCenter" />
                </ToolbarButton>
                <ToolbarButton title="چپ‌چین" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                    <Icon name="alignLeft" />
                </ToolbarButton>
                <ToolbarButton title="بلوک‌چین" active={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
                    <Icon name="alignJustify" />
                </ToolbarButton>
            </div>

            <Divider />

            <div className="rte-group">
                <ToolbarButton title="لیست نامرتب" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <Icon name="bulletList" />
                </ToolbarButton>
                <ToolbarButton title="لیست مرتب" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    <Icon name="orderedList" />
                </ToolbarButton>
                <ToolbarButton title="نقل‌قول" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                    <Icon name="quote" />
                </ToolbarButton>
                <ToolbarButton title="بلوک کد" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                    <Icon name="code" />
                </ToolbarButton>
                <ToolbarButton title="خط افقی" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    <Icon name="hr" />
                </ToolbarButton>
            </div>

            <Divider />

            <div className="rte-group">
                <LinkPopover editor={editor} />
                <ImagePopover editor={editor} />
                <ToolbarButton title="افزودن جدول" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
                    <Icon name="table" />
                </ToolbarButton>
            </div>

            <Divider />

            <div className="rte-group">
                <ToolbarButton title="پاک‌کردن قالب‌بندی" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
                    <Icon name="clear" />
                </ToolbarButton>
                <ToolbarButton title="نمایش و ویرایش کد HTML" onClick={onToggleHtml}>
                    <Icon name="source" />
                </ToolbarButton>
            </div>
        </div>
    )
}
