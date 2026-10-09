import { useState, type CSSProperties } from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props { part?: "header" | "footer"; style?: CSSProperties }
const logo = "https://framerusercontent.com/images/8LwPYgS822DAXuhtNMBJPjYwJd0.svg"
const nav = [
  ["Why Intellient", "/why-intellient"], ["How it works", "/intellient-model"],
  ["Technology", "/technology"], ["Outcomes", "/outcomes"],
  ["Industries", "/industries"], ["Company", "/about"],
]
const explore = [
  ["Why Intellient", "/why-intellient"], ["How it works", "/intellient-model"],
  ["Technology", "/technology"], ["Company", "/about"],
  ["Industries", "/industries"], ["Outcomes", "/outcomes"],
]
const engage = [
  ["AIR Audit", "/air-audit"], ["Operating Domain Assessment", "/operating-domain-assessment"],
  ["Responsible AI", "/responsible-ai"], ["Contact", "/contact"],
]
const css = `
.imc-root{font-family:Inter,Arial,sans-serif;color:#f5f9ff;background:#020914;box-sizing:border-box;width:100%}
.imc-root *{box-sizing:border-box}
.imc-nav-wrap{padding:16px 24px 0;background:#020914}
.imc-nav{max-width:1280px;min-height:62px;margin:auto;border:1px solid #18416b;border-radius:999px;background:linear-gradient(135deg,rgba(5,20,39,.97),rgba(2,10,22,.95));box-shadow:0 12px 36px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:space-between;padding:9px 12px 9px 20px;gap:20px}
.imc-brand{display:flex;align-items:center;gap:10px;color:#fff;text-decoration:none;font-size:21px;font-weight:650;letter-spacing:-.7px;white-space:nowrap}
.imc-brand img{width:27px;height:27px;object-fit:cover;object-position:left center}
.imc-links{display:flex;align-items:center;justify-content:flex-end;gap:clamp(13px,1.5vw,27px);min-width:0}
.imc-links a{color:#cedaeb;text-decoration:none;font-size:12px;font-weight:500;white-space:nowrap;position:relative;transition:color .22s ease}
.imc-links a:hover,.imc-links a:focus-visible,.imc-links a[aria-current=page]{color:#58b5ff}
.imc-links a[aria-current=page]:after{content:"";position:absolute;height:2px;background:#1e8dff;box-shadow:0 0 12px #208cff;left:5%;right:5%;bottom:-23px}
.imc-cta{display:inline-flex;align-items:center;justify-content:center;border:1px solid #237bed;border-radius:999px;background:linear-gradient(120deg,#075bd7,#1479f7);padding:12px 19px;color:white!important;font-weight:650!important;box-shadow:0 7px 20px #075bda44;transition:transform .22s ease,box-shadow .22s ease!important}
.imc-cta:hover{transform:translateY(-2px);box-shadow:0 9px 24px #117efa66}
.imc-menu{display:none;appearance:none;border:1px solid #275686;background:#071d3a;border-radius:9px;color:#dcefff;padding:10px;cursor:pointer;width:42px;height:40px}
.imc-menu i{display:block;height:2px;width:19px;margin:4px auto;background:currentColor;border-radius:2px}
.imc-footer{border-top:1px solid #102a48;padding:58px 48px 28px;background:radial-gradient(60% 30% at 50% 100%,#062558,#020914 78%)}
.imc-footer-inner{max-width:1280px;margin:auto}
.imc-footer-top{display:grid;grid-template-columns:minmax(300px,1fr) 160px 240px;gap:40px;align-items:start}
.imc-footer-brand{font-size:22px}
.imc-tagline{font-size:13px;line-height:1.55;color:#b1c4da;margin:14px 0 0}
.imc-col{display:flex;flex-direction:column;gap:9px}
.imc-col-label{font-size:10px;text-transform:uppercase;letter-spacing:1.7px;color:#4caeff;font-weight:750;margin-bottom:5px}
.imc-col a,.imc-footer-bottom a{color:#aebfd5;text-decoration:none;font-size:12px;line-height:1.5;transition:color .22s ease}
.imc-col a:hover,.imc-footer-bottom a:hover,.imc-col a:focus-visible,.imc-footer-bottom a:focus-visible{color:#67bdff}
.imc-wordmark{text-align:center;font-size:clamp(60px,10vw,150px);line-height:.95;letter-spacing:-.08em;font-weight:700;margin:44px 0 -12px;color:#fff;text-shadow:0 12px 60px #0b72ed77}
.imc-horizon{height:2px;background:linear-gradient(90deg,transparent,#1469c9,#70c9ff,#1469c9,transparent);box-shadow:0 0 18px #0d82ff}
.imc-footer-bottom{display:flex;justify-content:space-between;gap:24px;padding-top:24px;color:#8499b3;font-size:11px;line-height:1.5}
.imc-footer-legal{display:flex;gap:22px}
@media(max-width:1050px){.imc-links{gap:10px}.imc-links a{font-size:11px}.imc-cta{padding:10px 12px}}
@media(max-width:830px){.imc-nav-wrap{padding:12px 16px 0}.imc-nav{border-radius:20px;flex-wrap:wrap;padding:8px 12px 8px 16px}.imc-brand{font-size:19px}.imc-menu{display:block}.imc-links{display:none;flex:0 0 100%;flex-direction:column;align-items:stretch;gap:0;padding:9px 0 4px;border-top:1px solid #1c436a}.imc-links.open{display:flex}.imc-links a{font-size:14px;padding:11px 8px}.imc-links a[aria-current=page]:after{display:none}.imc-links .imc-cta{margin-top:8px}.imc-footer{padding:48px 24px 24px}.imc-footer-top{grid-template-columns:1fr 1fr;gap:32px}.imc-footer-brandblock{grid-column:1/-1}.imc-wordmark{margin-top:38px}}
@media(max-width:480px){.imc-footer-top{grid-template-columns:1fr 1fr;gap:24px}.imc-footer-brandblock{grid-column:1/-1}.imc-footer-bottom{flex-direction:column}.imc-wordmark{font-size:62px}.imc-footer-legal{gap:15px}}
@media(prefers-reduced-motion:reduce){.imc-root *{transition:none!important;scroll-behavior:auto!important}}
`

/**
 * Page-specific, mockup-matched navigation and footer. Links retain existing destinations.
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function IntellientCoreChrome({ part = "header", style }: Props) {
  const [open, setOpen] = useState(false)
  const path = typeof window !== "undefined" ? window.location.pathname : ""
  const active = path === "/architecture" ? "/technology" : path
  return <div className="imc-root" style={{ ...style, position: "relative", width: "100%", height: "auto" }}>
    <style>{css}</style>
    {part === "header" ? <header className="imc-nav-wrap">
      <nav className="imc-nav" aria-label="Main navigation">
        <a className="imc-brand" href="/home-new"><img src={logo} alt="" />Intellient</a>
        <button className="imc-menu" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="imc-navigation" onClick={() => setOpen(!open)}><i/><i/><i/></button>
        <div className={`imc-links${open ? " open" : ""}`} id="imc-navigation">
          {nav.map(([label, href]) => <a key={href} href={href} aria-current={active === href ? "page" : undefined}>{label}</a>)}
          <a className="imc-cta" href="/air-audit">Start with an AIR Audit&nbsp; →</a>
        </div>
      </nav>
    </header> : <footer className="imc-footer"><div className="imc-footer-inner">
      <div className="imc-footer-top">
        <div className="imc-footer-brandblock"><a className="imc-brand imc-footer-brand" href="/home-new"><img src={logo} alt="" />Intellient</a><p className="imc-tagline">Where human ingenuity meets AI capability.<br/>Let’s shape your enterprise’s future, together.</p></div>
        <div className="imc-col"><div className="imc-col-label">Explore</div>{explore.map(([label,href])=><a key={href} href={href}>{label}</a>)}</div>
        <div className="imc-col"><div className="imc-col-label">Engage</div>{engage.map(([label,href])=><a key={href} href={href}>{label}</a>)}</div>
      </div>
      <div className="imc-wordmark" aria-hidden="true">Intellient</div><div className="imc-horizon" />
      <div className="imc-footer-bottom"><span>© 2026 Quadrasystems.net India Private Limited. All rights reserved.</span><div className="imc-footer-legal"><a href="https://www.quadrasystems.net/app-privacy">Privacy Policy</a><a href="https://www.quadrasystems.net/tou">Terms &amp; Conditions</a></div></div>
    </div></footer>}
  </div>
}

addPropertyControls(IntellientCoreChrome, { part: { type: ControlType.Enum, title: "Part", options: ["header", "footer"], defaultValue: "header" } })
