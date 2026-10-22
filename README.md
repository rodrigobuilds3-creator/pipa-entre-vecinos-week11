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

Public demonstration authorized by Rodrigo for professor review on 21 October 2026: https://pipa-entre-vecinos-week11.j6x567qt8g.chatgpt.site. The public source repository is https://github.com/rodrigobuilds3-creator/pipa-entre-vecinos-week11. Native Sites hosting metadata and private academic audit records are excluded from the public source export. The development history preserves packet-before-code and the observed bug fixes.

## Privacy

Only fixed fictional apartment/provider labels, structured numeric fields and fixed methods. localStorage remains on the device. It is not encryption or access control: anyone using this browser profile can inspect the local demonstration. Explicit copy/print includes only order aggregates. No database or application telemetry. The hosting provider can see technical page requests. A real multi-user/personal-data version requires a different authenticated storage design.
