function AboutSection() {
  return (
    <section className="content-section" id="about" aria-labelledby="about-title">
      <div className="section-head">
        <h2 id="about-title">About me</h2>
      </div>
      <div className="about-grid">
        <figure className="about-photo">
          <svg
            viewBox="0 0 800 1000"
            role="img"
            aria-labelledby="about-photo-title about-photo-description"
          >
            <title id="about-photo-title">Portrait placeholder for Ryan Edward</title>
            <desc id="about-photo-description">A navy and gold placeholder graphic marked RE PHOTO PLACEHOLDER.</desc>
            <defs>
              <linearGradient id="about-photo-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#00003f" />
                <stop offset=".55" stopColor="#000024" />
                <stop offset="1" stopColor="#000010" />
              </linearGradient>
            </defs>
            <rect width="800" height="1000" fill="url(#about-photo-gradient)" />
            <g fill="#cea650" opacity=".08">
              <rect x="80" y="120" width="48" height="48" />
              <rect x="640" y="240" width="64" height="64" />
              <rect x="120" y="760" width="64" height="64" />
              <rect x="600" y="820" width="40" height="40" />
              <rect x="680" y="560" width="32" height="32" />
              <rect x="150" y="420" width="32" height="32" />
            </g>
            <text
              x="400"
              y="530"
              fill="#cea650"
              fontFamily="monospace"
              fontSize="270"
              fontWeight="bold"
              textAnchor="middle"
            >
              RE
            </text>
            <text
              x="407"
              y="648"
              fill="#f1ead9"
              fontFamily="monospace"
              fontSize="34"
              letterSpacing="14"
              textAnchor="middle"
            >
              PHOTO
            </text>
            <text
              x="404"
              y="698"
              fill="#b9b4aa"
              fontFamily="monospace"
              fontSize="22"
              letterSpacing="8"
              textAnchor="middle"
            >
              PLACEHOLDER
            </text>
          </svg>
        </figure>
        <div className="about-side">
          <div className="about-copy">
            <p className="about-lede">
              I&rsquo;m Ryan &mdash; a CS junior at UT Dallas building AI agents and the systems around them.
            </p>
            <p>
              I&rsquo;ve interned at Fidelity and Promazo (for Dynatrace), won hackathons with Agentic Detective
              and Squeek, and I teach workshops for the AI Society while running events for ACM.
            </p>
          </div>
          <div className="edu-panel">
            <span className="edu-company">UT Dallas</span>
            <span className="edu-meta">
              <b>B.S. Computer Science</b>
              <span>2028</span>
            </span>
            <span className="edu-description">Junior standing &middot; focus on AI systems and agents.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
