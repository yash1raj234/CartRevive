export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-light text-foreground">CartRevive</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {[
            { label: 'Privacy', href: '#' },
            { label: 'Terms', href: '#' },
            { label: 'Docs', href: '#' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs text-caption hover:text-muted transition-colors font-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Built by */}
        <div className="flex items-center gap-3 text-xs text-caption font-light">
          <span>© 2024 CartRevive</span>
          <span className="text-border-strong">·</span>
          <a
            href="https://yashraj.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors flex items-center gap-1"
          >
            Built by Yash
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2.5 7.5 7.5 2.5M7.5 2.5H4m3.5 0v3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
