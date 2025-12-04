import { Search, UserCheck, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Busca',
      description: 'Describe el servicio que necesitas y tu ubicación.',
    },
    {
      icon: UserCheck,
      number: '02',
      title: 'Elige',
      description: 'Revisa perfiles, calificaciones y elige al profesional ideal.',
    },
    {
      icon: Calendar,
      number: '03',
      title: 'Agenda',
      description: 'Coordina fecha y hora directamente con el especialista.',
    },
    {
      icon: CheckCircle,
      number: '04',
      title: 'Listo',
      description: 'Recibe el servicio y paga de forma segura cuando esté completo.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-gray-900 mb-4"
          >
            ¿Cómo funciona?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 font-inter max-w-2xl mx-auto"
          >
            Cuatro simples pasos para resolver cualquier problema en tu hogar
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line (hidden on mobile, shown on larger screens) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary to-secondary opacity-30"></div>
                )}

                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-primary/30 transition-all hover:shadow-lg">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-montserrat font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-montserrat font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
