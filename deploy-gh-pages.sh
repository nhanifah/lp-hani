#!/bin/sh
# Deploy Next.js static export to GitHub Pages
echo "Building Next.js app (static export)..."
next build

echo "Pushing 'out' directory to gh-pages branch..."
git add out && git commit -m "Export static site" || true
git subtree push --prefix out origin gh-pages

echo "Deployed to GitHub Pages!"
