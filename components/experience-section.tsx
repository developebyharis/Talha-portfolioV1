"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Terminal,
  Layers,
  Cpu,
  Calendar,
  Activity,
  ChevronRight,
} from "lucide-react";

type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  scope: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  task: string[];
};



export function ExperienceSection({ data }: { data: ExperienceItem[] }) {
  const [activeId, setActiveId] = useState<string>(data[0].id);
  const currentExp =
    data.find((e) => e.id === activeId) || data[0];

  return (
    <section className="py-12 md:py-16 bg-slate-950/30 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="h-6 w-6 text-emerald-500" />
            <h2 className="text-3xl font-bold text-slate-50">
              Professional Ledger
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-sm">
            {">"} cat /var/log/professional_history.db --verbose
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <div className="space-y-2 lg:col-span-1">
            <div className="text-xs font-mono text-slate-500 px-2 uppercase tracking-wider mb-2">
              Select Execution Context
            </div>
            {data.map((exp) => {
              const isActive = exp.id === activeId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveId(exp.id)}
                  className={`w-full text-left font-mono text-xs p-3.5 rounded border transition-all flex items-center justify-between group cursor-pointer
                    ${
                      isActive
                        ? "bg-slate-900 border-emerald-500/40 text-emerald-400 shadow-md shadow-emerald-500/5"
                        : "bg-slate-950/60 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                    }`}
                >
                  <div className="space-y-1 overflow-hidden">
                    <div className="font-bold flex items-center gap-2 truncate">
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`}
                      />
                      {exp.role}
                    </div>
                    <div className="text-slate-500 text-[11px] truncate">
                      {exp.company}
                    </div>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform ${isActive ? "text-emerald-400 translate-x-0.5" : "text-slate-600 group-hover:text-slate-400"}`}
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-slate-950 border-slate-900 relative overflow-hidden">
              <div className="bg-slate-900/60 border-b border-slate-900 px-4 py-3 flex items-center justify-between font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-blue-400" />
                  <span>
                    session://
                    {currentExp.company.toLowerCase().replace(/[^a-z0-9]/g, "")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {currentExp.period}
                  </span>
                </div>
              </div>

              <CardContent className="p-5 md:p-6 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-50 tracking-tight">
                    {currentExp.role}
                  </h3>
                  <div className="text-sm font-mono text-emerald-500 font-medium">
                    {currentExp.company} —{" "}
                    <span className="text-slate-400 font-normal">
                      {currentExp.scope}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-slate-900/40 border border-slate-900 rounded p-3 font-mono text-center">
                  {currentExp.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="space-y-1 border-r last:border-0 border-slate-900"
                    >
                      <div className="text-[10px] text-slate-500 uppercase tracking-tight">
                        {m.label}
                      </div>
                      <div className="text-sm font-bold text-slate-200">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-emerald-500" />{" "}
                    Executed Subroutines
                  </div>
                  <ul className="space-y-2.5 font-mono text-xs text-slate-300 leading-relaxed">
                    {currentExp.task.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-emerald-500 font-bold select-none mt-0.5">
                          &gt;
                        </span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-900">
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-blue-400" /> Runtime
                    Dependencies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentExp.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 text-[11px] font-mono bg-slate-900 text-slate-300 rounded border border-slate-800 flex items-center gap-1.5"
                      >
                        <Cpu className="h-3 w-3 text-slate-500" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
