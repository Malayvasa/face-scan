import { cn } from "@/lib/cn";
import type { FaceQuality } from "../_utils/face-quality";

interface QualityMeterProps {
  quality: FaceQuality | null;
}

export function QualityMeter({ quality }: QualityMeterProps) {
  const score = quality?.score ?? 0;
  const tone =
    score >= 0.82 ? "bg-success" : score >= 0.55 ? "bg-warning" : "bg-destructive";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          Alignment
        </span>
        <span className="text-foreground font-mono text-xs">
          {Math.round(score * 100)}%
        </span>
      </div>
      <div className="bg-muted h-1.5 overflow-hidden rounded-full">
        <div
          className={cn("h-full rounded-full transition-[width]", tone)}
          style={{ width: `${Math.round(score * 100)}%` }}
        />
      </div>
      <p className="text-muted-foreground text-xs">
        {quality?.message ?? "Looking for a face…"}
        </p>
    </div>
  );
}
