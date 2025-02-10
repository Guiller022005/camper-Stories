import React from 'react';
import { useNavigate } from "react-router-dom";
import { CardHeader, CardTitle } from "@/components/ui/card";

const PoliciesPrivacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#1a1a2e] flex flex-col items-center justify-center p-4 md:p-6 lg:p-8" style={{ background: 'linear-gradient(180deg, #080831 0%, #0e0e61 70%, #27247a 100%)' }}>
      <div className="w-full max-w-3xl px-4 sm:px-6 md:px-8 lg:px-10 pt-24">
        <div className="w-full bg-[#2a2a3e] p-6 md:p-8 border border-[#6b5ffd] rounded-2xl shadow-[0_0_30px_-6px_#6b5ffd] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#090955] to-[#6b5ffd10] opacity-50"></div>

          <div className="relative z-10 text-white">
            <CardHeader className="space-y-4 md:space-y-6 text-center">
              <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
                Política de Privacidad de CamperStories
              </CardTitle>
              <p className="text-sm sm:text-base opacity-70">Última actualización: 29/01/2025</p>
            </CardHeader>

            <div className="text-left text-sm sm:text-base space-y-4 leading-relaxed mt-6">
              <h2 className="text-lg font-semibold mt-4">1. Quiénes somos</h2>
              <p className="text-justify">
                CamperStories es una plataforma creada y administrada por Campuslands, con el objetivo de conectar a campers, estudiantes y profesionales en formación, con sponsors, quienes desean apoyarlos a alcanzar sus sueños y objetivos. La plataforma ofrece herramientas para que los campers compartan información personal, logros, proyectos y sueños, facilitando una conexión más cercana y significativa con los sponsors.
                <br /><br />
                Los sponsors pueden realizar donaciones generales destinadas al desarrollo global de los campers a través de Campuslands o dirigir su apoyo a campers específicos. En ambos casos, Campuslands se encarga de gestionar los recursos de manera eficiente y transparente, asegurando que cumplan con los fines declarados.
                <br /><br />
                Si tienes preguntas o inquietudes sobre esta Política de Privacidad, no dudes en contactarnos mediante:
                <br />
                Correo electrónico: 
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=soporte@fundacioncampuslands.com&su=Contacto" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-1 font-semibold text-[#6b5ffd] hover:underline transition-colors duration-200"
                >
                  soporte@fundacioncampuslands.com
                </a>
              </p>

              <h2 className="text-lg font-semibold mt-4">2. Qué datos recopilamos</h2>
              
              <p className="text-justify">
                Recopilamos información necesaria para garantizar el correcto funcionamiento de CamperStories y mejorar la experiencia del usuario. Estos son los datos recolectados:
              </p>

              {/* Datos de los Campers */}
              <h3 className="text-base font-semibold mt-4">a) Datos de los Campers</h3>
              <p className="text-justify">
                <span className="font-semibold">1- Datos obligatorios:</span> Para crear un perfil en la plataforma, solicitamos información como:
              </p>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Nombre completo.</li>
                <li>Edad.</li>
                <li>Correo electrónico.</li>
                <li>Contraseña.</li>
              </ul>

              <p className="text-justify">
                <span className="font-semibold">2- Información adicional opcional:</span> Los campers tienen la opción de enriquecer sus perfiles compartiendo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Fotografías y videos personales relacionados con sus proyectos o logros (datos sensibles, requieren autorización explícita).</li>
                <li>Información descriptiva, como "Acerca de mí".</li>
                <li>Sueños y metas profesionales.</li>
                <li>Detalles de proyectos y trabajos realizados.</li>
              </ul>
              <p className="text-justify">
                <span className="font-semibold">3- Interacciones:</span> Registramos los comentarios que recibes o envías en la plataforma.
              </p>
              <p className="text-justify">
                <span className="font-semibold">4- Historial de patrocinios:</span> Datos sobre las contribuciones recibidas por parte de los sponsors.
              </p>

              {/* Datos de los Sponsors */}
              <h3 className="text-base font-semibold mt-4">b) Datos de los Sponsors</h3>
              <p className="text-justify">
                <span className="font-semibold">1- Datos obligatorios:</span> Para registrarse como sponsor, recopilamos:
              </p>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Nombre completo.</li>
                <li>Correo electrónico.</li>
                <li>Contraseña.</li>
              </ul>

              <p className="text-justify">
                <span className="font-semibold">2- Datos financieros:</span> Trabajamos con proveedores externos seguros (como Stripe o PayPal) para recopilar y procesar información relacionada con pagos. Esto incluye:
              </p>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Método de pago utilizado.</li>
                <li>Historial de transacciones realizadas.</li>
              </ul>
              <p className="text-justify">
                <span className="font-semibold">3- Historial de donaciones:</span> Datos relacionados con los campers patrocinados y las donaciones generales realizadas.
              </p>

              {/* Datos recopilados automáticamente */}
              <h3 className="text-base font-semibold mt-4">c) Datos recopilados automáticamente</h3>
              <p className="text-justify">
                Para mejorar la experiencia del usuario y garantizar la seguridad de la plataforma, recopilamos información automática, como:
              </p>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Dirección IP.</li>
                <li>Ubicación aproximada basada en tu dirección IP.</li>
                <li>Dispositivo utilizado, sistema operativo y tipo de navegador.</li>
                <li>Actividad dentro de la página web (páginas visitadas, tiempo de sesión, etc.).</li>
              </ul>

              {/* Finalidades adicionales para donaciones generales */}
              <h3 className="text-base font-semibold mt-4">d) Finalidades adicionales para donaciones generales</h3>
              <p className="text-justify">
                Cuando un sponsor opta por realizar una donación general, estos fondos son administrados por Campuslands y utilizados para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Financiar actividades educativas y programas de apoyo a campers.</li>
                <li>Proveer infraestructura y recursos para el crecimiento de la comunidad de campers.</li>
                <li>Apoyar proyectos colectivos que beneficien a más de un camper.</li>
              </ul>

              <h2 className="text-lg font-semibold mt-4">3. Cómo utilizamos tus datos</h2>

              <p className="text-justify">
                La información recopilada se utiliza para garantizar el correcto funcionamiento de CamperStories y ofrecer una experiencia personalizada y segura a todos los usuarios. A continuación, detallamos los usos específicos:
              </p>

              {/* Uso de datos para campers */}
              <h3 className="text-base font-semibold mt-4">a) Para campers</h3>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Publicar perfiles en la plataforma para que puedan ser visibles a los sponsors.</li>
                <li>Administrar y gestionar los comentarios, interacciones y solicitudes recibidas.</li>
                <li>Analizar tus preferencias y necesidades para ofrecerte recomendaciones personalizadas.</li>
                <li>Asegurar el cumplimiento de nuestros <a href="/terminos-y-condiciones" className="hover:underline text-white transition-colors duration-200">Términos y Condiciones</a>.</li>
              </ul>

              {/* Uso de datos para sponsors */}
              <h3 className="text-base font-semibold mt-4">b) Para sponsors</h3>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Facilitar el proceso de donación y patrocinio, asegurando que los fondos sean dirigidos adecuadamente.</li>
                <li>Mantener un historial detallado de tus transacciones para consultas futuras.</li>
                <li>Ofrecer recomendaciones sobre campers o proyectos que puedan interesarte.</li>
              </ul>

              {/* Uso de datos para todos los usuarios */}
              <h3 className="text-base font-semibold mt-4">c) Para todos los usuarios</h3>
              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>Mejorar la experiencia del usuario mediante el análisis de datos.</li>
                <li>Proteger la seguridad de la información mediante sistemas de detección de actividades sospechosas.</li>
                <li>Cumplir con las leyes y regulaciones aplicables en Colombia y a nivel internacional.</li>
              </ul>


              <h2 className="text-lg font-semibold mt-4">4. Consentimiento explícito</h2>
              <p>Al registrarte o realizar cualquier acción en CamperStories, como patrocinios o donaciones, estás otorgando tu consentimiento explícito para que recopilemos, almacenemos y tratemos tu información personal según los propósitos descritos en esta política. <br /><br /> Puedes retirar tu consentimiento en cualquier momento, aunque esto podría limitar tu uso de la plataforma.</p>

              <h2 className="text-lg font-semibold mt-4">5. Protección de datos</h2>
              <p className="text-justify">
                Nos tomamos muy en serio la seguridad de tus datos. Implementamos las siguientes medidas para proteger tu información:
              </p>

              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>
                  <span className="font-semibold">Cifrado:</span> Todas las transferencias de datos se realizan mediante protocolos seguros (<span className="font-semibold">HTTPS</span>), y la información sensible se almacena de forma cifrada.
                </li>
                <li>
                  <span className="font-semibold">Autenticación:</span> Contamos con sistemas de autenticación segura para proteger el acceso a las cuentas.
                </li>
                <li>
                  <span className="font-semibold">Supervisión continua:</span> Realizamos monitoreos constantes para detectar y prevenir posibles vulnerabilidades.
                </li>
              </ul>

              <h2 className="text-lg font-semibold mt-4">6. Tus derechos</h2>
              <p className="text-justify">
                De acuerdo con la <span className="font-semibold">Ley 1581 de 2012</span>, tienes derecho a:
              </p>

              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>
                  <span className="font-semibold">Acceso:</span> Solicitar información sobre los datos que hemos recopilado sobre ti.
                </li>
                <li>
                  <span className="font-semibold">Rectificación:</span> Actualizar información incorrecta o desactualizada.
                </li>
                <li>
                  <span className="font-semibold">Cancelación:</span> Solicitar la eliminación de tus datos personales cuando ya no sean necesarios.
                </li>
                <li>
                  <span className="font-semibold">Oposición:</span> Rechazar el uso de tus datos personales para ciertos propósitos.
                </li>
              </ul>

              <p className="text-justify">
                Para ejercer cualquiera de estos derechos, puedes contactarnos a través de nuestro correo electrónico: 
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=soporte@fundacioncampuslands.com&su=Contacto" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-1 font-semibold text-[#6b5ffd] hover:underline transition-colors duration-200"
                >
                  soporte@fundacioncampuslands.com
                </a>
              </p>

              <h2 className="text-lg font-semibold mt-4">7. Retención de datos</h2>
              <p className="text-justify">
                Conservamos tus datos personales durante el tiempo necesario para cumplir con las finalidades descritas en esta política. Específicamente:
              </p>

              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>
                  <span className="font-semibold">Datos de registro:</span> Se almacenan mientras tengas una cuenta activa en la plataforma.
                </li>
                <li>
                  <span className="font-semibold">Historiales de interacciones y transacciones:</span> Se conservan para cumplir con obligaciones legales y fiscales.
                </li>
                <li>
                  <span className="font-semibold">Eliminación de datos:</span> Los datos eliminados a solicitud del usuario son removidos de nuestras bases de datos activas, pero podrían permanecer en copias de seguridad durante un tiempo limitado antes de su eliminación definitiva.
                </li>
              </ul>

              <p className="text-justify">
                Posteriormente, los datos serán eliminados de forma segura y confidencial, salvo que existan requerimientos legales que obliguen a su conservación.
              </p>

              <h2 className="text-lg font-semibold mt-4">8. Transferencia internacional de datos</h2>
              <p className="text-justify">
                En ocasiones, podría ser necesario transferir tus datos a terceros ubicados fuera de Colombia para garantizar el correcto funcionamiento de la plataforma, como servicios de alojamiento o procesamiento de pagos. 
              </p>

              <p className="text-justify">
                Estas transferencias se realizan bajo estrictas medidas de seguridad que garantizan la protección de tus datos, cumpliendo con:
              </p>

              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>
                  <span className="font-semibold">Principios de protección de datos:</span> Conforme a lo establecido en la <span className="font-semibold">Ley 1581 de 2012</span> de Colombia.
                </li>
                <li>
                  <span className="font-semibold">Normas internacionales de privacidad:</span> Seguimos estándares como el <span className="font-semibold">Reglamento General de Protección de Datos (GDPR)</span> de la Unión Europea para garantizar un nivel adecuado de seguridad y confidencialidad.
                </li>
              </ul>

              <h2 className="text-lg font-semibold mt-4">9. Menores de edad</h2>
              <p className="text-justify">
                El uso de CamperStories está prohibido para menores de <span className="font-semibold">13 años</span> sin el consentimiento expreso de sus padres o tutores. 
              </p>

              <p className="text-justify">
                Para los menores que utilicen la plataforma con autorización, nos comprometemos a:
              </p>

              <ul className="list-disc list-inside space-y-2 text-justify">
                <li>
                  <span className="font-semibold">Recopilar solo los datos estrictamente necesarios</span> para el funcionamiento de su cuenta.
                </li>
                <li>
                  <span className="font-semibold">Implementar medidas adicionales</span> para proteger su información y privacidad.
                </li>
                <li>
                  <span className="font-semibold">Brindar acceso a los tutores legales</span> a las interacciones y datos del menor dentro de la plataforma.
                </li>
              </ul>

              <h2 className="text-lg font-semibold mt-4">10. Cambios en esta política</h2>
              <p className="text-justify">
                Nos reservamos el derecho de actualizar esta política en cualquier momento. Cualquier cambio significativo será comunicado mediante notificaciones en la plataforma y a través del correo electrónico asociado a tu cuenta.
              </p>

              <p className="text-justify">
                Las actualizaciones entran en vigor inmediatamente después de su publicación, salvo que se indique lo contrario. 
              </p>

              <p className="text-justify">
                Te recomendamos revisar esta política regularmente para mantenerte informado sobre cómo protegemos tu privacidad.
              </p>

              <h2 className="text-lg font-semibold mt-4">11. Definiciones</h2>
              <p className="text-justify">
                Para garantizar la claridad en esta política, se incluyen las siguientes definiciones:
              </p>
              <ul className="list-disc pl-5 text-justify">
                <li>
                  <strong>Datos personales:</strong> Cualquier información vinculada o que pueda asociarse a una persona natural identificada o identificable.
                </li>
                <li>
                  <strong>Datos sensibles:</strong> Aquellos que afectan la intimidad del titular o cuyo uso indebido puede generar discriminación (ej. origen racial, convicciones religiosas, datos biométricos, etc.).
                </li>
                <li>
                  <strong>Tratamiento:</strong> Cualquier operación sobre datos personales, como la recolección, almacenamiento, uso, circulación o supresión.
                </li>
                <li>
                  <strong>Responsable del tratamiento:</strong> Persona natural o jurídica que decide sobre la recolección y tratamiento de los datos personales.
                </li>
                <li>
                  <strong>Encargado del tratamiento:</strong> Persona natural o jurídica que realiza el tratamiento de datos personales por cuenta del responsable.
                </li>
              </ul>

              <h2 className="text-lg font-semibold mt-4">12. Aceptación de esta política</h2>
              <p className="text-justify">
                Al utilizar <span className="font-semibold">CamperStories</span>, aceptas los términos descritos en esta <span className="font-semibold">Política de Privacidad</span> y otorgas tu consentimiento para el tratamiento de tus datos personales conforme a los lineamientos aquí establecidos.
              </p>

              <p className="text-justify">
                Si no estás de acuerdo con alguno de los términos, por favor <span className="font-semibold">abstente de utilizar nuestra plataforma</span>.
              </p>

              <p className="text-justify">
                Si tienes dudas o inquietudes adicionales sobre esta política o el tratamiento de tus datos, contáctanos en cualquier momento mediante los canales oficiales que hemos dispuesto.
              </p>
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

export default PoliciesPrivacy;
