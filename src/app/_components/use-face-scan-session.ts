"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { detectFaceFromVideo } from "../_utils/detect-face";
import { drawOverlay } from "../_utils/draw-overlay";
import { emptyMeasurements } from "../_utils/empty-measurements";
import { extractMarkers, type MarkerMap } from "../_utils/extract-markers";
import type { FacePoint } from "../_utils/face-point";
import { scoreFacePose, type FaceQuality } from "../_utils/face-quality";
import type { FaceScanPhase } from "../_utils/face-scan-phase";
import { hitTestMarker } from "../_utils/hit-test-marker";
import { hitTestScale } from "../_utils/hit-test-scale";
import { loadFaceLandmarker } from "../_utils/load-face-landmarker";
import type { FaceLandmarkerInstance } from "../_utils/mediapipe-types";
import type { MarkerId } from "../_utils/marker-id";
import { MEASUREMENT_DEFS } from "../_utils/measurement-defs";
import type { MeasurementId } from "../_utils/measurement-id";
import { measureFace, type FaceMeasurement } from "../_utils/measure-face";
import { mergePoseMeasurements } from "../_utils/merge-pose-measurements";
import {
  completeScalePoints,
  CREDIT_CARD_LONG_EDGE_MM,
  millimetersPerUnit,
  type ScaleDraft,
} from "../_utils/object-scale";
import { pointerToFacePoint } from "../_utils/pointer-to-face-point";
import { poseForMeasurement } from "../_utils/pose-for-measurement";
import { readCanvasTheme } from "../_utils/read-canvas-theme";
import { nextPose, type ScanPose } from "../_utils/scan-pose";
import { startCamera } from "../_utils/start-camera";
import { stopCamera } from "../_utils/stop-camera";

const UI_SAMPLE_MS = 200;

type DragTarget = { kind: "scale"; handle: "a" | "b" } | { kind: "face"; id: MarkerId };

export function useFaceScanSession() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const landmarkerRef = useRef<FaceLandmarkerInstance | null>(null);
  const rafRef = useRef(0);
  const lastSampleRef = useRef(0);
  const selectedIdRef = useRef<MeasurementId | null>(null);
  const showAllRef = useRef(false);
  const knownLengthRef = useRef(CREDIT_CARD_LONG_EDGE_MM);
  const scaleDraftRef = useRef<ScaleDraft>({ a: null, b: null });
  const poseRef = useRef<ScanPose>("left");
  const markersRef = useRef<MarkerMap | null>(null);
  const landmarksRef = useRef<FacePoint[]>([]);
  const capturedRef = useRef<Partial<Record<ScanPose, FaceMeasurement[]>>>({});
  const dragRef = useRef<DragTarget | null>(null);
  const themeRootRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<FaceScanPhase>("intro");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<FaceMeasurement[]>(
    emptyMeasurements(),
  );
  const [quality, setQuality] = useState<FaceQuality | null>(null);
  const [selectedId, setSelectedId] = useState<MeasurementId | null>(null);
  const [knownLengthMm, setKnownLengthMm] = useState(CREDIT_CARD_LONG_EDGE_MM);
  const [scaleReady, setScaleReady] = useState(false);
  const [showAllLandmarks, setShowAllLandmarks] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(3 / 4);
  const [currentPose, setCurrentPose] = useState<ScanPose>("left");
  const [savedPoses, setSavedPoses] = useState<ScanPose[]>([]);

  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  useEffect(() => {
    showAllRef.current = showAllLandmarks;
  }, [showAllLandmarks]);

  useEffect(() => {
    knownLengthRef.current = knownLengthMm;
  }, [knownLengthMm]);

  useEffect(() => {
    poseRef.current = currentPose;
  }, [currentPose]);

  const paint = useCallback(() => {
    const overlay = overlayRef.current;
    const root = themeRootRef.current;
    if (!overlay || !root) return;
    const ctx = overlay.getContext("2d");
    if (!ctx) return;
    const selected = MEASUREMENT_DEFS.find(
      (def) => def.id === selectedIdRef.current,
    );
    drawOverlay(
      ctx,
      landmarksRef.current,
      markersRef.current,
      readCanvasTheme(root),
      selected ? { markers: selected.markers } : null,
      showAllRef.current,
      completeScalePoints(scaleDraftRef.current),
    );
  }, []);

  const refreshMeasurements = useCallback((markers: MarkerMap | null) => {
    const scale = completeScalePoints(scaleDraftRef.current);
    if (!scale || !markers) return;
    const mmPerUnit = millimetersPerUnit(scale, knownLengthRef.current);
    const live = measureFace(markers, mmPerUnit);
    const pose = poseRef.current;
    setMeasurements(
      live.filter((item) => poseForMeasurement(item.id) === pose),
    );
    setQuality(scoreFacePose(markers, pose));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      window.cancelAnimationFrame(rafRef.current);
      if (video) stopCamera(video);
      landmarkerRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    const video = videoRef.current;
    if (!video) return;
    const cancelled = { current: false };

    void (async () => {
      try {
        await startCamera(video);
        const existing = landmarkerRef.current;
        const landmarker = existing ?? (await loadFaceLandmarker("VIDEO"));
        if (cancelled.current) return;
        landmarkerRef.current = landmarker;
        await landmarker.setOptions({ runningMode: "VIDEO" });
        if (cancelled.current) return;
        const width = video.videoWidth || 720;
        const height = video.videoHeight || 960;
        setAspectRatio(width / height);
        const overlay = overlayRef.current;
        if (overlay) {
          overlay.width = width;
          overlay.height = height;
        }
        setPhase("scale");
      } catch {
        if (cancelled.current) return;
        setErrorMessage(
          "Allow camera access in your browser, then try again.",
        );
        setPhase("error");
      }
    })();

    return () => {
      cancelled.current = true;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "scale" && phase !== "scanning" && phase !== "review") {
      return;
    }
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const landmarker = landmarkerRef.current;
    if (!video || !overlay || !landmarker) return;

    const tick = (timestamp: number) => {
      if (video.readyState >= 2) {
        if (
          overlay.width !== video.videoWidth ||
          overlay.height !== video.videoHeight
        ) {
          overlay.width = video.videoWidth;
          overlay.height = video.videoHeight;
        }
        const landmarks = detectFaceFromVideo(landmarker, video, timestamp);
        if (landmarks) {
          landmarksRef.current = landmarks;
          markersRef.current = extractMarkers(landmarks);
        }
        paint();
        if (
          landmarks &&
          timestamp - lastSampleRef.current >= UI_SAMPLE_MS &&
          phase === "scanning"
        ) {
          lastSampleRef.current = timestamp;
          refreshMeasurements(extractMarkers(landmarks));
        }
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafRef.current);
  }, [phase, paint, refreshMeasurements]);

  const startCameraSession = () => {
    setErrorMessage(null);
    setSavedPoses([]);
    capturedRef.current = {};
    scaleDraftRef.current = { a: null, b: null };
    setScaleReady(false);
    setCurrentPose("left");
    setMeasurements(emptyMeasurements());
    setQuality(null);
    setPhase("loading");
  };

  const confirmScale = () => {
    if (!completeScalePoints(scaleDraftRef.current)) return;
    setCurrentPose("left");
    setPhase("scanning");
  };

  const changeKnownLength = (value: number) => {
    knownLengthRef.current = value;
    setKnownLengthMm(value);
    refreshMeasurements(markersRef.current);
  };

  const savePose = () => {
    const markers = markersRef.current;
    const scale = completeScalePoints(scaleDraftRef.current);
    if (!markers || !scale) return;
    const mmPerUnit = millimetersPerUnit(scale, knownLengthRef.current);
    const live = measureFace(markers, mmPerUnit);
    const pose = currentPose;
    capturedRef.current = { ...capturedRef.current, [pose]: live };
    const saved = listSavedPoses(capturedRef.current);
    setSavedPoses(saved);
    const following = nextPose(pose);
    if (!following) {
      setMeasurements(mergePoseMeasurements(capturedRef.current));
      setPhase("review");
      return;
    }
    setCurrentPose(following);
    setQuality(null);
    setMeasurements(
      emptyMeasurements().filter(
        (item) => poseForMeasurement(item.id) === following,
      ),
    );
  };

  const restart = () => {
    if (videoRef.current) stopCamera(videoRef.current);
    startCameraSession();
  };

  const toggleLandmarks = () => {
    const next = !showAllLandmarks;
    showAllRef.current = next;
    setShowAllLandmarks(next);
    requestAnimationFrame(paint);
  };

  const selectMeasurement = (id: MeasurementId) => {
    const next = selectedId === id ? null : id;
    selectedIdRef.current = next;
    setSelectedId(next);
    requestAnimationFrame(paint);
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = overlayRef.current;
    if (!canvas) return;
    const point = pointerToFacePoint(event.nativeEvent, canvas, true, 0);
    const draft = scaleDraftRef.current;
    const scale = completeScalePoints(draft);

    if (phase === "scale" && !draft.a) {
      scaleDraftRef.current = { a: point, b: null };
      setScaleReady(false);
      paint();
      return;
    }
    if (phase === "scale" && !draft.b) {
      scaleDraftRef.current = { a: draft.a, b: point };
      setScaleReady(true);
      paint();
      return;
    }

    if (scale) {
      const handle = hitTestScale(point, scale);
      if (handle) {
        dragRef.current = { kind: "scale", handle };
        canvas.setPointerCapture(event.pointerId);
        return;
      }
    }

    const markers = markersRef.current;
    if (!markers || phase === "scale") return;
    const id = hitTestMarker(point, markers);
    if (!id) return;
    dragRef.current = { kind: "face", id };
    canvas.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    const canvas = overlayRef.current;
    if (!drag || !canvas) return;
    const point = pointerToFacePoint(event.nativeEvent, canvas, true, 0);

    if (drag.kind === "scale") {
      const draft = scaleDraftRef.current;
      scaleDraftRef.current = {
        a: drag.handle === "a" ? point : draft.a,
        b: drag.handle === "b" ? point : draft.b,
      };
      refreshMeasurements(markersRef.current);
      paint();
      return;
    }

    const markers = markersRef.current;
    if (!markers) return;
    const next = {
      ...markers,
      [drag.id]: { ...point, z: markers[drag.id].z },
    };
    markersRef.current = next;
    refreshMeasurements(next);
    paint();
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  return {
    videoRef,
    overlayRef,
    themeRootRef,
    phase,
    errorMessage,
    measurements,
    quality,
    selectedId,
    knownLengthMm,
    scaleReady,
    showAllLandmarks,
    mirrored: true,
    aspectRatio,
    currentPose,
    savedPoses,
    showStage:
      phase === "loading" ||
      phase === "scale" ||
      phase === "scanning" ||
      phase === "review",
    startCameraSession,
    confirmScale,
    changeKnownLength,
    savePose,
    restart,
    toggleLandmarks,
    selectMeasurement,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}

function listSavedPoses(
  captured: Partial<Record<ScanPose, FaceMeasurement[]>>,
): ScanPose[] {
  return (["left", "front", "right"] as const).filter((pose) => captured[pose]);
}
