"use client"

import { motion } from "framer-motion"
import { Calendar, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920')",
          opacity: 0.1 
        }}
      />
      <div className="absolute inset-0 bg-gradient-sky" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Experience Perfect Climate Control?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Skyreach for their heating and cooling needs. 
            Get your free quote today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <a href="#contact">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Free Consultation
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-sky-dark"
              asChild
            >
              <a href="tel:+18001234567">
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
