import type { EntryKey } from '../data/entryData'

interface ProjectCardProps {
  entryKey: EntryKey
  title: string
  proof: string
  onSelect: (key: EntryKey, trigger: HTMLButtonElement) => void
}

function ProjectCard({ entryKey, title, proof, onSelect }: ProjectCardProps) {
  return (
    <button
      className="project"
      type="button"
      data-entry={entryKey}
      data-cursor={`View ${title}`}
      onClick={(event) => onSelect(entryKey, event.currentTarget)}
    >
      <span className="project-title">{title}</span>
      <span className="project-foot">
        <span className="project-proof">{proof}</span>
        <span className="project-arrow" aria-hidden="true" />
      </span>
    </button>
  )
}

export default ProjectCard
