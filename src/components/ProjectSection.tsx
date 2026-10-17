import ProjectCard from './ProjectCard'
import type { EntryKey } from '../data/entryData'

interface ProjectSectionProps {
  onSelect: (key: EntryKey, trigger: HTMLButtonElement) => void
}

const projects = [
  {
    key: 'detective',
    title: 'Agentic Detective',
    proof: '1st Place + Best Design. Autonomous AI suspects, 0.2s voice streaming, 49 commits.',
  },
  {
    key: 'squeek',
    title: 'Squeek',
    proof: 'Hackathon-winning anti-scam second opinion, built at Rowdy Hacks XII.',
  },
  {
    key: 'stylemaxx',
    title: 'StyleMaxx',
    proof: 'Facial-tone analysis and wardrobe matching with K-Means and RAG.',
  },
  {
    key: 'ten',
    title: 'They’re A Ten, But…',
    proof: 'ACM party game with a custom sampling engine and documented state machine.',
  },
] satisfies Array<{ key: EntryKey; title: string; proof: string }>

function ProjectSection({ onSelect }: ProjectSectionProps) {
  return (
    <section className="content-section" id="work" aria-labelledby="work-title">
      <div className="section-head">
        <h2 id="work-title">Selected work</h2>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.key}
            entryKey={project.key}
            title={project.title}
            proof={project.proof}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  )
}

export default ProjectSection
