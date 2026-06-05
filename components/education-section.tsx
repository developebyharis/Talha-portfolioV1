"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Binary,
  ArrowRight,
  CornerDownRight,
} from "lucide-react";

type EducationItem = {
  institution: string;
  period: string;
  status: boolean;
  major: string;
  degree: string;
  location: string;
};

export function EducationSection({ data }: { data: EducationItem[] }) {
  return (
    <section className="py-12 md:py-16 bg-slate-950/40 border-t border-slate-900">
      <div className="container mx-auto px-8 max-w-8xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <GraduationCap className="h-5 w-5 text-emerald-500" />
          <h2 className="text-2xl font-bold text-slate-50 font-mono">
            Academic Execution Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-y-6 md:gap-x-2 items-center font-mono">
          {data.map((edu, idx) => {
            const isLast = idx === data.length - 1;

            return (
              <bg key={idx} className="contents">
                {/* Education Milestone Card */}
                <Card
                  className={`md:col-span-1 min-h-[175px] flex flex-col justify-between transition-all backdrop-blur-sm
                  ${
                    edu.status === true
                      ? "bg-slate-900/40 border-emerald-500/30 shadow-md shadow-emerald-500/5"
                      : "bg-slate-950/60 border-slate-900/80 hover:border-slate-800"
                  }`}
                >
                  <CardContent className="p-4 text-xs space-y-3 h-full flex flex-col justify-between">
                    {/* Top Segment: Status / Period */}
                    <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{edu.period}</span>
                      </div>
                      {edu.status ? (
                        <span className="text-green-600 font-bold">
                          [Completed]
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium animate-pulse">
                          <Binary className="h-2.5 w-2.5" />
                          <span>In Progress</span>
                        </span>
                      )}
                    </div>

                    {/* Main Title & Body */}
                    <div className="space-y-1 flex-grow">
                      <h3
                        className={`font-bold tracking-tight line-clamp-2
                        ${edu.status ? "text-emerald-400" : "text-slate-200"}`}
                      >
                        {edu.degree}
                      </h3>
                      <p className="text-slate-400 text-[11px] font-medium truncate">
                        {edu.institution}
                      </p>
                    </div>

                    {/* Bottom Metadata Footprint */}
                    <div className="pt-2 border-t border-slate-900/60 flex items-center justify-between text-[10px] text-slate-500">
                      <span className="truncate max-w-[100px]">
                        {edu.major || "General"}
                      </span>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <MapPin className="h-2.5 w-2.5" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Unstructured Arrow Trace Link (Hidden after final node) */}
                {!isLast && (
                  <div className="flex md:col-span-1 justify-center items-center py-2 md:py-0 text-slate-800 group">
                    {/* Horizontal Bus Line for Wide Layouts */}
                    <div className="hidden md:flex items-center w-full justify-center px-2">
                      <div className="h-[1px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 w-full relative">
                        <ArrowRight className="h-3.5 w-3.5 text-slate-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    {/* Vertical Pipeline Branch for Small Layouts */}
                    <div className="md:hidden flex flex-col items-center py-1">
                      <CornerDownRight className="h-4 w-4 text-slate-700" />
                    </div>
                  </div>
                )}
              </bg>
            );
          })}
        </div>
      </div>
    </section>
  );
}
