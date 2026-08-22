import { cn } from "@/lib/cn";
import { poseLabel, SCAN_POSES, type ScanPose } from "../_utils/scan-pose";

interface ViewStepperProps {
  current: ScanPose;
  saved: readonly ScanPose[];
}

export function ViewStepper({ current, saved }: ViewStepperProps) {
  return (
    <ol className="flex flex-wrap gap-2">
      {SCAN_POSES.map((pose, index) => {
        const isCurrent = pose === current;
        const isSaved = saved.includes(pose);
        return (
          <li
            key={pose}
            className={cn(
              "border-border rounded-full border px-3 py-1 text-xs font-medium",
              isCurrent && "bg-primary text-primary-foreground border-transparent",
              !isCurrent && isSaved && "bg-success/10 text-success",
              !isCurrent && !isSaved && "text-muted-foreground",
            )}
          >
            {index + 1}. {poseLabel(pose)}
            {isSaved ? " ✓" : ""}
          </li>
        );
      })}
    </ol>
  );
}
