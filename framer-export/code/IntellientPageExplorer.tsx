import { useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"

interface Item { number?: string; title: string; body: string; category?: string; label?: string; link?: string; logo?: string; proofTitle?: string; proofRows?: string[][]; proofCaption?: string }
interface Props { mode?: "journey" | "questions" | "products" | "production"; data?: string; group?: string; style?: CSSProperties }
const selections = new Map<string, number>()
const listeners = new Set<() => void>()
function select(group: string, value: number) { selections.set(group, value); listeners.forEach(fn => fn()) }
function subscribe(fn: () => void) { listeners.add(fn); return () => { listeners.delete(fn) } }

/**
 * Exact page copy is supplied through Data, not generated in this component.
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function IntellientPageExplorer({ mode = "journey", data = "[]", group = "air-audit", style }: Props) {
    let items: Item[] = []
    try { const parsed = JSON.parse(data.startsWith("encoded:") ? decodeURIComponent(data.slice(8)) : data); if (Array.isArray(parsed)) items = parsed } catch { /* Invalid editable data never crashes the page. */ }
    const staticRenderer = useIsStaticRenderer()
    const uid = useId().replace(/:/g, "")
    const root = useRef<HTMLDivElement>(null)
    const [enhanced, setEnhanced] = useState(false)
    const [revealed, setRevealed] = useState(false)
    const [open, setOpen] = useState<number[]>([])
    const selected = useSyncExternalStore(subscribe, () => selections.get(group) || 0, () => 0)
    useEffect(() => {
        if (staticRenderer) return
        setEnhanced(true)
        const ownRoot = root.current
        if (!ownRoot || typeof IntersectionObserver === "undefined") { setRevealed(true); return }
        const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { setRevealed(true); observer.disconnect() } }, { threshold: .08 })
        observer.observe(ownRoot)
        return () => observer.disconnect()
    }, [staticRenderer])
    const prefix = `intellient-${uid}`
    function choose(index: number) { select(group, index) }
    function keyNavigation(event: KeyboardEvent<HTMLButtonElement>, index: number) {
        let next = index
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % items.length
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + items.length - 1) % items.length
        else if (event.key === "Home") next = 0
        else if (event.key === "End") next = items.length - 1
        else return
        event.preventDefault(); choose(next)
        // Focus only controls rendered and owned by this component.
        root.current?.querySelector<HTMLButtonElement>(`[data-selector="${next}"]`)?.focus()
    }
    return <div ref={root} className={`${prefix} explorer ${enhanced ? "enhanced" : "static"} ${revealed ? "revealed" : ""}`} style={{ ...style, position: "relative", width: "100%", height: "auto", fontFamily: "Inter, sans-serif", color: "#F7F9FC" }}>
        <style>{`
            .${prefix}{--accent:#8DC3FF;--stroke:rgba(112,170,255,.32);--surface:linear-gradient(145deg,#08111D,#03080F)}
            .${prefix} *{box-sizing:border-box}.${prefix}{min-width:0}
            .${prefix} button,.${prefix} a{font:inherit;color:inherit;-webkit-tap-highlight-color:transparent}
            .${prefix} button{cursor:pointer;text-align:left}.${prefix} button{appearance:none}
            .${prefix} button:focus-visible,.${prefix} a:focus-visible,.${prefix} summary:focus-visible{outline:3px solid #8DC3FF;outline-offset:5px}
            .${prefix} h3,.${prefix} p{margin:0}.${prefix} h3{font-size:24px;font-weight:500;letter-spacing:-.5px;line-height:1.25}
            .${prefix} p{font-size:18px;line-height:1.6;color:#AAB6C8}.${prefix} .eyebrow{font-size:13px;letter-spacing:1.5px;color:var(--accent);line-height:1.5}
            .${prefix} .grid{display:grid;grid-template-columns:repeat(${mode === "journey" ? 8 : 3},minmax(0,1fr));gap:${mode === "journey" ? 12 : 24}px}
            .${prefix} .card{border:1px solid var(--stroke);border-radius:20px;background:var(--surface);padding:32px;min-width:0;transition:background .22s,border-color .22s,box-shadow .22s,transform .22s}
            .${prefix} .card.active{border-color:#267AE7;background:linear-gradient(145deg,#0A2445,#050D18);box-shadow:inset 0 0 0 1px #267AE7,0 0 32px rgba(38,122,231,.14)}
            .${prefix} .card:hover{border-color:#8DC3FF}.${prefix} .card:active{background:#0C223D}
            .${prefix} .journey-arc{display:block;width:100%;height:140px;margin-bottom:-14px;overflow:visible}@media(max-width:1100px){.${prefix} .journey-arc{display:none}}
            .${prefix} .journey{display:flex;flex-direction:column;gap:18px;min-height:230px;width:100%;padding:20px 16px;border-radius:14px}.${prefix} .journey h3{font-size:18px}.${prefix} .journey p{font-size:14px}.${prefix} .journey .eyebrow{border:1px solid #8DC3FF;display:flex;align-items:center;justify-content:center;border-radius:50%;width:32px;height:32px;letter-spacing:0}.${prefix} .journey.active .eyebrow{background:#1765CA;color:white;box-shadow:0 0 20px rgba(38,122,231,.6)}
            .${prefix} .product{display:flex;flex-direction:column;gap:24px;min-height:360px}.${prefix} .product-select{border:0;background:transparent;padding:0;display:flex;flex-direction:column;gap:20px;width:100%;flex:1}
            .${prefix} .logo{object-fit:contain;object-position:left center;width:160px;max-width:100%;height:56px}.${prefix} .product-foot{border-top:1px solid var(--stroke);padding-top:20px;display:flex;flex-direction:column;gap:16px}
            .${prefix} .product-foot a{font-size:14px;color:#8DC3FF;text-decoration:none;width:fit-content}.${prefix} .product-foot a:hover{text-decoration:underline}
            .${prefix} .rows{display:flex;flex-direction:column;gap:24px}.${prefix} .production{padding:0;overflow:hidden}
            .${prefix} .production-toggle{padding:24px 32px;background:transparent;border:0;display:flex;align-items:center;gap:24px;width:100%;color:#F7F9FC}
            .${prefix} .dot{width:14px;height:14px;flex-shrink:0;border:1px solid #8DC3FF;border-radius:50%}.${prefix} .active .dot{background:#267AE7;box-shadow:0 0 18px #267AE7}
            .${prefix} .production-content{padding:8px 32px 32px;display:grid;grid-template-columns:180px minmax(0,1fr) 310px;gap:28px;align-items:center}
            .${prefix} [hidden]{display:none!important}.${prefix} .copy{display:flex;flex-direction:column;gap:16px}
            .${prefix} .proof{padding:24px;border:1px solid var(--stroke);border-radius:14px;background:#050D18;display:flex;flex-direction:column;gap:16px}
            .${prefix} .proof-row{display:flex;justify-content:space-between;gap:16px;border-top:1px solid var(--stroke);padding-top:14px;font-size:14px;line-height:1.5;color:#AAB6C8}.${prefix} .proof-row span:last-child{color:#8DC3FF;white-space:nowrap}
            .${prefix} .caption{font-size:14px;line-height:1.6;color:#AAB6C8}.${prefix} .visual{width:100%;height:200px}
            .${prefix} .questions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;align-items:start}.${prefix} details{border:1px solid var(--stroke);border-radius:16px;background:var(--surface);padding:24px 28px}.${prefix} details h3{font-size:22px}
            .${prefix} summary{cursor:pointer;list-style:none;display:flex;flex-direction:column;gap:12px;padding-right:32px;position:relative;user-select:none}
            .${prefix} summary::-webkit-details-marker{display:none}.${prefix} summary:after{content:'+';position:absolute;right:0;top:10px;color:#8DC3FF;font-size:28px}.${prefix} details[open] summary:after{content:'−'}
            .${prefix} details p{margin-top:20px}.${prefix} details[open]{border-color:#267AE7}
            .${prefix}.enhanced:not(.revealed){transform:translateY(12px)}.${prefix}.revealed{transform:none;transition:transform .55s cubic-bezier(.22,1,.36,1)}
            @media(max-width:1100px){.${prefix} .grid{grid-template-columns:repeat(${mode === "journey" ? 4 : 3},minmax(0,1fr))}.${prefix} .card{padding:24px}.${prefix} .product{min-height:360px}.${prefix} .production-content{grid-template-columns:140px minmax(0,1fr)}.${prefix} .proof{grid-column:1/-1}}
            @media(max-width:650px){.${prefix} .grid,.${prefix} .questions{grid-template-columns:1fr}.${prefix} .product,.${prefix} .journey{min-height:0}.${prefix} h3,.${prefix} .journey h3{font-size:22px}.${prefix} p{font-size:17px}.${prefix} .production-content{grid-template-columns:1fr;padding:0 24px 24px}.${prefix} .visual{height:160px}.${prefix} .production-toggle{padding:24px}.${prefix} details{padding:24px}}
            @media(prefers-reduced-motion:reduce){.${prefix},.${prefix} *{transition:none!important;animation:none!important;transform:none!important}}
        `}</style>
        {mode === "journey" && <><svg className="journey-arc" aria-hidden="true" viewBox="0 0 1200 140" preserveAspectRatio="none"><defs><linearGradient id={`${prefix}-route`}><stop stopColor="#267AE7"/><stop offset="1" stopColor="#8DC3FF"/></linearGradient></defs><path d="M70 125Q670 125 1130 12" fill="none" stroke={`url(#${prefix}-route)`} strokeWidth="2"/>{items.map((_,i)=><circle key={i} cx={70+i*151.4} cy={125-113*Math.pow(i/7,2)} r={selected===i?9:6} fill={selected===i?"#267AE7":"#050D18"} stroke="#8DC3FF" strokeWidth="2"/>)}</svg><div className="grid" role="group" aria-label="How the audit works">{items.map((item, i) => <button key={i} type="button" className={`card journey ${selected === i ? "active" : ""}`} aria-pressed={selected === i} data-selector={i} onClick={() => choose(i)} onKeyDown={event => keyNavigation(event, i)}><span className="eyebrow">{item.number}</span><h3>{item.title}</h3><p>{item.body}</p></button>)}</div></>}
        {mode === "questions" && <div className="questions">{items.map((item, i) => <details key={i} open={staticRenderer || open.includes(i)} onToggle={event => { const isOpen = event.currentTarget.open; setOpen(previous => isOpen ? [...new Set([...previous, i])] : previous.filter(value => value !== i)) }}><summary><span className="eyebrow">{item.category}</span><h3>{item.title}</h3></summary><p>{item.body}</p></details>)}</div>}
        {mode === "products" && <div className="grid">{items.map((item, i) => <article key={i} className={`card product ${selected === i ? "active" : ""}`}><button type="button" className="product-select" aria-pressed={selected === i} aria-controls={`${group}-production-${i}`} data-selector={i} onClick={() => choose(i)} onKeyDown={event => keyNavigation(event, i)}><img className="logo" src={item.logo} alt=""/><h3>{item.title}</h3><p>{item.body}</p></button><div className="product-foot"><span className="eyebrow">{item.category}</span><a href={item.link}>{item.label} <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" style={{verticalAlign:"middle",marginLeft:6}}><path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" fill="none" strokeWidth="1.6"/></svg></a></div></article>)}</div>}
        {mode === "production" && <div className="rows">{items.map((item, i) => <article key={i} className={`card production ${selected === i ? "active" : ""}`} id={`${group}-production-${i}`}><button type="button" className="production-toggle" aria-expanded={!enhanced || selected === i} aria-controls={`${prefix}-detail-${i}`} data-selector={i} onClick={() => choose(i)} onKeyDown={event => keyNavigation(event, i)}><span className="dot"/><span>{item.category}</span></button><div className="production-content" id={`${prefix}-detail-${i}`} hidden={enhanced && selected !== i}>
            <svg className="visual" aria-hidden="true" viewBox="0 0 200 200"><defs><linearGradient id={`${prefix}-glass-${i}`} x2="1" y2="1"><stop stopColor="#267AE7"/><stop offset="1" stopColor="#020D1D"/></linearGradient></defs>{i===2?<g fill="none" stroke="#8DC3FF"><circle cx="100" cy="100" r="72" fill="#082950"/>{[0,1,2,3,4].map(n=><ellipse key={n} cx="100" cy="100" rx="72" ry={12+n*13} transform={`rotate(${n*15} 100 100)`}/>)}</g>:<g>{[3,2,1,0].map(n=><path key={n} d={`M100 ${22+n*32}L175 ${52+n*32}L100 ${83+n*32}L25 ${52+n*32}Z`} fill={`url(#${prefix}-glass-${i})`} stroke="#8DC3FF" opacity={.6+n*.1}/>)}</g>}</svg>
            <div className="copy"><h3>{item.title}</h3><p>{item.body}</p></div><div className="proof"><span className="eyebrow">{item.proofTitle}</span>{item.proofRows?.map((row,j)=><div className="proof-row" key={j}><span>{row[0]}</span><span>{row[1]}</span></div>)}<span className="caption">{item.proofCaption}</span></div>
        </div></article>)}</div>}
    </div>
}
addPropertyControls(IntellientPageExplorer, {
    mode: { type: ControlType.Enum, title: "Mode", options: ["journey", "questions", "products", "production"], defaultValue: "journey" },
    data: { type: ControlType.String, title: "Data", defaultValue: "[]", displayTextArea: true },
    group: { type: ControlType.String, title: "Group", defaultValue: "air-audit" },
})
