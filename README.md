# Pipa entre vecinos / Week 11

Business Bending working slice: fictional shared pipa order, exact-cent contributions, calibrated delivery estimate, browser-local audit history and synthetic-data ML consumption advice. UI in Spanish; no personal data, real orders or payments.

## Run

```sh
python3 -m http.server 8111 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:8111. Use a server because ES modules and offline caching do not work reliably under file://.

## Test

```sh
node --test tests/core.test.mjs
```

No dependencies or build step. Sources in dist/; packet, benchmark links, implementation prompt and test log in docs/. The image-generated packet mockup is a design reference, not an application screenshot.

## Publication

Owner-private Sites publication authorized by Rodrigo in chat. Source repo is the native Sites repository, not GitHub. `gh auth status` reports invalid GitHub authentication; no GitHub link is claimed. Hosting metadata is retained privately and excluded from this public source export.

## Privacy

Only fixed fictional apartment/provider labels, structured numeric fields and fixed methods. localStorage remains on the device. It is not encryption or access control: anyone using this browser profile can inspect the local demonstration. Explicit copy/print includes only order aggregates. No database or application telemetry. The hosting provider can see technical page requests. A real multi-user/personal-data version requires a different authenticated storage design.
