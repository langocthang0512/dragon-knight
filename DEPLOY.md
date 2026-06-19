# Deploy

Dragon Knight is a Vite static build. The production artifact is generated in `dist`.

## Local Release Check

```bash
npm install
npm run build
npm run preview
```

## GitHub

This repository currently has no remote configured. Add a GitHub remote before pushing:

```bash
git remote add origin <github-repository-url>
git push -u origin master
```

## Vercel

Recommended project settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The included `vercel.json` sets the build command and output directory.

Deploy with the Vercel dashboard by importing the GitHub repository, or with the Vercel CLI after logging in:

```bash
vercel
vercel --prod
```
