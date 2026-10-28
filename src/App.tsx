import React, { useState, useEffect, useId } from 'react';
import {
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Copy,
  Check,
  Eye,
  Heart
} from 'lucide-react';

// Pre-generated high-fidelity image assets
const HERO_IMG = '/src/assets/images/hero_clothing_lookbook_1790697575080.jpg';
const FABRIC_IMG = '/src/assets/images/fabric_weave_quality_1790697586823.jpg';
const CAPSULE_IMG = '/src/assets/images/capsule_wardrobe_pieces_1790697596183.jpg';
const MATEO_AVATAR = '/src/assets/images/avatar_mateo_customer_1790697605653.jpg';
const VALERIA_AVATAR = '/src/assets/images/avatar_valeria_customer_1790697614471.jpg';

interface CatalogItem {
  id: string;
  name: string;
  category: string;
  price: number;
  tag: string;
  description: string;
  fabric: string;
  image: string;
}

const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'prod-1',
    name: 'Pantalón Relaxed de Lino y Algodón',
    category: 'Pantalones',
    price: 79,
    tag: 'El favorito de Mateo',
    description: 'Caída con peso natural, cintura semi-elástica y patronaje holgado sin perder la línea elegante.',
    fabric: '60% Lino Europeo, 40% Algodón Orgánico',
    image: CAPSULE_IMG,
  },
  {
    id: 'prod-2',
    name: 'Camiseta Esencial Cuello Redondo 240g',
    category: 'Camisetas',
    price: 39,
    tag: 'Básico verificado por Valeria',
    description: 'Gramaje premium ultra resistente que no trasluce ni se deforma con el uso continuo.',
    fabric: '100% Algodón Peinado Orgánico GOTS',
    image: FABRIC_IMG,
  },
  {
    id: 'prod-3',
    name: 'Sobrecamisa Versátil de Trabajo Suave',
    category: 'Capas y Abrigos',
    price: 95,
    tag: 'Edición Limitada',
    description: 'La tercera pieza perfecta para entretiempo, con botones de tagua natural y costuras reforzadas.',
    fabric: '100% Sarga de Algodón Reciclado',
    image: HERO_IMG,
  },
];

export default function App() {
  // Navigation & mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [bagNotification, setBagNotification] = useState<string | null>(null);

  // Catalog quick drawer / modal
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CatalogItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');

  // FAQ accordion state (single or multi expand)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    interes: 'ropa-diario',
    telefono: '',
    terminos: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Accessible IDs
  const nameErrorId = useId();
  const emailErrorId = useId();
  const termsErrorId = useId();

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (catalogOpen) setCatalogOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [catalogOpen, mobileMenuOpen]);

  // Smooth scroll helper with keyboard focus management
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }
  };

  // Add to cart handler
  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setBagNotification(`¡${productName} (Talla ${selectedSize}) añadida a tu bolsa!`);
    setTimeout(() => {
      setBagNotification(null);
    }, 3500);
  };

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.nombre.trim()) {
      errors.nombre = 'Por favor ingresa tu nombre completo (mínimo 2 caracteres).';
    } else if (formData.nombre.trim().length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Por favor ingresa tu dirección de correo electrónico.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'El formato del correo electrónico no es válido (ejemplo: usuario@correo.com).';
    }

    if (!formData.terminos) {
      errors.terminos = 'Debes aceptar la política de privacidad y los términos para continuar.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setFormSubmitted(true);
      }, 700);
    }
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText('AURA15');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 flex flex-col font-sans">
      {/* Skip Link for WCAG 2.1 AA Keyboard Accessibility */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded focus:shadow-lg focus:outline-none"
      >
        Saltar al contenido principal
      </a>

      {/* Top Banner (Slim, subtle, non-intrusive) */}
      <aside
        aria-label="Aviso de promociones y envíos"
        className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2"
      >
        <span>Envíos rápidos en 24/48h</span>
        <span aria-hidden="true" className="text-stone-500">·</span>
        <span>Devoluciones gratuitas durante 30 días</span>
        <span aria-hidden="true" className="text-stone-500">·</span>
        <span className="text-amber-300 font-semibold">15% de descuento en tu primer pedido</span>
      </aside>

      {/* [HEADER / NAV] - Conforme al Top Bar Contract de 3 Zonas */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zona 1: Nombre de la marca (Wordmark limpio de un solo elemento) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-slate-900 hover:text-stone-700 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 rounded"
          >
            AURA
          </a>

          {/* Zona 2: Enlaces de navegación funcionales con anclas limpias */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700"
          >
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="hover:text-slate-900 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 rounded py-1"
            >
              Inicio
            </a>
            <a
              href="#beneficios"
              onClick={(e) => handleNavClick(e, 'beneficios')}
              className="hover:text-slate-900 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 rounded py-1"
            >
              Beneficios
            </a>
            <a
              href="#testimonios"
              onClick={(e) => handleNavClick(e, 'testimonios')}
              className="hover:text-slate-900 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 rounded py-1"
            >
              Comunidad
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, 'faq')}
              className="hover:text-slate-900 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 rounded py-1"
            >
              Preguntas
            </a>
            <a
              href="#registro"
              onClick={(e) => handleNavClick(e, 'registro')}
              className="hover:text-slate-900 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 rounded py-1"
            >
              15% Descuento
            </a>
          </nav>

          {/* Zona 3: Botón CTA secundario & Bolsa interactiva */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCatalogOpen(true)}
              className="relative p-2.5 text-stone-700 hover:text-slate-900 hover:bg-stone-200/50 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-slate-900"
              aria-label={`Ver bolsa de compras, ${cartCount} artículos agregados`}
            >
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setCatalogOpen(true)}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-slate-900 bg-transparent border border-slate-900 rounded-md hover:bg-slate-900 hover:text-white transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              Ver colección
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900 rounded-md"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav"
            className="md:hidden bg-[#FAF9F5] border-b border-stone-200 px-6 py-5 shadow-lg animate-in slide-in-from-top-2"
          >
            <nav className="flex flex-col gap-4 text-base font-medium text-stone-800">
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, 'hero')}
                className="py-1 hover:text-slate-900 transition-colors"
              >
                Inicio
              </a>
              <a
                href="#beneficios"
                onClick={(e) => handleNavClick(e, 'beneficios')}
                className="py-1 hover:text-slate-900 transition-colors"
              >
                Beneficios
              </a>
              <a
                href="#testimonios"
                onClick={(e) => handleNavClick(e, 'testimonios')}
                className="py-1 hover:text-slate-900 transition-colors"
              >
                Comunidad
              </a>
              <a
                href="#faq"
                onClick={(e) => handleNavClick(e, 'faq')}
                className="py-1 hover:text-slate-900 transition-colors"
              >
                Preguntas frecuentes
              </a>
              <a
                href="#registro"
                onClick={(e) => handleNavClick(e, 'registro')}
                className="py-1 hover:text-slate-900 transition-colors"
              >
                Registro & Descuento
              </a>
              <div className="pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCatalogOpen(true);
                  }}
                  className="w-full py-3 px-4 text-center font-semibold text-white bg-slate-900 rounded-md shadow-sm"
                >
                  Explorar la nueva colección
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Bag Notification Toast */}
      {bagNotification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
          <p className="text-sm font-medium">{bagNotification}</p>
          <button
            type="button"
            onClick={() => setBagNotification(null)}
            className="text-stone-400 hover:text-white ml-2 p-1"
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main id="main-content" className="flex-grow">
        {/* =========================================================================
            [SECCIÓN 1: HEADER / HERO - Lo primero que ve el usuario]
            H1: Siéntete bien con lo que vistes.
            Subtítulo: Moda cómoda, tejidos transpirables y diseños que respetan tu piel. Descubre el equilibrio perfecto entre estilo y bienestar.
            [Botón CTA 1]: Explorar la nueva colección
            Descripción breve: máximo 30 palabras.
        ========================================================================= */}
        <section
          id="hero"
          aria-labelledby="hero-title"
          className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Headlines & CTA */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-600">
                  <span className="w-6 h-px bg-stone-400" aria-hidden="true"></span>
                  <span>Colección Atemporal & Sostenible</span>
                </div>

                {/* H1 principal según especificación */}
                <h1
                  id="hero-title"
                  className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-950 tracking-tight leading-[1.12]"
                  style={{ textWrap: 'balance' }}
                >
                  Siéntete bien con lo que vistes.
                </h1>

                {/* Subtítulo según especificación */}
                <p className="text-lg sm:text-xl text-stone-700 leading-relaxed font-normal">
                  Moda cómoda, tejidos transpirables y diseños que respetan tu piel. Descubre el equilibrio perfecto entre estilo y bienestar.
                </p>

                {/* Descripción breve de máximo 30 palabras según especificación (Exacto: 20 palabras) */}
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                  Prendas confeccionadas éticamente con fibras naturales para acompañar tu ritmo diario con ligereza, elegancia auténtica y total durabilidad.
                </p>

                {/* Botón CTA 1 */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setCatalogOpen(true)}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-wide text-white bg-slate-950 hover:bg-stone-800 rounded-md shadow-md transition-all group focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    <span>Explorar la nueva colección</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>

                  <a
                    href="#beneficios"
                    onClick={(e) => handleNavClick(e, 'beneficios')}
                    className="inline-flex items-center justify-center px-6 py-4 text-sm font-semibold text-stone-800 hover:text-slate-950 bg-stone-200/60 hover:bg-stone-200 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    Conoce nuestros tejidos
                  </a>
                </div>

                {/* Indicadores de confianza adyacentes */}
                <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-stone-700">
                  <div className="space-y-1">
                    <p className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tabular-nums">100%</p>
                    <p className="text-xs text-stone-600">Fibras naturales orgánicas</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tabular-nums">24-48h</p>
                    <p className="text-xs text-stone-600">Envío express garantizado</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tabular-nums">30 días</p>
                    <p className="text-xs text-stone-600">Prueba en casa sin coste</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Asset */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden bg-stone-200 shadow-xl border border-stone-200/60 aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]">
                  <img
                    src={HERO_IMG}
                    alt="Modelo luciendo prendas de lino y algodón orgánico transpirable en tonos neutros y corte relajado"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating tactile badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-stone-200/70 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Lookbook 2026</p>
                      <p className="text-sm font-bold text-slate-900">Algodón GOTS & Lino Europeo</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCatalogOpen(true)}
                      className="text-xs font-semibold text-stone-900 underline underline-offset-4 hover:text-stone-600 focus-visible:ring-2 focus-visible:ring-slate-900 rounded"
                    >
                      Ver prendas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            [SECCIÓN 2: BENEFICIOS - ¿Por qué elegirnos?]
            Título de sección: Creado para tu día a día, pensado para durar.
            Sabemos que la verdadera comodidad va más allá de la tela. Por eso, cada una de nuestras piezas está diseñada para ofrecerte una experiencia completa:
            🌿 Diseño versátil: ...
            ✨ Ajuste superior: ...
            🧶 Tejidos de alta retención: ...
            🧵 Cuidado en los detalles: ...
            📦 Experiencia sin fricción: ...
            [Botón CTA 2]: Comprar ahora y renovar mi armario
        ========================================================================= */}
        <section
          id="beneficios"
          aria-labelledby="beneficios-title"
          className="py-20 md:py-28 bg-[#F4F2EC] border-y border-stone-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-stone-600">
                La experiencia AURA
              </span>
              <h2
                id="beneficios-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Creado para tu día a día, pensado para durar.
              </h2>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
                Sabemos que la verdadera comodidad va más allá de la tela. Por eso, cada una de nuestras piezas está diseñada para ofrecerte una experiencia completa:
              </p>
            </div>

            {/* Grid of the 5 specific benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Beneficio 1: Diseño versátil */}
              <article className="bg-[#FAF9F5] p-8 rounded-xl border border-stone-200/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-2xl"
                    role="img"
                    aria-label="Planta y sostenibilidad"
                  >
                    🌿
                  </div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    Diseño versátil
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    Prendas atemporales fáciles de combinar para multiplicar tus opciones de looks con menos piezas en tu armario.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-stone-200/60 text-xs text-stone-500 font-medium">
                  Ideal para armario cápsula
                </div>
              </article>

              {/* Beneficio 2: Ajuste superior */}
              <article className="bg-[#FAF9F5] p-8 rounded-xl border border-stone-200/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-2xl"
                    role="img"
                    aria-label="Brillo y precisión de corte"
                  >
                    ✨
                  </div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    Ajuste superior
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    Patrones estudiados para adaptarse de forma natural a la silueta de tu cuerpo, garantizando libertad de movimiento en cada paso.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-stone-200/60 text-xs text-stone-500 font-medium">
                  Libertad de movimiento total
                </div>
              </article>

              {/* Beneficio 3: Tejidos de alta retención */}
              <article className="bg-[#FAF9F5] p-8 rounded-xl border border-stone-200/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-2xl"
                    role="img"
                    aria-label="Ovillo de fibra textil de calidad"
                  >
                    🧶
                  </div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    Tejidos de alta retención
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    Materiales premium que cuidan tu piel y no pierden su forma, suavidad ni color tras múltiples lavados.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-stone-200/60 text-xs text-stone-500 font-medium">
                  Resistente a lavados intensivos
                </div>
              </article>

              {/* Beneficio 4: Cuidado en los detalles */}
              <article className="bg-[#FAF9F5] p-8 rounded-xl border border-stone-200/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-2xl"
                    role="img"
                    aria-label="Hilo de costura y confección"
                  >
                    🧵
                  </div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    Cuidado en los detalles
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    Costuras reforzadas, cierres de alta calidad y acabados precisos que prolongan la vida útil de cada prenda.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-stone-200/60 text-xs text-stone-500 font-medium">
                  Costuras dobles y botones naturales
                </div>
              </article>

              {/* Beneficio 5: Experiencia sin fricción (Spans 2 cols on tablet/desktop) */}
              <article className="bg-[#FAF9F5] p-8 rounded-xl border border-stone-200/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow md:col-span-2 lg:col-span-2">
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-2xl"
                    role="img"
                    aria-label="Paquete de envío rápido"
                  >
                    📦
                  </div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    Experiencia sin fricción
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-xl">
                    Envíos rápidos, guía de tallas exacta y devoluciones gratuitas si la prenda no te convence al probártela en casa.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-stone-200/60 flex flex-wrap items-center gap-4 text-xs text-stone-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-stone-700" aria-hidden="true" />
                    Entrega en 24/48h
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-stone-700" aria-hidden="true" />
                    30 días para cambios a domicilio
                  </span>
                </div>
              </article>
            </div>

            {/* Visual showcase of materials */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative rounded-xl overflow-hidden bg-stone-200 aspect-[16/9] border border-stone-200">
                <img
                  src={FABRIC_IMG}
                  alt="Primer plano de la textura del tejido de algodón orgánico y lino con hilado fino y transpirable"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-wider text-amber-200 font-medium">Tacto Puro</p>
                    <p className="text-base font-bold">Hilado de algodón 240g de alta retención</p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-stone-200 aspect-[16/9] border border-stone-200">
                <img
                  src={CAPSULE_IMG}
                  alt="Colección de prendas básicas combinables en perchas de madera mostrando versatilidad de armario cápsula"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-wider text-amber-200 font-medium">Armario Cápsula</p>
                    <p className="text-base font-bold">5 prendas esenciales, más de 20 combinaciones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón CTA 2 según especificación */}
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setCatalogOpen(true)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-wide text-white bg-slate-950 hover:bg-stone-800 rounded-md shadow-md transition-all focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                <span>Comprar ahora y renovar mi armario</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            [SECCIÓN 3: PRUEBA SOCIAL - Generando confianza]
            Título de sección: Lo que dice nuestra comunidad
            No solo lo decimos nosotros. Esto es lo que opinan quienes ya hicieron el cambio hacia una moda más consciente y cómoda:
            ⭐️⭐️⭐️⭐️⭐️ Mateo R.
            ⭐️⭐️⭐️⭐️⭐️ Valeria C.
        ========================================================================= */}
        <section
          id="testimonios"
          aria-labelledby="testimonios-title"
          className="py-20 md:py-28 bg-[#FAF9F5]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-stone-600">
                Opiniones verificadas
              </span>
              <h2
                id="testimonios-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Lo que dice nuestra comunidad
              </h2>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
                No solo lo decimos nosotros. Esto es lo que opinan quienes ya hicieron el cambio hacia una moda más consciente y cómoda:
              </p>
            </div>

            {/* Testimonials cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Testimonio 1: Mateo R. */}
              <blockquote className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between relative">
                <div className="space-y-5">
                  {/* 5 estrellas accesibles */}
                  <div
                    className="flex items-center gap-1 text-amber-500"
                    role="img"
                    aria-label="Calificación: 5 de 5 estrellas"
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-500" aria-hidden="true" />
                    ))}
                  </div>

                  {/* Texto exacto del brief */}
                  <p className="text-stone-800 text-base sm:text-lg leading-relaxed italic">
                    &ldquo;Siempre me cuesta encontrar ropa que me quede bien sin tener que hacerle arreglos, pero el pantalón que pedí tiene un ajuste increíble. La tela se siente con peso y no se arruga fácilmente. Llegó en dos días, definitivamente volveré a comprar.&rdquo;
                  </p>
                </div>

                {/* Attribution con Foto + Nombre + Cargo / Ciudad */}
                <footer className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-4">
                  <img
                    src={MATEO_AVATAR}
                    alt="Retrato de Mateo R., cliente verificado de Madrid luciendo camisa cómoda de lino"
                    className="w-14 h-14 rounded-full object-cover border-2 border-stone-200"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <cite className="font-bold text-slate-900 not-italic block text-base">
                      Mateo R.
                    </cite>
                    <span className="text-xs text-stone-600 block">
                      Diseñador de Producto · Madrid
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded mt-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                      Compra verificada
                    </span>
                  </div>
                </footer>
              </blockquote>

              {/* Testimonio 2: Valeria C. */}
              <blockquote className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between relative">
                <div className="space-y-5">
                  {/* 5 estrellas accesibles */}
                  <div
                    className="flex items-center gap-1 text-amber-500"
                    role="img"
                    aria-label="Calificación: 5 de 5 estrellas"
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-500" aria-hidden="true" />
                    ))}
                  </div>

                  {/* Texto exacto del brief */}
                  <p className="text-stone-800 text-base sm:text-lg leading-relaxed italic">
                    &ldquo;Compré un par de básicos de la última colección y ya se convirtieron en mis piezas de uso diario. El empaque es impecable y la suavidad de las camisetas se nota desde que las sacas de la caja. Excelente relación calidad-precio.&rdquo;
                  </p>
                </div>

                {/* Attribution con Foto + Nombre + Cargo / Ciudad */}
                <footer className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-4">
                  <img
                    src={VALERIA_AVATAR}
                    alt="Retrato de Valeria C., clienta verificada de Barcelona vistiendo camiseta de algodón orgánico"
                    className="w-14 h-14 rounded-full object-cover border-2 border-stone-200"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <cite className="font-bold text-slate-900 not-italic block text-base">
                      Valeria C.
                    </cite>
                    <span className="text-xs text-stone-600 block">
                      Arquitecta de Interiores · Barcelona
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded mt-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                      Compra verificada
                    </span>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Social proof metric summary banner */}
            <div className="mt-12 bg-stone-100/80 rounded-xl p-6 border border-stone-200/70 max-w-5xl mx-auto flex flex-wrap items-center justify-around gap-6 text-center">
              <div>
                <p className="text-2xl font-bold font-serif text-slate-900 tabular-nums">4.9 / 5.0</p>
                <p className="text-xs text-stone-600">Valoración promedio de satisfacción</p>
              </div>
              <div className="hidden sm:block w-px h-8 bg-stone-300" aria-hidden="true" />
              <div>
                <p className="text-2xl font-bold font-serif text-slate-900 tabular-nums">+12,400</p>
                <p className="text-xs text-stone-600">Prendas entregadas en España</p>
              </div>
              <div className="hidden sm:block w-px h-8 bg-stone-300" aria-hidden="true" />
              <div>
                <p className="text-2xl font-bold font-serif text-slate-900 tabular-nums">98.4%</p>
                <p className="text-xs text-stone-600">Acierto de talla en el primer pedido</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            [SECCIÓN FAQ - Preguntas Frecuentes con Acordeón Accesible]
            WCAG 2.1: Soporte completo por teclado (Enter, Space, Tab) y aria-expanded
        ========================================================================= */}
        <section
          id="faq"
          aria-labelledby="faq-title"
          className="py-20 md:py-28 bg-[#F4F2EC] border-t border-stone-200/80"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-stone-600">
                Claridad y transparencia
              </span>
              <h2
                id="faq-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Preguntas frecuentes sobre nuestras prendas
              </h2>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-xl mx-auto">
                Resolvemos todas tus dudas sobre materiales, tallas exactas y envíos sin fricción.
              </p>
            </div>

            <div className="space-y-4" role="region" aria-label="Acordeón de preguntas frecuentes">
              {[
                {
                  q: '¿Cómo garantizan que la talla me quede bien a la primera?',
                  a: 'Cada prenda cuenta con medidas reales en centímetros tomadas directamente sobre la tela y no sobre estándares genéricos. Además, nuestro corte holgado moderno se adapta con naturalidad. Si por cualquier motivo necesitas otra talla, te la enviamos sin coste alguno.',
                },
                {
                  q: '¿Qué tipo de tejidos utilizan y por qué respetan la piel sensible?',
                  a: 'Utilizamos 100% algodón orgánico certificado GOTS de fibra larga y lino europeo hilado en seco. No empleamos resinas químicas agresivas, blanqueadores con cloro ni tintes sintéticos pesados, lo que permite que los poros de la piel respiren de forma natural.',
                },
                {
                  q: '¿Cómo deben lavarse las prendas para mantener su color y textura?',
                  a: 'Recomendamos lavado a máquina en ciclo delicado a 30°C con detergente suave neutro y secado al aire en sombra. Nuestros tejidos pre-encogidos de alta retención evitan sorpresas y conservan su textura sedosa lavado tras lavado.',
                },
                {
                  q: '¿Cómo funciona la devolución gratuita de 30 días?',
                  a: 'Dentro de tu paquete recibirás una etiqueta prepagada. Si al probarte la prenda en casa decides cambiarla o devolverla, solo tienes que solicitar la recogida gratuita a tu domicilio o depositarla en cualquier punto de entrega cercano. El reembolso es inmediato.',
                },
              ].map((item, index) => {
                const isOpen = expandedFaq === index;
                const buttonId = `faq-btn-${index}`;
                const panelId = `faq-panel-${index}`;

                return (
                  <div
                    key={index}
                    className="bg-[#FAF9F5] border border-stone-200/90 rounded-xl overflow-hidden transition-colors"
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setExpandedFaq(isOpen ? null : index)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-slate-900 hover:text-stone-700 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                            isOpen ? 'rotate-180 text-slate-900' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className={`px-6 pb-6 pt-1 text-sm sm:text-base text-stone-700 leading-relaxed ${
                        isOpen ? 'block' : 'hidden'
                      }`}
                    >
                      <p>{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            [SECCIÓN REGISTRO - Formulario de Captura Accesible]
            WCAG 2.1: <label for>, estados de foco, validación con icono + texto + color
            Campos: Nombre, Email, Interés de estilo, Teléfono (opcional), Checkbox Términos, Botón CTA
        ========================================================================= */}
        <section
          id="registro"
          aria-labelledby="registro-title"
          className="py-20 md:py-28 bg-[#FAF9F5] border-t border-stone-200/80"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-md">
              <div className="text-center space-y-3 mb-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-stone-600">
                  Beneficio de bienvenida
                </span>
                <h2
                  id="registro-title"
                  className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 tracking-tight"
                >
                  Recibe un 15% de descuento en tu primer pedido
                </h2>
                <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto">
                  Únete a nuestro club consciente y recibe de regalo nuestra Guía Digital de Armario Cápsula con 20 fórmulas de combinaciones atemporales.
                </p>
              </div>

              {formSubmitted ? (
                <div
                  role="alert"
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-in fade-in"
                >
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-emerald-950">
                    ¡Bienvenido/a a la comunidad AURA!
                  </h3>
                  <p className="text-sm sm:text-base text-emerald-800 max-w-md mx-auto">
                    Hemos enviado tu guía cápsula a <strong className="text-emerald-950">{formData.email}</strong>. Puedes usar tu cupón de bienvenida ahora mismo:
                  </p>

                  <div className="bg-white border-2 border-dashed border-emerald-300 p-4 rounded-xl max-w-xs mx-auto flex items-center justify-between gap-2 shadow-sm">
                    <span className="font-mono text-xl font-bold tracking-widest text-emerald-900">
                      AURA15
                    </span>
                    <button
                      type="button"
                      onClick={copyCoupon}
                      className="px-3 py-1.5 text-xs font-semibold bg-emerald-900 text-white rounded-md hover:bg-emerald-800 transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-900"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setCatalogOpen(true)}
                      className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
                    >
                      Aplicar a la colección
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  noValidate
                  className="space-y-6"
                  aria-label="Formulario de suscripción y descuento"
                >
                  {/* Campo: Nombre completo */}
                  <div className="space-y-2">
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-semibold text-stone-900"
                    >
                      Nombre completo <span className="text-rose-600" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.nombre}
                      onChange={(e) => {
                        setFormData({ ...formData, nombre: e.target.value });
                        if (formErrors.nombre) {
                          setFormErrors({ ...formErrors, nombre: '' });
                        }
                      }}
                      aria-required="true"
                      aria-invalid={Boolean(formErrors.nombre)}
                      aria-describedby={formErrors.nombre ? nameErrorId : undefined}
                      placeholder="Ej: Mateo Rodríguez"
                      className={`w-full px-4 py-3 text-sm rounded-lg border bg-stone-50/50 text-slate-900 transition-colors focus:bg-white focus:outline-none ${
                        formErrors.nombre
                          ? 'border-rose-600 ring-1 ring-rose-600'
                          : 'border-stone-300 hover:border-stone-400 focus:border-slate-900'
                      }`}
                    />
                    {formErrors.nombre && (
                      <p
                        id={nameErrorId}
                        role="alert"
                        className="text-xs text-rose-700 font-medium flex items-center gap-1.5 mt-1"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" aria-hidden="true" />
                        <span>{formErrors.nombre}</span>
                      </p>
                    )}
                  </div>

                  {/* Campo: Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-stone-900"
                    >
                      Correo electrónico <span className="text-rose-600" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email) {
                          setFormErrors({ ...formErrors, email: '' });
                        }
                      }}
                      aria-required="true"
                      aria-invalid={Boolean(formErrors.email)}
                      aria-describedby={formErrors.email ? emailErrorId : undefined}
                      placeholder="tu.correo@ejemplo.com"
                      className={`w-full px-4 py-3 text-sm rounded-lg border bg-stone-50/50 text-slate-900 transition-colors focus:bg-white focus:outline-none ${
                        formErrors.email
                          ? 'border-rose-600 ring-1 ring-rose-600'
                          : 'border-stone-300 hover:border-stone-400 focus:border-slate-900'
                      }`}
                    />
                    {formErrors.email && (
                      <p
                        id={emailErrorId}
                        role="alert"
                        className="text-xs text-rose-700 font-medium flex items-center gap-1.5 mt-1"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" aria-hidden="true" />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Campo Adicional Relevante: Interés de prendas */}
                  <div className="space-y-2">
                    <label
                      htmlFor="interes"
                      className="block text-sm font-semibold text-stone-900"
                    >
                      ¿Qué prendas buscas para renovar tu armario?
                    </label>
                    <div className="relative">
                      <select
                        id="interes"
                        name="interes"
                        value={formData.interes}
                        onChange={(e) => setFormData({ ...formData, interes: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-lg border border-stone-300 bg-stone-50/50 text-slate-900 appearance-none hover:border-stone-400 focus:border-slate-900 focus:bg-white focus:outline-none"
                      >
                        <option value="ropa-diario">Básicos diarios de alta densidad (Camisetas y tops)</option>
                        <option value="pantalones">Pantalones fluidos de lino y algodón</option>
                        <option value="sobrecamisas">Capas ligeras y sobrecamisas de entretiempo</option>
                        <option value="capsula-completa">Armario cápsula completo para mujer / hombre</option>
                      </select>
                      <ChevronDown
                        className="w-4 h-4 text-stone-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Campo Opcional: Teléfono */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="telefono"
                        className="block text-sm font-semibold text-stone-900"
                      >
                        Teléfono móvil
                      </label>
                      <span className="text-xs text-stone-500">(Opcional, para aviso por WhatsApp/SMS)</span>
                    </div>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      autoComplete="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="+34 600 000 000"
                      className="w-full px-4 py-3 text-sm rounded-lg border border-stone-300 bg-stone-50/50 text-slate-900 hover:border-stone-400 focus:border-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Checkbox Términos y Condiciones */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-start gap-3">
                      <input
                        id="terminos"
                        name="terminos"
                        type="checkbox"
                        required
                        checked={formData.terminos}
                        onChange={(e) => {
                          setFormData({ ...formData, terminos: e.target.checked });
                          if (formErrors.terminos) {
                            setFormErrors({ ...formErrors, terminos: '' });
                          }
                        }}
                        aria-required="true"
                        aria-invalid={Boolean(formErrors.terminos)}
                        aria-describedby={formErrors.terminos ? termsErrorId : undefined}
                        className="mt-1 w-4 h-4 rounded text-slate-900 border-stone-300 focus:ring-slate-900 focus-visible:ring-2"
                      />
                      <label
                        htmlFor="terminos"
                        className="text-xs sm:text-sm text-stone-700 leading-normal"
                      >
                        Acepto la{' '}
                        <a
                          href="#privacidad"
                          onClick={(e) => e.preventDefault()}
                          className="text-slate-900 underline underline-offset-2 hover:text-stone-600 focus-visible:ring-2 focus-visible:ring-slate-900 rounded"
                        >
                          política de privacidad
                        </a>{' '}
                        y los términos de servicio para recibir comunicaciones comerciales de AURA. Puedes darte de baja en cualquier momento con un solo clic.
                      </label>
                    </div>
                    {formErrors.terminos && (
                      <p
                        id={termsErrorId}
                        role="alert"
                        className="text-xs text-rose-700 font-medium flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" aria-hidden="true" />
                        <span>{formErrors.terminos}</span>
                      </p>
                    )}
                  </div>

                  {/* Botón CTA de envío */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 text-sm font-semibold tracking-wide text-white bg-slate-950 hover:bg-stone-800 disabled:bg-stone-400 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    {isSubmitting ? (
                      <span>Generando tu código de descuento...</span>
                    ) : (
                      <>
                        <span>Obtener mi 15% de descuento y guía de estilo</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            [SECCIÓN 4: CIERRE / FOOTER - El último empujón]
            Título de cierre: Estás a un clic de tu nueva prenda favorita.
            No sacrifiques el estilo por la comodidad. Encuentra prendas que te representen y te hagan sentir bien desde el momento en que te las pones.
            [Botón CTA 3]: Ver prendas para mi estilo
        ========================================================================= */}
        <section
          id="cierre"
          aria-labelledby="cierre-title"
          className="py-20 md:py-28 bg-[#18181B] text-white relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              Da el paso hacia la moda consciente
            </span>

            <h2
              id="cierre-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Estás a un clic de tu nueva prenda favorita.
            </h2>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto font-normal">
              No sacrifiques el estilo por la comodidad. Encuentra prendas que te representen y te hagan sentir bien desde el momento en que te las pones.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCatalogOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-wide text-slate-950 bg-white hover:bg-stone-100 rounded-md shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Ver prendas para mi estilo</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#registro"
                onClick={(e) => handleNavClick(e, 'registro')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 text-sm font-semibold text-stone-300 hover:text-white bg-white/10 hover:bg-white/15 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-white"
              >
                Aprovechar cupón 15%
              </a>
            </div>

            <div className="pt-8 border-t border-stone-800 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-300" aria-hidden="true" />
                Garantía de confección europea
              </span>
              <span aria-hidden="true">·</span>
              <span>Cambios gratuitos a domicilio</span>
              <span aria-hidden="true">·</span>
              <span>Pago 100% seguro y encriptado</span>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          [FOOTER]
          Nombre del proyecto, enlace a política de privacidad (ficticio) y año actual
      ========================================================================= */}
      <footer className="bg-[#111113] text-stone-400 text-sm border-t border-stone-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Columna 1: Marca y Propuesta */}
            <div className="space-y-4 md:col-span-2">
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                AURA Moda Consciente
              </span>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md">
                Prendas atemporales confeccionadas éticamente con algodón orgánico y lino de alta retención. Ropa creada para tu día a día, pensada para durar.
              </p>
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span>Certificado GOTS Organic</span>
                <span aria-hidden="true">·</span>
                <span>Comercio Justo</span>
                <span aria-hidden="true">·</span>
                <span>Huella neutra de carbono</span>
              </div>
            </div>

            {/* Columna 2: Navegación Rápida */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-200">Navegación</p>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#hero"
                    onClick={(e) => handleNavClick(e, 'hero')}
                    className="hover:text-white transition-colors"
                  >
                    Inicio / Colección 2026
                  </a>
                </li>
                <li>
                  <a
                    href="#beneficios"
                    onClick={(e) => handleNavClick(e, 'beneficios')}
                    className="hover:text-white transition-colors"
                  >
                    Beneficios & Tejidos
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonios"
                    onClick={(e) => handleNavClick(e, 'testimonios')}
                    className="hover:text-white transition-colors"
                  >
                    Opiniones de la Comunidad
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => handleNavClick(e, 'faq')}
                    className="hover:text-white transition-colors"
                  >
                    Preguntas frecuentes & Guía de tallas
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 3: Legal & Políticas */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-200">Transparencia</p>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#privacidad"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#terminos-legales"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a
                    href="#envios-devoluciones"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    Política de Envíos y Devoluciones
                  </a>
                </li>
                <li>
                  <a
                    href="#sostenibilidad"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    Informe de Sostenibilidad y Trazabilidad
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>
              &copy; {new Date().getFullYear()} AURA Moda Consciente. Todos los derechos reservados.
            </p>
            <p className="flex items-center gap-4">
              <span>Diseñado con HTML5 semántico, accesibilidad WCAG 2.1 AA y SEO On-Page.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE COLLECTION MODAL / QUICK DRAWER
          Permite interactuar con los productos mencionados por Mateo y Valeria
      ========================================================================= */}
      {catalogOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="catalog-dialog-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div className="bg-[#FAF9F5] rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-stone-600">
                  Prendas Esenciales
                </span>
                <h3 id="catalog-dialog-title" className="text-2xl font-serif font-bold text-slate-900">
                  Nueva Colección Atemporal
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCatalogOpen(false)}
                className="p-2 text-stone-500 hover:text-slate-950 rounded-full hover:bg-stone-200 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900"
                aria-label="Cerrar ventana de catálogo"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {CATALOG_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 left-2 bg-stone-900/80 text-white text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-sm">
                        {item.tag}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                        {item.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold font-serif text-slate-900 tabular-nums">
                        {item.price} €
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item.name)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-stone-800 rounded-md transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-slate-900"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Añadir</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-4">
                <span>Tallas disponibles: XS, S, M, L, XL</span>
                <span aria-hidden="true">·</span>
                <span>Guía de medidas incluida</span>
              </div>
              <button
                type="button"
                onClick={() => setCatalogOpen(false)}
                className="text-slate-900 font-semibold underline underline-offset-4 hover:text-stone-600"
              >
                Volver a la página principal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
