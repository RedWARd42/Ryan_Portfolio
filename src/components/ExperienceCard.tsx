import type { EntryKey } from '../data/entryData'

interface ExperienceCardProps {
  entryKey: EntryKey
  company: string
  companyLabel?: string
  role: string
  dates: string
  description: string
  onSelect: (key: EntryKey, trigger: HTMLButtonElement) => void
}

function ExperienceCard({
  entryKey,
  company,
  companyLabel,
  role,
  dates,
  description,
  onSelect,
}: ExperienceCardProps) {
  return (
    <button
      className="role"
      type="button"
      data-entry={entryKey}
      data-cursor="View experience"
      onClick={(event) => onSelect(entryKey, event.currentTarget)}
    >
      <span className="role-top">
        <span className="role-company" aria-label={companyLabel}>
          {companyLabel ? (
            <>
              Promazo <span className="company-pixel-x" aria-hidden="true" /> Dynatrace
            </>
          ) : (
            company
          )}
        </span>
        <span className="role-arrow" aria-hidden="true" />
      </span>
      <span className="role-copy">
        <span className="role-meta">
          <b>{role}</b>
          <span>{dates}</span>
        </span>
        <span className="role-description">{description}</span>
      </span>
    </button>
  )
}

export default ExperienceCard
