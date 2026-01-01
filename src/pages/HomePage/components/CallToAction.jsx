import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '../../../compnents/UI/Button'

const CallToAction = () => {
  const benefits = [
    'No hidden fees',
    'Bank-level security',
    'Instant transfers',
    '24/7 customer support',
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 relative overflow-hidden">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Transform Your Payment Experience?
            </h2>

            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Join thousands of users who trust VexCrow for secure, fast, and reliable payments.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-center gap-2 text-white"
                >
                  <CheckCircle className="text-emerald-300 flex-shrink-0" size={20} />
                  <span className="font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 py-7 group shadow-xl"
              >
                Get Started Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-7"
              >
                Contact Sales
              </Button>
            </motion.div>

            <p className="text-blue-100 mt-8 text-sm">
              No credit card required • Free to get started • Cancel anytime
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
