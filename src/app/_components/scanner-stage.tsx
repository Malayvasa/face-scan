"use client";

import type { PointerEvent, RefObject } from "react";
import { cn } from "@/lib/cn";

interface ScannerStageProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  overlayRef: RefObject<HTMLCanvasElement | null>;
  aspectRatio: number;
  mirrored: boolean;
  loading: boolean;
  onPointerDown: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLCanvasElement>) => void;
}

export function ScannerStage({
  videoRef,
  overlayRef,
  aspectRatio,
  mirrored,
  loading,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: ScannerStageProps) {
  return (
    <div
      className="border-border bg-muted relative overflow-hidden rounded-2xl border"
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        playsInline
        muted
        className={cn(
          "absolute inset-0 h-full w-full object-contain",
          mirrored && "-scale-x-100",
        )}
      />
      <canvas
        ref={overlayRef}
        className={cn(
          "absolute inset-0 h-full w-full cursor-crosshair object-contain",
          mirrored && "-scale-x-100",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="border-foreground/20 aspect-[3/4] h-[78%] rounded-[50%] border border-dashed" />
      </div>
      {loading ? (
        <div className="bg-background/70 absolute inset-0 flex items-center justify-center">
          <p className="text-foreground text-sm">Loading the face model…</p>
        </div>
      ) : null}
    </div>
  );
}
