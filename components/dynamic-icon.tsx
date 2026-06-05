"use client";

import * as Icons from "lucide-react";

interface DynamicLogoProps {
  iconName: string;
  style: string;
}

export function DynamicIcon({ iconName, style }: DynamicLogoProps) {
  const SelectedIcon = (Icons as any)[iconName];
  if (!SelectedIcon) {
    return <Icons.Terminal className="h-6 w-6 text-slate-600" />;
  }

  return <SelectedIcon className={style} />;
}
