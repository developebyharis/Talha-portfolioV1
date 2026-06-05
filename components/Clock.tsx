"use client";

import { useEffect, useState } from "react";

function fmt(d: Date) {
  return d.toLocaleTimeString("en-GB", {
    hour12: true,
    timeZone: "Asia/karachi",
  });
}

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;
  return <span className="text-slate-400 font-mono">{fmt(now)}</span>;
}
