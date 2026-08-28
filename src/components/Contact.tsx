import React, { useState } from 'react';
import { Circle, Check } from 'lucide-react';
import './Contact.css';

const TwitterIcon = ({ size, strokeWidth }: any) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const InstagramIcon = ({ size, strokeWidth }: any) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const LinkedinIcon = ({ size, strokeWidth }: any) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

const SIDE_PROFILE_IMAGE = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_135737_0da59642-725b-451a-997b-b0283d95a42a.png&w=1280&q=85"; 
const SERVICES = ['Website', 'Mobile App', 'Web App', 'E-Commerce', 'Visual Identity', '3D & Motion'];

const SocialBtn = ({ icon: Icon, bgClass, textClass }: { icon: any, bgClass: string, textClass: string }) => (
  <button className={`contact-social-btn ${bgClass} ${textClass}`}>
    <Icon size={13} strokeWidth={2.5} />
  </button>
);

export default function Contact() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/atharvjhs2610@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message,
          services: selected.join(', '),
          _subject: "New Contact Form Submission from Portfolio"
        })
      });

      if (response.ok) {
        setSent(true);
      } else {
        console.error("Form submission failed");
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please check your connection.");
    } finally {
      setSending(false);
    }
  };

  const toggleService = (srv: string) => {
    setSelected(prev => 
      prev.includes(srv) ? prev.filter(x => x !== srv) : [...prev, srv]
    );
  };

  return (
    <section id="contact" className="contact-root">
      <div className="contact-card-wrapper">
        
        {/* Background Image */}
        <img 
          src={SIDE_PROFILE_IMAGE} 
          alt="Cyberpunk Side Profile" 
          className="contact-bg-img"
        />
        
        {/* Dark overlay for better text readability */}
        <div className="contact-overlay" />

        {/* Content layer */}
        <div className="contact-content">
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            {/* Headline */}
            <p className="contact-headline">
              We craft bold ideas<br />
              and ship them as <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>products</span>
            </p>
          </div>

          {/* Contact Form Card */}
          <div className="contact-form-container">
            <div className="contact-form-card">
              
              {sent ? (
                <div className="contact-success-state">
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '9999px', backgroundColor: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80' }}>
                    <Check size={24} strokeWidth={3} />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'white', margin: 0 }}>You're all set!</h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>Expect a reply within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 className="contact-hello-title">Say hello! 👋</h3>

                  {/* Email + Socials */}
                  <div className="contact-social-row">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem', overflow: 'hidden' }}>
                      <span style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 600, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>Drop us a line</span>
                      <a href="mailto:atharvjhs2610@gmail.com" className="contact-email-link" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>atharvjhs2610@gmail.com</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
                      <SocialBtn icon={TwitterIcon} bgClass="bg-white/5" textClass="text-white" />
                      <SocialBtn icon={Circle} bgClass="bg-pink-500/10" textClass="text-pink-400" />
                      <SocialBtn icon={InstagramIcon} bgClass="bg-orange-500/10" textClass="text-orange-400" />
                      <SocialBtn icon={LinkedinIcon} bgClass="bg-blue-500/10" textClass="text-blue-400" />
                    </div>
                  </div>

                  {/* OR divider */}
                  <div className="contact-divider">
                    <div className="contact-divider-line" />
                    <span style={{ color: '#9ca3af', fontWeight: 500, fontSize: '0.75rem' }}>OR</span>
                    <div className="contact-divider-line" />
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="contact-form">
                    <label className="contact-label">Tell us about your vision</label>
                    
                    <div className="contact-input-row">
                      <input 
                        type="text" 
                        placeholder="Full name" 
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="contact-input" 
                      />
                      <input 
                        type="email" 
                        placeholder="Email" 
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="contact-input" 
                      />
                    </div>
                    
                    <textarea 
                      rows={4} 
                      placeholder="What are you looking to build or improve..." 
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="contact-input contact-textarea" 
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#374151' }}>I need help with...</span>
                      <div className="contact-services-tags">
                        {SERVICES.map(srv => {
                          const isActive = selected.includes(srv);
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => toggleService(srv)}
                              className={`contact-tag-btn ${isActive ? 'active' : ''}`}
                            >
                              {srv}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={sending}
                      className="contact-submit-btn"
                    >
                      {sending ? 'Sending...' : 'Send my message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
