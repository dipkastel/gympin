export default function Icon({ name, size = 17 }) {
    const common = {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    }
    switch (name) {
        case 'undo':
            return (
                <svg {...common}>
                    <path d="M9 14 4 9l5-5" />
                    <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
                </svg>
            )
        case 'redo':
            return (
                <svg {...common}>
                    <path d="M15 14l5-5-5-5" />
                    <path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" />
                </svg>
            )
        case 'alignRight':
            return (
                <svg {...common}>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="10" y1="12" x2="20" y2="12" />
                    <line x1="6" y1="18" x2="20" y2="18" />
                </svg>
            )
        case 'alignCenter':
            return (
                <svg {...common}>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="7" y1="12" x2="17" y2="12" />
                    <line x1="5" y1="18" x2="19" y2="18" />
                </svg>
            )
        case 'alignLeft':
            return (
                <svg {...common}>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="14" y2="12" />
                    <line x1="4" y1="18" x2="18" y2="18" />
                </svg>
            )
        case 'alignJustify':
            return (
                <svg {...common}>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
            )
        case 'bulletList':
            return (
                <svg {...common}>
                    <circle cx="5" cy="6" r="1.3" fill="currentColor" stroke="none" />
                    <circle cx="5" cy="12" r="1.3" fill="currentColor" stroke="none" />
                    <circle cx="5" cy="18" r="1.3" fill="currentColor" stroke="none" />
                    <line x1="9" y1="6" x2="20" y2="6" />
                    <line x1="9" y1="12" x2="20" y2="12" />
                    <line x1="9" y1="18" x2="20" y2="18" />
                </svg>
            )
        case 'orderedList':
            return (
                <svg {...common}>
                    <text x="2.2" y="8.5" fontSize="7" stroke="none" fill="currentColor">1</text>
                    <text x="2.2" y="15" fontSize="7" stroke="none" fill="currentColor">2</text>
                    <text x="2.2" y="21.5" fontSize="7" stroke="none" fill="currentColor">3</text>
                    <line x1="9" y1="6" x2="20" y2="6" />
                    <line x1="9" y1="12" x2="20" y2="12" />
                    <line x1="9" y1="18" x2="20" y2="18" />
                </svg>
            )
        case 'quote':
            return (
                <svg {...common}>
                    <path d="M7 7h4v4c0 2.2-1.8 4-4 4" />
                    <path d="M15 7h4v4c0 2.2-1.8 4-4 4" />
                </svg>
            )
        case 'code':
            return (
                <svg {...common}>
                    <polyline points="8 7 4 12 8 17" />
                    <polyline points="16 7 20 12 16 17" />
                </svg>
            )
        case 'source':
            return (
                <svg {...common}>
                    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
                    <polyline points="8.5 9 6 12 8.5 15" />
                    <line x1="15.5" y1="9" x2="12" y2="15" />
                </svg>
            )
        case 'link':
            return (
                <svg {...common}>
                    <path d="M9.5 14.5 14.5 9.5" />
                    <path d="M11 6.5 12.6 4.9a3.6 3.6 0 0 1 5.1 5.1L16.1 11.6" />
                    <path d="M13 17.5 11.4 19.1a3.6 3.6 0 0 1-5.1-5.1L7.9 12.4" />
                </svg>
            )
        case 'unlink':
            return (
                <svg {...common}>
                    <path d="M9.5 14.5 14.5 9.5" />
                    <path d="M12.5 6 14 4.5" />
                    <path d="M11.5 18 10 19.5" />
                    <line x1="4" y1="4" x2="20" y2="20" />
                </svg>
            )
        case 'image':
            return (
                <svg {...common}>
                    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
                    <circle cx="9" cy="10" r="1.6" fill="currentColor" stroke="none" />
                    <path d="M4 17l5-5 4 4 3-3 4 4" />
                </svg>
            )
        case 'table':
            return (
                <svg {...common}>
                    <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
                    <line x1="3.5" y1="10" x2="20.5" y2="10" />
                    <line x1="3.5" y1="15" x2="20.5" y2="15" />
                    <line x1="10" y1="4.5" x2="10" y2="19.5" />
                </svg>
            )
        case 'hr':
            return (
                <svg {...common}>
                    <line x1="4" y1="12" x2="20" y2="12" />
                </svg>
            )
        case 'clear':
            return (
                <svg {...common}>
                    <path d="M17 4H9L3 12l6 8h8" />
                    <line x1="10" y1="8" x2="18" y2="16" />
                    <line x1="18" y1="8" x2="10" y2="16" />
                </svg>
            )
        case 'chevronDown':
            return (
                <svg {...common}>
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            )
        case 'trash':
            return (
                <svg {...common}>
                    <polyline points="4 7 20 7" />
                    <path d="M6 7l1-3h10l1 3" />
                    <path d="M7 7v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7" />
                </svg>
            )
        case 'addRow':
            return (
                <svg {...common}>
                    <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
                    <line x1="3.5" y1="14" x2="20.5" y2="14" />
                    <line x1="12" y1="10" x2="12" y2="18" />
                </svg>
            )
        case 'addCol':
            return (
                <svg {...common}>
                    <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
                    <line x1="13" y1="4.5" x2="13" y2="19.5" />
                    <line x1="17" y1="9" x2="17" y2="15" />
                    <line x1="14" y1="12" x2="20" y2="12" />
                </svg>
            )
        case 'delRow':
            return (
                <svg {...common}>
                    <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
                    <line x1="7" y1="12" x2="13" y2="12" />
                </svg>
            )
        case 'delCol':
            return (
                <svg {...common}>
                    <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
                    <line x1="12" y1="7" x2="12" y2="13" />
                </svg>
            )
        case 'merge':
            return (
                <svg {...common}>
                    <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
                    <line x1="12" y1="4.5" x2="12" y2="19.5" />
                </svg>
            )
        case 'palette':
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8.5" />
                    <circle cx="9" cy="9.5" r="1" fill="currentColor" stroke="none" />
                    <circle cx="12.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
                    <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
                    <circle cx="9.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                </svg>
            )
        case 'highlight':
            return (
                <svg {...common}>
                    <path d="M3 21l3.5-1 9-9-2.5-2.5-9 9L3 21Z" />
                    <path d="M13 6l2.5-2.5a1.8 1.8 0 0 1 2.5 0l1.5 1.5a1.8 1.8 0 0 1 0 2.5L17 10" />
                </svg>
            )
        case 'upload':
            return (
                <svg {...common}>
                    <path d="M12 16V4" />
                    <polyline points="7 9 12 4 17 9" />
                    <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
                </svg>
            )
        case 'close':
            return (
                <svg {...common}>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
            )
        case 'check':
            return (
                <svg {...common}>
                    <polyline points="5 13 9 17 19 7" />
                </svg>
            )
        default:
            return null
    }
}
