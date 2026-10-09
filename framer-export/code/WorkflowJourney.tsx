import * as React from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"

interface WorkflowJourneyProps {
    accent?: string
    autoAdvance?: boolean
    intervalSeconds?: number
    style?: React.CSSProperties
}

const stages = [
    {
        label: "Intake",
        title: "A request enters the operation.",
        before: "A request lands in an inbox without shared context.",
        after: "The work is framed around a clear outcome and owner.",
        note: "Begin with the result the business recognises.",
    },
    {
        label: "Evidence",
        title: "The right context comes together.",
        before: "People chase documents and reconcile conflicting systems.",
        after: "Relevant evidence and exceptions are surfaced together.",
        note: "Make the real work visible before automating it.",
    },
    {
        label: "Decision",
        title: "Authority is made explicit.",
        before: "The case waits while teams work out who can decide.",
        after: "The decision reaches the right owner with its context intact.",
        note: "Design the handoff, not just the faster task.",
    },
    {
        label: "Outcome",
        title: "The operation keeps learning.",
        before: "The case closes, but delay and rework go unmeasured.",
        after: "Movement, exceptions and adoption inform the next change.",
        note: "Measure the result, then improve the operating model.",
    },
]

const css = `
.wj-root{position:relative;width:100%;box-sizing:border-box;color:#f6f9ff;font-family:Inter,Arial,sans-serif;container-type:inline-size}
.wj-root *{box-sizing:border-box}.wj-root button{font:inherit}.wj-root :focus-visible{outline:3px solid #9cccff;outline-offset:4px}
.wj-shell{border:1px solid rgba(87,154,246,.26);border-radius:26px;background:radial-gradient(80% 85% at 80% 0%,rgba(19,79,157,.25),transparent 75%),linear-gradient(145deg,#07111f,#03060b);box-shadow:0 28px 90px rgba(0,0,0,.28);overflow:hidden}
.wj-heading{display:flex;align-items:end;justify-content:space-between;gap:24px;padding:42px 46px 28px}
.wj-kicker{color:#65adff;font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;margin:0 0 13px}
.wj-heading h2{font-size:clamp(29px,3.3vw,48px);line-height:1.08;letter-spacing:-.045em;max-width:760px;margin:0}
.wj-heading p{max-width:610px;color:#aebdd0;font-size:16px;line-height:1.6;margin:16px 0 0}
.wj-controls{display:flex;align-items:center;gap:8px;flex:none}
.wj-control{border:1px solid rgba(122,176,242,.28);background:#0b1a2c;color:#e8f3ff;border-radius:999px;min-width:42px;height:42px;padding:0 13px;cursor:pointer;transition:background .2s,border-color .2s,transform .2s}
.wj-control:hover{background:#153456;border-color:#5ba3fa;transform:translateY(-2px)}
.wj-control:disabled{opacity:.4;cursor:not-allowed;transform:none}.wj-pause{font-size:12px;min-width:84px}
.wj-stage-labels{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:0 46px 24px}
.wj-stage{color:#8ea7c4;background:transparent;border:0;border-top:1px solid #29415d;text-align:left;padding:14px 4px 0;cursor:pointer;font-size:13px;transition:color .2s,border-color .2s}
.wj-stage span{display:block;font-size:10px;letter-spacing:.12em;margin-bottom:5px;color:#5e85b2}
.wj-stage[aria-current=true]{color:#f6f9ff;border-color:#3c96ff}.wj-stage[aria-current=true] span{color:#63adff}
.wj-viewport{overflow:hidden;width:calc(100% - 92px);margin:0 46px 44px}
.wj-track{display:flex;width:100%;transition:transform .62s cubic-bezier(.22,1,.36,1);will-change:transform}
.wj-card{flex:0 0 100%;width:100%;min-width:0;display:grid;grid-template-columns:1fr 1fr;gap:18px}
.wj-state{position:relative;min-height:260px;border:1px solid rgba(109,162,222,.2);border-radius:18px;padding:26px 28px 28px;overflow:hidden;background:#08111d}
.wj-state:before{content:"";position:absolute;inset:auto -40px -100px auto;width:240px;height:240px;background:radial-gradient(circle,rgba(31,100,196,.15),transparent 70%);pointer-events:none}
.wj-state.after{background:linear-gradient(145deg,#0b2444,#08121f);border-color:rgba(76,151,247,.5);box-shadow:inset 0 1px 0 rgba(177,217,255,.13)}
.wj-state.after:before{background:radial-gradient(circle,rgba(38,130,252,.24),transparent 70%)}
.wj-state-label{display:flex;align-items:center;gap:9px;text-transform:uppercase;letter-spacing:.13em;font-size:10px;font-weight:700;color:#90a5be;margin:0 0 40px}
.wj-state-label:before{content:"";width:7px;height:7px;border-radius:50%;background:#6e7f92}.wj-state.after .wj-state-label{color:#75baff}.wj-state.after .wj-state-label:before{background:#318fff;box-shadow:0 0 14px #318fff}
.wj-state h3{font-size:clamp(22px,2vw,30px);line-height:1.2;letter-spacing:-.025em;max-width:370px;margin:0 0 17px;font-weight:650}
.wj-state p{font-size:15px;line-height:1.6;color:#b5c3d4;max-width:390px;margin:0}
.wj-bottom{display:flex;align-items:center;justify-content:space-between;gap:20px;border-top:1px solid rgba(87,154,246,.18);padding:19px 46px 22px;color:#9eb5d0;font-size:13px}
.wj-bottom strong{color:#eaf5ff;font-weight:500}.wj-count{white-space:nowrap;color:#65adff;letter-spacing:.08em;font-variant-numeric:tabular-nums}
@container (max-width:760px){.wj-heading{padding:30px 24px 22px;display:block}.wj-heading p{font-size:14px}.wj-controls{margin-top:20px}.wj-stage-labels{padding:0 24px 18px;gap:4px}.wj-stage{font-size:11px}.wj-stage span{font-size:9px}.wj-viewport{width:calc(100% - 48px);margin:0 24px 26px}.wj-card{grid-template-columns:1fr;gap:10px}.wj-state{min-height:170px;padding:19px 20px}.wj-state-label{margin-bottom:17px}.wj-state h3{font-size:20px;margin-bottom:9px}.wj-state p{font-size:14px}.wj-bottom{padding:17px 24px 19px;font-size:12px}}
@media (prefers-reduced-motion:reduce){.wj-root *{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
`

/**
 * @framerIntrinsicWidth 1100
 * @framerIntrinsicHeight 610
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function WorkflowJourney(props: WorkflowJourneyProps) {
    const { accent = "#318FFF", autoAdvance = true, intervalSeconds = 6, style = {} } = props
    const [index, setIndex] = React.useState(0)
    const [paused, setPaused] = React.useState(false)
    const [interacting, setInteracting] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [reduced, setReduced] = React.useState(false)
    const rootRef = React.useRef<HTMLDivElement>(null)
    const isStatic = useIsStaticRenderer()
    React.useEffect(() => {
        if (typeof window === "undefined" || isStatic) return
        const media = window.matchMedia("(prefers-reduced-motion: reduce)")
        const update = () => setReduced(media.matches)
        update()
        media.addEventListener("change", update)
        return () => media.removeEventListener("change", update)
    }, [isStatic])
    React.useEffect(() => {
        if (typeof window === "undefined" || isStatic || !rootRef.current) return
        const observer = new IntersectionObserver(entries => setVisible(entries[0]?.isIntersecting ?? false), { threshold: .2 })
        observer.observe(rootRef.current)
        return () => observer.disconnect()
    }, [isStatic])
    React.useEffect(() => {
        if (isStatic || !autoAdvance || paused || interacting || reduced || !visible) return
        const timer = window.setInterval(() => setIndex(current => (current + 1) % stages.length), Math.max(4, intervalSeconds) * 1000)
        return () => window.clearInterval(timer)
    }, [autoAdvance, paused, interacting, reduced, visible, intervalSeconds, isStatic])
    function go(next: number) { setIndex((next + stages.length) % stages.length) }
    return <div ref={rootRef} className="wj-root" style={{ ...style, position: "relative", "--wj-accent": accent } as React.CSSProperties}
        onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
        onFocusCapture={() => setInteracting(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setInteracting(false) }}>
        <style>{css}</style>
        <section className="wj-shell" role="region" aria-roledescription="carousel" aria-label="Illustrative operating workflow">
            <div className="wj-heading"><div><div className="wj-kicker">An illustrative workflow</div><h2>A case should move, not wait.</h2><p>See how redesigning the work changes the journey—not just the speed of one task.</p></div>
                <div className="wj-controls"><button className="wj-control" type="button" onClick={() => go(index - 1)} aria-label="Previous workflow step">←</button><button className="wj-control" type="button" onClick={() => go(index + 1)} aria-label="Next workflow step">→</button><button className="wj-control wj-pause" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Resume automatic progression" : "Pause automatic progression"}>{paused ? "Play" : "Pause"}</button></div>
            </div>
            <div className="wj-stage-labels">{stages.map((stage, i) => <button className="wj-stage" type="button" key={stage.label} onClick={() => go(i)} aria-current={index === i ? "true" : undefined}><span>0{i + 1}</span>{stage.label}</button>)}</div>
            <div className="wj-viewport"><div className="wj-track" style={{ transform: `translateX(-${index * 100}%)` }} aria-live={interacting ? "polite" : "off"}>{stages.map((stage, i) => <article className="wj-card" key={stage.label} aria-hidden={index !== i}><div className="wj-state"><div className="wj-state-label">Before</div><h3>{stage.title}</h3><p>{stage.before}</p></div><div className="wj-state after"><div className="wj-state-label">With Intellient</div><h3>{stage.note}</h3><p>{stage.after}</p></div></article>)}</div></div>
            <div className="wj-bottom"><strong>Observe the operation → Redesign the work → Carry it into production</strong><span className="wj-count">0{index + 1} / 0{stages.length}</span></div>
        </section>
    </div>
}

addPropertyControls(WorkflowJourney, {
    accent: { type: ControlType.Color, title: "Accent", defaultValue: "#318FFF" },
    autoAdvance: { type: ControlType.Boolean, title: "Auto advance", defaultValue: true },
    intervalSeconds: { type: ControlType.Number, title: "Interval", defaultValue: 6, min: 4, max: 15, unit: "s", step: 1 },
})
