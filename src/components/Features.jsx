import { ShieldCheck, MapPin, CreditCard, Clock, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Verificación de Identidad',
      description: 'Todos nuestros profesionales pasan por un riguroso proceso de verificación de identidad y antecedentes.',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: MapPin,
      title: 'Geolocalización',
      description: 'Encuentra especialistas cerca de ti. Servicios rápidos y eficientes en tu zona.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: CreditCard,
      title: 'Pago Seguro',
      description: 'Sistema de pagos integrado y seguro. Paga solo cuando el trabajo esté completado.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Clock,
      title: 'Disponibilidad 24/7',
      description: 'Encuentra profesionales disponibles en cualquier momento del día, incluso en emergencias.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: Star,
      title: 'Calificaciones Reales',
      description: 'Lee reseñas y calificaciones de otros clientes antes de contratar.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: Users,
      title: 'Comunidad de Expertos',
      description: 'Accede a una red de profesionales calificados en múltiples especialidades.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
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
            ¿Por qué elegir <span className="text-primary">CHASKIPRO</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 font-inter max-w-2xl mx-auto"
          >
            La plataforma más segura y confiable para encontrar especialistas del hogar en Chile
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`${feature.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-montserrat font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <button className="bg-primary hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-inter font-semibold text-lg transition-all shadow-lg hover:shadow-xl">
            Comenzar Ahora
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
