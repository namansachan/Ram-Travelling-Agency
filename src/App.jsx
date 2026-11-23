import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays,
  Check, ChevronDown, Clock3, Compass, Facebook, Heart, Instagram, Mail, MapPin,
  Menu, MessageCircle, Minus, Mountain, Phone, Plus, Search, ShieldCheck, SlidersHorizontal, Sparkles,
  Star, Sun, Users, Wallet, House, BriefcaseBusiness, Route as RouteIcon,  Images, CircleHelp, X
} from "lucide-react";
import { packages as initialPackages, destinations, testimonials, faqs } from "./data";
import { IndiaDirectory, StateDetail, CustomTrip } from "./IndiaPages";

const PHONE_DISPLAY = "1234567890";
const PHONE_DIGITS = "911234567890"; // India country code for WhatsApp link
const EMAIL = "shauryasachan839@gmail.com";
const INSTAGRAM = "https://www.instagram.com/buildwith_shaurya/";
const money = n => "₹" + Number(n).toLocaleString("en-IN");
const waLink = message => `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
const mapsLink = "https://www.google.com/maps/search/?api=1&query=India";
const imageFallback = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80";

function readSavedPackages() {
  try {
    const saved = localStorage.getItem("ramta-packages");
    return saved ? JSON.parse(saved) : initialPackages;
  } catch { return initialPackages; }
}


function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", url: "/", icon: House },
    { label: "Destinations", url: "/destinations", icon: MapPin },
    { label: "Tour packages", url: "/packages", icon: BriefcaseBusiness },
    { label: "Custom trip", url: "/custom-trip", icon: RouteIcon },
    { label: "About us", url: "/about", icon: Users },
    { label: "Gallery", url: "/gallery", icon: Images },
    { label: "FAQ", url: "/faq", icon: CircleHelp },
    { label: "Contact", url: "/contact", icon: Mail },
  ];

  return (
    <>
      <div className="topline">
        <span>
          <Sun size={14} />
          Thoughtful trips. Beautiful memories.
        </span>
        <span className="top-contact">
          <Phone size={13} /> +91 {PHONE_DISPLAY}
          <i />
          <Mail size={13} /> {EMAIL}
        </span>
      </div>

      <header className="header">
        <Link
          className="brand"
          to="/"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            <Compass size={25} />
          </span>
          <span>
            <b>RAM</b>
            <small>TRAVELING AGENCY</small>
          </span>
        </Link>

        <button
          className="mobile-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={open ? "nav nav-open" : "nav"}>
          {links.map(({ label, url, icon: Icon }) => (
            <NavLink
              key={url}
              to={url}
              end={url === "/"}
              onClick={() => setOpen(false)}
            >
              <Icon size={15} strokeWidth={1.7} />
              <span>{label}</span>
            </NavLink>
          ))}

          <a
            className="nav-cta"
            href={waLink(
              "Hi Ram Traveling Agency! I'd like to plan a customised trip."
            )}
            target="_blank"
            rel="noreferrer"
          >
            Plan a trip <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
    </>
  );
}


function Footer() {
  return <footer className="footer">
    <div className="footer-main">
      <div className="footer-brand">
        <Link className="brand brand-light" to="/"><span className="brand-mark"><Compass size={25}/></span><span><b>RAM</b><small>TRAVELING AGENCY</small></span></Link>
        <p>Your plan, your pace, your kind of journey. We help turn your travel ideas into thoughtful experiences.</p>
        <div className="socials"><a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href={waLink("Hi Ram Traveling Agency!")} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a></div>
      </div>
      <div><h4>Explore</h4><Link to="/destinations">Destinations</Link><Link to="/packages">Tour packages</Link><Link to="/gallery">Gallery</Link><Link to="/about">About us</Link></div>
      <div><h4>Get in touch</h4><a href={`tel:+91${PHONE_DISPLAY}`}><Phone size={15}/> +91 {PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}><Mail size={15}/> {EMAIL}</a><a href={INSTAGRAM} target="_blank" rel="noreferrer"><Instagram size={15}/>buildwith_shaurya</a><a href={mapsLink} target="_blank" rel="noreferrer"><MapPin size={15}/> Find us on Maps</a></div>
      <div className="footer-note"><span className="eyebrow">YOUR NEXT CHAPTER</span><h3>Somewhere new is calling.</h3><Link className="text-link light-link" to="/contact">Let's plan it <ArrowRight size={16}/></Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Ram Traveling Agency. All rights reserved.</span><span>Demo website · Sample packages and prices</span><Link to="/admin">Admin demo</Link></div>
  </footer>;
}

function WhatsAppFloat() {
  return <a className="whatsapp-float" href={waLink("Hi Ram Traveling Agency! I'd like help planning a trip.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={23}/><span>Chat with us</span></a>;
}

function SectionHeading({ eyebrow, title, text, link, linkText = "Explore all", center = false }) {
  return <div className={`section-heading ${center ? "center" : ""}`}><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{link && <Link className="text-link" to={link}>{linkText} <ArrowRight size={17}/></Link>}</div>;
}

function PackageCard({ item }) {
  return <article className="package-card">
    <Link to={`/packages/${item.id}`} className="package-image">
      <img src={item.image || imageFallback} alt={item.title} onError={e => {e.currentTarget.src = imageFallback;}}/>
      <span className="image-tag">{item.tag || "Made for you"}</span><span className="image-arrow"><ArrowUpRight size={19}/></span>
    </Link>
    <div className="package-content">
      <div className="package-meta"><span><Clock3 size={14}/>{item.duration}</span><span className="rating"><Star size={14} fill="currentColor"/>{item.rating || "4.8"} <small>({item.reviews || 20})</small></span></div>
      <h3><Link to={`/packages/${item.id}`}>{item.title}</Link></h3>
      <p className="package-location"><MapPin size={15}/>{item.destination}</p>
      <p className="package-summary">{item.summary}</p>
      <div className="package-bottom"><div><small>Starting from</small><strong>{money(item.price)}<em> / person</em></strong></div><Link className="round-link" to={`/packages/${item.id}`} aria-label={`View ${item.title}`}><ArrowRight size={18}/></Link></div>
    </div>
  </article>;
}

function Home({ packages }) {
  const [destination, setDestination] = useState("");
  const [region, setRegion] = useState("All styles");
  const navigate = useNavigate();
  const search = e => { e.preventDefault(); navigate(`/packages?destination=${encodeURIComponent(destination)}&region=${encodeURIComponent(region)}`); };
  return <>
    <section className="hero">
      <div className="hero-image"></div><div className="hero-shade"></div>
      <div className="hero-inner">
        <div className="hero-copy"><span className="hero-kicker"><Sparkles size={15}/> YOUR JOURNEY, YOUR WAY</span>
          <h1>You plan the trip,<br/><i>we'll do it.</i></h1>
          <p>Meaningful journeys begin with a little imagination. Tell us what you love, and we'll help shape a trip that feels like you.</p>
          <div className="hero-actions"><Link className="btn btn-primary" to="/contact">Plan your journey <ArrowUpRight size={17}/></Link><Link className="btn btn-glass" to="/packages">Explore packages <ArrowRight size={17}/></Link></div>
          <div className="hero-proof"><div className="avatar-stack"><span>A</span><span>M</span><span>R</span></div><div><div className="stars">★★★★★</div><small>Thoughtful travel, made personal</small></div></div>
        </div>
        <div className="hero-side-note"><span>01 / 06</span><i/> MADE FOR THE MOMENTS THAT MATTER</div>
      </div>
      <div className="hero-bottom-label"><MapPin size={15}/> Find your somewhere</div>
    </section>
    <section className="search-wrap"><form className="trip-search" onSubmit={search}>
      <label><span><MapPin size={17}/> Where to?</span><input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Try Goa, Manali, Kerala..." /></label>
      <label><span><Compass size={17}/> Travel mood</span><select value={region} onChange={e => setRegion(e.target.value)}><option>All styles</option><option>Mountains</option><option>Beach</option><option>Culture</option><option>Nature</option><option>Adventure</option></select></label>
      <button className="btn btn-dark" type="submit"><Search size={17}/> Find a trip</button>
    </form></section>
    <section className="section section-destinations">
      <SectionHeading eyebrow="A WORLD OF POSSIBILITIES" title={<>Where will your story<br/><i>take you next?</i></>} text="From mountain hideaways to sun-drenched coastlines, find the kind of place that stays with you." link="/destinations" />
      <div className="destination-grid">{destinations.slice(0,4).map((d,i)=><Link to={`/packages?region=${encodeURIComponent(d.region)}`} className={`destination-card destination-${i+1}`} key={d.name}><img src={d.image} alt={d.name} onError={e => e.currentTarget.src=imageFallback}/><div className="destination-overlay"/><span className="destination-number">0{i+1}</span><div className="destination-info"><small>{d.region}</small><h3>{d.name}</h3><p>{d.note}</p></div><span className="destination-arrow"><ArrowUpRight size={18}/></span></Link>)}</div>
    </section>
    <section className="section section-soft"><SectionHeading eyebrow="CURATED FOR YOU" title={<>Trips worth <i>looking forward to.</i></>} text="A little inspiration to get you started. Every itinerary can be adapted to your dates, interests and budget." link="/packages" />
      <div className="package-grid">{packages.slice(0,3).map(p=><PackageCard item={p} key={p.id}/>)}</div>
    </section>
    <section className="section experience-section"><div className="experience-photo"><img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=85" alt="Lake and mountains" onError={e=>e.currentTarget.src=imageFallback}/><div className="photo-stamp"><Compass size={24}/><span>GO<br/>YOUR<br/>OWN WAY</span></div></div><div className="experience-copy"><span className="eyebrow">NOT JUST ANOTHER HOLIDAY</span><h2>Travel that feels<br/><i>like you.</i></h2><p>We believe the best trips aren't simply booked. They're imagined, shaped and built around the things that make you feel most alive.</p><div className="benefit-list"><div><span><BadgeCheck/></span><div><b>Made around you</b><small>Your interests, pace and budget come first.</small></div></div><div><span><Heart/></span><div><b>Thoughtful details</b><small>Little touches that make a journey memorable.</small></div></div><div><span><ShieldCheck/></span><div><b>Here to help</b><small>Real conversations from planning to departure.</small></div></div></div><Link to="/about" className="btn btn-dark">Get to know us <ArrowRight size={17}/></Link></div></section>
    <section className="testimonial-band"><div className="testimonial-intro"><span className="eyebrow">KIND WORDS, BIG MEMORIES</span><h2>Good trips.<br/><i>Great stories.</i></h2><p>Sample testimonials shown for layout preview. Replace them with genuine customer reviews before publishing.</p></div><div className="testimonial-cards">{testimonials.slice(0,2).map(t=><article className="testimonial-card" key={t.name}><div className="stars">{"★".repeat(t.stars)}</div><p>“{t.quote}”</p><div className="reviewer"><span>{t.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</span><div><b>{t.name}</b><small>{t.trip}</small></div></div></article>)}</div></section>
    <section className="section section-soft">
      <SectionHeading eyebrow="TRAVEL ACROSS INDIA" title={<>36 regions. Endless <i>ways to explore.</i></>} text="Browse dedicated guides for all 28 states and 8 union territories, with popular highlights and trip-planning basics." link="/destinations" linkText="Explore all states & UTs"/>
      <div className="filter-pills">{["Rajasthan","Kerala","Uttar Pradesh","Himachal Pradesh","Goa","Assam","Ladakh","Meghalaya"].map(name=><Link key={name} to={`/states/${name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")}`} className="filter-pill-link">{name}</Link>)}</div>
    </section>
    <Callout/>
  </>;
}

function Callout() {
  return <section className="callout"><div><span className="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</span><h2>Let's make a plan<br/><i>worth remembering.</i></h2><p>Share a little about the trip you've been dreaming of. We'll take it from there.</p></div><Link to="/contact" className="btn btn-light">Start planning <ArrowUpRight size={17}/></Link><div className="callout-orb"></div></section>;
}

function Destinations() { return <IndiaDirectory/>; }

function PageHero({eyebrow,title,text,image,children}) {
  return <><section className="page-hero" style={{"--page-image":`url("${image || imageFallback}")`}}><div className="page-hero-inner"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p><div className="breadcrumb"><Link to="/">Home</Link><ArrowRight size={13}/><span>{eyebrow}</span></div></div></section><main className="section page-content">{children}</main></>;
}

function Packages({ packages }) {
  const params = new URLSearchParams(window.location.search);
  const [query,setQuery] = useState(params.get("destination") || "");
  const [region,setRegion] = useState(params.get("region") || "All styles");
  const [budget,setBudget] = useState("any");
  const [duration,setDuration] = useState("any");
  const [sort,setSort] = useState("recommended");
  const [visibleCount,setVisibleCount] = useState(6);
  const regions = ["All styles","Mountains","Beach","Culture","Nature","Adventure"];
  const quickPlaces = ["Manali","Goa","Jaipur","Kerala","Rishikesh","Andaman","Kashmir","Shimla"];
  const filtered = useMemo(() => {
    const matches = packages.filter(p => {
      const searchable = `${p.title} ${p.destination} ${p.summary} ${p.tag || ""}`.toLowerCase();
      const searchMatch = searchable.includes(query.trim().toLowerCase());
      const regionMatch = region === "All styles" || p.region === region;
      const priceMatch = budget === "any" ||
        (budget === "under10" && p.price < 10000) ||
        (budget === "10to20" && p.price >= 10000 && p.price <= 20000) ||
        (budget === "20to30" && p.price > 20000 && p.price <= 30000) ||
        (budget === "over30" && p.price > 30000);
      const days = Number.parseInt(p.duration, 10) || 0;
      const durationMatch = duration === "any" ||
        (duration === "short" && days <= 3) ||
        (duration === "medium" && days >= 4 && days <= 5) ||
        (duration === "long" && days >= 6);
      return searchMatch && regionMatch && priceMatch && durationMatch;
    });
    if (sort === "price-low") matches.sort((a,b) => a.price-b.price);
    if (sort === "price-high") matches.sort((a,b) => b.price-a.price);
    if (sort === "popular") matches.sort((a,b) => (Number(b.reviews)||0)-(Number(a.reviews)||0));
    if (sort === "rating") matches.sort((a,b) => (Number(b.rating)||0)-(Number(a.rating)||0));
    return matches;
  }, [packages,query,region,budget,duration,sort]);
  useEffect(() => { setVisibleCount(6); }, [query,region,budget,duration,sort]);
  const clearFilters = () => {setQuery("");setRegion("All styles");setBudget("any");setDuration("any");setSort("recommended");};
  const hasFilters = query || region !== "All styles" || budget !== "any" || duration !== "any";
  return <PageHero eyebrow="FIND YOUR KIND OF TRIP" title={<>Find a trip that<br/><i>feels like yours.</i></>} text="Compare destinations, travel styles, durations and budgets. Every sample itinerary can be tailored to your dates and preferences." image={packages[1]?.image}>
    <section className="package-discovery">
      <div className="package-discovery-intro">
        <div><span className="eyebrow">YOUR NEXT GETAWAY</span><h2>Where would you like <i>to go?</i></h2></div>
        <p>Start with a place, a budget or the kind of trip you have in mind.</p>
      </div>
      <label className="package-search-large"><Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search destination, package or experience..." aria-label="Search destinations and packages"/>{query && <button type="button" onClick={()=>setQuery("")} aria-label="Clear search"><X size={17}/></button>}</label>
      <div className="quick-destinations"><span>Popular destinations</span>{quickPlaces.map(place=><button key={place} className={query.toLowerCase()===place.toLowerCase()?"active":""} onClick={()=>{setQuery(place);setRegion("All styles");}}>{place}</button>)}</div>
    </section>
    <div className="package-listing-head"><div><span className="eyebrow">CURATED JOURNEYS</span><h2>Explore our <i>tour packages.</i></h2></div><p>Use the filters to find a trip that fits your plans.</p></div>
    <div className="filter-pills package-category-pills" aria-label="Filter by travel style">{regions.map(r=><button type="button" className={region===r?"active":""} key={r} onClick={()=>setRegion(r)}>{r==="All styles"?"All packages":r==="Mountains"?"Mountain escapes":r==="Beach"?"Beach holidays":r==="Culture"?"Culture & heritage":r==="Nature"?"Nature retreats":"Adventure trips"}</button>)}</div>
    <div className="package-filter-panel">
      <div className="filter-panel-label"><span><SlidersHorizontal size={17}/> Refine your search</span>{hasFilters&&<button type="button" onClick={clearFilters}>Clear all</button>}</div>
      <div className="package-toolbar">
        <label><span className="filter-label">Destination / keyword</span><span className="search-field"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try Manali, honeymoon..."/></span></label>
        <label><span className="filter-label">Your budget</span><select value={budget} onChange={e=>setBudget(e.target.value)} aria-label="Filter by budget"><option value="any">Any budget</option><option value="under10">Under ₹10,000</option><option value="10to20">₹10,000 – ₹20,000</option><option value="20to30">₹20,001 – ₹30,000</option><option value="over30">Above ₹30,000</option></select></label>
        <label><span className="filter-label">Trip duration</span><select value={duration} onChange={e=>setDuration(e.target.value)} aria-label="Filter by duration"><option value="any">Any duration</option><option value="short">1–3 days</option><option value="medium">4–5 days</option><option value="long">6+ days</option></select></label>
        <label><span className="filter-label">Sort packages</span><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort packages"><option value="recommended">Recommended</option><option value="popular">Most reviewed</option><option value="rating">Highest rated*</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
      </div>
    </div>
    <div className="package-results-heading"><p className="results-count"><strong>{filtered.length}</strong> {filtered.length===1?"package":"packages"} found</p><span>Prices shown are sample estimates per person</span></div>
    {filtered.length ? <>
      <div className="package-grid">{filtered.slice(0,visibleCount).map(p=><PackageCard item={p} key={p.id}/>)}</div>
      {visibleCount < filtered.length && <div className="load-more-wrap"><button className="btn btn-outline" type="button" onClick={()=>setVisibleCount(n=>n+6)}>Load more packages <ArrowDownRight size={17}/></button><span>Showing {Math.min(visibleCount,filtered.length)} of {filtered.length}</span></div>}
    </> : <div className="empty-state"><Compass size={35}/><h3>No matching trips yet</h3><p>Try changing your filters, or tell us what you have in mind and we'll help customise a trip.</p><button className="btn btn-outline" onClick={clearFilters}>Clear filters</button> <Link className="btn btn-dark" to="/contact">Plan a custom trip</Link></div>}
    <div className="package-trust-note"><ShieldCheck size={20}/><p><strong>Planning made personal.</strong> These are sample packages for inspiration. Dates, hotels, inclusions and final prices are confirmed with the agency before booking.</p><a href={waLink("Hi Ram Traveling Agency! Please help me choose a tour package.")} target="_blank" rel="noreferrer">Need help choosing? <ArrowUpRight size={15}/></a></div>
  </PageHero>;
}

function PackageDetail({ packages }) {
  const { id } = useParams();
  const item = packages.find(p=>p.id===id);
  if (!item) return <div className="not-found"><h1>Trip not found</h1><p>This package may have been changed or removed.</p><Link className="btn btn-dark" to="/packages">Browse packages</Link></div>;
  const [date,setDate] = useState("");
  const [people,setPeople] = useState("2");
  const [notes,setNotes] = useState("");
  const message = `Hi Ram Traveling Agency! I'm interested in ${item.title} (${item.destination}). Preferred date: ${date || "Flexible"}. Travellers: ${people}. Notes: ${notes || "Please share details"}. Sample listed price: ${money(item.price)} per person. Please confirm final availability and quote.`;
  return <>
    <section className="detail-hero"><img src={item.image} alt={item.title} onError={e=>e.currentTarget.src=imageFallback}/><div className="detail-hero-shade"/><div className="detail-hero-content"><Link className="back-link" to="/packages"><ArrowLeft size={16}/> All packages</Link><span className="hero-kicker">{item.tag || "MADE FOR YOU"}</span><h1>{item.title}</h1><p><MapPin size={16}/>{item.destination}<i/> <Clock3 size={16}/>{item.duration}</p></div></section>
    <main className="section detail-layout"><div className="detail-main"><span className="eyebrow">THE EXPERIENCE</span><h2>A journey to <i>look forward to.</i></h2><p className="detail-summary">{item.summary}</p><div className="detail-facts"><span><Star size={17} fill="currentColor"/> {item.rating || "4.8"} <small>sample rating</small></span><span><CalendarDays size={17}/> Flexible dates</span><span><Users size={17}/> Couples, friends & family</span></div><h3 className="subhead">Your trip, at a glance</h3><div className="itinerary">{(item.itinerary || []).map((day,i)=><div className="itinerary-row" key={day[0]}><div className="day-badge">{String(i+1).padStart(2,"0")}</div><div><small>{day[0]}</small><h4>{day[1]}</h4><p>{day[2]}</p></div></div>)}</div><div className="notice"><ShieldCheck size={19}/><p>Itinerary and listed pricing are demo content. Final inclusions, availability, transport and prices must be confirmed with the agency.</p></div></div>
      <aside className="booking-card"><span className="eyebrow">LET'S MAKE IT HAPPEN</span><small>Starting from</small><div className="booking-price">{money(item.price)} <em>/ person</em></div><p className="muted">Customise your trip enquiry</p><form onSubmit={e=>{e.preventDefault();window.open(waLink(message),"_blank","noopener,noreferrer");}}><label>Preferred travel date<input type="date" value={date} onChange={e=>setDate(e.target.value)} min={new Date().toISOString().slice(0,10)}/></label><label>Travellers<select value={people} onChange={e=>setPeople(e.target.value)}>{["1","2","3","4","5","6","7","8+"].map(n=><option key={n} value={n}>{n} {n==="1"?"traveller":"travellers"}</option>)}</select></label><label>Anything else? <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Budget, hotel preference, special requests..." rows="3"/></label><button className="btn btn-whatsapp btn-full" type="submit"><MessageCircle size={18}/> Enquire on WhatsApp</button><p className="tiny-note">No payment is collected here. We'll help confirm your details first.</p></form></aside>
    </main><section className="section section-soft"><SectionHeading eyebrow="MORE TO EXPLORE" title="You might also love" link="/packages"/><div className="package-grid">{packages.filter(p=>p.id!==item.id).slice(0,3).map(p=><PackageCard item={p} key={p.id}/>)}</div></section>
  </>;
}

function About() {
  return <><PageHero eyebrow="A LITTLE ABOUT US" title={<>Travel should feel<br/><i>personal.</i></>} text="Ram Traveling Agency is built around a simple idea: your best trip is the one that feels right for you." image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85"><div className="about-intro"><div><span className="eyebrow">OUR APPROACH</span><h2>Less one-size-fits-all.<br/><i>More you.</i></h2></div><div><p>We know that every traveller has a different idea of a perfect getaway. Some want an early start and a full itinerary; others want slow mornings, local food and space to wander.</p><p>Our goal is to listen first, then help you put together a journey that suits your people, preferences and budget.</p><Link className="btn btn-dark" to="/contact">Tell us your idea <ArrowRight size={17}/></Link></div></div><div className="values-grid"><div><span><Compass/></span><h3>Made personal</h3><p>Plans shaped around your interests, not a template.</p></div><div><span><Heart/></span><h3>Thoughtfully planned</h3><p>Clear communication and useful details at every step.</p></div><div><span><Mountain/></span><h3>Open to possibility</h3><p>From a quick weekend away to a once-in-a-lifetime journey.</p></div></div></PageHero><Callout/></>;
}

function Gallery() {
  const pics = [
    ["Mountain mornings","https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85"],
    ["Coastal dreaming","https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85"],
    ["Quiet waters","https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85"],
    ["City stories","https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=85"],
    ["Green escapes","https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85"],
    ["Blue horizons","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=85"],
    ["Winding roads","https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=85"],
    ["Slow travel","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=85"]
  ];
  return <PageHero eyebrow="THE TRAVEL MOODBOARD" title={<>A few views to<br/><i>fall in love with.</i></>} text="A little inspiration for your next escape. Replace these sample photos with your own trip memories anytime." image={pics[0][1]}><div className="gallery-grid">{pics.map(([title,img],i)=><figure className={`gallery-item gallery-${i+1}`} key={title}><img src={img} alt={title} onError={e=>e.currentTarget.src=imageFallback}/><figcaption><span>{title}</span><ArrowUpRight size={17}/></figcaption></figure>)}</div></PageHero>;
}

function Contact() {
  const [form,setForm] = useState({name:"",email:"",phone:"",destination:"",date:"",travellers:"2",budget:"",message:""});
  const update = e => setForm({...form,[e.target.name]:e.target.value});
  const [sent,setSent] = useState(false);
  const submit = e => {e.preventDefault(); const msg=`Hi Ram Traveling Agency! I'd like to plan a customised trip.\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nDestination: ${form.destination}\nDate: ${form.date || "Flexible"}\nTravellers: ${form.travellers}\nBudget per person: ${form.budget || "Not decided"}\nTrip details: ${form.message || "Please suggest options"}`; setSent(true); window.open(waLink(msg),"_blank","noopener,noreferrer");};
  return <PageHero eyebrow="LET'S TALK TRAVEL" title={<>Tell us what you're<br/><i>dreaming of.</i></>} text="Have a destination in mind or just a feeling you want your next trip to have? Tell us a little about it." image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=85"><div className="contact-layout"><div className="contact-details"><span className="eyebrow">WE'RE HERE TO HELP</span><h2>Good journeys<br/>start with a <i>hello.</i></h2><p>Share your rough plans. We'll use the details to start a conversation and help shape a suitable itinerary.</p><a className="contact-row" href={`tel:+91${PHONE_DISPLAY}`}><span><Phone/></span><div><small>Call us</small><b>+91 {PHONE_DISPLAY}</b></div><ArrowUpRight/></a><a className="contact-row" href={`mailto:${EMAIL}`}><span><Mail/></span><div><small>Email us</small><b>{EMAIL}</b></div><ArrowUpRight/></a><a className="contact-row" href={INSTAGRAM} target="_blank" rel="noreferrer"><span><Instagram/></span><div><small>Follow along</small><b>_naman._124</b></div><ArrowUpRight/></a><div className="map-card"><div className="map-placeholder"><MapPin size={30}/><span>Let's find your next destination</span></div><a href={mapsLink} target="_blank" rel="noreferrer">Open Google Maps <ArrowUpRight size={15}/></a><small>Sample map search; replace with your office location when available.</small></div></div>
      <div className="contact-form-card"><span className="eyebrow">TRIP ENQUIRY</span><h3>Let's start planning</h3><p>Fields marked * are required.</p><form onSubmit={submit}><div className="form-row"><label>Your name *<input required name="name" value={form.name} onChange={update} placeholder="Full name"/></label><label>Email address *<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com"/></label></div><div className="form-row"><label>Phone number<input name="phone" value={form.phone} onChange={update} placeholder="Your contact number"/></label><label>Where to? *<input required name="destination" value={form.destination} onChange={update} placeholder="Destination or 'surprise me'"/></label></div><div className="form-row"><label>Travel date<input type="date" min={new Date().toISOString().slice(0,10)} name="date" value={form.date} onChange={update}/></label><label>Travellers<select name="travellers" value={form.travellers} onChange={update}>{["1","2","3","4","5","6","7","8+"].map(n=><option key={n}>{n}</option>)}</select></label></div><label>Approx. budget per person<select name="budget" value={form.budget} onChange={update}><option value="">Not decided yet</option><option>Under ₹10,000</option><option>₹10,000–₹20,000</option><option>₹20,000–₹40,000</option><option>₹40,000+</option></select></label><label>Tell us a little more<textarea name="message" value={form.message} onChange={update} rows="4" placeholder="Trip style, hotel preference, occasion, must-see places..."/></label><button className="btn btn-dark btn-full" type="submit"><MessageCircle size={18}/> Send enquiry on WhatsApp <ArrowUpRight size={16}/></button>{sent&&<p className="success-note"><Check size={15}/> WhatsApp should open with your enquiry details. Send the message there to contact the agency.</p>}<p className="tiny-note">Your form opens WhatsApp with a prepared message. It does not save data to a database.</p></form></div></div></PageHero>;
}

function FAQ() {
  const [open,setOpen] = useState(0);
  return <PageHero eyebrow="GOOD TO KNOW" title={<>A few things<br/><i>you might wonder.</i></>} text="Some useful answers before you start planning. Still have a question? Just ask us." image={packages[3]?.image}><div className="faq-layout"><div className="faq-intro"><span className="eyebrow">THE DETAILS</span><h2>Questions are<br/>part of the <i>journey.</i></h2><p>Every trip is different. If you don't see your question here, our team can help you figure out the next step.</p><Link to="/contact" className="btn btn-dark">Ask us directly <ArrowRight size={16}/></Link></div><div className="faq-list">{faqs.map((f,i)=><div className={`faq-item ${open===i?"faq-open":""}`} key={f.q}><button onClick={()=>setOpen(open===i?-1:i)}><span>{f.q}</span>{open===i?<Minus size={18}/>:<Plus size={18}/>}</button>{open===i&&<p>{f.a}</p>}</div>)}</div></div></PageHero>;
}

function Admin({ packages, setPackages }) {
  const [authenticated,setAuthenticated] = useState(false);
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [editing,setEditing] = useState(null);
  const [notice,setNotice] = useState("");
  // DEMO ONLY: This client-side password is not secure. Replace with server-side authentication before deployment.
  const login = e => {e.preventDefault(); if(password==="ramdemo123"){setAuthenticated(true);setError("");}else setError("Demo password didn't match. Try ramdemo123.");};
  const blank = {id:"",title:"",destination:"",region:"Mountains",duration:"3 Days · 2 Nights",price:9999,oldPrice:11999,tag:"Custom trip",rating:"4.8",reviews:20,image:"",summary:"A memorable journey, customised around you.",itinerary:[["Day 1","Arrival","Arrive and settle in."],["Day 2","Explore","Discover the destination."],["Day 3","Departure","Breakfast and departure."]]};
  const save = e => {e.preventDefault(); const id=editing.id || editing.title.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); const next={...editing,id,price:Number(editing.price),oldPrice:Number(editing.oldPrice)}; const nextList=packages.some(p=>p.id===id)?packages.map(p=>p.id===id?next:p):[next,...packages]; setPackages(nextList);localStorage.setItem("ramta-packages",JSON.stringify(nextList));setEditing(null);setNotice("Package saved in this browser.");};
  const remove = id => {if(!window.confirm("Delete this package from this browser?"))return;const next=packages.filter(p=>p.id!==id);setPackages(next);localStorage.setItem("ramta-packages",JSON.stringify(next));setNotice("Package removed.");};
  const exportData = () => {const blob=new Blob([JSON.stringify(packages,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="ram-travel-packages.json";a.click();URL.revokeObjectURL(url);};
  if(!authenticated) return <main className="admin-shell"><div className="admin-login"><span className="admin-icon"><ShieldCheck/></span><span className="eyebrow">AGENCY WORKSPACE</span><h1>Welcome back.</h1><p>This is a local demo admin panel. It is not secure for a live website.</p><form onSubmit={login}><label>Demo password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter demo password"/></label>{error&&<p className="error-note">{error}</p>}<button className="btn btn-dark btn-full">Open demo dashboard <ArrowRight size={16}/></button></form><small>Demo password: <code>ramdemo123</code></small><Link to="/">← Back to website</Link></div></main>;
  return <main className="admin-shell"><div className="admin-dashboard"><div className="admin-head"><div><span className="eyebrow">RAM TRAVELING AGENCY</span><h1>Package manager</h1><p>Changes are stored only in this browser using localStorage.</p></div><div className="admin-actions"><button className="btn btn-outline" onClick={exportData}>Export JSON</button><button className="btn btn-dark" onClick={()=>{setEditing({...blank});setNotice("");}}><Plus size={16}/> Add package</button></div></div>{notice&&<p className="success-note"><Check size={15}/>{notice}</p>}{editing&&<form className="admin-editor" onSubmit={save}><div className="admin-editor-head"><h2>{editing.id?"Edit package":"New package"}</h2><button type="button" className="icon-button" onClick={()=>setEditing(null)}><X/></button></div><div className="form-row"><label>Package title *<input required value={editing.title} onChange={e=>setEditing({...editing,title:e.target.value})}/></label><label>Destination *<input required value={editing.destination} onChange={e=>setEditing({...editing,destination:e.target.value})}/></label></div><div className="form-row"><label>Style<select value={editing.region} onChange={e=>setEditing({...editing,region:e.target.value})}>{["Mountains","Beach","Culture","Nature","Adventure"].map(x=><option key={x}>{x}</option>)}</select></label><label>Duration<input value={editing.duration} onChange={e=>setEditing({...editing,duration:e.target.value})}/></label></div><div className="form-row"><label>Price ₹<input required type="number" min="0" value={editing.price} onChange={e=>setEditing({...editing,price:e.target.value})}/></label><label>Old price ₹<input type="number" min="0" value={editing.oldPrice} onChange={e=>setEditing({...editing,oldPrice:e.target.value})}/></label></div><label>Image URL<input value={editing.image} onChange={e=>setEditing({...editing,image:e.target.value})} placeholder="https://..."/></label><label>Short description<textarea rows="3" value={editing.summary} onChange={e=>setEditing({...editing,summary:e.target.value})}/></label><label>Tag<input value={editing.tag} onChange={e=>setEditing({...editing,tag:e.target.value})}/></label><div className="admin-editor-buttons"><button type="button" className="btn btn-outline" onClick={()=>setEditing(null)}>Cancel</button><button className="btn btn-dark"><Check size={16}/> Save package</button></div></form>}<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Package</th><th>Destination</th><th>Style</th><th>Price</th><th>Actions</th></tr></thead><tbody>{packages.map(p=><tr key={p.id}><td><div className="admin-package"><img src={p.image||imageFallback} alt="" onError={e=>e.currentTarget.src=imageFallback}/><div><b>{p.title}</b><small>{p.duration}</small></div></div></td><td>{p.destination}</td><td>{p.region}</td><td>{money(p.price)}</td><td><div className="table-actions"><button onClick={()=>{setEditing({...p});setNotice("");}}>Edit</button><button className="delete-action" onClick={()=>remove(p.id)}>Delete</button></div></td></tr>)}</tbody></table></div><div className="admin-warning"><ShieldCheck size={18}/><p><b>Before going live:</b> replace this demo login with real authentication, store packages in a database, validate all inputs server-side, and restrict admin access. Browser localStorage is not a secure shared database.</p></div><Link to="/" className="text-link"><ArrowLeft size={16}/> Back to website</Link></div></main>;
}

export default function App() {
  const [packages,setPackages] = useState(readSavedPackages);
  useEffect(()=>{document.title="Ram Traveling Agency | Your Journey, Our Passion";},[]);
  return <><Header/><Routes>
    <Route path="/" element={<Home packages={packages}/>}/>
    <Route path="/destinations" element={<Destinations/>}/>
    <Route path="/states/:slug" element={<StateDetail/>}/>
    <Route path="/custom-trip" element={<CustomTrip/>}/>
    <Route path="/packages" element={<Packages packages={packages}/>}/>
    <Route path="/packages/:id" element={<PackageDetail packages={packages}/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/gallery" element={<Gallery/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/faq" element={<FAQ/>}/>
    <Route path="/admin" element={<Admin packages={packages} setPackages={setPackages}/>}/>
    <Route path="*" element={<div className="not-found"><h1>Looks like a wrong turn.</h1><p>Let's get you back to the journey.</p><Link className="btn btn-dark" to="/">Back home</Link></div>}/>
  </Routes><Footer/><WhatsAppFloat/></>;
}
