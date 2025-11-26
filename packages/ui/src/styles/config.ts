export type ThemeVars = {
  bg?: string;
  text?: string;
  border?: string;
  muted?: string;
  accent?: string;
  tableRowHover?: string;
};

const keyMap: Record<keyof ThemeVars, string> = {
  bg: '--dui-bg',
  text: '--dui-text',
  border: '--dui-border',
  muted: '--dui-muted',
  accent: '--dui-accent',
  tableRowHover: '--dui-table-row-hover'
};

export function configureStyle(vars: Partial<ThemeVars>) {
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => {
    const cssVar = keyMap[k as keyof ThemeVars];
    if (cssVar && typeof v === 'string') {
      root.style.setProperty(cssVar, v);
    }
  });
}

