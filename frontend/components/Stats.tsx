"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { number: 25000, suffix: "+", label: "Happy Customers" },
  { number: 25, suffix: "", label: "Years Experience" },
  { number: 50, suffix: "+", label: "Expert Technicians" },
  { number: 24, suffix: "/7", label: "Hour Service" },
]

function Counter({ number, suffix }: { number: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = number / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= number) {
          setCount(number)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, number])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-white"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2">
                <Counter number={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-white/90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
