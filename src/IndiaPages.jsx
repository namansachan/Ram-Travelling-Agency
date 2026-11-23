import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, MapPin, CalendarDays, Compass, Plane, Train, Car, MessageCircle, Users, Hotel } from "lucide-react";
import { indiaRegions } from "./india";

const image = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=85";
const slugify = value => value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
const wa = text => `https://wa.me/918202930398?text=${encodeURIComponent(text)}`;

export function IndiaDirectory() {
  const [query,setQuery] = useState("");
  const [kind,setKind] = useState("All");
  const list = indiaRegions.filter(r => (r.name.toLowerCase().includes(query.toLowerCase()) || r.attractions.join(" ").toLowerCase().includes(query.toLowerCase())) && (kind==="All" || (kind==="States" ? !["Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"].includes(r.name) : ["Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"].includes(r.name))));
  return <main className="section page-content">
    <div className="section-heading"><div><span className="eyebrow">EXPLORE INDIA</span><h2>All 28 states & 8 <i>union territories.</i></h2><p>Browse popular highlights for each region. Attraction listings are a curated starting point, not an exhaustive directory.</p></div></div>
    <div className="package-filter-panel" style={{marginBottom:24}}><div className="package-toolbar">
      <label><span className="filter-label">Search region or attraction</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try Rajasthan, Hampi, beaches..."/></label>
      <label><span className="filter-label">Region type</span><select value={kind} onChange={e=>setKind(e.target.value)}><option>All</option><option>States</option><option>Union Territories</option></select></label>
    </div></div>
    <p className="results-count"><strong>{list.length}</strong> regions found</p>
    <div className="destination-grid destination-grid-all">{list.map((r,i)=><Link to={`/states/${r.slug}`} className="destination-card" key={r.slug}>
      <img src={image} alt={`${r.name} travel landscape`} loading="lazy"/><div className="destination-overlay"/>
      <span className="destination-number">{String(i+1).padStart(2,"0")}</span>
      <div className="destination-info"><small>{r.name.includes("Islands") || ["Chandigarh","Delhi","Ladakh","Lakshadweep","Puducherry","Jammu and Kashmir","Dadra and Nagar Haveli and Daman and Diu"].includes(r.name) ? "Explore region" : "Indian state"}</small><h3>{r.name}</h3><p>{r.attractions.slice(0,3).join(" · ")}</p></div>
      <span className="destination-arrow"><ArrowRight size={18}/></span>
    </Link>)}</div>
  </main>;
}

export function StateDetail() {
  const { slug } = useParams();
  const region = indiaRegions.find(r=>r.slug===slug);
  if (!region) return <main className="section page-content"><h1>Region not found</h1><Link to="/destinations">Explore destinations</Link></main>;
  const stateType = ["Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"].includes(region.name) ? "Union Territory" : "State";
  return <>
    <section className="page-hero" style={{"--page-image":`url("${image}")`}}><div className="page-hero-inner"><span className="eyebrow">{stateType} · INDIA</span><h1>{region.name}</h1><p>Explore signature places, local culture and trip ideas across {region.name}.</p><div className="breadcrumb"><Link to="/">Home</Link><ArrowRight size={13}/><Link to="/destinations">Destinations</Link><ArrowRight size={13}/><span>{region.name}</span></div></div></section>
    <main className="section page-content">
      <div className="detail-layout"><div>
        <span className="eyebrow">REGION OVERVIEW</span><h2>Discover <i>{region.name}.</i></h2>
        <p className="detail-description">{region.name} offers a mix of memorable landscapes, heritage and local experiences. Use these popular highlights to start planning; routes and access can vary by season.</p>
        <div className="benefit-list">
          <div><span><CalendarDays/></span><div><b>Best time to visit</b><small>{region.bestTime}</small></div></div>
          <div><span><Compass/></span><div><b>Suggested duration</b><small>{region.duration}, depending on route and pace</small></div></div>
          <div><span><MapPin/></span><div><b>Capital / main hub</b><small>{region.capital}</small></div></div>
          <div><span><Hotel/></span><div><b>Local food to explore</b><small>{region.food}</small></div></div>
        </div>
      </div><div className="experience-photo"><img src={image} alt={`${region.name} scenery`}/></div></div>
      <section className="section-heading" style={{marginTop:64}}><div><span className="eyebrow">POPULAR HIGHLIGHTS</span><h2>Places to add to <i>your itinerary.</i></h2><p>Curated popular attractions; check local access, permits and opening schedules before travel.</p></div></section>
      <div className="destination-grid destination-grid-all">{region.attractions.map((place,i)=><article className="destination-card" key={place}><img src={image} alt={place} loading="lazy"/><div className="destination-overlay"/><span className="destination-number">{String(i+1).padStart(2,"0")}</span><div className="destination-info"><small>{region.name}</small><h3>{place}</h3><p>Popular place to explore</p></div></article>)}</div>
      <div className="detail-layout" style={{marginTop:64}}><div><span className="eyebrow">GETTING THERE</span><h2>Plan your <i>journey.</i></h2><p>Air: check the nearest operational airport for your route. Train: compare rail connections to {region.capital} and other hubs. Road: confirm route conditions, permits and seasonal closures before departure.</p></div><div className="benefit-list"><div><span><Plane/></span><div><b>By air</b><small>Nearest airport depends on your selected places.</small></div></div><div><span><Train/></span><div><b>By train</b><small>Check current rail routes and availability.</small></div></div><div><span><Car/></span><div><b>By road</b><small>Plan realistic drive times and rest stops.</small></div></div></div></div>
      <div className="callout" style={{marginTop:60}}><div><span className="eyebrow">CUSTOMISE THIS REGION</span><h2>Build a trip around<br/><i>{region.name}.</i></h2><p>Tell us your dates, group size and budget. We will confirm a practical itinerary and quotation.</p></div><a className="btn btn-light" href={wa(`Hi Ram Traveling Agency, please plan a ${region.name} trip. Please share itinerary and confirmed quote.`)} target="_blank" rel="noreferrer">Enquire on WhatsApp <MessageCircle size={17}/></a></div>
    </main>
  </>;
}

export function CustomTrip() {
  const [form,setForm] = useState({destination:"",start:"",nights:4,adults:2,hotel:"standard",transport:"private"});
  const [sent,setSent] = useState(false);
  const perNight = form.hotel==="budget"?1800:form.hotel==="deluxe"?4800:form.hotel==="luxury"?8500:3000;
  const transport = form.transport==="public"?500:form.transport==="private"?1800:2800;
  const estimate = useMemo(()=>Math.round((Number(form.nights)*perNight + Number(form.nights)*transport + 900)*Number(form.adults)),[form,perNight,transport]);
  const update = e => setForm({...form,[e.target.name]:e.target.value});
  const message = `Custom trip enquiry%0ARegion/destinations: ${form.destination}%0AStart date: ${form.start}%0ANights: ${form.nights}%0AAdults: ${form.adults}%0AHotel: ${form.hotel}%0ATransport: ${form.transport}%0AIndicative estimate: ₹${estimate.toLocaleString("en-IN")}. Please confirm actual rates.`;
  return <main className="section page-content"><div className="section-heading"><div><span className="eyebrow">MADE AROUND YOU</span><h2>Build your <i>custom trip.</i></h2><p>Choose the basics to see an indicative planning estimate. This is not a live supplier quote or booking confirmation.</p></div></div>
    <div className="package-filter-panel"><div className="package-toolbar">
      <label><span className="filter-label">Destinations / route</span><input name="destination" value={form.destination} onChange={update} placeholder="e.g. Delhi, Agra, Jaipur"/></label>
      <label><span className="filter-label">Start date</span><input type="date" name="start" value={form.start} onChange={update}/></label>
      <label><span className="filter-label">Nights</span><input type="number" min="1" max="30" name="nights" value={form.nights} onChange={update}/></label>
      <label><span className="filter-label">Adults</span><input type="number" min="1" max="30" name="adults" value={form.adults} onChange={update}/></label>
      <label><span className="filter-label">Hotel category</span><select name="hotel" value={form.hotel} onChange={update}><option value="budget">Budget</option><option value="standard">Standard</option><option value="deluxe">Deluxe</option><option value="luxury">Luxury</option></select></label>
      <label><span className="filter-label">Transport</span><select name="transport" value={form.transport} onChange={update}><option value="public">Public transport</option><option value="private">Private cab</option><option value="premium">Premium vehicle</option></select></label>
    </div></div>
    <div className="package-trust-note" style={{marginTop:24}}><Users size={20}/><p><strong>Indicative estimate: ₹{estimate.toLocaleString("en-IN")}</strong><br/>Calculated using sample per-person nightly planning allowances, transport and a basic activity allowance. Actual costs depend on destination, dates, occupancy, taxes and supplier availability.</p><a href={wa(message)} target="_blank" rel="noreferrer">Send enquiry <ArrowRight size={15}/></a></div>
  </main>;
}
