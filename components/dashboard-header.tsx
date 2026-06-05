"use client";

import { Server, Terminal, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Clock = dynamic(() => import("@/components/Clock"), { ssr: false });

interface DashboardHeaderProps {
  name: string;
  title: string;
}

export function DashboardHeader({ name, title }: DashboardHeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Server className="h-8 w-8 text-emerald-500" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-50 terminal-glow">
               {name}
              </h1>
              <p className="text-xs text-slate-400 font-mono">{title}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-emerald-500" />
              <span className="text-slate-400 font-mono">Status: </span>
              <span className="text-emerald-500 font-mono">OPERATIONAL</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm">
              <Terminal className="h-4 w-4 text-blue-500" />
              <span className="text-slate-400 font-mono">
                <Clock />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}