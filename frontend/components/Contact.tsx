"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "1-800-123-4567",
  },
  {
    icon: Mail,
    title: "Email",
    content: "service@skyreachair.com",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "123 Cool Breeze Ave, HVAC City, ST 12345",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "24/7 Emergency Service Available",
  },
]

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        setIsSubmitted(true)
        e.currentTarget.reset()
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-extrabold text-sky-dark mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-8">
              Have questions or need service? We're here to help. Reach out to us through any of the following channels or fill out the form.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-sky-primary shadow-md">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sky-dark">{item.title}</h5>
                    <p className="text-gray-600 text-sm">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-sky-dark mb-2">Thank You!</h4>
                  <p className="text-gray-600">Your message has been sent. We'll contact you shortly.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-sky-dark mb-2">First Name</label>
                      <Input name="firstName" placeholder="John" required />
                    </div>
                    <div>
                      <label className="block font-semibold text-sky-dark mb-2">Last Name</label>
                      <Input name="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-sky-dark mb-2">Email</label>
                      <Input name="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <div>
                      <label className="block font-semibold text-sky-dark mb-2">Phone</label>
                      <Input name="phone" placeholder="(555) 123-4567" required />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-sky-dark mb-2">Service Needed</label>
                    <Select name="service" required>
                      <option value="">Select a service</option>
                      <option value="ac-install">AC Installation</option>
                      <option value="ac-repair">AC Repair</option>
                      <option value="heating">Heating Services</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="emergency">Emergency Service</option>
                      <option value="commercial">Commercial HVAC</option>
                      <option value="other">Other</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block font-semibold text-sky-dark mb-2">Message</label>
                    <Textarea name="message" placeholder="Tell us about your HVAC needs..." />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    <Send className="h-5 w-5 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
