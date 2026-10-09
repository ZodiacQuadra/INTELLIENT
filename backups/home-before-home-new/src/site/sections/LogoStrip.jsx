// Systems Intellient connects to (not customers): shown as a continuous leftward marquee.
const LOGOS = [
  { src: '/logos/sap.svg', alt: 'SAP', h: 34 },
  { src: '/logos/salesforce.svg', alt: 'Salesforce', h: 42 },
  { src: '/logos/workday.svg', alt: 'Workday', h: 30 },
  { src: '/logos/azure.svg', alt: 'Microsoft Azure', h: 30 },
  { src: '/logos/github.svg', alt: 'GitHub', h: 28, invert: true },
];

export default function LogoStrip() {
  const row = [...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <div className="logo-strip" data-reveal>
      <p className="logo-strip-label">Works with the systems you already run</p>
      <div className="logo-marquee">
        <div className="logo-track">
          {[...row, ...row].map((l, i) => (
            <img
              key={i}
              src={l.src}
              alt={i < LOGOS.length ? l.alt : ''}
              aria-hidden={i >= LOGOS.length}
              style={{ height: l.h }}
              className={l.invert ? 'invert' : ''}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
