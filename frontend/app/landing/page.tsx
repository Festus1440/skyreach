"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { 
  Phone, 
  Clock, 
  Shield, 
  Star, 
  CheckCircle2, 
  AlertTriangle,
  Thermometer,
  DollarSign,
  Calendar,
  ArrowRight,
  X,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
  Truck,
  Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sitePhone, sitePhoneTel } from "@/lib/site"
import { API_BASE_URL } from "@/lib/api"

// Exit Intent Popup Component
function ExitIntentPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [phone, setPhone] = useState("")
  
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-md w-full p-6 relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              <Clock className="w-4 h-4" />
              Wait! Don&apos;t Leave Empty Handed
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Get $50 Off Your Service
            </h3>
            <p className="text-gray-600 mb-6">
              Enter your phone number now and receive an instant <span className="font-bold text-red-600">$50 discount</span> on any repair or installation. Limited time offer!
            </p>
            
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 text-lg"
              />
              <Button 
                type="submit"
                className="w-full h-12 text-lg bg-red-600 hover:bg-red-700"
              >
                Claim My $50 Discount
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
            
            <p className="text-xs text-gray-400 mt-4">
              No spam. We&apos;ll call within 5 minutes.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// FAQ Accordion Item
function FAQItem({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-slate-900 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-sky-600 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-5 text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LandingPage() {
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  const [isSticky, setIsSticky] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "", zip: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  
  const { scrollYProgress } = useScroll()
  const funnelScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])
  const funnelOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5])

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('exitPopupShown')) {
        setShowExitPopup(true)
        localStorage.setItem('exitPopupShown', 'true')
      }
    }
    
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  // Sticky CTA detection
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setIsSubmitting(true)
    const trimmedName = formData.name.trim()
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: trimmedName,
          lastName: "",
          email: "",
          phone: formData.phone,
          zip: formData.zip,
          source: "landing",
        }),
      })
      const result = await response.json()
      if (result.success) {
        setIsSubmitted(true)
      } else {
        setSubmitError(result.message || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqs = [
    {
      question: "How quickly can you come to my home?",
      answer: "We offer same-day service for most calls and 24/7 emergency service. Our average response time is under 2 hours for emergency calls."
    },
    {
      question: "Do you offer financing options?",
      answer: "Yes! We offer flexible financing options with approved credit. We also have special promotions with 0% APR for qualified buyers."
    },
    {
      question: "What brands do you service?",
      answer: "We service ALL major brands including Carrier, Trane, Lennox, Goodman, Rheem, Bryant, and more. Our technicians are trained on every major system."
    },
    {
      question: "Is there a service call fee?",
      answer: "We waive the service call fee with any repair! Plus, we offer FREE estimates on new system installations. No hidden fees ever."
    },
    {
      question: "Do you offer a warranty?",
      answer: "Absolutely! All our repairs come with a 2-year parts and labor warranty. New installations include up to 10-year manufacturer warranties."
    }
  ]

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Exit Intent Popup */}
      <ExitIntentPopup isOpen={showExitPopup} onClose={() => setShowExitPopup(false)} />
      
      {/* Sticky CTA Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: isSticky ? 0 : -100 }}
        className="fixed top-0 left-0 right-0 z-50 bg-sky-600 text-white py-3 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 animate-pulse" />
            <span className="font-bold">Call Now: {sitePhone}</span>
          </div>
          <Button 
            size="sm" 
            className="bg-white text-sky-600 hover:bg-gray-100"
            onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Free Quote
          </Button>
        </div>
      </motion.div>

      {/* Hero Section with Funnel Effect */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 overflow-hidden">
        {/* Animated Background Elements - Funnel Perspective */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-sky-500/20 rounded-full"
              style={{
                width: `${(i + 1) * 300}px`,
                height: `${(i + 1) * 300}px`,
                left: '50%',
                top: '60%',
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Urgency Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold mb-6 shadow-lg"
              >
                <Clock className="w-5 h-5 animate-pulse" />
                <span>Limited: 7 Same-Day Appointments Left</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Is Your AC Broken? 
                <span className="text-sky-400 block mt-2">
                  We Fix It Today — Guaranteed!
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8">
                Don&apos;t suffer in the heat. Our certified technicians are standing by with 
                <span className="text-white font-bold"> same-day service </span> 
                and a <span className="text-white font-bold">100% satisfaction guarantee</span>.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-semibold">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <BadgeCheck className="w-5 h-5 text-sky-400" />
                  <span className="text-white font-semibold">25+ Years Experience</span>
                </div>
              </div>

              {/* Feature List */}
              <div className="space-y-3 mb-8">
                {[
                  "Same-day service available now",
                  "Upfront pricing — no hidden fees",
                  "24/7 emergency service",
                  "$50 off any repair (mention this ad)"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 text-gray-200"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Form - The Conversion Funnel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ perspective: 1000 }}
            >
              <div 
                id="quote-form"
                className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-sky-400"
              >
                {!isSubmitted ? (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        Get Your Free Quote
                      </h2>
                      <p className="text-gray-600">
                        Takes 30 seconds. No obligation.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {submitError && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                          {submitError}
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <Input
                          required
                          placeholder="John Smith"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <Input
                          required
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                          ZIP Code *
                        </label>
                        <Input
                          required
                          placeholder="12345"
                          value={formData.zip}
                          onChange={(e) => setFormData({...formData, zip: e.target.value})}
                          className="h-12"
                        />
                      </div>

                      <Button 
                        type="submit"
                        className="w-full h-14 text-lg bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transition-all"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Processing...
                          </span>
                        ) : (
                          <>
                            Get My Free Quote Now
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>

                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">
                        By submitting, you agree to receive calls/texts. 
                        <span className="block mt-1">We respect your privacy.</span>
                      </p>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      A technician will call you within <span className="font-bold text-sky-600">5 minutes</span>.
                    </p>
                    <div className="bg-sky-50 p-4 rounded-lg">
                      <p className="text-sm text-sky-800 font-semibold">
                        Mention code: COOL50 for $50 off!
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Social Proof Below Form */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">4.9/5 from 2,500+ reviews</span>
                  </div>
                  <p className="text-center text-xs text-gray-500">
                    &quot;Fixed my AC in 2 hours!&quot; — Sarah M.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Problem Section - The Hook */}
      <section className="py-20 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              A Broken AC Isn&apos;t Just Uncomfortable...
              <span className="block text-red-600 mt-2">It&apos;s an Emergency!</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: Thermometer, title: "Health Risk", desc: "Heat exhaustion & dehydration" },
                { icon: DollarSign, title: "Higher Bills", desc: "Inefficient systems cost more" },
                { icon: AlertTriangle, title: "Further Damage", desc: "Small issues become costly repairs" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <item.icon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Skyreach Solution
            </h2>
            <p className="text-xl text-gray-600">
              Fast, reliable HVAC service that puts you first
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Clock, 
                title: "Same-Day Service", 
                desc: "We&apos;re at your door within hours, not days. Emergency? We&apos;re there in 60 minutes or less." 
              },
              { 
                icon: Shield, 
                title: "Fixed Right Guarantee", 
                desc: "If we don&apos;t fix it right the first time, we come back free. No questions asked." 
              },
              { 
                icon: DollarSign, 
                title: "No Surprises Pricing", 
                desc: "You approve the price before we start. No hidden fees, ever." 
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8"
              >
                <div className="w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Funnel Steps */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Get Cool Air in 3 Easy Steps
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { step: "1", title: "Call or Fill Form", desc: "Takes 30 seconds. We answer 24/7." },
              { step: "2", title: "We Diagnose Free", desc: "Tech arrives, finds the problem, gives upfront price." },
              { step: "3", title: "You Relax in Cool Air", desc: "We fix it fast. You&apos;re happy or we make it right." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-md"
              >
                <div className="w-16 h-16 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-sky-600 ml-auto hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Join 25,000+ Happy Customers
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                location: "Phoenix, AZ",
                text: "AC went out at 2 PM, they were here by 4 PM. Fixed in an hour. Amazing service!",
                rating: 5
              },
              {
                name: "Mike T.",
                location: "Scottsdale, AZ",
                text: "Honest pricing, no upselling. The technician explained everything. Highly recommend!",
                rating: 5
              },
              {
                name: "Jennifer L.",
                location: "Tempe, AZ",
                text: "Best HVAC company I&apos;ve ever used. Fast, professional, and fairly priced.",
                rating: 5
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 p-6 rounded-2xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&quot;{review.text}&quot;</p>
                <div>
                  <p className="font-bold text-slate-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-gray-200">
            {[
              { icon: BadgeCheck, label: "Licensed & Insured" },
              { icon: Award, label: "BBB A+ Rated" },
              { icon: Truck, label: "Same-Day Service" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-600">
                <badge.icon className="w-6 h-6 text-sky-600" />
                <span className="font-semibold">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Handle Objections */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === i}
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sky-600 to-sky-800 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-white rounded-full"
              style={{
                width: `${(i + 1) * 400}px`,
                height: `${(i + 1) * 400}px`,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5 + i, repeat: Infinity }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Your AC Fixed?
            </h2>
            <p className="text-xl text-sky-100 mb-8">
              Don&apos;t wait until it&apos;s too late. Get your free quote now and save $50!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="h-16 text-xl px-12 bg-red-500 hover:bg-red-600 shadow-2xl"
                asChild
              >
                <a href={`tel:${sitePhoneTel()}`}>
                  <Phone className="w-6 h-6 mr-2" />
                  Call {sitePhone}
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-16 text-xl px-12 border-2 border-white text-white hover:bg-white hover:text-sky-600"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Calendar className="w-6 h-6 mr-2" />
                Get Free Quote
              </Button>
            </div>

            <p className="text-sky-200 mt-6">
              <Clock className="w-5 h-5 inline mr-2" />
              Emergency service available 24/7 • Average response: 2 hours
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Skyreach Heating & Cooling. All rights reserved. | 
            Licensed & Insured | Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>
    </main>
  )
}
