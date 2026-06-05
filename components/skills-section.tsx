"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  Code as Code2,
  Package,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

import React from "react";
import { DynamicIcon } from "./dynamic-icon";

export type SkillsItems = {
  category: string;
  icon: string;
  skillsName: string[];
}[];
type CertificateItem = {
  name: string;
  issuer: string;
  certificateUrl?: string;
  date: string;
  certificateMedia?: string;
}[];

export function SkillsSection({
  skillsdata,
  certificateData,
}: {
  skillsdata: SkillsItems;
  certificateData: CertificateItem;
}) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="h-6 w-6 text-emerald-500" />
            <h2 className="text-3xl font-bold text-slate-50">
              Technical Proficiencies
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-sm">
            {">"} cat /etc/skills.conf
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {skillsdata.map((s) => (
            <Card key={s.category} className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DynamicIcon
                    iconName={s.icon}
                    style={"h-5 w-5 text-emerald-500"}
                  />
                  {s.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row flex-wrap gap-2">
                {s.skillsName.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center text-sm border px-2 border-slate-700 bg-slate-800/50 py-1 rounded text-slate-300 font-mono"
                  >
                    {skill}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Award className="h-6 w-6 text-blue-500" />
            <h3 className="text-2xl font-bold text-slate-50">Certifications</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificateData.map((cert, index) => (
              <Card
                key={index}
                className="card-glow border border-slate-900 bg-slate-950/60 hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 group"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />

                    <div className="flex-1 w-full space-y-2">
                      <div className="flex items-start justify-between gap-4 w-full">
                        <h4 className="font-semibold text-sm text-slate-50 leading-snug tracking-tight">
                          {cert.certificateUrl && (
                            <Link
                              href={cert.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline hover:text-blue-400 transition-colors cursor-pointer"
                            >
                              <span className="">{cert.name}</span>
                            </Link>
                          )}
                        </h4>

                        {cert.certificateMedia && (
                          <Link
                            href={cert.certificateMedia || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-blue-400 transition-colors cursor-pointer"
                          >
                            <ExternalLink className="h-4 w-4 text-slate-500 shrink-0 mt-0.5 transition-colors duration-200 group-hover:text-blue-400" />
                          </Link>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 font-mono tracking-wide">
                        {cert.issuer}
                      </p>

                      <div className="h-[1px] bg-slate-900/60 my-1" />

                      <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                        <span className="text-emerald-500 font-medium tracking-wider">
                          {cert.date}
                        </span>
                        <span className="text-slate-600">
                          {String(index + 1).padStart(2, "0")} //{" "}
                          {String(certificateData.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
