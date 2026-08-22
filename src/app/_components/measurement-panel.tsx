import { groupLabel } from "../_utils/group-label";
import type { MeasurementGroup, MeasurementId } from "../_utils/measurement-id";
import type { FaceMeasurement } from "../_utils/measure-face";
import { MeasurementRow } from "./measurement-row";

const GROUP_ORDER: MeasurementGroup[] = [
  "left-profile",
  "left-eye",
  "center",
  "right-eye",
  "right-profile",
];

interface MeasurementPanelProps {
  measurements: readonly FaceMeasurement[];
  selectedId: MeasurementId | null;
  onSelect: (id: MeasurementId) => void;
}

export function MeasurementPanel({
  measurements,
  selectedId,
  onSelect,
}: MeasurementPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      {GROUP_ORDER.map((group) => {
        const items = measurements.filter((item) => item.group === group);
        if (items.length === 0) return null;
        return (
          <section key={group} className="space-y-2">
            <h2 className="text-muted-foreground px-3 text-xs font-medium tracking-[0.16em] uppercase">
              {groupLabel(group)}
            </h2>
            <div className="flex flex-col">
              {items.map((item) => (
                <MeasurementRow
                  key={item.id}
                  measurement={item}
                  selected={selectedId === item.id}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
