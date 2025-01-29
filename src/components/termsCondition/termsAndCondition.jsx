import React from 'react';
import { useNavigate } from "react-router-dom";
import { CardHeader, CardTitle } from "@/components/ui/card";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full bg-[#1a1a2e] flex flex-col items-center justify-center p-4 md:p-6 lg:p-8"
      style={{ background: 'linear-gradient(180deg, #070727 0%, #090955 70%, #0C0C74 100%)' }}
    >
      <div className="w-full max-w-3xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="w-full bg-[#2a2a3e] p-6 md:p-8 border border-[#6b5ffd] rounded-2xl shadow-[0_0_30px_-6px_#6b5ffd] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#090955] to-[#6b5ffd10] opacity-50"></div>

          <div className="relative z-10 text-white">
            <CardHeader className="space-y-4 md:space-y-6 text-center">
              <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
                Términos y Condiciones de CamperStories
              </CardTitle>
              <p className="text-sm sm:text-base opacity-70">Última actualización: 29/01/2025</p>
            </CardHeader>

            <div className="text-left text-sm sm:text-base space-y-4 leading-relaxed mt-6">
              <h2 className="text-lg font-semibold mt-4">1. Quiénes Somos</h2>
              <p className="text-justify">
                <strong>CamperStories</strong> es una plataforma creada y administrada por <strong>Campuslands</strong>, destinada a conectar a campers, estudiantes y profesionales en formación con sponsors que desean apoyarlos en el logro de sus objetivos. Al utilizar nuestra plataforma, aceptas estos Términos y nuestra <a href="/politica-de-privacidad" className="text-[#6b5ffd] hover:underline">Política de Privacidad</a>.
              </p>

              <h2 className="text-lg font-semibold mt-4">2. Aceptación de los Términos</h2>
              <p className="text-justify">
                Al registrarte y utilizar CamperStories, aceptas cumplir con estos Términos en su totalidad. Nos reservamos el derecho de modificar estos Términos en cualquier momento, publicando una versión actualizada en nuestra plataforma. Es tu responsabilidad revisar periódicamente los Términos para estar informado de cualquier cambio. Las modificaciones entran en vigor inmediatamente después de su publicación, salvo que se indique lo contrario.
              </p>

              <h2 className="text-lg font-semibold mt-4">3. Descripción del Servicio</h2>
              <p className="text-justify">
                CamperStories ofrece herramientas y funcionalidades que permiten a los campers crear perfiles, compartir información personal, logros, proyectos y sueños, y conectarse con sponsors que pueden apoyarlos mediante donaciones o patrocinios específicos.
              </p>

              <h2 className="text-lg font-semibold mt-4">4. Registro de Usuario</h2>
              <h3 className="text-base font-semibold mt-4">a) Cuentas de Campers</h3>
              <p className="text-justify">
                Para crear una cuenta como camper, debes proporcionar información precisa y completa, incluyendo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Nombre completo.</li>
                <li>Edad.</li>
                <li>Correo electrónico.</li>
                <li>Contraseña.</li>
              </ul>

              <h3 className="text-base font-semibold mt-4">b) Cuentas de Sponsors</h3>
              <p className="text-justify">
                Para registrarte como sponsor, debes proporcionar:
              </p>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Nombre completo.</li>
                <li>Correo electrónico.</li>
                <li>Contraseña.</li>
                <li>Información financiera a través de proveedores externos seguros (como Stripe o PayPal).</li>
              </ul>
              <p className="text-justify">
                Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, así como de todas las actividades que ocurran bajo tu cuenta. Debes notificar inmediatamente a CamperStories cualquier uso no autorizado de tu cuenta.
              </p>

              <h2 className="text-lg font-semibold mt-4">5. Responsabilidades del Usuario</h2>
              <h3 className="text-base font-semibold mt-4">a) Uso Aceptable</h3>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Utilizar la plataforma únicamente para los fines permitidos.</li>
                <li>No publicar contenido ilegal, ofensivo, difamatorio, o que infrinja derechos de terceros.</li>
                <li>No intentar acceder de manera no autorizada a otras cuentas o sistemas de la plataforma.</li>
                <li>Cumplir con todas las leyes aplicables en Colombia y a nivel internacional al utilizar la plataforma.</li>
              </ul>

              <h3 className="text-base font-semibold mt-4">b) Contenido Generado por el Usuario</h3>
              <p className="text-justify">
                Eres responsable de todo el contenido que publicas en CamperStories. Al publicar contenido, otorgas a Campuslands una licencia mundial, no exclusiva y libre de regalías para usar, reproducir, modificar y distribuir dicho contenido en la plataforma. Garantizas que tienes todos los derechos necesarios sobre el contenido que publicas y que no infringe derechos de terceros.
              </p>

              <h2 className="text-lg font-semibold mt-4">6. Propiedad Intelectual</h2>
              <p className="text-justify">
                Todos los derechos de propiedad intelectual relacionados con la plataforma CamperStories, incluyendo textos, gráficos, logotipos, y software, son propiedad de Campuslands o de sus licenciantes. No se te concede ningún derecho sobre estos materiales, salvo lo expresamente establecido en estos Términos.
              </p>

              <h2 className="text-lg font-semibold mt-4">7. Limitación de Responsabilidad</h2>
              <p className="text-justify">
                CamperStories se proporciona "tal cual" y "según disponibilidad". Campuslands no garantiza que la plataforma esté libre de errores, segura o que cumpla con tus expectativas. En ningún caso, Campuslands será responsable por daños indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de uso de la plataforma, incluso si se ha advertido de la posibilidad de dichos daños.
              </p>

              <h2 className="text-lg font-semibold mt-4">8. Modificaciones del Servicio</h2>
              <p className="text-justify">
                Campuslands se reserva el derecho de modificar, suspender o discontinuar, temporal o permanentemente, la plataforma o cualquier parte de ella, con o sin previo aviso. No seremos responsables ante ti o terceros por cualquier modificación, suspensión o interrupción del servicio.
              </p>

              <h2 className="text-lg font-semibold mt-4">9. Terminación de Cuentas</h2>
              <p className="text-justify">
                Podemos suspender o terminar tu cuenta si:
              </p>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Violar estos Términos.</li>
                <li>Solicitarnos, de manera razonable, que eliminemos tu información personal.</li>
                <li>Creemos que tu conducta pueda dañar la reputación de CamperStories o de Campuslands.</li>
                <li>Incurrir en actividades fraudulentas o ilegales a través de la plataforma.</li>
              </ul>
              <p className="text-justify">
                En caso de terminación, cesarás todo uso de la plataforma y cualquier derecho otorgado en estos Términos. Las disposiciones de estos Términos que por su naturaleza deban permanecer vigentes tras la terminación seguirán en vigor.
              </p>

              <h2 className="text-lg font-semibold mt-4">10. Protección de Datos Personales</h2>
              <h3 className="text-base font-semibold mt-4">a) Cumplimiento de la Ley</h3>
              <p className="text-justify">
                CamperStories cumple con la <strong>Ley 1581 de 2012</strong> de Colombia y demás normativas aplicables en materia de protección de datos personales. Nuestra <a href="/politica-de-privacidad" className="text-[#6b5ffd] hover:underline">Política de Privacidad</a> detalla cómo recopilamos, usamos, almacenamos y protegemos tus datos personales.
              </p>

              <h3 className="text-base font-semibold mt-4">b) Derechos de los Titulares de Datos</h3>
              <p className="text-justify">
                Como usuario, tienes derecho a acceder, rectificar, cancelar y oponerte al tratamiento de tus datos personales conforme a lo establecido en la <strong>Ley 1581 de 2012</strong>. Para ejercer estos derechos, puedes contactarnos a través de nuestros canales oficiales indicados en la <a href="/politica-de-privacidad" className="text-[#6b5ffd] hover:underline">Política de Privacidad</a>.
              </p>

              <h2 className="text-lg font-semibold mt-4">11. Ley Aplicable y Jurisdicción</h2>
              <p className="text-justify">
                Estos Términos se regirán e interpretarán de acuerdo con las leyes de Colombia. Cualquier disputa que surja en relación con estos Términos será sometida a la jurisdicción exclusiva de los tribunales competentes de Colombia.
              </p>

              <h2 className="text-lg font-semibold mt-4">12. Indemnización</h2>
              <p className="text-justify">
                Aceptas indemnizar y mantener indemne a Campuslands, sus directores, empleados y agentes, de cualquier reclamación, demanda o daño, incluyendo honorarios razonables de abogados, derivados de tu uso de la plataforma, tu violación de estos Términos o tu violación de cualquier derecho de un tercero.
              </p>

              <h2 className="text-lg font-semibold mt-4">13. Cláusula de Divisibilidad</h2>
              <p className="text-justify">
                Si alguna disposición de estos Términos se considera inválida o inaplicable, dicha disposición será eliminada y el resto de los Términos permanecerá en pleno vigor y efecto.
              </p>

              <h2 className="text-lg font-semibold mt-4">14. Renuncia</h2>
              <p className="text-justify">
                El hecho de que Campuslands no exija el cumplimiento estricto de cualquier disposición de estos Términos no implica renuncia a su derecho de exigir su cumplimiento en el futuro.
              </p>

              <h2 className="text-lg font-semibold mt-4">15. Contacto</h2>
              <p className="text-justify">
                Si tienes preguntas o comentarios sobre estos Términos, por favor, contáctanos a través de:
              </p>
              <div className="contact-info">
                <p>Correo electrónico: 
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=soporte@fundacioncampuslands.com&su=Contacto" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-1 font-semibold text-[#6b5ffd] hover:underline transition-colors duration-200"
                >
                  soporte@fundacioncampuslands.com
                </a></p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/")}
                className="py-2.5 px-4 rounded-lg text-sm sm:text-base cursor-pointer transition-all duration-300 bg-[#6C3AFF] text-white hover:bg-[#6d28d9] transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
              >
                Regresar
              </button>
            </div>
          </div>
          <div className="text-center text-xs sm:text-sm opacity-70 mt-6">
            <span>Camper Stories v0.5.2 - © Campuslands 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
