#!/usr/bin/env bash
# همه‌ی تست‌های مرورگری کارگاه ریف رو اجرا می‌کنه.
# پیش‌نیاز یک بار: cd riff-workshop/tools/tests && npm install && npx playwright install chromium
# اجرا از هر جا: bash riff-workshop/tools/tests/run.sh   (یا فقط یکی: bash run.sh scales)
set -u
DIR="$(cd "$(dirname "$0")" && pwd)"; APP="$(cd "$DIR/../.." && pwd)"
PORT="${PORT:-8765}"; export BASE="http://localhost:$PORT/"
python3 -m http.server "$PORT" -d "$APP" >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT
for i in $(seq 1 30); do curl -s -o /dev/null "$BASE" && break; sleep 0.2; done
[ -d "$DIR/node_modules" ] || export NODE_PATH="${NODE_PATH:-$(npm root -g)}"
ok=0; bad=0
for t in "$DIR"/*.test.js; do
  name="$(basename "$t" .test.js)"; [ $# -gt 0 ] && [[ " $* " != *" $name "* ]] && continue
  printf '%-14s ' "$name"
  if out="$(cd "$DIR" && timeout 300 node "$t" 2>&1)"; then echo "PASS"; ok=$((ok+1)); else echo "FAIL"; echo "$out" | grep -E "FAIL:|Error|error" | head -8 | sed 's/^/    /'; bad=$((bad+1)); fi
done
echo "---"; echo "$ok passed, $bad failed"; [ "$bad" -eq 0 ]
