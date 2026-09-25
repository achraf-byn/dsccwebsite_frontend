'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight, ExternalLink, ImagePlus, Info, Save, Upload, X } from 'lucide-react'
import { defaultAboutContent, getAboutContent, saveAboutContent, type AboutContent } from '@/components/about/aboutStore'

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

const sections = ['Who We Are', 'What We Do', 'Our Fields', 'Journey', 'Our Values', 'Team']

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function Field({ label, value, onChange, multiline = false, placeholder }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; placeholder?: string }) {
  return <label className="admin-field"><span>{label}</span>{multiline ? <textarea className="admin-textarea" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} rows={4} /> : <input className="admin-input" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />}</label>
}

function HeroPreview({ content }: { content: AboutContent }) {
  const { hero } = content
  return <div className="admin-preview-stage"><div className="admin-preview-glow" /><div className="admin-preview-kicker">{hero.eyebrow || 'ABOUT DSCC'}</div><div className="admin-preview-layout"><div><h2>{hero.title || 'More Than a Club.'}<br /><span>{hero.highlightedTitle || 'A Community Building Tomorrow.'}</span></h2><p>{hero.description || 'Your About hero preview will update as you edit the form.'}</p><div className="admin-preview-actions"><span>{hero.primaryButton.label || 'Meet Our Team'} <ExternalLink size={12} /></span><span>{hero.secondaryButton.label || 'Explore Our Journey'}</span></div></div><div className="admin-preview-visual">{hero.image ? <img src={hero.image} alt="" /> : <><div className="admin-preview-node admin-preview-node-main">DSCC<small>COMMUNITY</small></div><i className="admin-preview-dot dot-a" /><i className="admin-preview-dot dot-b" /><i className="admin-preview-dot dot-c" /></>}</div></div></div>
}

export default function AdminAboutPage() {
  const [content, setContent] = useState<AboutContent>(defaultAboutContent)
  const [openSection, setOpenSection] = useState('About Intro')
  const [saveState, setSaveState] = useState<SaveState>('idle')

  useEffect(() => setContent(getAboutContent()), [])

  const updateHero = (key: keyof AboutContent['hero'], value: string) => setContent((current) => ({ ...current, hero: { ...current.hero, [key]: value } }))
  const updateButton = (which: 'primaryButton' | 'secondaryButton', key: 'label' | 'href', value: string) => setContent((current) => ({ ...current, hero: { ...current.hero, [which]: { ...current.hero[which], [key]: value } } }))

  const uploadHero = async (file?: File) => { if (!file) return; updateHero('image', await readFile(file)) }
  const save = () => { setSaveState('saving'); try { saveAboutContent(content); setSaveState('saved'); window.setTimeout(() => setSaveState('idle'), 2200) } catch { setSaveState('error') } }

  return <main className="admin-page"><div className="admin-page-heading admin-about-heading"><div><span className="admin-kicker">CONTENT MANAGEMENT</span><h1>About Page</h1><p>Manage the content displayed on the public DSCC About page.</p></div><span className="admin-published"><i />Published</span></div><div className="admin-edit-layout"><section className="admin-editor-column"><div className="admin-card admin-accordion-card"><button className="admin-accordion-trigger is-open" onClick={() => setOpenSection(openSection === 'About Intro' ? '' : 'About Intro')}><span>{openSection === 'About Intro' ? <ChevronDown size={17} /> : <ChevronRight size={17} />}<strong>About Intro</strong></span><small>Hero content</small></button>{openSection === 'About Intro' && <div className="admin-accordion-panel"><div className="admin-form-grid"><Field label="Eyebrow" value={content.hero.eyebrow} onChange={(value) => updateHero('eyebrow', value)} /><Field label="Main Title" value={content.hero.title} onChange={(value) => updateHero('title', value)} /><Field label="Highlighted Title" value={content.hero.highlightedTitle} onChange={(value) => updateHero('highlightedTitle', value)} /><Field label="Description" value={content.hero.description} onChange={(value) => updateHero('description', value)} multiline /></div><div className="admin-form-section-title">Buttons</div><div className="admin-form-grid"><Field label="Primary Button Text" value={content.hero.primaryButton.label} onChange={(value) => updateButton('primaryButton', 'label', value)} /><Field label="Primary Button Link" value={content.hero.primaryButton.href} onChange={(value) => updateButton('primaryButton', 'href', value)} /><Field label="Secondary Button Text" value={content.hero.secondaryButton.label} onChange={(value) => updateButton('secondaryButton', 'label', value)} /><Field label="Secondary Button Link" value={content.hero.secondaryButton.href} onChange={(value) => updateButton('secondaryButton', 'href', value)} /></div><div className="admin-form-section-title">Intro Image</div><div className="admin-upload"><div className="admin-image-preview">{content.hero.image ? <img src={content.hero.image} alt="About intro preview" /> : <div><ImagePlus size={22} /><span>No image uploaded</span></div>}</div><div className="admin-upload-info"><strong>{content.hero.image ? 'Current intro image' : 'Add an About intro image'}</strong><p>PNG or WebP · 1200×700 or larger · transparent preferred</p><div className="admin-upload-actions"><label className="admin-small-button"><Upload size={14} />{content.hero.image ? 'Replace Image' : 'Upload Image'}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => uploadHero(event.target.files?.[0])} /></label>{content.hero.image && <button className="admin-quiet-button" onClick={() => updateHero('image', '')}><X size={14} />Remove</button>}</div></div></div></div>}</div>{sections.map((section) => <div className="admin-card admin-accordion-card" key={section}><button className="admin-accordion-trigger" onClick={() => setOpenSection(openSection === section ? '' : section)}><span>{openSection === section ? <ChevronDown size={17} /> : <ChevronRight size={17} />}<strong>{section}</strong></span><small>{section === 'Team' ? 'Managed in JSON' : 'Prepared section'}</small></button>{openSection === section && section === 'Team' && <div className="admin-accordion-panel"><p>Team members on Home and About are managed in <code>src/data/team.json</code>. Edit names, roles, image paths, LinkedIn URLs and display order there. Add photos to <code>public/images/team/</code>.</p></div>}</div>)}</section><aside className="admin-preview-column"><div className="admin-preview-heading"><div><span className="admin-kicker">LIVE PREVIEW</span><h2>About Intro</h2></div><span><Info size={14} />Updates instantly</span></div><HeroPreview content={content} /></aside></div><div className="admin-save-bar"><span className={`admin-status admin-status-${saveState}`}>{saveState === 'saving' ? 'Saving...' : saveState === 'saved' ? 'Saved successfully' : saveState === 'error' ? 'Error saving changes' : 'Changes are local until saved'}</span><button className="admin-save-button" onClick={save} disabled={saveState === 'saving'}><Save size={16} />{saveState === 'saving' ? 'Saving...' : 'Save Changes'}</button></div></main>
}
