import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Play, Plus, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from './gsap';
import './styles.css';

const image = (id, width=1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const doctorPortrait = 'https://www.americanoncology.com/static/uploads/873075a8-512e-42d0-a50c-10ef9db71352-1779780630485.jpg';
const clinicPhone = '+918247651202';
const clinicEmail = 'srinathbharadwaj23601@gmail.com';
const appointmentHref = 'https://wa.me/918247651202?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20an%20appointment%20with%20Dr.%20R.%20Srinath%20Bharadwaj.';
const photos = {
  doctor: image('photo-1612349317150-e413f6a5b16d', 1200),
  care: image('photo-1576091160399-112ba8d25d1d', 900),
  talk: image('photo-1475721027785-f74eccf877e2', 900),
  hands: image('photo-1579684385127-1ef15d508118', 900),
  awareness: image('photo-1532629345422-7515f3d16bb6', 900),
  research: image('photo-1579154204601-01588f351e67', 900),
};
const services = [
  ['01', 'Cancer consultation', 'Review of your diagnosis, test results and treatment options.'],
  ['02', 'Chemotherapy', 'Systemic treatment discussed in the context of your diagnosis and care plan.'],
  ['03', 'Immunotherapy', 'Immune-based treatment when appropriate to the cancer and clinical context.'],
  ['04', 'Targeted therapy', 'Treatment based on specific features of a cancer, when clinically appropriate.'],
  ['05', 'Precision oncology', 'Tumour biology and test results can help inform treatment decisions.'],
  ['06', 'Supportive care', 'Help with symptoms and treatment effects throughout your care.'],
];
const stories = [
  { title: 'Managing chemotherapy side effects', date: 'November 9, 2025', readTime: '7 min read', excerpt: 'An overview of common side effects, supportive care, and when to contact your care team during treatment.', image: photos.care, href: 'https://drsrinathoncologist.com/blogs/managing-chemotherapy-side-effects-a-comprehensive-guide' },
  { title: 'Early detection: signs, symptoms and screening', date: 'November 10, 2025', readTime: '6 min read', excerpt: 'Understand the role of screening and why persistent or concerning changes should be discussed with a clinician.', image: photos.awareness, href: 'https://drsrinathoncologist.com/blogs/early-detection-of-cancer-signs-symptoms-and-screening-guidelines' },
  { title: 'Understanding immunotherapy', date: 'November 12, 2025', readTime: '5 min read', excerpt: 'A plain-language introduction to immunotherapy and the factors a specialist considers when discussing treatment.', image: photos.research, href: 'https://drsrinathoncologist.com/blogs/understanding-immunotherapy-a-revolutionary-approach-to-cancer-treatment' },
];
const expertiseTiles = [
  { area: 'area-a', title: 'Cancer consultation', image: photos.care, alt: 'Representative image of a clinician meeting with a patient' },
  { area: 'area-b', title: 'Chemotherapy', image: photos.research, alt: 'Representative image of clinical research work' },
  { area: 'area-c', title: 'Immunotherapy', image: photos.hands, alt: 'Representative image of a clinical conversation' },
  { area: 'area-d', title: 'Precision oncology', image: photos.talk, alt: 'Representative image of a medical presentation' },
  { area: 'area-e', title: 'Targeted therapy', image: photos.awareness, alt: 'Representative image related to cancer awareness' },
  { area: 'area-f', title: 'Supportive care', image: photos.doctor, alt: 'Representative physician portrait' },
];
const patientTestimonials = [
  { quote: 'Professionally competent with a human touch.', name: 'Rakesh Pandey', location: 'Hyderabad' },
  { quote: 'Dr. Bhardwaj explained target therapy and post effects.', name: 'Mallika', location: 'Vijayawada' },
  { quote: 'He responds on WhatsApp so soon to clarify our doubts.', name: 'Syeda Sameena', location: 'Hyderabad' },
];
const faqItems = [
  { question: 'How can I request an appointment?', answer: 'Send an enquiry on WhatsApp or call the clinic. The team can confirm availability and explain the next steps.' },
  { question: 'What should I bring to a first consultation?', answer: 'If available, bring recent reports, scan and pathology results, a list of current medicines, and any questions you would like to discuss.' },
  { question: 'Are walk-in appointments available?', answer: 'Walk-in availability can vary. Please contact the clinic before visiting to confirm whether an appointment is available.' },
  { question: 'Can a family member join the consultation?', answer: 'Yes. You are welcome to bring a family member or support person to your consultation.' },
  { question: 'How long does a consultation take?', answer: 'Consultation times vary depending on the reason for the visit and the information that needs to be reviewed. The clinic can advise when you book.' },
];

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = event => setReduce(event.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduce;
}

function Reveal({ children, className='', delay=0 }) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (reduce) {
      gsap.set(ref.current, { clearProps: 'all' });
      return;
    }
    const context = gsap.context(() => {
      gsap.fromTo(ref.current, { autoAlpha: 0, y: 18 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        delay,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    }, ref);
    return () => context.revert();
  }, [delay, reduce]);
  return <div ref={ref} className={className}>{children}</div>;
}
function Button({ children, href=appointmentHref, light=false, arrow=true, ...props }) { const external=href.startsWith('https://wa.me/'); return <a className={`button ${light?'button-light':''}`} href={href} target={external?'_blank':undefined} rel={external?'noreferrer':undefined} {...props}>{children}{external&&<span className="sr-only"> (opens WhatsApp in a new tab)</span>}{arrow&&<ArrowUpRight size={16}/>}</a> }
function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = event => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);
  const links = [['About','#about'],['Treatments','#practice'],['Articles','#insights']];
  return <header className="header"><a className="brand" href="#home" aria-label="Dr. R. Srinath Bharadwaj, home"><span className="brand-mark">SB</span><span className="brand-copy">Dr. R. Srinath Bharadwaj<small>CONSULTANT MEDICAL ONCOLOGIST</small></span></a>
    <button ref={menuButtonRef} type="button" className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={open?'Close menu':'Open menu'} aria-controls="primary-navigation" aria-expanded={open}>{open?<X/>:<Menu/>}</button>
    <nav id="primary-navigation" className={open?'nav nav-open':'nav'} aria-label="Main navigation">{links.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}<Button>Enquire via WhatsApp</Button></nav>
  </header>
}
function Footer() {
  return <footer className="footer" id="contact"><div className="footer-shell"><div className="section-wrap footer-content">
    <div className="footer-top">
      <div className="footer-intro"><p className="footer-description">Medical oncology, cancer treatment and research, with clear information for patients and families.</p><div className="footer-reading"><h2>Questions about an appointment?</h2><a href={appointmentHref} target="_blank" rel="noreferrer" className="footer-subscribe">Enquire via WhatsApp <ArrowUpRight size={16}/><span className="sr-only"> (opens in a new tab)</span></a><a className="footer-call-link" href={`tel:${clinicPhone}`}>Or call +91 82476 51202</a></div></div>
      <nav className="footer-links" aria-label="Quick links"><h3>Explore</h3><a href="#home">Home</a><a href="#about">About</a><a href="#practice">Services &amp; treatments</a><a href="#insights">Patient articles</a><a href="#faq">FAQs</a></nav>
      <div className="footer-social"><h3>Contact the clinic</h3><a href={`tel:${clinicPhone}`}>+91 82476 51202</a><a href={`mailto:${clinicEmail}`}>{clinicEmail}</a><a href="https://maps.google.com/?q=American+Oncology+Institute+Nallagandla+Hyderabad" target="_blank" rel="noreferrer">American Oncology Institute, Nallagandla</a></div>
    </div>
    <div className="footer-info">
      <section className="footer-card"><h3>Appointments</h3><p><span className="footer-icon"><Phone size={16}/></span><span>Call the clinic<br/><strong><a href={`tel:${clinicPhone}`}>+91 82476 51202</a></strong></span></p><p><span className="footer-icon"><Mail size={16}/></span><span>Email<br/><strong><a href={`mailto:${clinicEmail}`}>Contact the clinic</a></strong></span></p></section>
      <section className="footer-card"><h3>Clinic hours</h3><p className="footer-detail">Monday – Saturday<br/><strong>9:00 am – 6:00 pm</strong></p><p className="footer-detail">Sunday<br/><strong>Closed</strong></p></section>
      <section className="footer-card"><h3>Location</h3><p className="footer-detail">American Oncology Institute<br/><strong>Nallagandla, Hyderabad</strong></p><p className="footer-detail"><a href="https://maps.google.com/?q=American+Oncology+Institute+Nallagandla+Hyderabad" target="_blank" rel="noreferrer">View on map <ArrowUpRight size={13}/></a></p></section>
    </div>
    <div className="footer-wordmark">Dr. R. Srinath Bharadwaj</div>
    <div className="footer-bottom"><span>© 2026 Dr. R. Srinath Bharadwaj</span><span className="footer-disclaimer">This website provides general information, not a diagnosis or a substitute for individual medical advice.</span><span>Appointments are confirmed by the clinic.</span></div>
  </div></div></footer>;
}
function CareJourneyVisual() {
  return <div className="care-journey-visual">
    <p className="journey-kicker">A conversation, together</p>
    <h3>Care starts with understanding what matters to you.</h3>
    <ol className="journey-steps">
      <li><span>01</span><div><strong>Share your story</strong><small>Discuss your diagnosis, concerns and priorities.</small></div></li>
      <li><span>02</span><div><strong>Review the options</strong><small>Explore information and questions with your specialist.</small></div></li>
      <li><span>03</span><div><strong>Agree on next steps</strong><small>Understand the plan and how to contact your care team.</small></div></li>
    </ol>
    <p className="journey-note">Your care plan depends on your individual diagnosis and circumstances.</p>
  </div>;
}
function Testimonials() {
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const quoteRef = useRef(null);
  const sectionRef = useRef(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = event => setReduce(event.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!sectionRef.current || reduce) return;
    const context = gsap.context(() => {
      gsap.fromTo(['.testimonial-intro', '.testimonial-trust-card', '.testimonial-quote-column'], { autoAlpha: 0, y: 16 }, {
        autoAlpha: 1,
        y: 0,
        duration: .68,
        stagger: .1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        clearProps: 'all',
      });
    }, sectionRef);
    return () => context.revert();
  }, [reduce]);
  useEffect(() => {
    if (!quoteRef.current || reduce) return;
    gsap.fromTo(quoteRef.current, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .48, ease: 'power2.out', clearProps: 'all' });
  }, [active, reduce]);
  const move = direction => setActive(index => (index + direction + patientTestimonials.length) % patientTestimonials.length);
  const testimonial = patientTestimonials[active];
  return <section className="testimonials section-pad" aria-labelledby="testimonials-title" ref={sectionRef}><div className="section-wrap testimonial-grid">
    <div className="testimonial-intro"><p className="eyebrow">Patient experiences</p><h2 id="testimonials-title">Words from<br/><em>patients &amp; families.</em></h2><div className="testimonial-rule"/><div className="testimonial-controls"><button type="button" onClick={()=>move(-1)} aria-label="Previous testimonial"><ChevronLeft size={22}/></button><button type="button" onClick={()=>move(1)} aria-label="Next testimonial"><ChevronRight size={22}/></button><span>{String(active+1).padStart(2,'0')} / {String(patientTestimonials.length).padStart(2,'0')}</span></div></div>
    <aside className="testimonial-trust-card" aria-label="About the patient feedback"><span className="trust-card-mark" aria-hidden="true">“</span><p>Patient feedback</p><strong>Care that begins with listening.</strong><small>Read the original feedback on the clinic website.</small></aside>
    <div className="testimonial-quote-column"><span className="testimonial-quote-mark" aria-hidden="true">“</span><div className="testimonial-quote-content" ref={quoteRef} aria-live="polite" aria-atomic="true"><blockquote>{testimonial.quote}</blockquote><div className="testimonial-author"><strong>{testimonial.name}</strong><span>Patient · {testimonial.location}</span></div><a className="testimonial-source" href="https://drsrinathoncologist.com/" target="_blank" rel="noreferrer">View source on the clinic website <ArrowUpRight size={13}/><span className="sr-only"> (opens in a new tab)</span></a></div></div>
  </div></section>;
}
function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);
  return <section className="faq-section section-pad" id="faq" aria-labelledby="faq-heading"><div className="section-wrap faq-layout">
    <aside className="faq-book-panel"><span className="faq-flower" aria-hidden="true">✣</span><div className="faq-book-copy"><h2>Planning a visit?</h2><p>Contact the clinic to ask about appointment availability and what to bring.</p></div><div className="faq-contact-actions"><a className="faq-book-link" href={appointmentHref} target="_blank" rel="noreferrer"><span>Enquire via WhatsApp <span className="sr-only"> (opens in a new tab)</span></span><span className="faq-book-icon"><ArrowRight size={20}/></span></a><a className="faq-call-link" href={`tel:${clinicPhone}`}>Or call +91 82476 51202</a></div></aside>
    <div className="faq-content"><p className="eyebrow">Before your visit</p><h2 id="faq-heading">Frequently asked questions</h2><div className="faq-list">{faqItems.map((item,index)=>{const isOpen=openIndex===index;return <div className={`faq-item ${isOpen?'faq-item-open':''}`} key={item.question}><h3 id={`faq-question-${index}`}><button className="faq-trigger" type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={()=>setOpenIndex(isOpen?-1:index)}><span>{item.question}</span><span className="faq-plus"><Plus size={17}/></span></button></h3><div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!isOpen}><div><p>{item.answer}</p></div></div></div>})}</div></div>
  </div></section>;
}
function App() {
  const reduceMotion = usePrefersReducedMotion();
  const mainRef = useRef(null);
  useEffect(() => {
    if (reduceMotion || !mainRef.current) return;
    const context = gsap.context(() => {
      gsap.from('.hero-copy > *', { autoAlpha: 0, y: 14, duration: 0.58, stagger: 0.055, ease: 'power2.out', clearProps: 'all' });
      gsap.from('.hero-portrait', { autoAlpha: 0, y: 16, scale: 0.985, duration: 0.8, delay: 0.1, ease: 'power2.out', clearProps: 'all' });
    }, mainRef);
    return () => context.revert();
  }, [reduceMotion]);
  return <><Header/><main ref={mainRef}>
    <section className="hero" id="home"><div className="hero-inner"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line"/>MEDICAL ONCOLOGY</p><h1>Clinical oncology,<br/><em>cancer treatment &amp; research.</em></h1><p className="hero-name">Dr. R. Srinath Bharadwaj</p><p className="credentials">MBBS, MD, DM <span>·</span> Consultant Medical Oncologist</p><p className="hero-description">A cancer diagnosis can bring difficult decisions. Explore areas of care, learn what to bring to a consultation, and contact the clinic to ask about next steps.</p><div className="hero-actions"><Button>Enquire via WhatsApp</Button><a href="#about" className="text-link">About Dr. Bharadwaj <ArrowDown size={15}/></a></div><div className="hero-principles"><span><i>01</i> Evidence-based decisions</span><span><i>02</i> Clear conversations</span></div></div><div className="hero-visual"><img className="hero-portrait" src={doctorPortrait} alt="Dr. R. Srinath Bharadwaj, Consultant Medical Oncologist" fetchPriority="high"/><div className="hero-image-caption"><span className="caption-monogram">SB</span><span><strong>Dr. R. Srinath Bharadwaj</strong><small>Consultant Medical Oncologist</small></span></div></div></div></section>

    <section className="about section-pad" id="about"><div className="section-wrap about-grid"><Reveal className="about-portrait-card"><img src={doctorPortrait} alt="Dr. R. Srinath Bharadwaj, Consultant Medical Oncologist" loading="lazy"/><span className="about-portrait-label"><strong>Dr. R. Srinath Bharadwaj</strong><small>Consultant Medical Oncologist · MBBS, MD, DM</small></span></Reveal><Reveal className="about-copy"><p className="about-kicker"><span>✳</span> About Dr. Bharadwaj</p><h2>Medical oncology,<br/><em>with people at the centre.</em></h2><p className="lead">Dr. R. Srinath Bharadwaj is a Consultant Medical Oncologist whose work spans cancer treatment, clinical research and patient education.</p><p>He values evidence-based decisions and clear communication, helping patients and families understand the options being considered and the questions to ask.</p><div className="about-callout"><p>Care begins with listening and a clear explanation of the choices ahead.</p><img src={photos.hands} alt="" loading="lazy"/></div><a className="about-story-link" href="#practice"><span>Explore services and treatments</span><span className="about-link-icon"><ArrowUpRight size={18}/></span></a></Reveal></div></section>

    <section className="practice section-pad" id="practice"><div className="section-wrap"><div className="practice-head"><Reveal><p className="eyebrow">Medical oncology</p><h2>Services &amp; treatments</h2></Reveal><p className="section-intro">Treatment depends on the diagnosis and each person’s circumstances. These are areas of care to discuss with the clinic.</p></div><div className="service-grid"><>{services.slice(0,2).map(([n,title,desc],i)=><Reveal key={n} delay={i*.06} className="service"><span className="service-n">({n})</span><div className="service-copy"><h3>{title}</h3><p>{desc}</p></div></Reveal>)}</><Reveal className="care-feature" delay={.1}><img src={photos.care} alt="Representative image of a doctor in a clinical setting" loading="lazy"/><a className="care-feature-action" href={appointmentHref} target="_blank" rel="noreferrer" aria-label="Enquire about a consultation"><ArrowUpRight size={21}/></a><span className="care-feature-ring"><Plus size={13}/></span></Reveal>{services.slice(2).map(([n,title,desc],i)=><Reveal key={n} delay={.14+i*.055} className="service"><span className="service-n">({n})</span><div className="service-copy"><h3>{title}</h3><p>{desc}</p></div></Reveal>)}</div></div></section>

    <section className="care-story section-pad" aria-label="Care journey and patient resources"><div className="section-wrap"><div className="care-story-grid">
      <Reveal className="care-panel care-journey"><CareJourneyVisual/></Reveal>
      <Reveal className="care-panel care-experience"><div className="care-panel-copy"><span className="care-kicker">Your care journey</span><h2>Understand the<br/>next step.</h2></div><img src={photos.hands} alt="Representative image illustrating supportive clinical care" loading="lazy"/></Reveal>
      <Reveal className="care-panel care-focus"><span className="care-kicker">Areas of focus</span><h2>Medical<br/>oncology.</h2><div className="focus-pills"><span>Treatment</span><span>Research</span><span>Education</span></div><span className="focus-watermark" aria-hidden="true">Care</span></Reveal>
      <Reveal className="care-panel care-resource"><span className="resource-badge">FOR PATIENTS &amp; FAMILIES</span><h2>Cancer<br/>information.</h2><p>Plain-language articles to help you prepare questions for your care team.</p><a href="#insights" className="resource-button">Read patient articles <ArrowUpRight size={16}/></a></Reveal>
      <Reveal className="care-panel care-tailored"><div className="care-orbits" aria-hidden="true"><span>CARE</span><span>SCIENCE</span><span>YOU</span></div><h2>Decisions made<br/>with you.</h2><p>Understand the options, discuss what matters to you, and decide on next steps with your care team.</p></Reveal>
      <Reveal className="care-panel care-media"><img src={photos.doctor} alt="Representative portrait of a physician" loading="lazy"/></Reveal>
      <Reveal className="care-panel care-principles"><div className="principles-heading"><span className="care-kicker">What matters in care</span><h2>Evidence.<br/>Clarity.<br/>Respect.</h2></div><div className="principle-list"><article><span>01</span><div><h3>Understand the diagnosis</h3><p>Make space for questions and review the information available.</p></div></article><article><span>02</span><div><h3>Discuss the options</h3><p>Consider treatment choices in the context of the person and diagnosis.</p></div></article><article><span>03</span><div><h3>Plan the next steps</h3><p>Know what to expect and whom to contact during care.</p></div></article></div></Reveal>
    </div></div></section>

    <Testimonials/>

    <section className="insights section-pad" id="insights"><div className="section-wrap"><div className="blog-heading"><div><p className="blog-eyebrow"><span/> From the blog</p><h2>Clear information for the questions ahead</h2></div><div className="blog-heading-aside"><p>Patient-friendly articles on cancer awareness and treatment, to help you prepare for conversations with your care team.</p><a className="blog-explore" href="https://drsrinathoncologist.com/blogs" target="_blank" rel="noreferrer">Explore articles on the clinic website <span className="sr-only"> (opens in a new tab)</span><span><Plus size={19}/></span></a></div></div><div className="story-grid">{stories.map((story,i)=><Reveal key={story.title} delay={i*.08} className="story"><a href={story.href} target="_blank" rel="noreferrer" className="story-image" aria-label={`Read ${story.title} on the clinic website (opens in a new tab)`}><img src={story.image} alt="" loading="lazy"/></a><div className="story-meta"><span>{story.date}</span><span>{story.readTime}</span></div><h3>{story.title}</h3><p className="story-excerpt">{story.excerpt}</p><a className="story-read" href={story.href} target="_blank" rel="noreferrer"><span>Read article <span className="sr-only">on the clinic website (opens in a new tab)</span></span><span className="story-read-icon"><Plus size={18}/></span></a></Reveal>)}</div></div></section>

    <FAQ/>

    <section className="expertise-cta section-pad" aria-labelledby="expertise-cta-title"><div className="section-wrap"><div className="expertise-heading"><p className="eyebrow">A next step, when you are ready</p><h2 id="expertise-cta-title">Enquire about an appointment</h2></div><div className="expertise-grid">{expertiseTiles.slice(0,4).map((tile,i)=><Reveal key={tile.area} delay={i*.045} className={`expertise-tile ${tile.area}`}><img src={tile.image} alt={tile.alt} loading="lazy"/><span className="expertise-caption">{tile.title}</span></Reveal>)}<Reveal className="expertise-center"><span className="expertise-flower" aria-hidden="true">✣</span><h3>Speak with the clinic<br/>about arranging a visit.</h3><a href={appointmentHref} target="_blank" rel="noreferrer" className="expertise-button">Enquire via WhatsApp <ArrowUpRight size={17}/><span className="sr-only"> (opens in a new tab)</span></a><a className="expertise-call-link" href={`tel:${clinicPhone}`}>Or call +91 82476 51202</a></Reveal>{expertiseTiles.slice(4).map((tile,i)=><Reveal key={tile.area} delay={.12+i*.06} className={`expertise-tile ${tile.area}`}><img src={tile.image} alt={tile.alt} loading="lazy"/><span className="expertise-caption">{tile.title}</span></Reveal>)}</div></div></section>

  </main><Footer/></>;
}
createRoot(document.getElementById('root')).render(<App/>);
