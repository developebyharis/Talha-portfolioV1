"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Terminal } from "lucide-react";

export default function InterectiveTerminal({
  aboutMe,
  skillsData,
  projectsData,
}: any) {
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "$ whoami",
    aboutMe.email || "anonymous@user.com",
    "",
    "$ system_status",
    "All systems operational",
    "",
  ]);

  const [inputValue, setInputValue] = useState("");
  const linesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    linesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim().toLowerCase();
    if (!cmd) return;

    const newLines = [...terminalLines, `$ ${cmd}`];

    if (cmd === "help") {
      newLines.push("commands: help | clear | contact | skills | projects");
    } else if (cmd === "clear") {
      setTerminalLines([]);
      setInputValue("");
      return;
    } else if (cmd === "contact") {
      newLines.push(aboutMe.email);
      newLines.push(aboutMe.github);
      newLines.push(aboutMe.linkedin);
    } else if (cmd === "skills") {
      newLines.push("Loading skills registry...");
      const arr = Array.isArray(skillsData) ? skillsData : [skillsData];
      arr.filter(Boolean).forEach((block: any) => {
        const cat = block?.category || block?.fields?.category || "General";
        const skills =
          block?.skillsName?.join(", ") ||
          block?.fields?.skillsName?.join(", ") ||
          "N/A";
        newLines.push(`${cat}: ${skills}`);
      });
    } else if (cmd === "projects") {
      newLines.push("Loading project index...");
      const arr = Array.isArray(projectsData) ? projectsData : [projectsData];
      arr.filter(Boolean).forEach((p: any) => {
        const name = p?.projectName || p?.fields?.projectName || "Untitled";
        const desc =
          p?.projectDescription || p?.fields?.projectDescription || "No description";
        newLines.push(`→ ${name}`);
        newLines.push(`  ${desc}`);
        newLines.push("");
      });
    } else {
      newLines.push(`Command not found: ${cmd}`);
      newLines.push(`type "help"`);
    }

    newLines.push("");
    setTerminalLines(newLines);
    setInputValue("");
  };

  return (
    <>
      {/* Keyframe defined once via a style tag — no Tailwind plugin needed */}
      <style>{`
        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .terminal-cursor {
          animation: terminal-blink 1s step-start infinite;
        }
      `}</style>

      <Card className="card-glow scan-line">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-emerald-500" />
            Interactive Terminal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 font-mono text-sm">
            <div className="space-y-1 mb-4 max-h-80 overflow-y-auto">
              {terminalLines.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.startsWith("$")
                      ? "text-emerald-500"
                      : line.startsWith("→")
                      ? "text-blue-400"
                      : "text-slate-300"
                  }
                >
                  {line}
                </div>
              ))}
              <div ref={linesEndRef} />
            </div>

            <form onSubmit={handleCommand} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-emerald-500 shrink-0" />
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-50 caret-transparent"
                  placeholder="Type 'help' for commands..."
                  autoFocus
                />
                {/* Cursor sits right after the last typed character */}
                <span
                  className="terminal-cursor inline-block w-[2px] h-[1.1em] bg-emerald-400 ml-[1px] align-middle pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </form>
          </div>

          <div className="mt-4 text-xs text-slate-500 font-mono">
            Tip: Try commands like &quot;help&quot;, &quot;contact&quot;, &quot;skills&quot;, or &quot;projects&quot;
          </div>
        </CardContent>
      </Card>
    </>
  );
}