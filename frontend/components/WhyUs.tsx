"use client"

import { motion } from "framer-motion"
import { UserCog, DollarSign, Zap, Medal } from "lucide-react"

const features = [
  {
    icon: UserCog,
    title: "Certified Technicians",
    description: "Our NATE-certified technicians undergo continuous training to stay current with the latest HVAC technologies.",
  },
  {
    icon: DollarSign,
    title: "Upfront Pricing",
    description: "No hidden fees or surprises. We provide transparent, honest pricing before any work begins.",
  },
  {
    icon: Zap,
    title: "Same-Day Service",
    description: "We understand HVAC issues can't wait. That's why we offer same-day service for most repairs.",
  },
  {
    icon: Medal,
    title: "Satisfaction Guarantee",
    description: "Your satisfaction is our priority. If you're not happy, we'll make it right - that's our promise.",
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-dark mb-4">
              Why Choose <span className="text-sky-primary">Skyreach</span>?
            </h2>
            <p className="text-gray-600 text-lg mb-10">
              With over 25 years of experience, we've built our reputation on quality workmanship and exceptional customer service.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center text-white shrink-0">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-sky-dark mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800"
              alt="HVAC Technician"
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-sky-primary text-white p-6 rounded-2xl shadow-2xl">
              <div className="text-4xl font-extrabold">25+</div>
              <div className="text-sm opacity-90">Years of<br />Excellence</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
