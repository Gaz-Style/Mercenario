import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function PorQueExistePage() {
  return (
    <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Inicio</span>
          </Link>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
            MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">IOS</span>
          </span>
        </div>
      </header>

      <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col justify-start space-y-12">
        {/* HERO */}
        <section className="space-y-8 text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Página 23</span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
            ¿Por qué existe Mercenario?
          </h1>
          <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
            Creemos que las pequeñas empresas merecen operar como las grandes. La diferencia nunca ha sido el talento, ha sido el acceso a las herramientas.
          </p>
        </section>

        {/* Narrative sections */}
        <section className="space-y-6">
          <p className="text-neutral-600 text-base leading-relaxed">
            Durante años, las grandes organizaciones han tenido acceso a procesos, tecnología y equipos capaces de coordinar miles de operaciones cada día. Mientras tanto, millones de pequeñas empresas han tenido que construir su negocio con planillas, llamadas telefónicas, mensajes dispersos y mucho esfuerzo. No porque quieran trabajar así, sino porque no existía otra alternativa.
          </p>
          <p className="text-neutral-600 text-base leading-relaxed">
            Nosotros creemos que eso puede cambiar. Una consulta médica no debería sentirse menos organizada que una gran clínica. Un estudio jurídico no debería depender de papeles para encontrar información. Un centro estético no debería perder clientes por olvidar un seguimiento. Una empresa de servicios no debería pasar horas moviendo información entre plataformas.
          </p>
          <p className="text-neutral-600 text-base font-bold leading-relaxed">
            El tamaño de una empresa no debería definir la calidad de su operación.
          </p>
          <p className="text-neutral-600 text-base leading-relaxed">
            La tecnología ha avanzado enormemente. Hoy existen herramientas capaces de automatizar tareas, conectar sistemas y entregar información en tiempo real. El problema es que la mayoría fueron creadas pensando en especialistas, no en dueños de pequeñas empresas.
          </p>
          <p className="text-neutral-600 text-base leading-relaxed">
            Nosotros comenzamos desde otro lugar. No preguntamos qué tecnología necesitas. Preguntamos cómo trabaja tu empresa, cómo atiendes, cómo vendes, cómo cobras, cómo haces seguimiento y cómo tomas decisiones.
          </p>
          <p className="text-neutral-600 text-base leading-relaxed">
            No creemos en llenar una empresa de aplicaciones. Creemos en construir una operación donde todo tenga sentido.
          </p>
          <p className="text-neutral-600 text-base leading-relaxed">
            Cuando una empresa funciona con orden, las personas trabajan mejor, los clientes confían más, los errores disminuyen y el dueño vuelve a tener tiempo para pensar en el futuro, en lugar de apagar incendios todos los días.
          </p>
          <p className="text-neutral-600 text-base font-bold leading-relaxed">
            Esa es nuestra misión: ayudar a que pequeñas empresas operen con el nivel de organización que antes solo estaba al alcance de las grandes, no para parecer más grandes, sino para trabajar mejor.
          </p>
          <p className="text-neutral-600 text-base leading-relaxed">
            Cada empresa que mejora su operación atiende mejor, crece con mayor tranquilidad, genera más confianza y abre mejores oportunidades para las personas que trabajan en ella.
          </p>
          <p className="text-neutral-600 text-base font-bold leading-relaxed">
            Creemos que esa transformación vale la pena. Detrás de cada empresa hay una historia, un equipo, una familia y clientes que confían. Nuestra responsabilidad es hacer que toda esa dedicación esté respaldada por una operación que funcione a la misma altura.
          </p>
          <p className="text-neutral-600 text-base leading-relaxed">
            Eso es lo que hacemos cada día: diseñamos operaciones para que las personas puedan concentrarse en lo realmente importante.
          </p>
        </section>

        {/* CTA */}
        <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
          <div className="text-center space-y-2">
            <h4 className="text-lg font-bold text-black">
              Si llegaste hasta aquí, probablemente ya sabes que tu empresa puede funcionar mejor.
            </h4>
            <p className="text-neutral-500 text-sm max-w-md mx-auto">
              La pregunta ya no es si la tecnología puede ayudarte. La pregunta es <strong>cuándo</strong> quieres comenzar.
            </p>
          </div>
          <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
            <span>Conversemos</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">
        &copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.
      </footer>
    </div>
  );
}
