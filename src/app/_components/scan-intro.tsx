"use client";

import Link from "next/link";
import { ArrowRight, Camera, Shield } from "lucide-react";
import { Button } from "@/components/button";
import { HowItWorks } from "./how-it-works";

interface ScanIntroProps {
  onStartCamera: () => void;
}

export function ScanIntro({ onStartCamera }: ScanIntroProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-8">
      <div className="space-y-3">
        <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
          Live face metrics
        </p>
        <h1 className="text-foreground text-4xl font-medium tracking-tight sm:text-5xl">
          Scan left, front, and right — with a real ruler.
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          This is a live camera scan only. You will not upload a photo. You
          hold a credit card (or any object whose length you know) next to
          your face so the site can turn pixels into millimeters.
        </p>
      </div>

      <div className="border-border bg-card w-full space-y-4 rounded-2xl border p-5">
        <h2 className="text-foreground text-sm font-medium">
          How this works, if you have never built a website
        </h2>
        <HowItWorks />
        <Link
          href="/how-it-works"
          className="text-foreground inline-flex items-center gap-1.5 border-b border-current pb-0.5 text-sm font-medium transition-opacity hover:opacity-70 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Explore the visual system guide
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      <Button type="button" onClick={onStartCamera}>
        <Camera className="size-4" />
        Start live scan
      </Button>

      <div className="text-muted-foreground flex items-start gap-2 text-sm">
        <Shield className="mt-0.5 size-4 shrink-0" />
        <p>The camera feed never leaves this browser tab.</p>
      </div>
    </div>
  );
}
