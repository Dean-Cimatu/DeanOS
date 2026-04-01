import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const skillGroups = [
    { title: 'Languages', skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Bash'] },
    { title: 'Frameworks', skills: ['React', 'Next.js', 'Express.js', 'ASP.NET', 'Tailwind CSS'] },
    { title: 'Tools', skills: ['Git','Azure', 'MongoDB', 'PostgreSQL', 'Zustand'] },
    { title: 'Concepts', skills: ['OOP', 'Design Patterns', 'REST APIs', 'Data Structures', 'CI/CD'] },
];
const s = {
    page: {
        maxWidth: '640px',
        margin: '0 auto',
        padding: '40px 32px',
        fontFamily: '"JetBrains Mono", monospace',
        color: '#E8F4F8',
    },
    intro: {
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        alignItems: 'flex-start',
    },
    avatar: {
        flexShrink: 0,
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#1E2D45',
        border: '2px solid #00D4FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: '20px',
        fontWeight: 700,
        color: '#00D4FF',
    },
    name: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#E8F4F8',
        margin: 0,
    },
    role: {
        fontSize: '15px',
        color: '#00D4FF',
        marginTop: '4px',
    },
    location: {
        fontSize: '13px',
        color: '#8899AA',
        marginTop: '4px',
    },
    bio: {
        fontSize: '13px',
        color: '#8899AA',
        marginTop: '12px',
        lineHeight: 1.7,
    },
    section: {
        marginTop: '40px',
    },
    sectionHeading: {
        fontSize: '16px',
        fontWeight: 700,
        color: '#E8F4F8',
        borderBottom: '1px solid #2A3F5F',
        paddingBottom: '8px',
        marginBottom: '16px',
        margin: '0 0 16px 0',
    },
    skillGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
    },
    skillCard: {
        backgroundColor: '#1E2D45',
        borderRadius: '8px',
        padding: '14px',
        border: '1px solid #2A3F5F',
    },
    skillCardTitle: {
        fontSize: '12px',
        fontWeight: 700,
        color: '#00D4FF',
        marginBottom: '10px',
    },
    skillBadgeRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
    },
    skillBadge: {
        backgroundColor: '#0A0F1E',
        color: '#E8F4F8',
        fontSize: '11px',
        padding: '3px 8px',
        borderRadius: '4px',
        fontFamily: '"JetBrains Mono", monospace',
    },
    educationCard: {
        borderLeft: '2px solid #00D4FF',
        paddingLeft: '16px',
        backgroundColor: '#1E2D45',
        borderRadius: '0 8px 8px 0',
        padding: '14px 14px 14px 16px',
    },
    edName: {
        fontWeight: 700,
        color: '#E8F4F8',
        fontSize: '14px',
    },
    edDegree: {
        fontSize: '13px',
        color: '#00D4FF',
        marginTop: '4px',
    },
    edDates: {
        fontSize: '12px',
        color: '#8899AA',
        marginTop: '4px',
    },
    tagRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    tag: {
        backgroundColor: '#1E2D45',
        border: '1px solid #2A3F5F',
        color: '#E8F4F8',
        fontSize: '13px',
        padding: '6px 16px',
        borderRadius: '999px',
    },
};
export const AboutPage = () => (_jsxs("div", { style: s.page, children: [_jsxs("div", { style: s.intro, children: [_jsx("div", { style: s.avatar, children: _jsx("span", { style: s.avatarText, children: "DC" }) }), _jsxs("div", { children: [_jsx("h1", { style: s.name, children: "Dean Cimatu" }), _jsx("p", { style: s.role, children: "Software Engineering Student" }), _jsx("p", { style: s.location, children: "Hampton Hill, London" }), _jsx("p", { style: s.bio, children: "I'm a second-year BSc Computer Science student at Middlesex University London, building real software between lectures. Founder of the CS Academic Society and contributor to Formula Student AI." })] })] }), _jsxs("div", { style: s.section, children: [_jsx("h2", { style: s.sectionHeading, children: "Skills" }), _jsx("div", { style: s.skillGrid, children: skillGroups.map(({ title, skills }) => (_jsxs("div", { style: s.skillCard, children: [_jsx("p", { style: s.skillCardTitle, children: title }), _jsx("div", { style: s.skillBadgeRow, children: skills.map(skill => (_jsx("span", { style: s.skillBadge, children: skill }, skill))) })] }, title))) })] }), _jsxs("div", { style: s.section, children: [_jsx("h2", { style: s.sectionHeading, children: "Education" }), _jsxs("div", { style: s.educationCard, children: [_jsx("p", { style: s.edName, children: "Middlesex University London" }), _jsx("p", { style: s.edDegree, children: "BSc Computer Science" }), _jsx("p", { style: s.edDates, children: "Jan 2025 \u2013 Jul 2027 \u00B7 Expected 2:1" })] })] }), _jsxs("div", { style: s.section, children: [_jsx("h2", { style: s.sectionHeading, children: "Beyond Code" }), _jsx("div", { style: s.tagRow, children: ['Formula Student', 'CS Academic Society', 'AI & Machine Learning'].map(label => (_jsx("span", { style: s.tag, children: label }, label))) })] })] }));
