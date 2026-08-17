export default function HtmlSourceView({ value, onChange }) {
    return (
        <textarea
            className="rte-html-textarea"
            value={value}
            dir="ltr"
            spellCheck={false}
            onChange={(e) => onChange(e.target.value)}
            placeholder="<p>کد HTML خود را اینجا بنویسید یا ویرایش کنید…</p>"
        />
    )
}
