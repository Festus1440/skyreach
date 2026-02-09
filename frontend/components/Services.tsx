"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    title: "AC Installation & Replacement",
    description: "Expert installation of energy-efficient air conditioning systems. We help you choose the right unit for your space and budget.",
    image: "https://images.unsplash.com/photo-1631545308772-81a0e0a3a6eb?w=600",
  },
  {
    title: "AC Repair & Maintenance",
    description: "Fast, reliable repairs for all AC brands. Our maintenance plans keep your system running efficiently year after year.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600",
  },
  {
    title: "Heating Services",
    description: "Complete heating solutions including furnace installation, heat pump services, and boiler repairs for cozy winters.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
  },
  {
    title: "Indoor Air Quality",
    description: "Improve your home's air quality with our air purifiers, humidifiers, and ventilation solutions for healthier living.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600",
  },
  {
    title: "Commercial HVAC",
    description: "Full-service commercial heating and cooling for businesses of all sizes. Minimize downtime with our expert team.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600",
  },
  {
    title: "24/7 Emergency Service",
    description: "HVAC emergencies don't wait. Our technicians are available around the clock to restore your comfort quickly.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-dark mb-4">
            Our <span className="text-sky-primary">Services</span>
          </h2>
          <p className="text-gray-600 text-lg">
            From installation to emergency repairs, we provide comprehensive HVAC solutions tailored to your needs.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full">
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-sky-dark mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sky-primary font-semibold hover:gap-3 transition-all"
                  >
                    Learn More <ArrowRight className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
