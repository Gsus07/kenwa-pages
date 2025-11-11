import React, { useState } from 'react';
import useInView from '../hooks/useInView.js';
import useGsapFadeIn from '../hooks/useGsapFadeIn.js';
import useGsapTextReveal from '../hooks/useGsapTextReveal.js';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Crear el asunto y el cuerpo del correo
    const subject = `Nuevo mensaje de contacto de ${formData.name}`;
    const body = `Nombre: ${formData.name}\nEmail: ${formData.email}\nEmpresa: ${formData.company || 'No especificada'}\n\nMensaje:\n${formData.message}`;

    // Crear el enlace mailto
    const mailtoLink = `mailto:kenwa.salud@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Abrir el cliente de correo
    window.location.href = mailtoLink;

    // Limpiar el formulario después de un pequeño delay
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    }, 100);
  };

  const { ref, inView } = useInView({ threshold: 0.35 });
  const gsapRef = useGsapFadeIn({ start: 'top 85%', duration: 0.9, y: 20 });
  const paragraphRef = useGsapTextReveal({ split: 'words', y: 12, stagger: 0.06, duration: 0.7, scrollStart: 'top 92%' });

  return (
    <section id="contact" ref={gsapRef} className="py-20 bg-[#fcffff] px-4 opacity-0">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-[#413030] text-center mb-4 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-3'}`} style={inView ? { animationDelay: '0ms' } : undefined}>
          Contáctanos
        </h2>
        <div className="mx-auto h-1 w-24 bg-[#2e8b57] rounded-full mb-6"></div>
        <p ref={paragraphRef} className={"text-lg text-[#413030] text-center mb-12 max-w-2xl mx-auto"}>
          ¿Listo para transformar tu espacio laboral? Estamos aquí para ayudarte.
        </p>
        
        <div className={`bg-white rounded-xl shadow-lg p-8 border border-[#2e8b57]/10 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-3'}`} style={inView ? { animationDelay: '240ms' } : undefined}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-[#413030] mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e8b57]"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#413030] mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e8b57]"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="company" className="block text-[#413030] mb-2">
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e8b57]"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-[#413030] mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e8b57]"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#2e8b57] hover:bg-[#267349] text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.99]"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;