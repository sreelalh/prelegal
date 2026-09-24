# Prelegal Frontend - Mutual NDA Creator

A Next.js application that allows users to create, customize, preview, and download standard Mutual Non-Disclosure Agreements (MNDA) based on the [Common Paper Mutual NDA v1.0](https://commonpaper.com/standards/mutual-nda/1.0/) template.

## Features
- **Intuitive Form Interface**: Input party information, purpose of disclosure, durations, governing law, and custom modifications.
- **One-Click Sample Data**: Quick-fill button to preview a realistic scenario instantly.
- **Real-Time Live Preview**: Formatted legal agreement preview and raw markdown viewer.
- **Export Options**:
  - Download as Markdown (`.md`)
  - Download as Plain Text (`.txt`)
  - Print / Save as PDF (browser print stylesheet)
  - Copy formatted markdown to clipboard

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide React icons

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm start
```
