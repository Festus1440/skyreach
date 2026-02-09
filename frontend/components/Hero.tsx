"use client"

import { motion } from "framer-motion"
import { Star, Calendar, Play, Shield, Clock, Award, Snowflake, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1920')",
          opacity: 0.3 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-dark/95 via-sky-dark/70 to-sky-dark/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="accent" className="mb-6 px-4 py-2 text-sm">
              <Star className="h-4 w-4 fill-current" />
              #1 Rated HVAC Service in the Region
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            Stay Comfortable Year-Round with{" "}
            <span className="text-sky-accent">Skyreach</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl"
          >
            Professional heating and cooling services for your home and business. 
            24/7 emergency service available with certified technicians.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
            <Button size="lg" variant="secondary" asChild>
              <a href="#contact">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Service
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-sky-dark"
              asChild
            >
              <a href="#services">
                <Play className="h-5 w-5 mr-2" />
                Our Services
              </a>
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-sky-secondary" />
              </div>
              <span className="font-medium">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-sky-secondary" />
              </div>
              <span className="font-medium">24/7 Emergency</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-sky-secondary" />
              </div>
              <span className="font-medium">Satisfaction Guaranteed</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Cards - Desktop Only */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="hidden xl:block absolute top-1/4 right-[10%] animate-float"
      >
        <div className="bg-white p-5 rounded-2xl shadow-2xl">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white mb-3">
            <Snowflake className="h-6 w-6" />
          </div>
          <h4 className="text-xl font-bold text-sky-primary">AC Repair</h4>
          <p className="text-gray-500 text-sm">Fast & Reliable</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden xl:block absolute bottom-1/4 right-[20%] animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="bg-white p-5 rounded-2xl shadow-2xl">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white mb-3">
            <Flame className="h-6 w-6" />
          </div>
          <h4 className="text-xl font-bold text-sky-primary">Heating</h4>
          <p className="text-gray-500 text-sm">Expert Installation</p>
        </div>
      </motion.div>
    </section>
  )
}
