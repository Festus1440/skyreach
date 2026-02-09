"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "1",
    title: "Book Online",
    description: "Schedule your appointment online or call us directly. We offer flexible scheduling to fit your busy life.",
  },
  {
    number: "2",
    title: "Free Diagnosis",
    description: "Our technician arrives on time, diagnoses the issue, and provides a transparent quote with no obligation.",
  },
  {
    number: "3",
    title: "Expert Service",
    description: "We complete the work efficiently using quality parts and following industry best practices.",
  },
  {
    number: "4",
    title: "Enjoy Comfort",
    description: "Sit back and enjoy your perfectly climate-controlled space with our satisfaction guarantee.",
  },
]

export default function Process() {
  return (
    <section id="process" className="py-24 bg-gray-50">
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
            Our Simple <span className="text-sky-primary">Process</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Getting the HVAC service you need is easy with our streamlined four-step process.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-sky-primary to-sky-accent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center relative z-10"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold text-sky-primary shadow-lg border-4 border-sky-primary">
                  {step.number}
                </div>
                <h4 className="text-xl font-bold text-sky-dark mb-3">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
