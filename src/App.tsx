import { useState } from 'react'
import ContactSection from './components/ContactSection'
import DetailPanel from './components/DetailPanel'
import ExperienceSection from './components/ExperienceSection'
import Hero from './components/Hero'
import PixelCursor from './components/PixelCursor'
import PixelCursorGlow from './components/PixelCursorGlow'
import PixelField from './components/PixelField'
import ProjectSection from './components/ProjectSection'
import { entries, type EntryKey } from './data/entryData'
import './styles/portfolio.css'

interface ActiveEntry {
  key: EntryKey
  trigger: HTMLButtonElement
  shouldReturnFocus: boolean
}

function App() {
  const [activeEntry, setActiveEntry] = useState<ActiveEntry | null>(null)

  const openEntry = (key: EntryKey, trigger: HTMLButtonElement) => {
    setActiveEntry({
      key,
      trigger,
      shouldReturnFocus: trigger.matches(':focus-visible'),
    })
  }

  const closeEntry = () => {
    setActiveEntry(null)
  }

  return (
    <div>
      <PixelCursorGlow />
      <PixelCursor />
      <PixelField />
      <div className="atmosphere" aria-hidden="true" />
      <div className="shell">
        <main>
          <Hero />
          <ProjectSection onSelect={openEntry} />
          <ExperienceSection onSelect={openEntry} />
          <ContactSection />
        </main>
      </div>
      <DetailPanel
        entry={activeEntry ? entries[activeEntry.key] : null}
        trigger={activeEntry?.trigger ?? null}
        shouldReturnFocus={activeEntry?.shouldReturnFocus ?? false}
        onClose={closeEntry}
      />
    </div>
  )
}

export default App
