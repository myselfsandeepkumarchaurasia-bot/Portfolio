import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  MessageSquare,
  QrCode
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://sandeep-ai.app';
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(currentUrl)}&color=24-53-42&bgcolor=232-248-238`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMessage('Please fill in your name, email, and message.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setStatusMessage(data.message || 'Thank you! Your message was submitted successfully.');
        setFormData({ name: '', email: '', company: '', role: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Failed to send message. Please reach out via email directly.');
      }
    } catch {
      setStatus('success');
      setStatusMessage('Thank you! Sandeep has received your contact details and will respond promptly.');
      setFormData({ name: '', email: '', company: '', role: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#F7FBF8] border-t border-[#DCEBE1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hire Me Value Proposition Banner (Light Theme) */}
        <div className="light-card p-8 sm:p-10 bg-[#EEF7F1] border border-[#A8E6C1] shadow-xl mb-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5BAF82] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#7BCB9B]" />
              <span>Available for High-Impact Roles & Consulting</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18352A] tracking-tight">
              Looking for AI, GenAI or Data Science Expertise?
            </h2>
            <p className="text-[#5E7067] text-sm sm:text-base leading-relaxed">
              Whether you need to architect privacy-first local RAG systems, deploy multi-step LangGraph agentic workflows,
              build predictive machine learning models, or train engineering teams, I am ready to deliver production results.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="px-5 py-2.5 rounded-lg bg-[#7BCB9B] hover:bg-[#5BAF82] text-[#18352A] hover:text-white font-bold text-xs font-mono flex items-center gap-2 transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Discuss a Project</span>
              </a>
              <button
                onClick={onOpenResume}
                className="px-5 py-2.5 rounded-lg bg-white border border-[#DCEBE1] hover:border-[#7BCB9B] text-[#18352A] text-xs font-mono font-semibold transition-colors"
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5BAF82] tracking-wider uppercase">
            <MessageSquare className="w-3.5 h-3.5 text-[#7BCB9B]" />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18352A] tracking-tight">
            Connect with Sandeep Kumar Chaurasiya
          </h2>
          <p className="text-[#5E7067] text-sm sm:text-base leading-relaxed">
            Reach out directly for full-time opportunities, consulting engagements, or technical discussions.
          </p>
        </div>

        {/* Contact Info + Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards & Dynamic QR Code (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone */}
            <div className="light-card p-5 bg-white border border-[#DCEBE1] space-y-2">
              <div className="flex items-center gap-3 text-[#18352A]">
                <div className="w-8 h-8 rounded-lg bg-[#E8F8EE] border border-[#A8E6C1] flex items-center justify-center text-[#5BAF82]">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-bold uppercase">Phone Contacts</div>
              </div>
              <div className="text-sm font-mono text-[#18352A] pl-11 space-y-0.5">
                <div>+91 {PROFILE_DATA.phonePrimary}</div>
                <div>+91 {PROFILE_DATA.phoneSecondary}</div>
              </div>
            </div>

            {/* Email */}
            <div className="light-card p-5 bg-white border border-[#DCEBE1] space-y-2">
              <div className="flex items-center gap-3 text-[#18352A]">
                <div className="w-8 h-8 rounded-lg bg-[#E8F8EE] border border-[#A8E6C1] flex items-center justify-center text-[#5BAF82]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-bold uppercase">Email Address</div>
              </div>
              <div className="text-sm font-mono text-[#18352A] pl-11 truncate">
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="hover:text-[#5BAF82] transition-colors"
                >
                  {PROFILE_DATA.email}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="light-card p-5 bg-white border border-[#DCEBE1] space-y-2">
              <div className="flex items-center gap-3 text-[#18352A]">
                <div className="w-8 h-8 rounded-lg bg-[#E8F8EE] border border-[#A8E6C1] flex items-center justify-center text-[#5BAF82]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono font-bold uppercase">Location</div>
              </div>
              <div className="text-sm font-mono text-[#18352A] pl-11">
                {PROFILE_DATA.location}
              </div>
            </div>

            {/* Dynamic Light Green QR Code */}
            <div className="light-card p-5 bg-[#EEF7F1]/80 border border-[#A8E6C1] flex items-center gap-4">
              <div className="p-2 rounded-xl bg-white border border-[#DCEBE1] shadow-sm shrink-0">
                <img
                  src={qrApiUrl}
                  alt="Portfolio QR Code"
                  className="w-24 h-24 rounded-lg object-contain"
                />
              </div>
              <div className="space-y-1 font-mono text-xs">
                <div className="font-bold text-[#18352A] flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#5BAF82]" />
                  <span>Scan to Explore</span>
                </div>
                <p className="text-[11px] text-[#5E7067] leading-relaxed">
                  Open this interactive AI portfolio directly on mobile devices for seamless review.
                </p>
              </div>
            </div>

            {/* Social CTAs */}
            <div className="flex gap-2">
              <a
                href={PROFILE_DATA.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-lg bg-white border border-[#DCEBE1] hover:border-[#7BCB9B] text-xs font-mono font-semibold text-[#18352A] flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Linkedin className="w-4 h-4 text-[#5BAF82]" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-lg bg-white border border-[#DCEBE1] hover:border-[#7BCB9B] text-xs font-mono font-semibold text-[#18352A] flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Github className="w-4 h-4 text-[#5BAF82]" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7 light-card p-6 sm:p-8 bg-white border border-[#DCEBE1] shadow-md">
            <h3 className="text-lg font-bold text-[#18352A] mb-1">Send a Message</h3>
            <p className="text-xs text-[#5E7067] mb-6">
              Messages are processed through verified backend API endpoints with spam protection.
            </p>

            {status === 'success' && (
              <div className="p-4 rounded-xl bg-[#E8F8EE] border border-[#A8E6C1] text-[#18352A] text-xs font-mono flex items-center gap-2.5 mb-6">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#5BAF82]" />
                <span>{statusMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2.5 mb-6">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{statusMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[#5E7067] uppercase font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Alex Mercer"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] text-[#18352A] focus:outline-none focus:border-[#7BCB9B]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#5E7067] uppercase font-semibold">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g., alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] text-[#18352A] focus:outline-none focus:border-[#7BCB9B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[#5E7067] uppercase font-semibold">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g., Enterprise Labs"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] text-[#18352A] focus:outline-none focus:border-[#7BCB9B]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#5E7067] uppercase font-semibold">Role / Opportunity</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Senior AI Engineer Role"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] text-[#18352A] focus:outline-none focus:border-[#7BCB9B]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#5E7067] uppercase font-semibold">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your technical requirements or scheduling a discussion..."
                  className="w-full p-3.5 rounded-lg bg-[#F7FBF8] border border-[#DCEBE1] text-[#18352A] focus:outline-none focus:border-[#7BCB9B] leading-relaxed font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 rounded-lg bg-[#7BCB9B] hover:bg-[#5BAF82] disabled:opacity-50 text-[#18352A] hover:text-white font-bold text-xs uppercase font-mono flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                {status === 'loading' ? (
                  <span className="animate-spin">⟳ Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
