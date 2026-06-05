"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Terminal as TerminalIcon,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { SkillsItems } from "./skills-section";
import { ProjectItem } from "./projects-section";
import InterectiveTerminal from "./interectiveTerminal";
export type aboutMeProp = {
  name: string;
  title: string;
  intro: string;
  email: string;
  github: string;
  linkedin: string;
};
export function ContactSection({
  aboutMe,
  skillsData,
  projectsData,
}: {
  aboutMe: aboutMeProp;
  skillsData: SkillsItems;
  projectsData: ProjectItem;
}) {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: aboutMe.email || "N/A",
      href: `mailto:${aboutMe.email || ""}`,
      color: "text-emerald-500",
    },
    {
      icon: Github,
      label: "GitHub",
      value: aboutMe.github || "N/A",
      href: aboutMe.github || "#",
      color: "text-slate-300",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: aboutMe.linkedin || "N/A",
      href: aboutMe.linkedin || "#",
      color: "text-blue-500",
    },
  ];

  const [terminalLines, setTerminalLines] = useState([
    "$ whoami",
    aboutMe.email || "anonymous@user.com",
    "",
    "$ cat contact.txt",
    "Ready to collaborate on infrastructure projects,",
    "discuss homelab setups, or share DevOps insights.",
    "",
    "$ echo $STATUS",
    "Available for consulting and collaboration",
    "",
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputValue.trim();
    if (!cleanInput) return;

    const newLines = [...terminalLines, `$ ${cleanInput}`];
    const command = cleanInput.toLowerCase();

    if (command === "help") {
      newLines.push(
        "Available commands: help, clear, contact, skills, projects",
      );
    } else if (command === "clear") {
      setTerminalLines([]);
      setInputValue("");
      return;
    } else if (command === "contact") {
      newLines.push(`Email: ${aboutMe.email || "N/A"}`);
      newLines.push(`GitHub: ${aboutMe.github || "N/A"}`);
      newLines.push(`LinkedIn: ${aboutMe.linkedin || "N/A"}`);
    } else if (command === "skills") {
      if (skillsData && Array.isArray(skillsData) && skillsData.length > 0) {
        newLines.push("Initializing Skills Ledger Discovery...");
        newLines.push("---------------------------------------");
        skillsData.forEach((block) => {
          const categoryLabel = block.category || "General";
          const skillsList = Array.isArray(block.skillsName)
            ? block.skillsName.join(", ")
            : "No skills indexed";
          newLines.push(`${categoryLabel}: ${skillsList}`);
        });
      } else {
        newLines.push("Skills database index is currently offline or empty.");
      }
    } else if (command === "projects") {
      if (
        projectsData &&
        Array.isArray(projectsData) &&
        projectsData.length > 0
      ) {
        newLines.push("Retrieving Project Manifest Indices...");
        newLines.push("---------------------------------------");
        projectsData.forEach((project) => {
          const name = project.projectName || "Unnamed Repository";
          const desc = project.projectDescription || "No description provided.";
          const statusIndicator = project.status ? "[ACTIVE]" : "[ARCHIVED]";

          newLines.push(`→ ${name} ${statusIndicator}`);
          newLines.push(`  Desc: ${desc}`);
          if (project.techStack && Array.isArray(project.techStack)) {
            newLines.push(`  Stack: ${project.techStack.join(", ")}`);
          }
          newLines.push("");
        });
      } else {
        newLines.push(
          "No active repositories or projects found in this registry.",
        );
      }
    } else {
      newLines.push(`Command not found: ${cleanInput}`);
      newLines.push('Type "help" for available commands');
    }

    newLines.push("");
    setTerminalLines(newLines);
    setInputValue("");
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TerminalIcon className="h-6 w-6 text-emerald-500" />
            <h2 className="text-3xl font-bold text-slate-50">
              Initialize Connection
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-sm">
            {">"} ssh admin@domiadi.com
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="card-glow scan-line bg-slate-900/40 border-slate-800">
            <InterectiveTerminal
              aboutMe={aboutMe}
              skillsData={Array.isArray(skillsData) ? skillsData : [skillsData]}
              projectsData={
                Array.isArray(projectsData) ? projectsData : [projectsData]
              }
            />
          </Card>

          <div className="space-y-4">
            <Card className="card-glow bg-slate-900/40 border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-100">
                  Connect With Me
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <method.icon className={`h-5 w-5 ${method.color}`} />
                      <div>
                        <div className="text-sm font-semibold text-slate-300 group-hover:text-emerald-500 transition-colors">
                          {method.label}
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          {method.value}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card className="card-glow bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-50 mb-2">
                  Open for Opportunities
                </h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  Interested in infrastructure consulting, DevOps collaboration,
                  or discussing homelab architectures? Let's connect and build
                  something amazing together.
                </p>
                <Link href={`mailto:${aboutMe.email}`}>
                  <Button
                    asChild
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold transition-colors"
                  >
                    <span>
                      Start a Conversation
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
