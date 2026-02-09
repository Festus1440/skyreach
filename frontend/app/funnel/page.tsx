"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Wind, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Clock,
  Shield,
  Star,
  Phone,
  ArrowRight,
  Flame,
  Home,
  Building2,
  Calendar,
  Zap,
  BadgeCheck,
  Thermometer,
  DollarSign,
  Wrench,
  AlertTriangle,
  AlertCircle,
  Filter,
  Ruler
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Types
interface Question {
  id: number
  type: 'single' | 'contact' | 'filter' | 'result'
  question: string
  subtitle?: string
  options?: Option[]
  icon?: React.ElementType
}

interface Option {
  value: string
  label: string
  icon?: React.ElementType
  description?: string
}

// Maintenance checklists based on system type
const maintenanceChecklists: Record<string, string[]> = {
  'gas-furnace': [
    "Burner cleaning & inspection",
    "Flame sensor cleaning",
    "Pressure switch cleanup",
    "Ignitor & ignition timing check",
    "CO2 and gas leak detection",
    "Flame rectification timing",
    "Exhaust & venting inspection",
    "Filter replacement"
  ],
  'electric-furnace': [
    "Check electrical safety",
    "Inspect heat elements",
    "Confirm strong airflow",
    "Verify safe temperatures",
    "Test safety shutoffs",
    "Check electrical connections",
    "Inspect blower motor",
    "Filter replacement"
  ],

  'not-sure': [
    "Complete system inspection",
    "Safety check all components",
    "Clean applicable parts",
    "Verify safe operation",
    "Filter replacement",
    "Performance testing",
    "Written condition report",
    "Maintenance recommendations"
  ]
}

// Filter sizes
const filterSizes = [
  { value: '16x25x1', label: '16x25x1', description: 'Most common' },
  { value: '20x25x1', label: '20x25x1', description: 'Standard' },
  { value: '14x25x1', label: '14x25x1', description: 'Compact' },
  { value: '16x20x1', label: '16x20x1', description: 'Small systems' },
  { value: '20x20x1', label: '20x20x1', description: 'Medium' },
  { value: 'not-sure', label: "Not Sure", description: "We'll check for you" },
  { value: 'other', label: 'Other Size', description: 'Enter custom size' },
]

// Questions Data
const questions: Question[] = [
  {
    id: 1,
    type: 'single',
    question: "What type of heating system?",
    subtitle: "We'll customize your maintenance checklist",
    icon: Flame,
    options: [
      { value: 'gas-furnace', label: 'Gas Furnace', icon: Flame, description: 'Natural gas or propane' },
      { value: 'electric-furnace', label: 'Electric Furnace', icon: Zap, description: 'Electric powered heating' },
      { value: 'not-sure', label: 'Not Sure', icon: AlertTriangle, description: "We'll identify it for you" },
    ]
  },
  {
    id: 2,
    type: 'filter',
    question: "What size filter do you need?",
    subtitle: "We'll bring the right replacement filter",
    icon: Filter,
  },
  {
    id: 3,
    type: 'single',
    question: "When did you last service it?",
    subtitle: "Regular maintenance prevents costly breakdowns",
    icon: Calendar,
    options: [
      { value: 'never', label: 'Never / Not Sure', icon: AlertTriangle, description: '$125 maintenance special perfect for you' },
      { value: 'over-year', label: 'Over 1 Year Ago', icon: Calendar, description: 'Overdue for maintenance' },
      { value: '6-12-months', label: '6-12 Months', icon: Calendar, description: 'Getting close to schedule' },
      { value: 'under-6-months', label: 'Under 6 Months', icon: CheckCircle2, description: 'Recently serviced' },
    ]
  },
  {
    id: 4,
    type: 'single',
    question: "Any current issues?",
    subtitle: "We'll check everything during your $125 maintenance",
    icon: Wrench,
    options: [
      { value: 'no-issues', label: 'No Issues', icon: CheckCircle2, description: 'Preventive maintenance' },
      { value: 'strange-noises', label: 'Strange Noises', icon: AlertTriangle, description: 'Banging, squealing, rattling' },
      { value: 'not-heating-well', label: 'Not Heating Well', icon: Thermometer, description: 'Uneven or weak heat' },
      { value: 'high-bills', label: 'High Energy Bills', icon: DollarSign, description: 'Costs rising each month' },
      { value: 'frequent-cycling', label: 'Frequent Cycling', icon: Zap, description: 'Turns on/off constantly' },
    ]
  },
  {
    id: 5,
    type: 'single',
    question: "Property type?",
    subtitle: "$125 special applies to all residential properties",
    icon: Home,
    options: [
      { value: 'single-family', label: 'Single Family Home', icon: Home, description: 'Detached house' },
      { value: 'townhouse', label: 'Townhouse/Duplex', icon: Home, description: 'Shared wall property' },
      { value: 'condo', label: 'Condo/Apartment', icon: Building2, description: 'Multi-unit building' },
      { value: 'mobile', label: 'Mobile Home', icon: Home, description: 'Manufactured home' },
    ]
  },
  {
    id: 6,
    type: 'single',
    question: "How soon do you need service?",
    subtitle: "Limited spots available at $125 price",
    icon: Clock,
    options: [
      { value: 'asap', label: 'ASAP', icon: Zap, description: 'This week if possible' },
      { value: 'this-month', label: 'This Month', icon: Calendar, description: 'Within 30 days' },
      { value: 'next-month', label: 'Next Month', icon: Calendar, description: 'Planning ahead' },
      { value: 'flexible', label: 'Flexible', icon: Calendar, description: 'When you have availability' },
    ]
  },
  {
    id: 7,
    type: 'contact',
    question: "Claim your $125 maintenance!",
    subtitle: "Enter your details to lock in this price. Limited time offer.",
    icon: BadgeCheck,
  }
]

// Progress Bar Component
function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = ((current + 1) / total) * 100
  
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  )
}

// Single Choice Card
function OptionCard({ 
  option, 
  isSelected, 
  onClick,
  index 
}: { 
  option: Option
  isSelected: boolean
  onClick: () => void
  index: number
}) {
  const Icon = option.icon
  
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 group ${
        isSelected 
          ? 'border-orange-500 bg-orange-50 shadow-lg' 
          : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-orange-100'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div className="flex-1">
          <div className="font-semibold text-slate-900">{option.label}</div>
          {option.description && (
            <div className="text-sm text-gray-500">{option.description}</div>
          )}
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
        }`}>
          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
        </div>
      </div>
    </motion.button>
  )
}

// Filter Size Step
function FilterSizeStep({ 
  selectedFilter, 
  onSelect, 
  customSize, 
  onCustomSizeChange 
}: { 
  selectedFilter: string
  onSelect: (value: string) => void
  customSize: string
  onCustomSizeChange: (value: string) => void
}) {
  const showCustomInput = selectedFilter === 'other'

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {filterSizes.map((size, index) => (
          <motion.button
            key={size.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(size.value)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              selectedFilter === size.value
                ? 'border-orange-500 bg-orange-50 shadow-lg'
                : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">{size.label}</div>
                <div className="text-sm text-gray-500">{size.description}</div>
              </div>
              {selectedFilter === size.value && (
                <CheckCircle2 className="w-5 h-5 text-orange-500" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {showCustomInput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4"
        >
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Enter your filter size (e.g., 18x24x2)
          </label>
          <Input
            placeholder="Width x Height x Depth"
            value={customSize}
            onChange={(e) => onCustomSizeChange(e.target.value)}
            className="h-12"
          />
          <p className="text-xs text-gray-500 mt-1">
            Check the side of your current filter for size markings
          </p>
        </motion.div>
      )}
    </div>
  )
}

// Contact Form Step
function ContactStep({ 
  onSubmit, 
  systemType,
  isSubmitting: externalSubmitting,
  submitError,
  fieldErrors
}: { 
  onSubmit: (data: any) => void
  systemType: string
  isSubmitting?: boolean
  submitError?: string
  fieldErrors?: Record<string, string>
}) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', zip: '' })
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Please enter your full name'
    } else if (formData.name.trim().split(' ').length < 2) {
      errors.name = 'Please enter both first and last name (e.g., John Smith)'
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your phone number'
    } else if (!/^[\d\s\-\(\)\+\.]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number (at least 10 digits)'
    }
    
    if (!formData.zip.trim()) {
      errors.zip = 'Please enter your ZIP code'
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      errors.zip = 'Please enter a valid 5-digit ZIP code'
    }
    
    setLocalErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  // Get checklist based on system type
  const checklist = maintenanceChecklists[systemType] || maintenanceChecklists['not-sure']

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl p-6 shadow-xl border-2 border-orange-400"
    >
      {/* Price Lock Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-4 mb-6 text-center">
        <div className="text-sm uppercase tracking-wide opacity-90">Limited Time Offer</div>
        <div className="text-4xl font-extrabold">$125</div>
        <div className="text-lg font-semibold">Complete Furnace Maintenance</div>
        <div className="text-sm opacity-90">Regular price: $199 - You save $74!</div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
          <BadgeCheck className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Lock In Your Price</h3>
          <p className="text-sm text-gray-500">Spots filling fast - claim yours now</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
          <Input
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => {
              setFormData({...formData, name: e.target.value})
              if (localErrors.name) setLocalErrors(prev => ({...prev, name: ''}))
            }}
            className={`h-12 ${(localErrors.name || fieldErrors?.name || fieldErrors?.firstName || fieldErrors?.lastName) ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          {(localErrors.name || fieldErrors?.name || fieldErrors?.firstName || fieldErrors?.lastName) && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {localErrors.name || fieldErrors?.name || fieldErrors?.firstName || fieldErrors?.lastName || 'Please enter your full name (first and last name, e.g. John Smith).'}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
          <Input
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => {
              setFormData({...formData, phone: e.target.value})
              if (localErrors.phone) setLocalErrors(prev => ({...prev, phone: ''}))
            }}
            className={`h-12 ${(localErrors.phone || fieldErrors?.phone) ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          {(localErrors.phone || fieldErrors?.phone) && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {localErrors.phone || fieldErrors?.phone || 'Please enter a valid phone number'}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <Input
              type="email"
              placeholder="john@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`h-12 ${fieldErrors?.email ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {fieldErrors?.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {fieldErrors.email}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ZIP Code *</label>
            <Input
              placeholder="12345"
              value={formData.zip}
              onChange={(e) => {
                setFormData({...formData, zip: e.target.value})
                if (localErrors.zip) setLocalErrors(prev => ({...prev, zip: ''}))
              }}
              className={`h-12 ${(localErrors.zip || fieldErrors?.zip) ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {(localErrors.zip || fieldErrors?.zip) && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {localErrors.zip || fieldErrors?.zip || 'Please enter a valid ZIP code'}
              </p>
            )}
          </div>
        </div>

        {/* Dynamic What's Included */}
        <div className="bg-gray-50 rounded-lg p-4 my-4">
          <div className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Your $125 Maintenance Includes:
          </div>
          <ul className="space-y-1 text-sm text-gray-600 grid grid-cols-2 gap-x-4">
            {checklist.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4"
          >
            {submitError}
          </motion.div>
        )}

        <Button 
          type="submit" 
          className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          disabled={externalSubmitting}
        >
          {externalSubmitting ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Locking in your price...
            </span>
          ) : (
            <>
              Claim My $125 Maintenance
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-1 text-sm text-gray-500">
        <Shield className="w-4 h-4" />
        <span>Secure form • No obligation • Cancel anytime</span>
      </div>
    </motion.div>
  )
}

// Success/Result Step
function SuccessStep({ answers }: { answers: Record<string, string> }) {
  const systemType = answers['1'] || 'not-sure'
  const checklist = maintenanceChecklists[systemType] || maintenanceChecklists['not-sure']

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </motion.div>
      
      <h2 className="text-3xl font-bold text-slate-900 mb-4">
        You&apos;re All Set! 🔥
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Your $125 furnace maintenance is <span className="font-bold text-orange-600">locked in</span>. 
        A technician will call within <span className="font-bold">10 minutes</span> to schedule your appointment.
      </p>

      {/* Confirmed Price */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 max-w-sm mx-auto mb-8">
        <div className="text-sm uppercase tracking-wide opacity-90">Your Confirmed Price</div>
        <div className="text-5xl font-extrabold my-2">$125</div>
        <div className="text-lg">Complete Furnace Maintenance</div>
        <div className="mt-3 pt-3 border-t border-white/30 text-sm">
          <span className="line-through opacity-70">Regular: $199</span>
          <span className="ml-2 font-bold">You save $74!</span>
        </div>
      </div>

      {/* Maintenance Checklist Summary */}
      <div className="bg-slate-50 rounded-xl p-6 max-w-md mx-auto mb-8 text-left">
        <div className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          Your Maintenance Includes:
        </div>
        <ul className="space-y-1 text-sm text-gray-600 grid grid-cols-2 gap-x-4">
          {checklist.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Next Steps */}
      <div className="bg-slate-50 rounded-xl p-6 max-w-md mx-auto mb-8 text-left">
        <div className="font-semibold text-slate-900 mb-3">What happens next:</div>
        <ol className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <span>We&apos;ll call you within 10 minutes to confirm your appointment</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <span>Our certified technician arrives at your scheduled time</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <span>Complete maintenance performed - pay only $125 after service</span>
          </li>
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="bg-green-600 hover:bg-green-700">
          <Phone className="w-5 h-5 mr-2" />
          Call Now: 1-800-123-4567
        </Button>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span>Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-1">
            <BadgeCheck className="w-4 h-4" />
            <span>Satisfaction Guaranteed</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Main Funnel Component
export default function FunnelPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [direction, setDirection] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null)
  const [customFilterSize, setCustomFilterSize] = useState('')

  const currentQuestion = questions[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === questions.length - 1

  // Handle answer selection with auto-advance
  const handleAnswer = useCallback((value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))
    
    // Clear any existing timer
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer)
    }
    
    // Don't auto-advance if selecting "other" on filter step
    if (currentQuestion.type === 'filter' && value === 'other') {
      return
    }
    
    // Auto-advance after 600ms for smooth UX
    const timer = setTimeout(() => {
      if (!isLastStep) {
        setDirection(1)
        setCurrentStep(prev => prev + 1)
      }
    }, 600)
    
    setAutoAdvanceTimer(timer)
  }, [currentQuestion.id, currentQuestion.type, isLastStep, autoAdvanceTimer])

  // Manual navigation
  const goToNext = () => {
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer)
    setDirection(1)
    setCurrentStep(prev => Math.min(prev + 1, questions.length - 1))
  }

  const goToPrevious = () => {
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer)
    setDirection(-1)
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleContactSubmit = async (data: any) => {
    setIsSubmitting(true)
    setSubmitError('')
    setFieldErrors({})
    
    const finalData = {
      firstName: data.name.split(' ')[0] || data.name,
      lastName: data.name.split(' ').slice(1).join(' ') || '',
      email: data.email,
      phone: data.phone,
      zip: data.zip,
      systemType: answers['1'],
      filterSize: answers['2'] === 'other' ? customFilterSize : answers['2'],
      lastService: answers['3'],
      issues: answers['4'],
      propertyType: answers['5'],
      timing: answers['6'],
      funnelAnswers: answers,
      source: 'funnel'
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        setAnswers(prev => ({ ...prev, contact: finalData }))
        setIsCompleted(true)
      } else {
        // Parse field errors from API response and map to user-friendly messages
        const errors: Record<string, string> = {}
        const friendlyMessages: Record<string, string> = {
          firstName: 'Please enter your full name (first and last name, e.g. John Smith).',
          lastName: 'Please enter your full name (first and last name, e.g. John Smith).',
          email: 'Please enter a valid email address.',
          phone: 'Please enter a valid phone number (at least 10 digits).',
          zip: 'Please enter a valid 5-digit ZIP code.'
        }
        if (result.errors && Array.isArray(result.errors)) {
          result.errors.forEach((err: any) => {
            if (err.field) {
              const msg = friendlyMessages[err.field] ?? err.message
              if (err.field === 'firstName' || err.field === 'lastName') {
                errors.name = friendlyMessages.lastName
              } else {
                errors[err.field] = msg
              }
            }
          })
        }
        setFieldErrors(errors)
        const hasFieldErrors = Object.keys(errors).length > 0
        setSubmitError(hasFieldErrors
          ? 'Please fix the highlighted fields below.'
          : (result.message || 'Please fix the errors above and try again.'))
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer)
    }
  }, [autoAdvanceTimer])

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  }

  const QuestionIcon = currentQuestion.icon

  // Get selected system type for contact form
  const selectedSystemType = answers['1'] || 'not-sure'

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900">Skyreach</span>
                <span className="text-xs text-gray-500 block">Heating & Cooling</span>
              </div>
            </div>
            
            {/* Price Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full">
              <span className="text-sm text-gray-600">Special:</span>
              <span className="font-bold text-orange-600">$125 Maintenance</span>
            </div>
            
            <a href="tel:18001234567" className="flex items-center gap-2 text-orange-600 font-semibold">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">1-800-123-4567</span>
            </a>
          </div>
          
          {/* Progress Bar */}
          {!isCompleted && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Step {currentStep + 1} of {questions.length}</span>
                <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
              </div>
              <ProgressBar current={currentStep} total={questions.length} />
            </div>
          )}
        </div>
      </header>

      {/* Hero Banner - Only on first step */}
      {!isCompleted && currentStep === 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-6">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-sm uppercase tracking-wide opacity-90 mb-1">Limited Time Offer</div>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">$125 Furnace Maintenance</h1>
              <p className="text-orange-100">Complete tune-up & safety inspection • Reg. $199</p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          {isCompleted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SuccessStep answers={answers} />
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Question Header */}
              <div className="text-center mb-8">
                {QuestionIcon && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  >
                    <QuestionIcon className="w-8 h-8 text-orange-600" />
                  </motion.div>
                )}
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  {currentQuestion.question}
                </h1>
                {currentQuestion.subtitle && (
                  <p className="text-gray-500">{currentQuestion.subtitle}</p>
                )}
              </div>

              {/* Question Content */}
              <div className="space-y-3">
                {currentQuestion.type === 'single' && currentQuestion.options?.map((option, index) => (
                  <OptionCard
                    key={option.value}
                    option={option}
                    isSelected={answers[currentQuestion.id] === option.value}
                    onClick={() => handleAnswer(option.value)}
                    index={index}
                  />
                ))}

                {currentQuestion.type === 'filter' && (
                  <FilterSizeStep
                    selectedFilter={answers['2'] || ''}
                    onSelect={(value) => handleAnswer(value)}
                    customSize={customFilterSize}
                    onCustomSizeChange={setCustomFilterSize}
                  />
                )}

                {currentQuestion.type === 'contact' && (
                  <ContactStep 
                    onSubmit={handleContactSubmit} 
                    systemType={selectedSystemType}
                    isSubmitting={isSubmitting}
                    submitError={submitError}
                    fieldErrors={fieldErrors}
                  />
                )}
              </div>

              {/* Navigation */}
              {!isLastStep && (
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={goToPrevious}
                    disabled={isFirstStep}
                    className={`flex items-center gap-2 text-gray-500 hover:text-slate-900 transition-colors ${
                      isFirstStep ? 'invisible' : ''
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                  
                  {answers[currentQuestion.id] && (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={goToNext}
                      className="flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                    >
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Trust Footer */}
      {!isCompleted && (
        <footer className="max-w-3xl mx-auto px-4 py-8 mt-12 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>4.9/5 (2,500+ reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-orange-500" />
              <span>100% Satisfaction Guaranteed</span>
            </div>
          </div>
          
          {/* Price Match Guarantee */}
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-400">
              Found a lower price? We&apos;ll match it and beat it by $10.
            </p>
          </div>
        </footer>
      )}
    </div>
  )
}
