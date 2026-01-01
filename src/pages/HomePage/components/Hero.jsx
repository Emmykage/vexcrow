import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Users, Apple, BugPlay as GooglePlay } from 'lucide-react'
import { Button } from '../../../compnents/UI/Button'
import { useToast } from '../../../compnents/UI/use-toast'

const Hero = () => {
  const { toast } = useToast() // Initialize useToast

  const handleDownloadClick = () => {
    toast({
      title: '🚧 Feature Not Implemented',
      description:
        "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    })
  }

  return (
    <section className="pt-32 pb-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold"
              >
                🚀 Smart Payments, Simplified
              </motion.div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
              Smart Payments.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Secure Escrow.
              </span>{' '}
              Collective Goals.
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Experience the future of digital payments with VexCrow. From utility bills to secure
              escrow services, we make managing your money effortless and safe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white text-lg px-8 py-6 group"
                onClick={handleDownloadClick} // Placeholder for action
              >
                Get Started Free
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600"
                onClick={handleDownloadClick} // Placeholder for action
              >
                Watch Demo
              </Button>
            </div>

            {/* App Store and Play Store Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
              <span className="text-slate-600 text-sm font-semibold">Download on:</span>
              <motion.a
                href="#"
                onClick={handleDownloadClick}
                className="inline-flex items-center justify-center h-12 px-6 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-700 transition-colors duration-300 group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Apple size={24} className="mr-2" />
                <div>
                  <span className="block text-xs text-slate-300">Download on the</span>
                  <span className="block text-lg font-semibold">App Store</span>
                </div>
              </motion.a>
              <motion.a
                href="#"
                onClick={handleDownloadClick}
                className="inline-flex items-center justify-center h-12 px-6 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-700 transition-colors duration-300 group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GooglePlay size={24} className="mr-2" />
                <div>
                  <span className="block text-xs text-slate-300">GET IT ON</span>
                  <span className="block text-lg font-semibold">Google Play</span>
                </div>
              </motion.a>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="text-emerald-500" size={20} />
                <span className="text-sm text-slate-600 font-medium">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-blue-500" size={20} />
                <span className="text-sm text-slate-600 font-medium">Instant Transfers</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-purple-500" size={20} />
                <span className="text-sm text-slate-600 font-medium">10K+ Users</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                alt="VexCrow app interface showing payment dashboard"
                className="w-full h-auto rounded-2xl shadow-2xl"
                src="https://images.unsplash.com/photo-1626682561863-fdbb965de0dc"
              />
            </div>

            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 blur-xl"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full opacity-20 blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
