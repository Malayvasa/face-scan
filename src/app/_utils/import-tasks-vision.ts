import type { TasksVisionModule } from "./mediapipe-types";

type TasksVisionGlobals = Window & {
  __faceScanTasksVision?: TasksVisionModule;
};

export function importTasksVision(): Promise<TasksVisionModule> {
  const cached = visionWindow().__faceScanTasksVision;
  if (cached) return Promise.resolve(cached);

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "/face-scan/load-vision.js";
    script.addEventListener("load", () => {
      const vision = visionWindow().__faceScanTasksVision;
      if (vision) {
        resolve(vision);
        return;
      }
      reject(new Error("Face model builder did not initialize."));
    });
    script.addEventListener("error", () => {
      reject(new Error("Face model builder failed to start."));
    });
    document.head.appendChild(script);
  });
}

function visionWindow(): TasksVisionGlobals {
  return window;
}
