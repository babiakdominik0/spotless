#!/usr/bin/env bash
# Generate PDF from reports/spotless-vysledky-report.html (Spotless dark theme)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Usage: generate-report-pdf.sh [vysledky|plan]
DOC="${1:-vysledky}"
case "$DOC" in
  plan)
    HTML="$ROOT/reports/spotless-plan-polrok.html"
    OUT="$ROOT/reports/Spotless-plan-polrok.pdf"
    ;;
  vysledky|*)
    HTML="$ROOT/reports/spotless-vysledky-report.html"
    OUT="$ROOT/reports/Spotless-vysledky-od-spustenia.pdf"
    ;;
esac

if [[ ! -f "$HTML" ]]; then
  echo "Missing: $HTML" >&2
  exit 1
fi

CHROME=""
for candidate in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium"; do
  if [[ -x "$candidate" ]]; then
    CHROME="$candidate"
    break
  fi
done

if [[ -z "$CHROME" ]]; then
  echo "Chrome/Chromium not found. Open manually and Print → Save as PDF:" >&2
  echo "  file://$HTML" >&2
  exit 1
fi

FILE_URL="file://${HTML}"

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$OUT" \
  "$FILE_URL"

echo "PDF written: $OUT"
