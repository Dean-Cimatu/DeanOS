import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
const LINKS = [
    { icon: 'X', label: 'Email', value: 'deancimatu@example.com', href: 'mailto:deancimatu@example.com' },
    { icon: 'X', label: 'GitHub', value: 'github.com/deancimatu', href: 'https://github.com/deancimatu' },
    { icon: 'X', label: 'LinkedIn', value: 'linkedin.com/in/deancimatu', href: 'https://linkedin.com/in/deancimatu' },
];
function ContactRow({ link }) {
    const ref = useRef(null);
    return (_jsxs("a", { ref: ref, href: link.href, target: link.href.startsWith('mailto') ? undefined : '_blank', rel: "noopener noreferrer", style: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: '#1E2D45',
            border: '1px solid #2A3F5F',
            borderRadius: '12px',
            padding: '16px 24px',
            marginBottom: '12px',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'border-color 0.15s',
        }, onMouseEnter: e => (e.currentTarget.style.borderColor = '#00D4FF'), onMouseLeave: e => (e.currentTarget.style.borderColor = '#2A3F5F'), children: [_jsx("span", { style: { fontSize: '1.5rem' }, children: link.icon }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: '0.75rem', color: '#8899AA', marginBottom: '2px', fontFamily: 'Inter, sans-serif' }, children: link.label }), _jsx("div", { style: { fontSize: '0.9rem', color: '#00D4FF', fontFamily: '"JetBrains Mono", monospace' }, children: link.value })] })] }));
}
export const ContactPage = () => (_jsxs("div", { style: {
        maxWidth: '448px',
        margin: '0 auto',
        padding: '64px 32px',
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
    }, children: [_jsx("h1", { style: { fontSize: '1.875rem', fontWeight: 700, color: '#E8F4F8', margin: 0 }, children: "Get In Touch" }), _jsx("p", { style: { color: '#8899AA', marginTop: '8px', marginBottom: '40px', fontSize: '0.9rem', lineHeight: 1.6 }, children: "I'm open to placement opportunities, collaborations, and interesting conversations." }), _jsx("div", { style: { textAlign: 'left' }, children: LINKS.map(link => (_jsx(ContactRow, { link: link }, link.label))) }), _jsx("p", { style: { color: '#8899AA', fontSize: '0.75rem', marginTop: '24px' }, children: "Response time: usually within 24 hours \uD83D\uDD50" })] }));
