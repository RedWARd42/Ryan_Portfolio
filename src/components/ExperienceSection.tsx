import ExperienceCard from './ExperienceCard'
import type { EntryKey } from '../data/entryData'

interface ExperienceSectionProps {
  onSelect: (key: EntryKey, trigger: HTMLButtonElement) => void
}

const roles = [
  {
    key: 'fidelity',
    company: 'Fidelity',
    role: 'Full Stack Software Engineer Intern',
    dates: '2026',
    description: 'Real-time enterprise queue monitor for 20+ internal teams.',
  },
  {
    key: 'dynatrace',
    company: 'Promazo × Dynatrace',
    companyLabel: 'Promazo × Dynatrace',
    role: 'AI Engineer (Contract)',
    dates: '2026',
    description: '7 MCP tools for 500+ users; workflow runtime cut by 98.2%.',
  },
  {
    key: 'texashealth',
    company: 'Texas Health',
    role: 'IT Intern',
    dates: '2025',
    description: 'Server dashboard, 50% faster queries, support across 3+ campuses.',
  },
  {
    key: 'ais',
    company: 'AI Society',
    role: 'Lecturer',
    dates: '2026–Now',
    description: '12+ workshops on Git, Python, AI, and machine learning.',
  },
  {
    key: 'acm',
    company: 'ACM @ UTD',
    role: 'Events Officer',
    dates: '2025–Now',
    description: '8+ events and a 23% increase in member engagement.',
  },
] satisfies Array<{
  key: EntryKey
  company: string
  companyLabel?: string
  role: string
  dates: string
  description: string
}>

function ExperienceSection({ onSelect }: ExperienceSectionProps) {
  return (
    <section
      className="content-section experience-layout"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-head experience-lead">
        <h2 id="experience-title">Experience</h2>
      </div>
      <div className="timeline" aria-label="Experience">
        {roles.map((role) => (
          <ExperienceCard
            key={role.key}
            entryKey={role.key}
            company={role.company}
            companyLabel={role.companyLabel}
            role={role.role}
            dates={role.dates}
            description={role.description}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection
