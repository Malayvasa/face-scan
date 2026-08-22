"use client";

import { FaceScanWorkspace } from "./face-scan-workspace";
import { ScanError } from "./scan-error";
import { ScanIntro } from "./scan-intro";
import { useFaceScanSession } from "./use-face-scan-session";

export function FaceScanClient() {
  const session = useFaceScanSession();

  return (
    <div className="bg-background min-h-screen">
      <div
        ref={session.themeRootRef}
        className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8"
      >
        {session.phase === "intro" ? (
          <ScanIntro onStartCamera={session.startCameraSession} />
        ) : null}

        {session.phase === "error" && session.errorMessage ? (
          <ScanError
            message={session.errorMessage}
            onRetry={session.startCameraSession}
          />
        ) : null}

        {session.showStage ? <FaceScanWorkspace session={session} /> : null}
      </div>
    </div>
  );
}
