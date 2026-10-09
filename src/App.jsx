import { useEffect, useState } from 'react'
import { Reveal, EdgePet, YarnToy } from './Pets.jsx'

const U = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`
const SITE = 'https://www.deatonvet.com/uploads/1/2/7/0/127072031/'
const FALLBACK = U('photo-1587300003388-59208cc962cb')

const img = {
  logo: SITE + 'logoimage2_orig.png',
  hero: U('photo-1587300003388-59208cc962cb', 900),
  vet: U('photo-1576201836106-db1758fd1c97', 900),
  dogs: U('photo-1548199973-03cce0bbc87b', 700),
  cat: U('photo-1514888286974-6c03e2ca1dba', 700),
  cat2: U('photo-1573865526739-10659fec78a5', 700),
  dog2: U('photo-1601758228041-f3b2795255f1', 700),
  dog3: U('photo-1583511655857-d19b40a7a54e', 700),
  bunny: '/pets/bunny.png',
  
}

const Img = ({ src, alt = '', className }) => (
  <img className={className} src={src} alt={alt} loading="lazy"
    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK }} />
)

const nav = [['about', 'About'], ['services', 'Services'], ['pricing', 'Pricing'], ['policies', 'Policies'], ['contact', 'Contact']]

const features = [
  ['Compassionate care', 'High quality medicine delivered with empathy, honesty and integrity.'],
  ['Affordable', 'All animals deserve excellent medicine, no matter how much money you make.'],
  ['Specialist referrals', 'Board-certified specialists at regional centers when your pet needs more.'],
  ['Teaching facility', 'Veterinary students work under direct supervision of the doctor.'],
]

const services = [
  { t: 'Dogs', d: 'Spay/neuter, vaccines, wellness visits and packages.', i: img.dogs },
  { t: 'Cats', d: 'Affordable feline spay/neuter and vaccines.', i: img.cat },
  { t: 'Surgery', d: 'High-quality surgery with pain and nausea injections.', i: img.dog2 },
  { t: 'Pharmacy', d: 'Medication refills for established patients (Wednesdays).', i: img.cat2 },
]

const visits = [
  ['Licensed Technician Visit', '$10'],
  ['Brief Office Visit / Recheck', '$25'],
  ['Office Visit with Puppy/Kitten Shots', '$15'],
  ['Doctor Office Visit', '$45'],
]

const faq = [
  ['Are you accepting new clients?', 'Not at this time. The clinic cannot currently add to its patient roster, but we provide referrals to local, affordable spay/neuter services.'],
  ['What is a VCPR?', 'A Veterinary Client Patient Relationship requires your pet be seen annually so we can authorize medications and give advice. Exceptions are made case by case.'],
  ['How can I pay?', 'Payment is due at service. We accept cash, check, Care Credit and debit/credit cards, with a discount for cash or check. No payment plans or post-dated checks.'],
  ['Is rabies vaccination required for surgery?', "Yes. A $15 charge applies if your pet's rabies vaccine is not current."],
  ['What about emergencies after hours?', 'Please call one of the emergency clinics listed in the Contact section below.'],
]

const hours = [
  ['Monday, Tuesday, Thursday', '8:00 – 5:00 CST'],
  ['Wednesday', '8:00 – 12:00 (medication refill only, no Dr. onsite)'],
  ['Friday', '8:00 – 12:00'],
  ['Saturday & Sunday', 'Closed'],
]

const emergency = [
  ['Gadsden Vet Associates Emergency Care', '(256) 467-8387', '2564678387'],
  ['Northwest Georgia Veterinary Emergency Center (5PM–8AM, weekends)', '706-204-8425', '7062048425'],
  ['Veterinary Care and Specialist Group, Chattanooga (24/7)', '(423) 591-0270', '4235910270'],
]

export default function App() {
  const [open, setOpen] = useState(0)
  const [menu, setMenu] = useState(false)
  const [sent, setSent] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const onScroll = () => {
      const y = window.scrollY
      const max = root.scrollHeight - window.innerHeight
      root.style.setProperty('--sy', y)
      root.style.setProperty('--progress', max > 0 ? y / max : 0)
      setScrolled(y > 20)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="progress" />
      <header className={scrolled ? 'header scrolled' : 'header'}>
        <a href="#top" className="brand">
          <Img src={img.logo} alt="Deaton Veterinary Services logo" className="logo" />
          <span>Deaton<br />Veterinary</span>
        </a>
        <nav className={menu ? 'nav open' : 'nav'}>
          {nav.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{l}</a>)}
        </nav>
        <a className="phone" href="tel:2567793291">256-779-3291</a>
        <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}>☰</button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text rise">
            <h1>Compassionate, affordable veterinary care</h1>
            <p>Deaton Veterinary Services in Cedar Bluff, Alabama. Keeping pets healthy longer in their homes and reducing the euthanasia rate in Cherokee County.</p>
            <ul className="chips">
              <li>By appointment</li><li>Spay &amp; neuter</li><li>Vaccines</li>
            </ul>
            <div className="btns">
              <a className="btn primary" href="#contact">Contact us</a>
              <a className="btn ghost" href="#pricing">See pricing</a>
            </div>
            <p className="notice">Currently not accepting new clients.</p>
          </div>
          <div className="hero-img pop">
            <Img src={img.hero} alt="Happy dog" />
          </div>
        </section>

        <div className="marquee">
          {Array.from({ length: 8 }).map((_, i) => <span key={i}>DEATON VET</span>)}
        </div>

        <section id="about" className="section center">
          <EdgePet src="/pets/puppy.png" side="right" className="pet-puppy" />
          <Reveal><span className="pill">About</span></Reveal>
          <Reveal delay={100} as="h2">All animals deserve excellent medicine, no matter how much money you make</Reveal>
          <Reveal delay={200} as="p" className="lead">Dr. Jeremy Deaton left private practice after 7 years to follow his dream of working full time to help others, both humans and animals. Our mission is to provide high quality, compassionate and affordable veterinary care to keep pets healthy longer in their homes and reduce the euthanasia rate in Cherokee County and the surrounding region.</Reveal>
          <div className="cards">
            {features.map(([t, d], i) => (
              <Reveal key={t} delay={i * 120} variant="zoom" className={'card' + (i % 3 === 0 ? ' dark' : '')}>
                <h3>{t}</h3><p>{d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section gallery">
          <Reveal variant="zoom" delay={0}><Img src={img.vet} alt="Veterinarian examining a dog" /></Reveal>
          <Reveal variant="zoom" delay={0}><Img src={img.dog3} alt="Dog" /></Reveal>
          <Reveal variant="zoom" delay={0}><Img src={img.cat2} alt="Cat" /></Reveal>
        </section>

        <section id="services" className="section">
          <EdgePet src="/pets/beagle.png" side="left" flip className="pet-beagle" />
          <Reveal className="center"><span className="pill">Services</span><h2>Care for small animals</h2></Reveal>
          <div className="svc">
            {services.map((s) => (
              <Reveal as="article" key={s.t} variant={'zoom'} delay={services.indexOf(s) * 120} className="svc-card">
                <Img src={s.i} alt={s.t} />
                <div><h3>{s.t}</h3><p>{s.d}</p></div>
              </Reveal>
            ))}
          </div>
          <p className="center small">We value empathy, transparency, honesty and integrity. We partner with local 501(c)3 rescue organizations and refer to board-certified specialists when needed.</p>
        </section>

        <section id="pricing" className="section">
          <Img src={img.bunny} alt="" className="peek-bunny" />
          <Reveal className="center"><span className="pill">Pricing</span><h2>Simple, transparent fees</h2></Reveal>
          <div className="price-grid">
            <Reveal className="panel" variant="left">
              <h3>Visit fees</h3>
              {visits.map(([n, p]) => <div className="row" key={n}><span>{n}</span><b>{p}</b></div>)}
            </Reveal>
            <Reveal className="panel" delay={120}>
              <h3>Dog spay / neuter</h3>
              <div className="row"><span>Basic surgery, female</span><b>from $130</b></div>
              <div className="row"><span>Basic surgery, male</span><b>from $110</b></div>
              <div className="row"><span>Package, female</span><b>from $185</b></div>
              <div className="row"><span>Package, male</span><b>from $175</b></div>
              <p className="small">Weight-based pricing. Packages include surgery, pain and nausea injections, DHPP, 1-year rabies, Bordetella, heartworm test, fecal exam, nail trim, ear cleaning and anal gland expression.</p>
            </Reveal>
            <Reveal className="panel dark" variant="right" delay={240}>
              <h3>Feline spay / neuter</h3>
              <div className="row"><span>Male</span><b>$45</b></div>
              <div className="row"><span>Female</span><b>$80</b></div>
              <p className="small">Includes pain injection. Rabies vaccination required; $15 charge if not current.</p>
            </Reveal>
          </div>
        </section>

        <section id="policies" className="section">
          <EdgePet src="/pets/orangecat.png" side="left" className="pet-orange"><YarnToy /></EdgePet>
          <Reveal className="center"><span className="pill">FAQ</span><h2>Policies &amp; common questions</h2></Reveal>
          <div className="faq">
            {faq.map(([q, a], i) => (
              <Reveal key={q} delay={i * 90} className={'faq-item' + (open === i ? ' open' : '')}>
                <button onClick={() => setOpen(open === i ? -1 : i)}>{q}<span>{open === i ? '−' : '+'}</span></button>
                {open === i && <p>{a}</p>}
              </Reveal>
            ))}
          </div>
          <p className="center small">Fees: $25 no-show fee · $50 fee for disruptive behavior.</p>
        </section>

        <section id="contact" className="section">
          <EdgePet src="/pets/wallcat.png" side="left" className="pet-wallcat" />
          
          <div className="contact">
            <Reveal className="panel" variant="left">
              <h2>Questions?</h2>
              <p className="small">Email us for general requests or medical records, or call during office hours.</p>
              {sent ? <p className="thanks">Thank you! We'll be in touch.</p> : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                  <input required placeholder="Your name" />
                  <input required type="tel" placeholder="Phone" />
                  <textarea required rows="3" placeholder="Message" />
                  <button className="btn primary">Send</button>
                </form>
              )}
            </Reveal>
            <Reveal className="panel dark" variant="right" delay={150}>
              <h3>Visit us</h3>
              <p>Deaton Veterinary Services, LLC<br />5015 Alabama Highway 9 North<br />Cedar Bluff, AL 35959</p>
              <p className="small">Mailing: P.O. Box 310, Centre, AL 35960</p>
              <p>Office: <a href="tel:2567793291">256-779-3291</a><br />Fax: 706-203-5290</p>
              <h3>Hours (by appointment only)</h3>
              {hours.map(([d, t]) => <div className="row light" key={d}><span>{d}</span><span>{t}</span></div>)}
              <p className="small">Hours are subject to change. Please check with us, since many clients drive a long way. Annual vacation closure: last week of October.</p>
            </Reveal>
          </div>
          <Reveal className="panel emerg">
            <h3>After-hours emergencies</h3>
            {emergency.map(([n, p, t]) => <div className="row" key={n}><span>{n}</span><a href={`tel:${t}`}>{p}</a></div>)}
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <Img src={img.logo} alt="" className="logo" />
        <p>© {new Date().getFullYear()} Deaton Veterinary Services, LLC · Cedar Bluff, Alabama</p>
        <p className="privacy">Privacy notice: when you visit, we record your IP address, approximate location, device, browser and visit time to understand site traffic.</p>
      </footer>
    </>
  )
}
