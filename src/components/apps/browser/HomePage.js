import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
const FULL_HEADING = "Hi, I'm Dean Cimatu.";
const TICKER_TEXT = 'DeanOS v2.0  ·  BSc CS @ Middlesex University  ·  Formula Student AI  ·  deancimatu.com  ·  ';
const cards = [
    {
        icon: '',
        title: 'About Me',
        desc: 'Background, skills & what drives me',
        path: '/about',
    },
    {
        icon: '',
        title: 'My Projects',
        desc: "Things I've built and shipped",
        path: '/projects',
    },
    {
        icon: '',
        title: 'View CV',
        desc: 'Education, experience & skills',
        path: '/cv',
    },
];
export const HomePage = ({ onNavigate }) => {
    const [displayed, setDisplayed] = useState('');
    const [typingDone, setTypingDone] = useState(false);
    const [showSubtitle, setShowSubtitle] = useState(false);
    const intervalRef = useRef(null);
    useEffect(() => {
        let index = 0;
        const charInterval = 1200 / FULL_HEADING.length;
        intervalRef.current = setInterval(() => {
            index += 1;
            setDisplayed(FULL_HEADING.slice(0, index));
            if (index >= FULL_HEADING.length) {
                clearInterval(intervalRef.current);
                setTypingDone(true);
            }
        }, charInterval);
        return () => {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
        };
    }, []);
    useEffect(() => {
        if (!typingDone)
            return;
        const t1 = setTimeout(() => setShowSubtitle(true), 400);
        return () => {
            clearTimeout(t1);
        };
    }, [typingDone]);
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            backgroundColor: '#121929',
        }, children: [_jsx("div", { style: { flex: 1 }, children: _jsxs("div", { style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: '80px',
                        paddingBottom: '40px',
                        textAlign: 'center',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                    }, children: [_jsxs("h1", { style: {
                                color: '#FFFFFF',
                                fontSize: '3rem',
                                fontWeight: 700,
                                fontFamily: 'Inter, sans-serif',
                                lineHeight: 1.15,
                                minHeight: '1.2em',
                            }, children: [displayed, _jsx("span", { style: {
                                        display: 'inline-block',
                                        width: '2px',
                                        height: '0.9em',
                                        backgroundColor: '#00D4FF',
                                        marginLeft: '2px',
                                        verticalAlign: 'middle',
                                        animation: typingDone ? 'blink 1s step-end infinite' : 'none',
                                        opacity: typingDone ? undefined : 1,
                                    } })] }), _jsx("p", { style: {
                                color: '#8899AA',
                                fontSize: '1.25rem',
                                fontFamily: 'Inter, sans-serif',
                                marginTop: '16px',
                                opacity: showSubtitle ? 1 : 0,
                                transform: showSubtitle ? 'translateY(0)' : 'translateY(6px)',
                                transition: 'opacity 0.35s ease, transform 0.35s ease',
                            }, children: "CS Student \u00B7 Software Developer \u00B7 Builder of things" }), _jsx("div", { style: {
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '16px',
                                marginTop: '64px',
                                maxWidth: '672px',
                                width: '100%',
                                justifyContent: 'center',
                            }, children: cards.map((card) => (_jsx(CtaCard, { ...card, onNavigate: onNavigate }, card.path))) })] }) }), _jsx("div", { style: {
                    position: 'sticky',
                    bottom: 0,
                    height: '32px',
                    backgroundColor: '#0A0F1E',
                    borderTop: '1px solid #2A3F5F',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                }, children: _jsx("div", { style: {
                        display: 'flex',
                        whiteSpace: 'nowrap',
                        animation: 'ticker 30s linear infinite',
                    }, children: [0, 1, 2].map((i) => (_jsx("span", { style: {
                            color: '#8899AA',
                            fontSize: '0.75rem',
                            fontFamily: '"JetBrains Mono", monospace',
                            paddingRight: '0',
                        }, children: TICKER_TEXT }, i))) }) }), _jsx("style", { children: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      ` })] }));
};
function CtaCard({ icon, title, desc, path, onNavigate }) {
    const ref = useRef(null);
    const handleMouseEnter = () => {
        if (!ref.current)
            return;
        ref.current.style.transform = 'translateY(-4px)';
        ref.current.style.borderColor = '#00D4FF';
        ref.current.style.boxShadow = '0 8px 24px rgba(0,212,255,0.12)';
    };
    const handleMouseLeave = () => {
        if (!ref.current)
            return;
        ref.current.style.transform = 'translateY(0)';
        ref.current.style.borderColor = '#2A3F5F';
        ref.current.style.boxShadow = 'none';
    };
    return (_jsxs("div", { ref: ref, onClick: () => onNavigate(path), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, style: {
            flex: 1,
            backgroundColor: '#1E2D45',
            border: '1px solid #2A3F5F',
            borderRadius: '12px',
            padding: '24px',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
            textAlign: 'center',
        }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '12px' }, children: icon }), _jsx("div", { style: {
                    color: '#E0E8F0',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem',
                    marginBottom: '6px',
                }, children: title }), _jsx("div", { style: {
                    color: '#8899AA',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    lineHeight: 1.4,
                }, children: desc })] }));
}
