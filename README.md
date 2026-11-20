# HiddenHire — Diätetik pilot

Job-search assistant for German-speaking Diätassistent:innen with **live Softgarden/hospital openings**, mock hidden-market posts, curated Kununu snapshots, and a CV Builder.

## Run

```bash
npm install
npm run dev
```

Optional:

```bash
export ANTHROPIC_API_KEY=…   # /api/generate (else mock templates)
export RAPIDAPI_KEY=…        # /api/reviews (else curated snapshots)
```

## Stack

Vite · React · TypeScript · Tailwind · react-router-dom · mammoth · jspdf · html2canvas · pdfjs-dist
