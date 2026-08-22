export type CanvasTheme = {
  foreground: string;
  muted: string;
  primary: string;
  success: string;
  warning: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
};

export function readCanvasTheme(element: Element): CanvasTheme {
  const styles = getComputedStyle(element);
  return {
    foreground: cssColor(styles, "--foreground"),
    muted: cssColor(styles, "--muted-foreground"),
    primary: cssColor(styles, "--primary"),
    success: cssColor(styles, "--success"),
    warning: cssColor(styles, "--warning"),
    chart1: cssColor(styles, "--chart-1"),
    chart2: cssColor(styles, "--chart-2"),
    chart3: cssColor(styles, "--chart-3"),
    chart4: cssColor(styles, "--chart-4"),
    chart5: cssColor(styles, "--chart-5"),
  };
}

function cssColor(styles: CSSStyleDeclaration, variable: string): string {
  const value = styles.getPropertyValue(variable).trim();
  return value.startsWith("oklch") ? value : `oklch(${value})`;
}
