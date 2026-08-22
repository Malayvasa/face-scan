"use client";

import { Camera, Copy, Download, Grid3x3, RotateCcw } from "lucide-react";
import { Button } from "@/components/button";

interface CaptureToolbarProps {
  canSave: boolean;
  canExport: boolean;
  showAllLandmarks: boolean;
  saveLabel: string;
  onSave: () => void;
  onRestart: () => void;
  onCopy: () => void;
  onExport: () => void;
  onToggleLandmarks: () => void;
}

export function CaptureToolbar({
  canSave,
  canExport,
  showAllLandmarks,
  saveLabel,
  onSave,
  onRestart,
  onCopy,
  onExport,
  onToggleLandmarks,
}: CaptureToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" onClick={onSave} disabled={!canSave}>
        <Camera className="size-4" />
        {saveLabel}
      </Button>
      <Button type="button" variant="outline" onClick={onRestart}>
        <RotateCcw className="size-4" />
        Start over
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onCopy}
        disabled={!canExport}
      >
        <Copy className="size-4" />
        Copy
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onExport}
        disabled={!canExport}
      >
        <Download className="size-4" />
        CSV
      </Button>
      <Button
        type="button"
        variant={showAllLandmarks ? "secondary" : "ghost"}
        onClick={onToggleLandmarks}
      >
        <Grid3x3 className="size-4" />
        All landmarks
      </Button>
    </div>
  );
}
