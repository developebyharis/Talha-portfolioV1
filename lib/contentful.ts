import { Asset, createClient } from "contentful";
import { unstable_noStore as noStore } from "next/cache";

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_API!,
});

export async function FetchAboutMe() {
  noStore();
  const res = await client.getEntries({ content_type: "aboutMe" });

  const aboutMe = res.items[0];

  return {
    name: aboutMe.fields.name as string,
    title: aboutMe.fields.title as string,
    intro: aboutMe.fields.intro as string,
    email: aboutMe.fields.email as string,
    github: aboutMe.fields.github as string,
    linkedin: aboutMe.fields.linkedin as string,
  };
}

export async function FetchCertification() {
  noStore();

  const res = await client.getEntries({ content_type: "certifications" });

  const certification = res.items[0];
  return {
    name: certification.fields.name as string,
    issuer: certification.fields.issuer as string,
    certificateUrl: certification.fields.certificateUrl as string,
    date: certification.fields.date as string,

    certificateMedia:
      ((certification.fields.certificateMedia as Asset)?.fields?.file
        ?.url as string) ?? "",
  };
}
export async function FetchSkills() {
  noStore();

  const res = await client.getEntries({ content_type: "skills" });

  const skills = res.items[0];
  return {
    category: skills.fields.name as string,
    icon: skills.fields.icon as string,
    skillsName: skills.fields.skillsName as string[],
  };
}

export async function FetchEducation() {
  noStore();

  const res = await client.getEntries({ content_type: "education" });

  return res.items.map((edu) => ({
    institution: edu.fields.schoolName as string,
    degree: edu.fields.degreeName as string,
    period: edu.fields.startEndDate as string,
    status: edu.fields.status as boolean,
    major: edu.fields.major as string,
    location: edu.fields.location as string,
  }));
}

export async function FetchProjects() {
  noStore();

  const res = await client.getEntries({ content_type: "projects" });
  return res.items.map((item) => ({
    projectName: item.fields.projectName as string,
    category:  item.fields.categoriesId as { name: string; icon: string }[],
    projectDescription: item.fields.projectDescription as string,
    techStack: item.fields.techStack as string[],
    milestones: item.fields.milestones as string[],
    status: item.fields.status as boolean,
    deployDate: item.sys.createdAt as string,
  }));
}

export async function FetchExperience() {
  noStore();
  const res = await client.getEntries({ content_type: "experience" });
  return res.items.map((item) => ({
    id: item.sys.id as string,
    role: item.fields.role as string,
    company: item.fields.company as string,
    period: item.fields.period as string,
    scope: item.fields.scope as string,
    techStack: item.fields.techStack as string[],
    task: item.fields.task as string[],
    metrics: Array.isArray(item.fields.matricsId)
      ? item.fields.matricsId.map((m: any) => m.fields)
      : [],
  }));
}

export async function FetchCategories() {
  noStore();

  const res = await client.getEntries({ content_type: "categories" });

  const skills = res.items[0];
  return {
    name: skills.fields.name as string,
    icon: skills.fields.icon as string,
  };
}
