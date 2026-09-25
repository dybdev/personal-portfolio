"use client";

import { useState } from "react";
import type { Project } from "@/content/portfolio";
import { ProjectShowcase } from "@/components/project-showcase";
import { ProjectCard } from "@/components/project-card";
import { ProjectLoader } from "@/components/project-loader";

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleSelect(project: Project) {
    setSelectedProject(project);
    setIsLoading(true);
  }

  function handleClose() {
    setIsLoading(false);
    setSelectedProject(null);
  }

  return (
    <>
      <ProjectShowcase
        totalCount={projects.length}
        activeIndex={activeIndex}
        onChangeIndex={setActiveIndex}
        projects={projects}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            isActive={index === activeIndex}
            onActivate={() => setActiveIndex(index)}
            onSelect={handleSelect}
          />
        ))}
      </ProjectShowcase>

      <ProjectLoader
        project={selectedProject}
        isOpen={isLoading}
        onFinish={handleClose}
        onCancel={handleClose}
      />
    </>
  );
}
