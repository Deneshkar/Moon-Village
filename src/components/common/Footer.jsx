import { Link } from 'react-router-dom'
import { FiGlobe, FiMail, FiShare2 } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-dark-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <h2 className="text-primary font-black text-3xl mb-3">Moon Village</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              A celestial dining destination dedicated to the art of fine gastronomy and the serenity of the night sky.
            </p>
            <div className="flex items-center gap-4 mt-5">
              <button className="text-gray-500 hover:text-primary transition-colors"><FiGlobe size={18} /></button>
              <button className="text-gray-500 hover:text-primary transition-colors"><FiMail size={18} /></button>
              <button className="text-gray-500 hover:text-primary transition-colors"><FiShare2 size={18} /></button>
            </div>
          </div>

          {/* Visit Us */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Visit Us</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">📍</span>
                101 Lunar Way, Starview District, MV 5543
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">📞</span>
                +1 (555) 782-MOON
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✉️</span>
                concierge@moonvillage.com
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
              {['Privacy Policy', 'Contact Us', 'Menu', 'Terms of Service', 'Careers', 'Reviews'].map(item => (
                <Link key={item} to="#" className="hover:text-primary transition-colors">{item}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-border pt-6 text-center text-xs text-gray-600">
          © 2024 Moon Village. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer