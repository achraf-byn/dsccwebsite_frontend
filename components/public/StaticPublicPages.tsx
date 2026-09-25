'use client'

import { useState } from 'react'
import { T } from '@/lib/i18n/LanguageProvider'
import { motion } from 'framer-motion'
import { MessageCircle, Send, AlertCircle } from 'lucide-react'
import { SiInstagram } from 'react-icons/si'
import { FaLinkedinIn, FaTiktok } from 'react-icons/fa6'
import { clubData } from '@/lib/club'

export function ContactPage() {
  const [fromEmail, setFromEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedFrom = fromEmail.trim()
    const trimmedSubject = subject.trim()
    const trimmedMessage = message.trim()
    const recipientEmail = clubData.email ? clubData.email.trim() : ''

    if (!recipientEmail) {
      setError('Club email address is not configured.')
      return
    }

    if (!trimmedFrom) {
      setError('Please enter your email address.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedFrom)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!trimmedSubject) {
      setError('Please enter a subject.')
      return
    }

    if (!trimmedMessage) {
      setError('Please enter your message.')
      return
    }

    setError('')

    const bodyContent = `Hello ${clubData.shortName || 'DSCC'} Team,

${trimmedMessage}

From: ${trimmedFrom}

Best regards`

    const encodedSubject = encodeURIComponent(trimmedSubject)
    const encodedBody = encodeURIComponent(bodyContent)

    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodedSubject}&body=${encodedBody}`

    window.location.href = mailtoUrl
  }

  return (
    <main className="hub-page hub-contact">
      <section className="hub-hero">
        <div className="hub-shell hub-hero-inner">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48 }}>
            <span className="about-eyebrow"><MessageCircle size={14} /><T> CONTACT</T></span>
            <h1><T>Let&apos;s Connect.</T></h1>
            <p><T>Have a question, an idea or something you would like to build with DSCC? Start the conversation through our official community channel.</T></p>
          </motion.div>
        </div>
      </section>

      <section className="contact-content">
        <div className="hub-shell">
          {/* Main Contact Form Card */}
          <div className="contact-card-form">
            <div className="contact-card-header">
              <span className="about-eyebrow"><T>GET IN TOUCH</T></span>
              <h2><T>Bring your curiosity.</T></h2>
              <p><T>Have a question, idea or collaboration in mind? Send us a message.</T></p>
            </div>

            <form className="contact-form" onSubmit={handleSendEmail}>
              <div className="contact-field">
                <label htmlFor="contact-from"><T>From</T></label>
                <input
                  id="contact-from"
                  type="email"
                  placeholder="your@email.com"
                  value={fromEmail}
                  onChange={(e) => { setFromEmail(e.target.value); if (error) setError(''); }}
                  className="contact-input"
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-to"><T>To</T></label>
                <input
                  id="contact-to"
                  type="email"
                  value={clubData.email || ''}
                  placeholder={clubData.email ? undefined : 'Not configured'}
                  readOnly
                  className="contact-input contact-input-readonly"
                  tabIndex={-1}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject"><T>Subject</T></label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="What would you like to talk about?"
                  value={subject}
                  onChange={(e) => { setSubject(e.target.value); if (error) setError(''); }}
                  className="contact-input"
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message"><T>Message</T></label>
                <textarea
                  id="contact-message"
                  rows={6}
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); if (error) setError(''); }}
                  className="contact-textarea"
                  required
                />
              </div>

              {error && (
                <div className="contact-error">
                  <AlertCircle size={16} />
                  <span><T>{error}</T></span>
                </div>
              )}

              <div className="contact-form-actions">
                <button type="submit" className="hero-button hero-button-primary contact-send-button">
                  <T>Send Email</T> <Send size={15} style={{ marginLeft: 6 }} />
                </button>
              </div>
            </form>
          </div>

          {/* Social Section */}
          <div className="contact-social-section">
            <span className="about-eyebrow"><T>CONNECT WITH US</T></span>
            <div className="contact-social-grid">
              {clubData.socials.instagram ? (
                <a
                  href={clubData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                  aria-label="Instagram"
                >
                  <SiInstagram size={18} />
                  <span>Instagram</span>
                </a>
              ) : (
                <span className="contact-social-btn is-disabled" aria-label="Instagram link not configured">
                  <SiInstagram size={18} />
                  <span>Instagram</span>
                </span>
              )}

              {clubData.socials.linkedin ? (
                <a
                  href={clubData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={18} />
                  <span>LinkedIn</span>
                </a>
              ) : (
                <span className="contact-social-btn is-disabled" aria-label="LinkedIn link not configured">
                  <FaLinkedinIn size={18} />
                  <span>LinkedIn</span>
                </span>
              )}

              {clubData.socials.tiktok ? (
                <a
                  href={clubData.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                  aria-label="TikTok"
                >
                  <FaTiktok size={18} />
                  <span>TikTok</span>
                </a>
              ) : (
                <span className="contact-social-btn is-disabled" aria-label="TikTok link not configured">
                  <FaTiktok size={18} />
                  <span>TikTok</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
