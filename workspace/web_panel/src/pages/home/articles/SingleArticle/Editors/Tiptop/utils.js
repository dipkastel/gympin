import { useEffect } from 'react'

export function useOutsideClick(ref, handler) {
    useEffect(() => {
        const listener = (e) => {
            if (ref.current && !ref.current.contains(e.target)) handler()
        }
        document.addEventListener('mousedown', listener)
        return () => document.removeEventListener('mousedown', listener)
    }, [ref, handler])
}

export function estimateReadingMinutes(html = " ") {
    const text = html?.replace(/<[^>]*>/g, " ");

    const words = text
        ?.trim()
        ?.split(/\s+/)
        ?.filter(Boolean).length;

    return Math.max(1, Math.round(words / 100));
}
export function estimateWordCount(html = " ") {
    if (!html) return 0;
    const text = html?.replace(/<[^>]*>/g, " ");

    const words = text
        ?.trim()
        ?.split(/\s+/)
        ?.filter(Boolean).length;
    return words;
}
export function normalizeContent(input) {
    if (!input) return ''
    const trimmed = String(input).trim()
    if (!trimmed) return ''
    if (/<\/?[a-z][\s\S]*>/i.test(trimmed)) return trimmed
    return trimmed
        .split(/\n{2,}/)
        .map((block) => `<p>${block.replace(/\n/g, '<br/>')}</p>`)
        .join('')
}
