import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-montserrat font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-montserrat font-bold text-white">
                CHASKIPRO
              </span>
            </div>
            <p className="text-gray-400 font-inter mb-4">
              Conectando Chile con expertos del hogar. Tu solución rápida y confiable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-montserrat font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 font-inter">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <a href="#servicios" className="hover:text-primary transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-primary transition-colors">
                  Cómo Funciona
                </a>
              </li>
              <li>
                <Link to="/registro" className="hover:text-primary transition-colors">
                  Conviértete en Pro
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-montserrat font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 font-inter">
              <li>
                <Link to="/login" className="hover:text-primary transition-colors">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link to="/registro" className="hover:text-primary transition-colors">
                  Registrarse
                </Link>
              </li>
              <li>
                <a href="mailto:contacto@chaskipro.cl" className="hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">
                  Términos y Condiciones
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-montserrat font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 font-inter">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <span>contacto@chaskipro.cl</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <span>+56 9 1234 5678</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span>Santiago, Chile</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 font-inter text-sm">
            © {new Date().getFullYear()} CHASKIPRO. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
