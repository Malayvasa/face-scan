"use client";

import { Button } from "@/components/button";

interface ScanErrorProps {
  message: string;
  onRetry: () => void;
}

export function ScanError({ message, onRetry }: ScanErrorProps) {
  return (
    <div className="border-border bg-card mx-auto flex max-w-md flex-col items-start gap-4 rounded-2xl border p-6">
      <h1 className="text-foreground text-xl font-medium">Camera unavailable</h1>
      <p className="text-muted-foreground text-sm leading-relaxed">{message}</p>
      <Button type="button" onClick={onRetry}>
        Try the camera again
      </Button>
    </div>
  );
}
