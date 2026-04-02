export const FILE_CONTENTS: Record<string, string> = {
  'resume.txt': `Dean Cimatu
Software Engineer
dean@deancimatu.com  |  github.com/Dean-Cimatu  |  deancimatu.com
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

An AI-powered study assistant that helps students organise their notes,
generate flashcards, and quiz themselves on any subject.

## Overview

StudyBuddy takes uploaded notes or pasted text and uses AI to extract
key concepts, generate Q&A pairs, and produce spaced-repetition
flashcard decks ready for review.

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **AI**: OpenAI GPT-4 API for concept extraction and Q&A generation
- **Database**: PostgreSQL (notes, decks, progress)
- **Auth**: JWT + bcrypt

## Features

- Upload PDFs, images (OCR), or paste plain text
- Auto-generate flashcard decks from any content
- Spaced repetition review algorithm (SM-2)
- Progress tracking with streaks and statistics
- Shareable deck links for study groups
- Dark/light mode, mobile-friendly

## Status

In active development. Core flashcard engine complete.
AI summarisation and quiz modes in progress.`,

  'DesignPatternCLI.md': `# DesignPatternCLI

A command-line tool that generates boilerplate code for common
software design patterns in multiple programming languages.

## Overview

Instead of looking up syntax every time, \`dpgen\` scaffolds complete,
runnable examples of any GoF or common architectural pattern with
a single command.

\`\`\`bash
dpgen generate observer --lang typescript --output ./src
dpgen list patterns --category behavioural
dpgen explain singleton
\`\`\`

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **CLI**: Commander.js
- **Templates**: Handlebars
- **Testing**: Vitest

## Supported Patterns

**Creational**: Singleton, Factory, Abstract Factory, Builder, Prototype

**Structural**: Adapter, Bridge, Composite, Decorator, Facade, Proxy

**Behavioural**: Observer, Strategy, Command, Iterator, State, Template Method

## Languages

TypeScript · JavaScript · Python · Java · Go

## Status

Released on npm as \`design-pattern-cli\`.
Core patterns complete across TypeScript, JavaScript, and Python.`,
}
