import { useEffect, useState } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

import { MenuBar, TableBar } from './Toolbar'
import HtmlSourceView from './HtmlSourceView'
import HeadingWithId from './HeadingWithId'
import Icon from './Icon'
import { normalizeContent } from './utils'
import './TipTapStyle.css'

export default function RichTextEditor({
                                           content = '',
                                           onChange,
                                           placeholder = 'اینجا بنویسید…',
                                           editable = true,
                                           uiDir = 'rtl',
                                           className = '',}) {
    const [contentDir, setContentDir] = useState(uiDir)
    const [counts, setCounts] = useState({ words: 0, chars: 0 })
    const [mode, setMode] = useState('rich') // 'rich' | 'html'
    const [htmlDraft, setHtmlDraft] = useState('')

    const editor = useEditor(
        {
            extensions: [
                StarterKit.configure({ heading: false }),
                HeadingWithId.configure({ levels: [1, 2, 3, 4, 5, 6] }),
                Underline,
                Link.configure({
                    openOnClick: false,
                    autolink: true,
                    linkOnPaste: true,
                    HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
                }),
                Image.configure({ inline: false, allowBase64: true }),
                TextAlign.configure({ types: ['heading', 'paragraph'], defaultAlignment: uiDir === 'rtl' ? 'right' : 'left' }),
                Highlight.configure({ multicolor: true }),
                TextStyle,
                Color,
                Placeholder.configure({ placeholder }),
                Table.configure({ resizable: true }),
                TableRow,
                TableHeader,
                TableCell,
            ],
            content: normalizeContent(content),
            editable,
            immediatelyRender: false,
            onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
            editorProps: {
                attributes: { class: 'rte-editable', dir: contentDir, spellCheck: 'true' },
            },
        },
        []
    )

    // همگام‌سازی محتوای بیرونی با ویرایشگر (وقتی content از بیرون تغییر کند)
    useEffect(() => {
        if (!editor || editor.isDestroyed) return
        const incoming = normalizeContent(content)
        if (incoming !== editor.getHTML()) editor.commands.setContent(incoming, false)
    }, [content, editor])

    useEffect(() => {
        if (editor && !editor.isDestroyed) editor.setEditable(editable)
    }, [editable, editor])

    useEffect(() => {
        if (editor && !editor.isDestroyed) editor.view.dom.setAttribute('dir', contentDir)
    }, [contentDir, editor])

    useEffect(() => {
        if (!editor) return
        const update = () => {
            if (editor.isDestroyed) return
            const text = editor.getText().trim()
            setCounts({ words: text ? text.split(/\s+/).length : 0, chars: editor.getText().length })
        }
        update()
        editor.on('update', update)
        return () => editor.off('update', update)
    }, [editor])

    if (!editor) return null

    const openHtmlMode = () => {
        if (editor.isDestroyed) return
        setHtmlDraft(editor.getHTML())
        setMode('html')
    }
    const applyHtml = () => {
        if (!editor.isDestroyed) editor.commands.setContent(htmlDraft, true) // true => onUpdate/onChange هم فراخوانی می‌شود
        setMode('rich')
    }
    const cancelHtml = () => setMode('rich')

    return (
        <div className={`rte-root ${className}`} dir={uiDir}>
            <div className="rte-card">
                <div className={mode === 'html' ? 'rte-hidden' : undefined}>
                    <MenuBar editor={editor} onToggleHtml={openHtmlMode} />
                    <TableBar editor={editor} />
                </div>
                <div className={mode === 'html' ? undefined : 'rte-hidden'}>
                    <div className="rte-htmlbar">
                        <span className="rte-htmlbar-label">ویرایش کد HTML</span>
                        <div className="rte-htmlbar-actions">
                            <button type="button" className="rte-mini-btn" title="انصراف" onClick={cancelHtml}>
                                <Icon name="close" size={14} />
                            </button>
                            <button type="button" className="rte-mini-btn primary" title="اعمال و بازگشت" onClick={applyHtml}>
                                <Icon name="check" size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                <BubbleMenu
                    editor={editor}
                    tippyOptions={{ duration: 120 }}
                    className="rte-bubble"
                    shouldShow={({ state }) => mode === 'rich' && !state.selection.empty}
                >
                    <button
                        type="button"
                        className={editor.isActive('bold') ? 'is-active' : ''}
                        title="ضخیم"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        <span className="rte-glyph rte-glyph-bold">B</span>
                    </button>
                    <button
                        type="button"
                        className={editor.isActive('italic') ? 'is-active' : ''}
                        title="مورب"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <span className="rte-glyph rte-glyph-italic">I</span>
                    </button>
                    <button
                        type="button"
                        className={editor.isActive('underline') ? 'is-active' : ''}
                        title="زیرخط‌دار"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        <span className="rte-glyph rte-glyph-underline">U</span>
                    </button>
                    <button
                        type="button"
                        className={editor.isActive('link') ? 'is-active' : ''}
                        title="لینک"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                            const href = window.prompt('آدرس لینک؟', editor.getAttributes('link').href || '')
                            if (href) editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
                        }}
                    >
                        <Icon name="link" size={14} />
                    </button>
                </BubbleMenu>

                <div className="rte-content-wrap">
                    <div className={mode === 'html' ? 'rte-hidden' : undefined}>
                        <EditorContent editor={editor} />
                    </div>
                    <div className={mode === 'html' ? undefined : 'rte-hidden'}>
                        <HtmlSourceView value={htmlDraft} onChange={setHtmlDraft} />
                    </div>
                </div>

                <div className="rte-footer">
                    <div className="rte-footer-stats">
                        <span>{counts.words.toLocaleString('fa-IR')} کلمه</span>
                        <span className="rte-footer-sep">·</span>
                        <span>{counts.chars.toLocaleString('fa-IR')} نویسه</span>
                    </div>
                    <button type="button" className="rte-dir-toggle" onClick={() => setContentDir((d) => (d === 'rtl' ? 'ltr' : 'rtl'))} title="تغییر جهت متن">
                        {contentDir === 'rtl' ? 'راست‌به‌چپ' : 'چپ‌به‌راست'}
                    </button>
                </div>
            </div>
        </div>
    )
}
