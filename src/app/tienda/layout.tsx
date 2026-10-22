import { Metadata } from 'next';
import StoreNavbar from '@/components/ecommerce/StoreNavbar';
import CartFlyout from '@/components/ecommerce/CartFlyout';
import FloatingWhatsApp from '@/components/ecommerce/FloatingWhatsApp';
import SocialButtons from '@/components/ecommerce/SocialButtons';
import { CartProvider } from '@/lib/ecommerce/cart-context';
import PwaRegister from '@/components/PwaRegister';
import WekeFavicon from '@/components/ecommerce/WekeFavicon';

export const metadata: Metadata = {
  title: 'WEKE Studio | Tienda Oficial & Ropa Técnica',
  description: 'Demostración interactiva de e-commerce y catálogo técnico desarrollado con tecnología Mercenario.',
  icons: {
    icon: '/images/weke-logo.png',
    shortcut: '/images/weke-logo.png',
    apple: '/images/weke-logo.png',
  },
};

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WekeFavicon />
      <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white antialiased">
        <StoreNavbar />
        <main className="flex-1 bg-[#FFFFFF]">{children}</main>
        <CartFlyout />
        <FloatingWhatsApp />
        <PwaRegister />
      
      {/* Editorial Footer (Arc'teryx & WEKE style) */}
      <footer className="border-t border-neutral-200 bg-[#FAFAFA] py-12 px-4 sm:px-8 text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Section: Info de Marca, Iconos Sociales y Navegación */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <img
                  src="/images/weke-logo.png"
                  alt="WEKE Logo"
                  className="w-7 h-7 object-contain"
                />
                <span className="font-black text-neutral-900 tracking-widest uppercase text-sm block">
                  WEKE STUDIO // APPAREL & GEAR
                </span>
              </div>
              <p className="text-neutral-500 max-w-sm font-light leading-relaxed">
                Diseño técnico y prendas de alto rendimiento preparadas para el frío, montaña y entorno urbano. Confección sustentable con materiales premium desde 1985.
              </p>
              
              {/* Solo los iconos de redes sociales limpios y compactos */}
              <div className="pt-2">
                <SocialButtons variant="icons" />
              </div>
            </div>
            
            <div className="md:col-span-7 flex flex-wrap gap-x-12 gap-y-6 text-xs font-semibold tracking-wider uppercase text-neutral-600 justify-start md:justify-end">
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono text-neutral-400 font-bold block">Nosotros</span>
                <a href="/tienda/nosotros" className="block text-emerald-700 font-bold hover:text-emerald-900 transition-colors">
                  Historia & Filosofía
                </a>
                <a href="/tienda/nosotros#inclusivo" className="block hover:text-neutral-900 transition-colors">
                  Línea Inclusiva
                </a>
                <a href="/tienda/nosotros#sustentabilidad" className="block hover:text-neutral-900 transition-colors">
                  Cero Residuo (1985)
                </a>
              </div>

              <div className="space-y-2.5">
                <span className="text-[10px] font-mono text-neutral-400 font-bold block">Colección</span>
                <a href="/tienda" className="block hover:text-neutral-900 transition-colors">
                  Todos los Productos
                </a>
                <a href="/tienda?categoria=Chaquetas" className="block hover:text-neutral-900 transition-colors">
                  Chaquetas & Parkas
                </a>
                <a href="/tienda?categoria=Pantalones" className="block hover:text-neutral-900 transition-colors">
                  Pantalones Cargo
                </a>
              </div>

              <div className="space-y-2.5">
                <span className="text-[10px] font-mono text-neutral-400 font-bold block">Comunidad</span>
                <a href="/tienda/comunidad" className="block text-emerald-700 font-bold hover:text-emerald-900 transition-colors">
                  Boletín de Novedades
                </a>
                <a href="/tienda/comunidad#encuentros" className="block hover:text-neutral-900 transition-colors">
                  Próximos Encuentros
                </a>
                <a href="/tienda/comunidad#boletin" className="block hover:text-neutral-900 transition-colors">
                  Cupón 10% OFF
                </a>
              </div>

              <div className="space-y-2.5">
                <span className="text-[10px] font-mono text-neutral-400 font-bold block">Servicios</span>
                <a href="/tienda/checkout" className="block hover:text-neutral-900 transition-colors">
                  Checkout Webpay
                </a>
                <a href="https://wa.me/56957958467?text=Hola%20WEKE%20Studio,%20quisiera%20asesoría%20del%20asistente%20virtual%20en%20tallas%20y%20prendas" target="_blank" rel="noopener noreferrer" className="block hover:text-neutral-900 transition-colors text-emerald-600 font-bold">
                  Asistente Virtual IA (Tallas)
                </a>
                <a href="https://www.instagram.com/wekeoutdoor_?srtk=MXgzb3hubjJ0ODBnNw==" target="_blank" rel="noopener noreferrer" className="block hover:text-neutral-900 transition-colors text-pink-700 font-medium">
                  Instagram @wekeoutdoor_
                </a>
              </div>
            </div>
          </div>

          {/* Section: Copyright */}
          <div className="pt-6 border-t border-neutral-200/60 flex flex-col sm:flex-row justify-between text-[11px] text-neutral-400 gap-2 font-mono">
            <span>© {new Date().getFullYear()} WEKE Studio. Todos los derechos reservados.</span>
            <span>Sistema 100% Autoadministrable • Sin intermediarios ni comisiones</span>
          </div>
        </div>
      </footer>
    </div>
    </CartProvider>
  );
}

