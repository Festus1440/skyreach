"use client"

import { Wind, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const footerLinks = {
  services: [
    { label: "AC Installation", href: "#" },
    { label: "AC Repair", href: "#" },
    { label: "Heating Services", href: "#" },
    { label: "Maintenance", href: "#" },
    { label: "Emergency Service", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Our Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  support: [
    { label: "FAQ", href: "#" },
    { label: "Service Areas", href: "#" },
    { label: "Financing", href: "#" },
    { label: "Warranty", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="bg-sky-dark text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white">
                <Wind className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white">Skyreach</span>
                <span className="text-xs text-white/60">Heating & Cooling</span>
              </div>
            </a>
            <p className="text-white/70 text-sm mb-6">
              Your trusted partner for all heating and cooling needs. Providing exceptional HVAC services with integrity and professionalism since 1999.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-sky-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/70 hover:text-sky-accent transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/70 hover:text-sky-accent transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/70 hover:text-sky-accent transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>&copy; 2024 Skyreach Heating & Cooling. All rights reserved.</p>
          <p>Licensed & Insured | Serving Your Community Since 1999</p>
        </div>
      </div>
    </footer>
  )
}
