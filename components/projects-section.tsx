"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FolderGit2,
  ExternalLink,
  GitBranch,
  Clock,
  CircleCheck as CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { DynamicIcon } from "./dynamic-icon";

type CategoryItem = {
  name: string;
  icon: string;
}[];
export type ProjectItem = {
  projectName: string;
  projectDescription: string;
  techStack: string[];
  milestones: string[];
  status: boolean;
  deployDate: string;
  category: CategoryItem;
}[];

interface ProjectsSectionProps {
  projectsData: ProjectItem;
  categoriesData: CategoryItem;
}
export function ProjectsSection({
  projectsData,
  categoriesData,
}: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const filteredProjects =
    activeCategory === "ALL"
      ? projectsData
      : (projectsData || []).filter(
          (project) =>
            Array.isArray(project.category) &&
            project.category.some((cat: any) => {
              const categoryName = cat?.fields?.name || cat?.name || "";
              return (
                categoryName.toLowerCase() === activeCategory.toLowerCase()
              );
            }),
        );

  return (
    <section className="py-12 md:py-16 bg-slate-950/50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FolderGit2 className="h-6 w-6 text-emerald-500" />
            <h2 className="text-3xl font-bold text-slate-50">
              Project Repository
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-sm mb-4">
            {">"} ls -la ~/projects/ --sort=modified
          </p>

          <div className="flex flex-row flex-wrap gap-3">
            {/* 💡 Explicitly render an [ALL] channels button */}
            <button
              onClick={() => setActiveCategory("ALL")}
              className={`flex flex-row items-center gap-2 border px-4 py-1 rounded-full cursor-pointer transition-colors font-mono text-xs
            ${
              activeCategory === "ALL"
                ? "bg-emerald-500 text-slate-950 border-emerald-500"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
            >
              <span>[ALL]</span>
            </button>

            {/* Dynamic Database Driven Categories */}
            {categoriesData &&
              categoriesData.map((cat, index) => {
                const isActive =
                  activeCategory.toLowerCase() === cat.name.toLowerCase();

                return (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex flex-row items-center gap-2 border px-3 py-1 rounded-full cursor-pointer transition-colors text-xs
                  ${
                    isActive
                      ? "bg-emerald-500 text-slate-950 border-emerald-500"
                      : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                  }`}
                  >
                    {/* Clean inline styling assignment via your custom component rule wrapper */}
                    <DynamicIcon iconName={cat.icon} style="w-4 h-4" />
                    <p>{cat.name}</p>
                  </button>
                );
              })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className="card-glow hover:border-emerald-500/50 transition-colors"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2 flex items-center gap-2">
                      <GitBranch className="h-5 w-5 text-emerald-500" />
                      {project.projectName}
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      {project.projectDescription}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full metric-blink" />
                    <span className="text-xs text-emerald-500 font-mono">
                      {project.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono bg-slate-800 text-slate-300 rounded border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="bg-slate-950 rounded-md p-3 border border-slate-800 font-mono text-xs space-y-1">
                  {project.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="text-slate-400 flex items-start gap-2"
                    >
                      <span className="h-3 w-3 text-emerald-500 mt-0.5 flex-shrink-0">
                        ✓
                      </span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    <span className="font-mono">
                      Deployed:{" "}
                      {new Date(project.deployDate).toLocaleDateString()}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    View Details
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
