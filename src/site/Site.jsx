import './site.css';
import { useSiteMotion } from './useSiteMotion';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Journey from './sections/Journey';
import Gap from './sections/Gap';
import Enterprises from './sections/Enterprises';
import Measurement from './sections/Measurement';
import Domains from './sections/Domains';
import Audit from './sections/Audit';
import Technology from './sections/Technology';
import Residency from './sections/Residency';
import Evidence from './sections/Evidence';
import Faq from './sections/Faq';
import Footer from './sections/Footer';
import Mesh from './sections/Mesh';

export default function Site() {
  const { scrolled } = useSiteMotion();
  return (
    <>
      <span className="nav-sentinel" aria-hidden="true" />
      <Nav scrolled={scrolled} />
      <main>
        <Hero />
        <Gap />
        <Technology />
        <Residency />
        <Evidence />
        <Mesh />
        <Enterprises />
        <Measurement />
        <Journey />
        <Domains />
        <Audit />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
