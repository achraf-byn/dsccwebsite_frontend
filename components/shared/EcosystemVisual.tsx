'use client'

import { T } from '@/lib/i18n/LanguageProvider'
import { BrainCircuit, BookOpen, Cloud, Code2, Target, Users } from 'lucide-react'
import Image from 'next/image'
import logoImage from '@/pictures/logo.png'

export default function EcosystemVisual({ className = '' }: { className?: string }) {
  return <div className={`about-ecosystem ${className}`.trim()} aria-label="DSCC ecosystem from students to impact">
    <div className="about-ecosystem-orbit about-ecosystem-orbit-one" /><div className="about-ecosystem-orbit about-ecosystem-orbit-two" />
    <svg className="about-ecosystem-lines" viewBox="0 0 520 460" fill="none" aria-hidden="true"><path d="M93 102C164 143 191 206 260 230S361 283 426 354" /><path d="M426 101C354 143 327 202 260 230S155 282 93 354" /><path d="M260 50V410" /><circle cx="93" cy="102" r="4" /><circle cx="426" cy="101" r="4" /><circle cx="93" cy="354" r="4" /><circle cx="426" cy="354" r="4" /></svg>
    <div className="about-eco-node about-eco-center"><Image src={logoImage} alt="DSCC club logo" width={88} height={88} className="about-eco-logo" /></div>
    <div className="about-eco-node about-eco-students"><Users size={17} /><span><T>Students</T></span></div>
    <div className="about-eco-node about-eco-learn"><BookOpen size={17} /><span><T>Learn</T></span></div>
    <div className="about-eco-node about-eco-build"><Code2 size={17} /><span><T>Build</T></span></div>
    <div className="about-eco-node about-eco-impact"><Target size={17} /><span><T>Impact</T></span></div>
    <div className="about-eco-mini about-eco-ai"><BrainCircuit size={14} /><span><T>AI</T></span></div><div className="about-eco-mini about-eco-cloud"><Cloud size={14} /><span><T>Cloud</T></span></div>
  </div>
}
