"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    text: "Skyreach saved us during a heat wave! Our AC went out at 10 PM and they had a technician at our door within an hour. Professional, fast, and fairly priced. Highly recommend!",
    author: "Sarah Mitchell",
    role: "Homeowner, Downtown",
    initials: "SM",
  },
  {
    text: "We've used Skyreach for both our home and business HVAC needs for 5 years. Their maintenance plan has saved us thousands in repairs. Truly the best in the business!",
    author: "James Rodriguez",
    role: "Business Owner",
    initials: "JR",
  },
  {
    text: "The team installed a new furnace in our home. They were courteous, cleaned up after themselves, and explained everything thoroughly. Our heating bills have dropped significantly!",
    author: "Emily Patterson",
    role: "Homeowner, Suburbs",
    initials: "EP",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
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
            What Our <span className="text-sky-primary">Customers</span> Say
          </h2>
          <p className="text-gray-600 text-lg">
            Don't just take our word for it. Here's what our satisfied customers have to say about our services.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full relative bg-gray-50 border-0">
                <Quote className="absolute top-4 right-4 h-16 w-16 text-sky-primary/10" />
                <CardContent className="p-8">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  {/* Text */}
                  <p className="text-gray-600 italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h5 className="font-bold text-sky-dark">{testimonial.author}</h5>
                      <span className="text-sm text-gray-500">{testimonial.role}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
