import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Cpu,
  Crosshair,
  Ruler,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import styles from "./how-it-works.module.css";

export const metadata: Metadata = {
  title: "How Face Scan works",
  description:
    "A visual, plain-language architecture guide to the browser-based face measurement tool.",
};

const FLOW = [
  {
    icon: Camera,
    title: "Camera frame",
    meta: "Browser video · live",
    body: "The browser supplies a stream of images. The app reads the current frame; it does not first make a photo file.",
  },
  {
    icon: Cpu,
    title: "Face model",
    meta: "MediaPipe · GPU or CPU",
    body: "A downloaded model finds one face and returns a mesh of up to 478 three-dimensional landmark coordinates.",
  },
  {
    icon: Crosshair,
    title: "Useful markers",
    meta: "Mesh → named points",
    body: "The app selects points for eyes, brows, nose, mouth, jaw, ears and the top of the forehead.",
  },
  {
    icon: Ruler,
    title: "Measurements",
    meta: "Geometry · mm and degrees",
    body: "Distances become millimeters using the card scale. Angles and forehead curvature use their own formulas.",
  },
] as const;

const STEPS = [
  {
    title: "Next.js delivers the page; the browser runs the scan",
    path: "src/app/page.tsx → FaceScanClient",
    body: "The route itself is intentionally small. It places the scanner on the page, then a React client component takes over because camera access, animation frames and canvas drawing only exist inside the visitor’s browser. There is no scan API route or database in this repository.",
  },
  {
    title: "One session controller keeps the experience in sequence",
    path: "use-face-scan-session.ts",
    body: "A React hook is the control room. It stores the current phase—intro, loading, scale, scanning, review or error—and owns the video, overlay, selected measurement, ruler points and the three saved poses. Buttons do not calculate independently; they ask this controller to change the session.",
  },
  {
    title: "Every visible frame can produce a new face mesh",
    path: "load-face-landmarker.ts + detect-face.ts",
    body: "When the user starts, the browser opens the front camera and loads Google MediaPipe’s Face Landmarker. It tries the graphics processor first and falls back to the main processor. On each animation frame the model returns normalized x, y and z coordinates for one face. The canvas redraws every frame; the text values refresh every 200 ms so the interface stays readable.",
  },
  {
    title: "The full mesh is translated into the project’s vocabulary",
    path: "extract-markers.ts + landmark-index.ts",
    body: "The model knows points by number. The repository maps selected numbers to names such as leftEyeOuter, chin and rightNostril. Those named points are easier to use in measurement definitions and easier to highlight when someone selects a row. Users can drag a marker if the automated placement is visibly off.",
  },
  {
    title: "Calibration and geometry create the final values",
    path: "object-scale.ts + compute-measurement.ts",
    body: "Two taps mark the ends of an object with a known real length. Their on-screen distance creates a millimeters-per-unit scale. The app multiplies 3D landmark distances by that scale, while jaw and forehead angles are calculated directly in degrees. After left, front and right are saved, the correct values from each view are merged into one 32-item result.",
  },
  {
    title: "The result remains ordinary browser data",
    path: "measurements-to-text.ts + measurements-to-csv.ts",
    body: "The final array is rendered as rows in the side panel. Copy turns it into plain text; export turns it into a CSV file and asks the browser to download it. Restarting clears the in-memory session. This code does not persist a scan after the tab is closed.",
  },
] as const;

const GLOSSARY = [
  {
    term: "Client component",
    definition:
      "React code that runs in the visitor’s browser, where it can use the camera and canvas.",
  },
  {
    term: "Landmark",
    definition:
      "One coordinate on the face mesh, identified by a stable numeric index.",
  },
  {
    term: "Normalized coordinate",
    definition:
      "A position expressed relative to the video frame rather than in pixels or millimeters.",
  },
  {
    term: "Canvas",
    definition:
      "A transparent drawing layer placed over the video for dots, labels and lines.",
  },
  {
    term: "Reference scale",
    definition:
      "The ratio that converts model units into millimeters using a known object.",
  },
  {
    term: "State",
    definition:
      "The current session facts React remembers, such as pose, phase and saved values.",
  },
] as const;

const POSES = [
  {
    name: "Left",
    count: "5 values",
    body: "The depth difference between ear points helps the app judge whether the left profile is turned toward the camera. This view supplies left ear, jaw and profile distances.",
    view: "profile" as const,
  },
  {
    name: "Front",
    count: "22 values",
    body: "A small depth difference between the two ear points is treated as front-facing. This view supplies eye, brow, nose, lip, chin and forehead measurements.",
    view: "front" as const,
  },
  {
    name: "Right",
    count: "5 values",
    body: "The same depth test is reversed. The right profile supplies the corresponding ear, jaw and side distances.",
    view: "profile" as const,
  },
] as const;

export default function HowItWorksPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <nav className={styles.topbar} aria-label="Explainer navigation">
          <Link className={styles.brand} href="/">
            <span className={styles.brandMark} aria-hidden="true">
              ○
            </span>
            <span>face-scan / architecture note</span>
          </Link>
          <Link className={styles.backLink} href="/">
            <ArrowLeft aria-hidden="true" size={14} />
            Open the scanner
          </Link>
        </nav>

        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>A visual guide to the repository</p>
            <h1 className={styles.heroTitle}>
              From a camera frame to 32 face measurements.
            </h1>
            <p className={styles.lead}>
              This project is a <strong>browser-based measuring tool</strong>.
              It combines a live video element, a face-landmark model, a
              transparent drawing canvas and a set of geometry functions.
            </p>
            <div className={styles.summary}>
              <span className={styles.summaryLabel}>In one sentence</span>
              <p>
                The model says where facial points are, the reference card says
                how large those coordinates are in the real world, and the
                repository’s own formulas decide what to measure between them.
              </p>
            </div>
          </div>

          <div className={styles.visual} aria-label="Face landmark diagram">
            <div className={styles.visualFrame}>
              <div className={styles.visualHeader}>
                <span className={styles.liveDot} />
                frame + canvas overlay
              </div>
              <svg
                className={styles.faceDiagram}
                viewBox="0 0 380 430"
                role="img"
                aria-label="Simplified face mesh showing selected eye landmarks"
              >
                <path
                  className={styles.faceOutline}
                  d="M190 28c-70 0-118 53-116 143 2 105 47 210 116 226 69-16 114-121 116-226C308 81 260 28 190 28Z"
                />
                <path
                  className={styles.guide}
                  d="M190 42v337M96 177c56-21 132-21 188 0M116 278c43 22 105 22 148 0"
                />
                <path
                  className={styles.meshLine}
                  d="M106 141 145 120 190 112 235 120 274 141M106 141l20 50 64-79 64 79 20-50M126 191l64 31 64-31M190 112v110l-31 38 31 15 31-15-31-38M159 260l-34 36 65 14 65-14-34-36M125 296l38 60h54l38-60M145 120l14 140M235 120l-14 140"
                />
                <path
                  className={styles.meshLine}
                  d="M117 188c22-18 48-17 66 0-18 17-44 17-66 0ZM197 188c18-17 44-18 66 0-22 17-48 17-66 0ZM154 299c22-13 50-13 72 0-21 22-51 22-72 0Z"
                />
                {[
                  [106, 141],
                  [145, 120],
                  [190, 112],
                  [235, 120],
                  [274, 141],
                  [126, 191],
                  [190, 222],
                  [254, 191],
                  [159, 260],
                  [190, 275],
                  [221, 260],
                  [125, 296],
                  [154, 299],
                  [190, 310],
                  [226, 299],
                  [255, 296],
                  [163, 356],
                  [217, 356],
                  [190, 379],
                ].map(([cx, cy]) => (
                  <circle
                    key={`${cx}-${cy}`}
                    className={styles.meshDot}
                    cx={cx}
                    cy={cy}
                    r="2.5"
                  />
                ))}
                <line
                  className={styles.measureLine}
                  x1="117"
                  x2="183"
                  y1="188"
                  y2="188"
                />
                <circle
                  className={styles.selectedDot}
                  cx="117"
                  cy="188"
                  r="6"
                />
                <circle
                  className={styles.selectedDot}
                  cx="183"
                  cy="188"
                  r="6"
                />
                <text className={styles.diagramText} x="105" y="174">
                  eye outer
                </text>
                <text className={styles.diagramText} x="165" y="174">
                  eye inner
                </text>
              </svg>
              <span className={styles.caption}>
                representative diagram · not the full mesh
              </span>
            </div>
            <div className={styles.cardScale} aria-label="Reference card scale">
              <span className={styles.scaleLine} />
              <span className={styles.cardText}>A — 85.6 mm — B</span>
            </div>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="pipeline-title">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>01</span>
            <div>
              <p className={styles.sectionKicker}>The data pipeline</p>
              <h2 className={styles.sectionTitle} id="pipeline-title">
                Four translations, with no “AI magic” step.
              </h2>
              <p className={styles.sectionIntro}>
                Each stage changes the form of the information. The model is
                responsible for locating points—not for inventing the final
                measurements or interpreting a person’s face.
              </p>
            </div>
          </div>
          <div className={styles.flow}>
            {FLOW.map(({ icon: Icon, title, meta, body }) => (
              <article className={styles.flowCard} key={title}>
                <span className={styles.flowIcon}>
                  <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
                </span>
                <h3 className={styles.flowTitle}>{title}</h3>
                <p className={styles.flowMeta}>{meta}</p>
                <p className={styles.flowBody}>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="walkthrough-title">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>02</span>
            <div>
              <p className={styles.sectionKicker}>Call-stack walkthrough</p>
              <h2 className={styles.sectionTitle} id="walkthrough-title">
                What the code does, in the order a visitor experiences it.
              </h2>
              <p className={styles.sectionIntro}>
                File names are included so the explanation still maps to the
                real repository. Think of them as labels on the back of the
                design, not as prerequisites.
              </p>
            </div>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.walkthrough}>
              {STEPS.map((step, index) => (
                <article className={styles.walkStep} key={step.title}>
                  <span className={styles.stepNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepBody}>{step.body}</p>
                    <span className={styles.stepNote}>{step.path}</span>
                  </div>
                </article>
              ))}
            </div>

            <aside className={styles.aside}>
              <h3 className={styles.asideTitle}>Working vocabulary</h3>
              <dl className={styles.glossary}>
                {GLOSSARY.map((item) => (
                  <div key={item.term}>
                    <dt>{item.term}</dt>
                    <dd>{item.definition}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="poses-title">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>03</span>
            <div>
              <p className={styles.sectionKicker}>Why three views</p>
              <h2 className={styles.sectionTitle} id="poses-title">
                Each angle contributes the measurements it shows best.
              </h2>
              <p className={styles.sectionIntro}>
                A quality score combines face size with pose fit. It guides the
                visitor, but any detected pose can still be saved—the score is
                not a hard scientific validation gate.
              </p>
            </div>
          </div>

          <div className={styles.poseGrid}>
            {POSES.map((pose) => (
              <article className={styles.poseCard} key={pose.name}>
                <div className={styles.poseTop}>
                  <h3 className={styles.poseName}>{pose.name}</h3>
                  <span className={styles.poseCount}>{pose.count}</span>
                </div>
                <div className={styles.poseGraphic}>
                  <PoseFigure view={pose.view} />
                </div>
                <p className={styles.poseText}>{pose.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="scale-title">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>04</span>
            <div>
              <p className={styles.sectionKicker}>Pixels are not millimeters</p>
              <h2 className={styles.sectionTitle} id="scale-title">
                The reference object supplies the missing physical scale.
              </h2>
              <p className={styles.sectionIntro}>
                Face Landmarker reports relative coordinates. The two points on
                the card connect that coordinate system to a real-world length.
              </p>
            </div>
          </div>

          <div className={styles.formula}>
            <div className={styles.formulaCard}>
              <div>
                <p className={styles.equation}>
                  mm per unit ={" "}
                  <span className={styles.fraction}>
                    <span>known card length</span>
                    <span>distance from A to B</span>
                  </span>
                </p>
                <p className={styles.equationCaption}>
                  Default known length: 85.6 mm, the long edge of an ISO ID-1
                  card
                </p>
              </div>
            </div>
            <div className={styles.explainCard}>
              <h3 className={styles.explainTitle}>Then, for a face distance</h3>
              <div className={styles.explainList}>
                <p className={styles.explainItem}>
                  <span className={styles.explainBullet}>01</span>
                  Find the 3D distance between the named landmark coordinates.
                </p>
                <p className={styles.explainItem}>
                  <span className={styles.explainBullet}>02</span>
                  Multiply it by the millimeters-per-unit ratio from the card.
                </p>
                <p className={styles.explainItem}>
                  <span className={styles.explainBullet}>03</span>
                  Keep angle measurements in degrees; they do not need a
                  physical scale.
                </p>
                <p className={styles.explainItem}>
                  <span className={styles.explainBullet}>04</span>
                  Recalculate when the card handles or a face marker is dragged.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="boundaries-title">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>05</span>
            <div>
              <p className={styles.sectionKicker}>Trust boundaries</p>
              <h2 className={styles.sectionTitle} id="boundaries-title">
                What stays local—and what the interface should not promise.
              </h2>
              <p className={styles.sectionIntro}>
                Privacy and accuracy are different questions. This repository
                keeps image processing local, but the result is still an
                estimate made from a single camera.
              </p>
            </div>
          </div>

          <div className={styles.boundaryGrid}>
            <article className={styles.boundaryCard}>
              <h3 className={styles.boundaryTitle}>
                <ShieldCheck aria-hidden="true" size={21} />
                Local by design
              </h3>
              <ul className={styles.boundaryList}>
                <li>
                  Camera frames are read by code running in the current browser
                  tab.
                </li>
                <li>
                  There is no upload endpoint, account system, database or scan
                  history in this repository.
                </li>
                <li>
                  The MediaPipe library and face model are downloaded from
                  external CDNs, then inference runs locally.
                </li>
                <li>
                  Saved poses live in JavaScript memory; copy and CSV export are
                  explicit browser actions.
                </li>
              </ul>
            </article>

            <article className={styles.boundaryCard}>
              <h3 className={styles.boundaryTitle}>
                <TriangleAlert aria-hidden="true" size={21} />
                Accuracy limits
              </h3>
              <ul className={styles.boundaryList}>
                <li>
                  The card and face need to remain at roughly the same distance
                  from the camera; perspective changes the scale.
                </li>
                <li>
                  “Hairline” points are actually top-forehead mesh landmarks.
                  The model does not visually detect a person’s true hairline.
                </li>
                <li>
                  Ear and profile points are face-mesh approximations and may
                  need manual adjustment.
                </li>
                <li>
                  Lighting, lens distortion, movement and head rotation all
                  affect the result. This is not a medical-grade 3D scan.
                </li>
              </ul>
            </article>
          </div>

          <div className={styles.cta}>
            <div>
              <h2 className={styles.ctaTitle}>See the system in motion.</h2>
              <p className={styles.ctaText}>
                Start the scanner, place the two ruler points, and watch the
                named landmarks and measurements update together.
              </p>
            </div>
            <Link className={styles.ctaLink} href="/">
              Open live scanner
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>

          <footer className={styles.footer}>
            <span>
              Based on the code currently in this repository—not a proposed
              architecture.
            </span>
            <span>Next.js 16 · React 19 · MediaPipe Face Landmarker</span>
          </footer>
        </section>
      </div>
    </main>
  );
}

function PoseFigure({ view }: { view: "front" | "profile" }) {
  if (view === "front") {
    return (
      <svg
        width="92"
        height="108"
        viewBox="0 0 92 108"
        role="img"
        aria-label="Front-facing head diagram"
      >
        <path
          d="M46 5C22 5 12 23 14 51c2 29 15 50 32 53 17-3 30-24 32-53C80 23 70 5 46 5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M26 43c7-5 14-5 20 0M66 43c-7-5-14-5-20 0M46 34v32l-7 5h14M33 83c8 6 18 6 26 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="29" cy="44" r="2" fill="currentColor" />
        <circle cx="63" cy="44" r="2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      width="92"
      height="108"
      viewBox="0 0 92 108"
      role="img"
      aria-label="Side-profile head diagram"
    >
      <path
        d="M59 6C34 3 19 21 20 47c1 29 12 50 33 57 5-5 8-13 8-22l14-5-9-9 7-7-10-8c1-17 0-34-4-47Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M38 34c6-4 12-3 16 1M37 50c-7 9-8 20-2 30M59 66l-8 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="51" cy="36" r="2" fill="currentColor" />
      <path
        d="M25 46c-7 7-7 18 0 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
