import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#413030] text-white py-12 px-4 border-t-4 border-[#2e8b57]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-[#2e8b57]">Kenwa</h3>
            <p className="mt-2">Salud y Armonía en el Trabajo</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <h4 className="font-semibold mb-3">Contacto</h4>
              <p>kenwa.salud@gmail.com</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Síguenos</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-[#2e8b57] transition duration-300">Facebook</a>
                <a href="#" className="hover:text-[#2e8b57] transition duration-300">LinkedIn</a>
                <a href="#" className="hover:text-[#2e8b57] transition duration-300">Instagram</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} <span className="text-[#2e8b57]">Kenwa</span>. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;