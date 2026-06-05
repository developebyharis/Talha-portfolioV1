import { DashboardHeader } from "@/components/dashboard-header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import {
  FetchAboutMe,
  FetchCategories,
  FetchCertification,
  FetchEducation,
  FetchExperience,
  FetchProjects,
  FetchSkills,
} from "@/lib/contentful";

export default async function Home() {
  const [
    aboutMe,
    certifications,
    education,
    projects,
    skills,
    categories,
    experience,
  ] = await Promise.all([
    FetchAboutMe(),
    FetchCertification(),
    FetchEducation(),
    FetchProjects(),
    FetchSkills(),
    FetchCategories(),
    FetchExperience(),
  ]);
  return (
    <main className="min-h-screen">
      
      <DashboardHeader name={aboutMe.name} title={aboutMe.title} />
      <HeroSection  aboutMe={aboutMe}
        skillsData={Array.isArray(skills) ? skills : [skills]}
        projectsData={Array.isArray(projects) ? projects : [projects]} />
      <EducationSection data={education} />
      <SkillsSection
        skillsdata={Array.isArray(skills) ? skills : [skills]}
        certificateData={
          Array.isArray(certifications) ? certifications : [certifications]
        }
      />
      <ProjectsSection
        projectsData={Array.isArray(projects) ? projects : [projects]}
        categoriesData={Array.isArray(categories) ? categories : [categories]}
      />
      <ExperienceSection data={experience} />
      <ContactSection
        aboutMe={aboutMe}
        skillsData={Array.isArray(skills) ? skills : [skills]}
      />
      <Footer />
    </main>
  );
}
