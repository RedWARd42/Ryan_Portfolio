const socialLinks = [
  {
    label: 'GitHub',
    detail: '@RedWARd42',
    href: 'https://github.com/RedWARd42',
    cursor: 'Open GitHub',
  },
  {
    label: 'LinkedIn',
    detail: 'Ryan Edward',
    href: 'https://www.linkedin.com/in/ryan-edward/',
    cursor: 'Open LinkedIn',
  },
  {
    label: 'Devpost',
    detail: '@edward6109',
    href: 'https://devpost.com/edward6109',
    cursor: 'Open Devpost',
  },
]

function ContactSection() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="section-head">
        <h2 id="contact-title">See more</h2>
      </div>
      <nav className="social-links" aria-label="Ryan Edward online">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            className="social-link"
            href={link.href}
            target="_blank"
            rel="noopener"
            data-cursor={link.cursor}
          >
            <span className="social-name">{link.label}</span>
            <span className="social-foot">
              <span>{link.detail}</span>
              <span className="social-arrow" aria-hidden="true" />
            </span>
          </a>
        ))}
      </nav>
      <footer className="footnote">
        <span>© Ryan Edward</span>
      </footer>
    </section>
  )
}

export default ContactSection
