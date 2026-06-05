"use client";

import { Button } from "@/components/ui/button";
import {
  CircleCheck as CheckCircle2,
  GitFork,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import InterectiveTerminal from "./interectiveTerminal";
import { Card } from "./ui/card";

export type aboutMeProp = {
  name: string;
  title: string;
  intro: string;
  email: string;
  github: string;
  linkedin: string;
};

export function HeroSection({
  aboutMe,
  skillsData,
  projectsData,
}: {
  aboutMe: aboutMeProp;
  skillsData: any;
  projectsData: any;
}) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-mono">
              <CheckCircle2 className="h-4 w-4" />
              <span>System Online</span>
            </div>

            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-slate-50 mb-4 terminal-glow">
{aboutMe.name}
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 font-mono mb-2">
{aboutMe.title}              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                                {aboutMe.intro}

              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 cursor-pointer rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-mono text-sm">
                 <Link
                  href={`mailto:${aboutMe.email}`}
                > <span className="text-emerald-500 cursor-pointer">$</span> {aboutMe.email}:~
                </Link>
              </div>
              <div className="px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-mono text-sm">
                uptime: 99.8%
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="card-glow scan-line">
                <InterectiveTerminal
              aboutMe={aboutMe}
              skillsData={Array.isArray(skillsData) ? skillsData : [skillsData]}
              projectsData={
                Array.isArray(projectsData) ? projectsData : [projectsData]
              }
            />
            </Card>

          
          </div>
        </div>
      </div>
    </section>
  );
}