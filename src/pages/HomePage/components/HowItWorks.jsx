import React from 'react'
import { motion } from 'framer-motion'
import { UserPlus, CreditCard, CheckCircle } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up',
      description:
        'Create your account in less than 2 minutes with just your email and phone number.',
      color: 'blue',
    },
    {
      icon: CreditCard,
      title: 'Add Payment Method',
      description:
        'Link your bank account or card securely. We use bank-level encryption to protect your data.',
      color: 'emerald',
    },
    {
      icon: CheckCircle,
      title: 'Start Transacting',
      description:
        "Make payments, transfer money, or set up escrow services instantly. It's that simple!",
      color: 'purple',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-4">
            Get Started in 3 Easy Steps
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join thousands of users who trust VexCrow for their payment needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br from-${step.color}-400 to-${step.color}-600 flex items-center justify-center mb-6 relative`}
                    >
                      <step.icon className="text-white" size={36} />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-slate-900 font-bold">{index + 1}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>

                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className="hidden md:flex items-center justify-center absolute top-1/2 transform -translate-y-1/2"
                  style={{ left: `${(index + 1) * 33.33 - 16.66}%` }}
                >
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <img
            alt="Happy users using VexCrow app on mobile devices"
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
            src="../images/Mobile-Money-Operators-in-Nigeria.jpeg"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
