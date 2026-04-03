export const FILE_CONTENTS: Record<string, string> = {
  'resume.txt': `Dean Cimatu
Software Engineer
deancimatu@gmail.com  |  github.com/Dean-Cimatu  |  deancimatu.com
────────────────────────────────────────────────────────────────

ABOUT
─────
Passionate software engineer focused on building clean, interactive
web experiences. Specialising in React, TypeScript, and modern
front-end architecture. Currently building DeanOS as a portfolio
showcase — a full browser-based desktop OS experience.

EXPERIENCE
──────────
Software Engineer — Personal Projects                  2023 – Present
  • Built DeanOS: a browser-based desktop environment with boot
    sequence, window manager, terminal, file system, and tray widgets
  • Developed interactive web applications with a focus on component
    architecture, animation, and state management

Junior Frontend Developer — Freelance                  2022 – 2023
  • Delivered responsive web interfaces for small business clients
  • Worked with React, Tailwind CSS, and REST APIs
  • Maintained Git workflows with code reviews and CI pipelines

Web Development Intern                                 2021 – 2022
  • Built and maintained internal tooling with HTML, CSS, JavaScript
  • Assisted with frontend refactoring across legacy codebases

EDUCATION
─────────
BSc Computer Science                                   2018 – 2022

SKILLS
──────
Languages    TypeScript · JavaScript · HTML · CSS · Python
Frameworks   React · Tailwind CSS · Node.js · Vite · Framer Motion
State        Zustand · Redux · Context API
Tools        Git · GitHub · Vite · VS Code · Figma · AWS Amplify
Other        REST APIs · Responsive Design · Component Architecture`,

  'DeanOS.md': `# DeanOS

A browser-based desktop environment built as a personal portfolio project.
DeanOS simulates a full operating system experience — complete with a
cinematic boot sequence, login screen, window manager, and built-in apps.

## Tech Stack

- **React 18** + TypeScript
- **Tailwind CSS** + Framer Motion
- **Zustand** (global state)
- **Vite** (build tool)
- Deploy: AWS Amplify → deancimatu.com

## Features

- **Boot sequence** — 47-line POST scroll, animated logo, progress bar, Web Audio beep
- **Login screen** — password auth, shake animation, glassmorphism card
- **Window manager** — draggable, resizable, min/max/close with z-index management
- **System tray** — clock with calendar, battery, wifi, volume, notifications
- **Terminal** — 22 commands including \`neofetch\`, \`matrix\`, \`coffee\`
- **File manager** — virtual filesystem browser with grid/list views
- **Settings** — wallpaper picker, accent colour, system info
- **Start menu** — Linux Mint Cinnamon–style with search and categories
- **Toast system** — per-type colour accents, auto-dismiss, drain bar

## Architecture

Each app runs inside a \`Window\` component managed by \`windowStore\`.
State is split across dedicated Zustand stores: \`systemStore\`,
\`windowStore\`, \`settingsStore\`, and \`sessionStore\`.`,

  'StudyBuddy.md': `# StudyBuddy

An AI-powered study companion web app that helps you plan, track,
and stay motivated through any subject — from revision to deadlines.

## Overview

Tell StudyBuddy what you need to prepare for and it builds a
personalised task list for you. Say something like:

> "I have a test on data structures next week"

…and it generates 10–15 focused study tasks, each tagged with
a perceived difficulty and an XP reward. Complete tasks, earn XP,
and compete with others on the leaderboard.

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **AI**: Claude API (Anthropic) + OpenAI GPT API
- **Auth**: JWT + bcrypt

## Features

- **AI task generation** — describe a topic or deadline, get a
  structured study plan with 10–15 scoped tasks
- **Gamification** — each task has a perceived difficulty score;
  complete it to earn XP. Track your level and rank
- **Leaderboard** — global board showing top users by XP
- **Video digest** — upload a lecture or tutorial video; AI
  generates structured notes from the content
- **Calendar view** — tasks laid out across days and times,
  giving a full schedule overview
- **Completed tasks** — full history with XP earned per task
- **Wellbeing hub** — curated links for mental health, focus
  techniques, and study resources

## Status

In active development. Not yet deployed.`,

  'coming_soon.txt': `coming soon`,

  'DesignPatternCLI.md': `# DesignPatternCLI

A Java CLI application demonstrating 6 Gang of Four design patterns
with interactive, runnable examples straight from the terminal.

## Overview

Run the program, pick a pattern from the menu, and see a working
Java implementation execute in real time — with clear console output
explaining each step.

\`\`\`bash
mvn compile exec:java
\`\`\`

## Tech Stack

- **Language**: Java
- **Build**: Maven

## Patterns Covered

**Creational**
- Singleton — single shared config instance
- Factory Method — shape factory with runtime type selection

**Structural**
- Decorator — runtime behaviour layering (e.g. logging wrappers)
- Adapter — legacy interface compatibility bridge

**Behavioural**
- Observer — event/listener pub-sub system
- Strategy — swappable sorting algorithm selection

## Status

Complete. All 6 patterns implemented and runnable.`,
}
