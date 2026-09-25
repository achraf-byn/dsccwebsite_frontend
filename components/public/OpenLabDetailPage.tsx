import { T } from '@/lib/i18n/LanguageProvider'
import { ArrowLeft, ExternalLink, Github, Code, Layers } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ProjectItem } from '@/types/siteContent'

export default function OpenLabDetailPage({ project }: { project: ProjectItem }) {
  const techs = project.technologies || project.tags || []

  return (
    <main className="article-page">
      <div className="article-shell">
        <Link className="article-back" href="/openlab">
          <ArrowLeft size={16} />
          <T> Back to OpenLab</T>
        </Link>
        <article className="article-content">
          <div className="article-meta">
            <T>{project.category || 'OpenLab Project'}</T>
            <span>·</span>
            <T>{project.status}</T>
          </div>
          <h1><T>{project.title}</T></h1>
          <p className="article-intro"><T>{project.description}</T></p>

          <div
            className="openlab-detail-meta-box"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              margin: '24px 0 32px',
              padding: '16px 20px',
              background: 'color-mix(in srgb, var(--surface) 90%, var(--pale))',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              fontSize: '13px',
              color: 'var(--slate)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={16} style={{ color: 'var(--blue)' }} />
              <strong><T>Status:</T></strong> <span><T>{project.status}</T></span>
            </div>
            {techs.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <Code size={16} style={{ color: 'var(--blue)' }} />
                <strong><T>Technologies:</T></strong>
                <div className="hub-tags" style={{ margin: 0 }}>
                  {techs.map((tech) => (
                    <span key={tech}><T>{tech}</T></span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {project.image && (
            <Image
              className="article-image"
              src={project.image}
              width={1200}
              height={600}
              alt=""
              unoptimized
            />
          )}

          <div className="article-body">
            {project.content.split(/\n\n+/).map((paragraph, idx) => (
              <p key={idx}><T>{paragraph}</T></p>
            ))}
          </div>

          {(project.githubUrl || project.demoUrl) && (
            <div style={{ marginTop: '36px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {project.githubUrl && (
                <a
                  className="hero-button hero-button-primary"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} /> <T>View GitHub Repository</T>
                </a>
              )}
              {project.demoUrl && (
                <a
                  className="hero-button hero-button-secondary"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} /> <T>Live Demo</T>
                </a>
              )}
            </div>
          )}
        </article>
      </div>
    </main>
  )
}
