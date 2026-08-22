# Face scan

A live-camera website that estimates 32 facial measurements in millimeters and
degrees. The camera feed, face-landmark detection, calibration, and measurement
calculations all run in the browser.

## Run locally

Clone the repository, then run:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000), allow camera access, and
hold a credit card—or another object with a known length—next to your face. Tap
both ends of the object to establish scale, then capture the left, front, and
right views.

## Visual architecture guide

Open
[http://localhost:3000/how-it-works](http://localhost:3000/how-it-works) for a
graphic, plain-language walkthrough of how a camera frame becomes a set of
measurements. It covers:

- the live video and canvas layers;
- MediaPipe face-landmark detection;
- reference-object calibration;
- the left, front, and right pose merge;
- measurement geometry and CSV export;
- privacy boundaries and accuracy limitations.

The guide keeps the technical vocabulary and connects each step to the relevant
source files.

## How the scanner is organized

```text
src/app/page.tsx
└── FaceScanClient
    ├── ScanIntro / ScanError
    └── FaceScanWorkspace
        ├── ScannerStage      video + canvas overlay
        ├── ScaleControls     known-object calibration
        ├── QualityMeter      pose and framing feedback
        └── MeasurementPanel  live and saved results

useFaceScanSession()
└── camera → face model → landmarks → scale → measurements → pose merge
```

The MediaPipe runtime and face model are downloaded from external CDNs when a
scan starts, but video frames and derived measurements are not uploaded by this
application. Results remain in browser memory unless the user explicitly copies
them or downloads the CSV.

## Verify

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
