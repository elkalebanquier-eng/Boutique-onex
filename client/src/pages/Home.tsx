import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Factory,
  Globe2,
  Heart,
  Home as HomeIcon,
  LayoutGrid,
  MapPin,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Truck,
  UserRound,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

type Product = {
  id: number;
  name: string;
  category: string;
  supplier: string;
  origin: string;
  price: number;
  unit: string;
  moq: string;
  rating: number;
  image: string;
  badge?: string;
  accent: string;
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  {
    id: 1,
    name: "Tote tissé Kente — édition Dakar",
    category: "Mode & accessoires",
    supplier: "Atelier Kora",
    origin: "Sénégal",
    price: 18.5,
    unit: "/ pièce",
    moq: "Min. 20 pièces",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    badge: "Sélection Onex",
    accent: "#f17f5b",
  },
  {
    id: 2,
    name: "Café arabica torréfié — 1 kg",
    category: "Alimentation",
    supplier: "Kivu Coffee Co.",
    origin: "Rwanda",
    price: 12.8,
    unit: "/ sachet",
    moq: "Min. 50 sachets",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85",
    badge: "Prêt à exporter",
    accent: "#bc6c25",
  },
  {
    id: 3,
    name: "Huile de moringa pressée à froid",
    category: "Beauté & bien-être",
    supplier: "Nia Botanicals",
    origin: "Ghana",
    price: 9.2,
    unit: "/ flacon",
    moq: "Min. 30 flacons",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=85",
    badge: "Nouveau",
    accent: "#4d8061",
  },
  {
    id: 4,
    name: "Paniers Bolga — lot de 5",
    category: "Maison & artisanat",
    supplier: "Savanna Forms",
    origin: "Ghana",
    price: 44,
    unit: "/ lot",
    moq: "Min. 10 lots",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=900&q=85",
    accent: "#d7a44b",
  },
  {
    id: 5,
    name: "Beurre de karité brut premium",
    category: "Beauté & bien-être",
    supplier: "Safi Naturals",
    origin: "Burkina Faso",
    price: 6.4,
    unit: "/ kg",
    moq: "Min. 100 kg",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    badge: "Best-seller",
    accent: "#b9804a",
  },
  {
    id: 6,
    name: "Chemise en lin teintée indigo",
    category: "Mode & accessoires",
    supplier: "Nubian Thread",
    origin: "Nigeria",
    price: 26,
    unit: "/ pièce",
    moq: "Min. 12 pièces",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    accent: "#354b77",
  },
  {
    id: 7,
    name: "Mangue séchée sans sucre",
    category: "Alimentation",
    supplier: "Terra Afrique",
    origin: "Côte d’Ivoire",
    price: 7.9,
    unit: "/ kg",
    moq: "Min. 40 kg",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=900&q=85",
    accent: "#e39b37",
  },
  {
    id: 8,
    name: "Pendentif laiton — forme soleil",
    category: "Bijoux & cadeaux",
    supplier: "Mansa Studio",
    origin: "Mali",
    price: 14.5,
    unit: "/ pièce",
    moq: "Min. 25 pièces",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85",
    badge: "Édition limitée",
    accent: "#c79a55",
  },
];

const categories = [
  { name: "Tout explorer", icon: LayoutGrid, color: "terracotta" },
  { name: "Alimentation", icon: Sparkles, color: "saffron" },
  { name: "Mode & accessoires", icon: ShoppingBag, color: "indigo" },
  { name: "Beauté & bien-être", icon: Heart, color: "sage" },
  { name: "Maison & artisanat", icon: Factory, color: "ochre" },
  { name: "Bijoux & cadeaux", icon: Star, color: "violet" },
];

const suppliers = [
  { initials: "AK", name: "Atelier Kora", place: "Dakar, Sénégal", speciality: "Mode éthique", tone: "coral" },
  { initials: "KC", name: "Kivu Coffee Co.", place: "Kigali, Rwanda", speciality: "Café & cacao", tone: "coffee" },
  { initials: "NB", name: "Nia Botanicals", place: "Accra, Ghana", speciality: "Botanique", tone: "sage" },
  { initials: "SF", name: "Savanna Forms", place: "Tamale, Ghana", speciality: "Artisanat", tone: "sand" },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(value);

function Logo() {
  return (
    <a href="#top" className="brand" aria-label="Boutique Onex, accueil">
      <span className="brand-mark"><span /></span>
      <span className="brand-name">boutique<span>onex</span></span>
    </a>
  );
}

function ProductCard({ product, onAdd, onFavorite, isFavorite }: { product: Product; onAdd: (product: Product) => void; onFavorite: (id: number) => void; isFavorite: boolean }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap" style={{ backgroundColor: `${product.accent}19` }}>
        <div className="product-image" style={{ backgroundImage: `url(${product.image})` }} />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`favorite-button ${isFavorite ? "is-favorite" : ""}`} onClick={() => onFavorite(product.id)} aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}>
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="product-card-body">
        <div className="product-meta-line"><span>{product.origin}</span><span className="rating"><Star size={12} fill="currentColor" /> {product.rating}</span></div>
        <h3>{product.name}</h3>
        <p className="supplier-line"><span>{product.supplier}</span><BadgeCheck size={14} /></p>
        <div className="product-footer">
          <div><strong>{formatPrice(product.price)}</strong><span>{product.unit}</span><small>{product.moq}</small></div>
          <button className="add-button" onClick={() => onAdd(product)} aria-label={`Ajouter ${product.name} au panier`}><Plus size={18} /></button>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tout explorer");
  const [sort, setSort] = useState("Recommandés");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [profileOpen, setProfileOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter(product => {
      const matchesCategory = activeCategory === "Tout explorer" || product.category === activeCategory;
      const matchesQuery = !normalizedQuery || [product.name, product.category, product.supplier, product.origin].join(" ").toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
    return [...filtered].sort((a, b) => {
      if (sort === "Prix croissant") return a.price - b.price;
      if (sort === "Prix décroissant") return b.price - a.price;
      if (sort === "Mieux notés") return b.rating - a.rating;
      return a.id - b.id;
    });
  }, [activeCategory, query, sort]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart(current => {
      const existing = current.find(item => item.id === product.id);
      if (existing) return current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    });
    toast.success("Produit ajouté au panier", { description: product.name });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(current => current.flatMap(item => {
      if (item.id !== id) return [item];
      const quantity = item.quantity + delta;
      return quantity > 0 ? [{ ...item, quantity }] : [];
    }));
  };

  const toggleFavorite = (id: number) => {
    setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  };

  const scrollToCatalog = () => document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });

  const goToTab = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === "home") window.scrollTo({ top: 0, behavior: "smooth" });
    if (tab === "shop") window.setTimeout(scrollToCatalog, 30);
    if (tab === "cart") setCartOpen(true);
    if (tab === "profile") setProfileOpen(true);
  };

  return (
    <div className="site-shell" id="top">
      <div className="announcement"><div className="page-width announcement-inner"><span><Zap size={14} fill="currentColor" /> Le commerce africain, à portée mondiale.</span><span className="announcement-links"><span>FR <ChevronDown size={13} /></span><span>EUR <ChevronDown size={13} /></span><a href="#sellers">Vendre sur Onex <ArrowUpRight size={13} /></a></span></div></div>

      <header className="site-header">
        <div className="page-width header-inner">
          <Logo />
          <nav className="app-nav" aria-label="Navigation principale">
            <button className={activeTab === "home" ? "active" : ""} onClick={() => goToTab("home")}><HomeIcon size={16} /><span>Accueil</span></button>
            <button className={activeTab === "shop" ? "active" : ""} onClick={() => goToTab("shop")}><LayoutGrid size={16} /><span>Boutique</span></button>
            <button className={activeTab === "cart" ? "active" : ""} onClick={() => goToTab("cart")}><ShoppingBag size={16} /><span>Panier</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
            <button className={activeTab === "profile" ? "active" : ""} onClick={() => goToTab("profile")}><UserRound size={16} /><span>Profil</span></button>
          </nav>
          <div className="header-search">
            <Search size={19} />
            <input value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => event.key === "Enter" && goToTab("shop")} placeholder="Rechercher un produit, une marque..." aria-label="Rechercher dans le catalogue" />
            <button onClick={() => goToTab("shop")}>Rechercher</button>
          </div>
          <div className="header-actions">
            <button className="icon-action" onClick={() => goToTab("profile")} aria-label="Ouvrir mon profil"><UserRound size={20} /><span>Profil</span></button>
            <button className="cart-action" onClick={() => goToTab("cart")} aria-label="Ouvrir le panier"><ShoppingBag size={20} /><span>Panier</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
            <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(current => !current)} aria-label="Ouvrir le menu"><Menu size={22} /></button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="page-width hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> La place de marché qui nous ressemble</div>
              <h1>Le meilleur de<br /><em>l’Afrique.</em> Pour le<br />monde entier.</h1>
              <p>Découvrez des produits singuliers, sourcés directement auprès de fournisseurs africains vérifiés. Moins d’intermédiaires. Plus d’impact.</p>
              <div className="hero-actions"><button className="primary-button" onClick={scrollToCatalog}>Explorer le catalogue <ArrowRight size={18} /></button><a className="text-button" href="#sellers">Devenir fournisseur <ArrowUpRight size={16} /></a></div>
              <div className="hero-proof"><div className="avatar-stack"><span>AM</span><span>KS</span><span>JD</span><span>+</span></div><p><strong>2 400+</strong> acheteurs actifs<br /><span>dans 18 pays</span></p></div>
            </div>
            <div className="hero-visual" aria-label="Sélection de produits africains">
              <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
              <div className="hero-note hero-note-top"><Sparkles size={15} /><span>Sélection<br /><strong>du moment</strong></span></div>
              <div className="hero-main-card"><div className="hero-main-photo" /><div className="hero-main-caption"><div><span>01 / 04</span><strong>Matières brutes,<br />beautés infinies.</strong></div><ArrowUpRight size={21} /></div></div>
              <div className="hero-float-card hero-float-left"><div className="float-image float-basket" /><span>Fait main</span><strong>Maison & artisanat</strong></div>
              <div className="hero-float-card hero-float-right"><div className="float-image float-bottle" /><span>Origine Ghana</span><strong>Botaniques premium</strong></div>
              <div className="hero-stamp"><span>ONEX</span><small>TRADE<br />COLLECTIVE</small></div>
            </div>
          </div>
        </section>

        <section className="category-strip"><div className="page-width category-strip-inner"><div className="category-intro"><span>Explorer par univers</span><strong>Des savoir-faire, une<br />nouvelle adresse.</strong></div><div className="category-pills">{categories.map(category => { const Icon = category.icon; return <button key={category.name} className={`category-pill ${activeCategory === category.name ? "active" : ""}`} onClick={() => { setActiveCategory(category.name); scrollToCatalog(); }}><span className={`category-icon ${category.color}`}><Icon size={18} /></span><span>{category.name}</span><ChevronRight size={14} /></button>; })}</div></div></section>

        <section className="catalog-section page-width" id="catalogue">
          <div className="section-heading"><div><div className="eyebrow muted"><span className="eyebrow-dot" /> Les trouvailles du moment</div><h2>À mettre dans votre<br /><em>prochaine collection.</em></h2></div><div className="heading-aside"><p>Des produits choisis pour leur qualité, leur histoire et leur potentiel commercial.</p><a href="#catalogue">Voir toute la sélection <ArrowUpRight size={15} /></a></div></div>
          <div className="catalog-toolbar"><div className="result-count"><strong>{filteredProducts.length}</strong> produits trouvés {query && <span>pour « {query} »</span>}</div><div className="toolbar-actions"><button className="filter-button"><SlidersHorizontal size={16} /> Filtres <span className="filter-count">2</span></button><label className="sort-select"><ArrowDownUp size={15} /><select value={sort} onChange={event => setSort(event.target.value)} aria-label="Trier les produits"><option>Recommandés</option><option>Mieux notés</option><option>Prix croissant</option><option>Prix décroissant</option></select><ChevronDown size={14} /></label></div></div>
          <div className="catalog-layout"><aside className="filter-sidebar"><div className="filter-title"><strong>Affiner votre recherche</strong><button onClick={() => { setActiveCategory("Tout explorer"); setQuery(""); setSort("Recommandés"); }}>Réinitialiser</button></div><div className="filter-group"><span className="filter-label">Catégories</span>{categories.slice(1).map(category => <button key={category.name} className={`filter-option ${activeCategory === category.name ? "selected" : ""}`} onClick={() => setActiveCategory(activeCategory === category.name ? "Tout explorer" : category.name)}><span className="checkbox-fake">{activeCategory === category.name && <Check size={12} />}</span>{category.name}<small>{products.filter(product => product.category === category.name).length}</small></button>)}</div><div className="filter-group"><span className="filter-label">Origine</span><button className="filter-option"><span className="checkbox-fake" />Afrique de l’Ouest<small>42</small></button><button className="filter-option"><span className="checkbox-fake" />Afrique de l’Est<small>28</small></button><button className="filter-option"><span className="checkbox-fake" />Afrique centrale<small>16</small></button></div><div className="filter-group"><span className="filter-label">Vente en gros</span><button className="filter-option"><span className="checkbox-fake" />Prêt à exporter</button><button className="filter-option"><span className="checkbox-fake" />Échantillon disponible</button></div><div className="filter-help"><CircleHelp size={17} /><span>Besoin d’aide pour sourcer ?<strong>Parler à un expert</strong></span><ArrowUpRight size={15} /></div></aside><div className="product-grid">{filteredProducts.length ? filteredProducts.map(product => <ProductCard key={product.id} product={product} onAdd={addToCart} onFavorite={toggleFavorite} isFavorite={favorites.includes(product.id)} />) : <div className="empty-state"><Search size={28} /><h3>Aucun produit trouvé</h3><p>Essayez une autre recherche ou réinitialisez les filtres.</p><button className="secondary-button" onClick={() => { setQuery(""); setActiveCategory("Tout explorer"); }}>Réinitialiser la recherche</button></div>}</div></div>
        </section>

        <section className="seller-section" id="sellers"><div className="page-width"><div className="seller-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> Des histoires derrière chaque produit</div><h2>Rencontrez les <em>faiseurs.</em></h2></div><a className="text-button light" href="#sellers">Voir tous les fournisseurs <ArrowUpRight size={16} /></a></div><div className="seller-grid">{suppliers.map(supplier => <a href="#catalogue" className="seller-card" key={supplier.name}><div className={`seller-avatar ${supplier.tone}`}>{supplier.initials}</div><div className="seller-info"><div className="seller-name"><strong>{supplier.name}</strong><BadgeCheck size={15} /></div><span><MapPin size={13} /> {supplier.place}</span><small>{supplier.speciality}</small></div><ArrowUpRight className="seller-arrow" size={18} /></a>)}</div></div></section>

        <section className="how-section page-width" id="how-it-works"><div className="how-intro"><div className="eyebrow muted"><span className="eyebrow-dot" /> Simple comme bonjour</div><h2>Du sourcing à la commande,<br /><em>on vous simplifie tout.</em></h2><p>Une expérience pensée pour les acheteurs qui veulent aller vite, sans renoncer à la confiance.</p><a className="text-button" href="#catalogue">Comment ça marche <ArrowRight size={16} /></a></div><div className="how-steps"><div className="how-step"><span className="step-number">01</span><div className="step-icon"><Search size={20} /></div><h3>Trouvez l’inspiration</h3><p>Explorez des milliers de produits, de catégories et de fournisseurs vérifiés.</p></div><div className="how-step"><span className="step-number">02</span><div className="step-icon"><MessageCircleIcon /></div><h3>Échangez directement</h3><p>Demandez un devis ou contactez un fournisseur, sans intermédiaire.</p></div><div className="how-step"><span className="step-number">03</span><div className="step-icon"><Truck size={20} /></div><h3>Faites grandir vos idées</h3><p>Suivez votre commande jusqu’à destination, en toute sérénité.</p></div></div></section>

        <section className="trust-section"><div className="page-width trust-grid"><div className="trust-brand"><span className="mini-mark"><span /></span><strong>Commerce with roots.</strong><p>La nouvelle façon de connecter les talents africains au monde.</p></div><div className="trust-item"><ShieldCheck size={23} /><div><strong>Fournisseurs vérifiés</strong><span>Chaque profil est contrôlé par notre équipe.</span></div></div><div className="trust-item"><WalletCards size={23} /><div><strong>Paiement sécurisé</strong><span>Des transactions pensées pour vos marchés.</span></div></div><div className="trust-item"><Globe2 size={23} /><div><strong>Livraison internationale</strong><span>Des solutions logistiques de bout en bout.</span></div></div></div></section>
      </main>

      <footer className="site-footer"><div className="page-width footer-top"><div><Logo /><p>Un monde de possibilités,<br />une commande à la fois.</p></div><div className="footer-links"><div><strong>Boutique Onex</strong><a href="#catalogue">À propos</a><a href="#sellers">Nos fournisseurs</a><a href="#how-it-works">Comment ça marche</a></div><div><strong>Pour les acheteurs</strong><a href="#catalogue">Explorer le catalogue</a><a href="#catalogue">Demander un devis</a><a href="#top">Centre d’aide</a></div><div><strong>Pour les vendeurs</strong><a href="#sellers">Vendre sur Onex</a><a href="#sellers">Ressources</a><a href="#sellers">Nous contacter</a></div></div></div><div className="page-width footer-bottom"><span>© 2026 Boutique Onex. Fait avec intention.</span><span>Confidentialité &nbsp;·&nbsp; Conditions &nbsp;·&nbsp; Cookies</span></div></footer>

      <nav className="mobile-app-nav" aria-label="Navigation mobile">
        <button className={activeTab === "home" ? "active" : ""} onClick={() => goToTab("home")}><HomeIcon size={19} /><span>Accueil</span></button>
        <button className={activeTab === "shop" ? "active" : ""} onClick={() => goToTab("shop")}><LayoutGrid size={19} /><span>Boutique</span></button>
        <button className={activeTab === "cart" ? "active" : ""} onClick={() => goToTab("cart")}><ShoppingBag size={19} /><span>Panier</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
        <button className={activeTab === "profile" ? "active" : ""} onClick={() => goToTab("profile")}><UserRound size={19} /><span>Profil</span></button>
      </nav>

      {profileOpen && <div className="profile-overlay" onClick={() => setProfileOpen(false)}><aside className="profile-panel" onClick={event => event.stopPropagation()}><div className="profile-panel-head"><div><span className="eyebrow muted">Espace acheteur</span><h2>Votre profil</h2></div><button className="close-button" onClick={() => setProfileOpen(false)} aria-label="Fermer le profil"><X size={20} /></button></div><div className="profile-identity"><div className="profile-avatar">KA</div><div><strong>Kadiatou A.</strong><span>Acheteuse professionnelle</span><small><BadgeCheck size={13} /> Profil vérifié</small></div></div><div className="profile-stats"><div><strong>{cartCount}</strong><span>Articles au panier</span></div><div><strong>{favorites.length}</strong><span>Favoris</span></div><div><strong>03</strong><span>Commandes</span></div></div><div className="profile-menu"><button><PackageCheck size={17} /><span>Mes commandes<small>Suivre vos achats et livraisons</small></span><ChevronRight size={16} /></button><button><Heart size={17} /><span>Mes favoris<small>Vos sélections enregistrées</small></span><ChevronRight size={16} /></button><button><Globe2 size={17} /><span>Adresse de livraison<small>France · Dakar · Abidjan</small></span><ChevronRight size={16} /></button><button><CircleHelp size={17} /><span>Besoin d’aide ?<small>Parler à un expert Onex</small></span><ChevronRight size={16} /></button></div><button className="seller-profile-cta" onClick={() => { setProfileOpen(false); document.getElementById("sellers")?.scrollIntoView({ behavior: "smooth" }); }}><Sparkles size={16} /><span><strong>Devenir fournisseur</strong><small>Présentez vos produits au monde</small></span><ArrowUpRight size={16} /></button></aside></div>}

      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={event => event.stopPropagation()}><div className="cart-header"><div><span className="eyebrow muted">Votre sélection</span><h2>Panier <span>({cartCount})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Fermer le panier"><X size={20} /></button></div>{cart.length ? <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><div className="cart-thumb" style={{ backgroundImage: `url(${item.image})` }} /><div className="cart-item-info"><strong>{item.name}</strong><span>{item.supplier}</span><b>{formatPrice(item.price)}</b><div className="quantity-control"><button onClick={() => updateQuantity(item.id, -1)}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}><Plus size={13} /></button></div></div><button className="remove-item" onClick={() => updateQuantity(item.id, -item.quantity)}><X size={14} /></button></div>)}</div><div className="cart-summary"><div><span>Sous-total indicatif</span><strong>{formatPrice(cartTotal)}</strong></div><p><ShieldCheck size={15} /> Les frais de livraison seront calculés selon la destination.</p><button className="primary-button full-width" onClick={() => toast.info("Votre demande de commande est prête", { description: "La finalisation du checkout arrive dans la prochaine étape." })}>Passer à la commande <ArrowRight size={17} /></button><button className="quote-button" onClick={() => toast.success("Demande de devis envoyée", { description: "Un expert Onex reviendra vers vous rapidement." })}><Send size={16} /> Demander un devis groupé</button></div></> : <div className="empty-cart"><ShoppingBag size={35} /><h3>Votre panier est vide</h3><p>Ajoutez des produits pour commencer votre sélection B2B.</p><button className="primary-button" onClick={() => { setCartOpen(false); scrollToCatalog(); }}>Explorer le catalogue</button></div>}</aside></div>}
    </div>
  );
}

function MessageCircleIcon() {
  return <Send size={20} />;
}
