"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone, Wind, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { sitePhone, sitePhoneTel, siteEmail } from "@/lib/site"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#why-us", label: "About" },
    { href: "#process", label: "Process" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-sky-dark text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span className="hidden sm:inline">Licensed & Insured HVAC Professionals</span>
          <div className="flex items-center gap-6 ml-auto">
            <a href={`tel:${sitePhoneTel()}`} className="flex items-center gap-2 hover:text-sky-accent transition-colors">
              <Phone className="h-4 w-4 text-sky-secondary" />
              {sitePhone}
            </a>
            <a href={`mailto:${siteEmail}`} className="hidden md:flex items-center gap-2 hover:text-sky-accent transition-colors">
              <Mail className="h-4 w-4 text-sky-secondary" />
              {siteEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-white transition-shadow duration-300",
          isScrolled ? "shadow-xl" : "shadow"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white">
                <Wind className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-sky-primary leading-tight">Skyreach</span>
                <span className="text-xs text-gray-500 font-medium">Heating & Cooling</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-800 font-medium hover:text-sky-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-primary after:transition-all hover:after:w-full"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a href={`tel:${sitePhoneTel()}`} className="flex items-center gap-2 text-sky-primary font-semibold text-lg">
                <Phone className="h-5 w-5 animate-pulse" />
                {sitePhone}
              </a>
              <Button asChild>
                <a href="#contact">Get a Free Quote</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-white">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <a href="#" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white">
                  <Wind className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold text-sky-primary">Skyreach</span>
                  <span className="text-xs text-gray-500">Heating & Cooling</span>
                </div>
              </a>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-2xl font-semibold text-gray-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button className="w-full" size="lg" asChild>
                <a href={`tel:${sitePhoneTel()}`} onClick={() => setIsMobileMenuOpen(false)}>
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
