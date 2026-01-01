import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Send, Shield, Wallet } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Utility Bill Payments',
      description:
        'Pay your electricity, water, internet, and other utility bills instantly with just a few taps. Never miss a payment deadline again.',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      icon: Send,
      title: 'Money Transfers',
      description:
        'Send money to friends, family, or businesses securely and instantly. Domestic and international transfers made simple.',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
    },
    {
      icon: Shield,
      title: 'Escrow Service',
      description:
        'Complete transactions with confidence. Our secure escrow service protects both buyers and sellers until all conditions are met.',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
    },
    {
      icon: Wallet,
      title: 'Pocket Feature',
      description:
        'Save together with friends or family towards collective goals. Track contributions, set targets, and achieve financial milestones together.',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
    },
  ]

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover powerful features designed to simplify your financial life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div
                className={`relative p-8 rounded-2xl bg-gradient-to-br ${feature.bgGradient} border border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-300`}
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="text-white" size={32} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>

                <p className="text-slate-600 leading-relaxed">{feature.description}</p>

                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
