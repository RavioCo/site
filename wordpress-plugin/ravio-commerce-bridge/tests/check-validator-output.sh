#!/usr/bin/env bash
# Verifies the OUTPUT of `php tests/validator-test.php`, not just its exit code, so CI cannot pass when:
#   - any test printed FAIL, or the count of PASS lines != the number of t(...) cases declared in the test file
#   - the test file has been gutted (fewer than MIN_TESTS cases; default 30)
#   - PHP emitted warnings/notices/deprecations/fatal errors
#   - the final "ALL PASSED" line is missing
# Usage: bash tests/check-validator-output.sh <output-file> <test-source-file>
set -euo pipefail
out="${1:?output file}"; src="${2:?test source file}"; min="${MIN_TESTS:-30}"

declared=$(grep -c '^t(' "$src" || true)
pass=$(grep -c '^PASS ' "$out" || true)
fail=$(grep -c '^FAIL ' "$out" || true)
noise=$(grep -Ec '(^|[^A-Za-z])(PHP )?(Warning|Notice|Deprecated|Fatal error|Parse error)\b' "$out" || true)
rc=0
echo "declared=$declared pass=$pass fail=$fail php_noise_lines=$noise min=$min"
[ "$declared" -ge "$min" ]   || { echo "ERROR: only $declared test cases declared; expected at least $min"; rc=1; }
[ "$fail" -eq 0 ]            || { echo "ERROR: $fail test(s) FAILED"; rc=1; }
[ "$pass" -eq "$declared" ]  || { echo "ERROR: $pass PASS lines but $declared cases declared (a test did not run)"; rc=1; }
[ "$noise" -eq 0 ]           || { echo "ERROR: PHP emitted warnings/notices/errors:"; grep -En '(^|[^A-Za-z])(PHP )?(Warning|Notice|Deprecated|Fatal error|Parse error)\b' "$out" | head -5; rc=1; }
grep -q '^ALL PASSED$' "$out" || { echo "ERROR: 'ALL PASSED' line missing"; rc=1; }
[ "$rc" -eq 0 ] && echo "OK: $pass/$declared validator tests passed, no PHP warnings"
exit "$rc"
