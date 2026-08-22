"use client";

import { downloadTextFile } from "../_utils/download-text-file";
import { measurementsToCsv } from "../_utils/measurements-to-csv";
import { measurementsToText } from "../_utils/measurements-to-text";
import { poseHint, poseLabel } from "../_utils/scan-pose";
import { writeClipboard } from "../_utils/write-clipboard";
import { CaptureToolbar } from "./capture-toolbar";
import { MeasurementPanel } from "./measurement-panel";
import { QualityMeter } from "./quality-meter";
import { ScaleControls } from "./scale-controls";
import { ScannerStage } from "./scanner-stage";
import type { useFaceScanSession } from "./use-face-scan-session";
import { ViewStepper } from "./view-stepper";

type FaceScanWorkspaceProps = {
  session: ReturnType<typeof useFaceScanSession>;
};

export function FaceScanWorkspace({ session }: FaceScanWorkspaceProps) {
  const heading =
    session.phase === "scale"
      ? "Tap both ends of your card"
      : session.phase === "review"
        ? "All three angles are saved"
        : poseHint(session.currentPose);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
      <div className="space-y-4">
        <div className="space-y-3">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            Live scan
          </p>
          <h1 className="text-foreground text-3xl font-medium tracking-tight">
            {heading}
          </h1>
          {session.phase !== "scale" ? (
            <ViewStepper
              current={session.currentPose}
              saved={session.savedPoses}
            />
          ) : null}
        </div>
        <ScannerStage
          videoRef={session.videoRef}
          overlayRef={session.overlayRef}
          aspectRatio={session.aspectRatio}
          mirrored={session.mirrored}
          loading={session.phase === "loading"}
          onPointerDown={session.handlePointerDown}
          onPointerMove={session.handlePointerMove}
          onPointerUp={session.handlePointerUp}
        />
        {session.phase === "scanning" ? (
          <QualityMeter quality={session.quality} />
        ) : null}
        {session.phase === "scanning" || session.phase === "review" ? (
          <CaptureToolbar
            canSave={session.phase === "scanning" && session.quality !== null}
            canExport={session.phase === "review"}
            showAllLandmarks={session.showAllLandmarks}
            saveLabel={
              session.currentPose === "right"
                ? "Save right side"
                : `Save ${poseLabel(session.currentPose).toLowerCase()}`
            }
            onSave={session.savePose}
            onRestart={session.restart}
            onCopy={() => {
              void writeClipboard(measurementsToText(session.measurements));
            }}
            onExport={() => {
              downloadTextFile(
                "face-measurements.csv",
                measurementsToCsv(session.measurements),
                "text/csv",
              );
            }}
            onToggleLandmarks={session.toggleLandmarks}
          />
        ) : null}
        <p className="text-muted-foreground text-xs leading-relaxed">
          Yellow dots A and B are your physical ruler. Numbered dots are face
          landmarks. Drag either if a point is off.
        </p>
      </div>

      <aside className="space-y-4">
        {session.phase === "scale" ? (
          <ScaleControls
            knownLengthMm={session.knownLengthMm}
            pointsReady={session.scaleReady}
            onChangeLength={session.changeKnownLength}
            onConfirm={session.confirmScale}
          />
        ) : (
          <p className="text-muted-foreground text-xs">
            Ruler: {session.knownLengthMm.toFixed(1)} mm between points A and B.
            Keep the card in the picture as you turn.
          </p>
        )}
        <div className="border-border bg-card max-h-[min(72vh,52rem)] overflow-y-auto rounded-2xl border p-3">
          <MeasurementPanel
            measurements={session.measurements}
            selectedId={session.selectedId}
            onSelect={session.selectMeasurement}
          />
        </div>
      </aside>
    </div>
  );
}
