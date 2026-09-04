import React from 'react';
import { ExternalLink, ShieldCheck, Mail, Info, DollarSign } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  logoText: string;
  logoColor: string;
  description: string;
  category: string;
  pricing: string;
  url: string;
  deal?: string;
  approved?: boolean;
}

interface ToolCardProps {
  tool: Tool;
  index: number;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const handleButtonClick = (e: React.MouseEvent) => {
    // If it is our special sponsored slot placeholder, prevent the blank page link trap
    if (tool.id === 'sponsored-slot-placeholder') {
      e.preventDefault();
      
      const detailsMessage = `
🌟 NOVATOOLS HUB SPONSORSHIP DESK 🌟

Thank you for your interest in scaling your brand visibility on NovaTools Hub!

■ PLACEMENT DETAILS:
• Position: Top Grid Priority Slot (Maximum user attention)
• Target Audience: 5,000+ Active Global Creators, Developers & SMBs
• Listing Type: Premium Card with Custom Badge Ribbon

■ ADVERTISING RATES:
• 1 Week Premium Feature: ₹2,000 ($25)
• 1 Month Premium Feature: ₹6,500 ($80)

■ HOW TO SECURE YOUR SLOT NOW:
1. Copy our business helpdesk email address below.
2. Email us your Tool Name, Logo Asset, and a 2-sentence pitch text.
3. Our curation team will review your application and share secure payment checkout routes immediately.

📩 OFFICIAL BUSINESS CONTACT:
mahakaalstudio.dev@gmail.com

Click 'OK' to launch your default email client and draft an inquiry instantly!
      `;

      if (window.confirm(detailsMessage)) {
        window.location.href = tool.url;
      }
    }
  };

  return (
    <div className="card-surface relative flex flex-col justify-between p-6 transition-all duration-300">
      {tool.deal && (
        <div className="ribbon-glow absolute -right-2 -top-2 rounded-lg px-2.5 py-1 text-xs font-bold text-black uppercase tracking-wider animate-pulse">
          {tool.deal}
        </div>
      )}

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl font-display text-base font-bold shadow-inner"
              style={{ backgroundColor: `${tool.logoColor}15`, color: tool.logoColor, border: `1px solid ${tool.logoColor}30` }}
            >
              {tool.logoText}
            </div>
            <div>
              <h3 className="font-display font-bold text-white flex items-center gap-1.5 text-base">
                {tool.name}
                {tool.approved && <ShieldCheck className="h-4 w-4 text-cyan-400" />}
              </h3>
              <span className="inline-block mt-0.5 rounded-md bg-ink-800 px-2 py-0.5 text-xs font-medium text-slate-400 border border-ink-700/40">
                {tool.pricing}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-400 mb-6 line-clamp-3">
          {tool.description}
        </p>
      </div>

      <a
        href={tool.url}
        target={tool.id === 'sponsored-slot-placeholder' ? '_self' : '_blank'}
        rel="noreferrer"
        onClick={handleButtonClick}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-300 ${
          tool.id === 'sponsored-slot-placeholder'
            ? 'bg-gradient-to-r from-amber-500 to-orange-600 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:brightness-110'
            : 'bg-ink-800 hover:bg-ink-750 border border-ink-700/50 hover:border-accent-cyan/30'
        }`}
      >
        {tool.id === 'sponsored-slot-placeholder' ? 'Sponsor This Spot ↗' : 'Visit Website ↗'}
      </a>
    </div>
  );
}
