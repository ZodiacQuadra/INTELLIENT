import * as React from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"

interface OperatingExplorerProps {
    mode?: "domain" | "measurement"
    accent?: string
    font?: React.CSSProperties
    style?: React.CSSProperties
}

const domains = [
    { title: "Delay", description: "Work waits for approvals, information or people.", outcome: "Make the waiting visible.", detail: "Map the handoffs and queues around a meaningful business outcome before choosing what to automate." },
    { title: "Exception load", description: "Too many cases need manual handling.", outcome: "Understand the exceptions.", detail: "Find where work leaves the standard path, who resolves it and what evidence they need to act." },
    { title: "Fragmented decisions", description: "Decisions are split across systems and teams.", outcome: "Clarify who can decide.", detail: "Identify the owners, authoritative information and decision boundaries that keep a domain moving." },
]
const dimensions = [
    { title: "Waiting", heading: "The space between tasks matters.", detail: "Active work is only part of the journey. Measure the time a case spends waiting for information, approval or action." },
    { title: "Coordination", heading: "Follow the handoffs.", detail: "Look at how work crosses teams and systems. Repeated requests for context can delay the outcome even when every task is fast." },
    { title: "Rework", heading: "See what comes back.", detail: "Trace reopened cases and repeated checks to understand why work is repeated before deciding what should be automated." },
    { title: "Decisions", heading: "Make authority explicit.", detail: "Measure the time between a decision being needed and an accountable owner having enough evidence to make it." },
]
const css = `
.ie-explorer{container-type:inline-size;box-sizing:border-box;width:100%;position:relative;color:#F7F9FC;font-family:Inter,Arial,sans-serif;background:linear-gradient(145deg,#0D1726,#05080D);border:1px solid #263B57;border-radius:20px;overflow:hidden;line-height:1.55}
.ie-explorer *{box-sizing:border-box}.ie-explorer p,.ie-explorer h3{margin:0}.ie-explorer fieldset{border:0;margin:0;padding:28px}.ie-explorer legend{float:left;width:100%;padding:0 0 22px;font-size:19px;font-weight:500}.ie-explorer .ie-options{clear:both;display:grid;gap:10px}.ie-explorer .ie-option{display:flex;align-items:flex-start;gap:14px;padding:16px;border:1px solid transparent;border-radius:12px;cursor:pointer;transition:background .2s,border-color .2s}.ie-explorer .ie-option:hover{background:#101F33}.ie-explorer .ie-option:has(input:checked){background:linear-gradient(100deg,#102C51,#0C192B);border-color:var(--ie-accent)}.ie-explorer input{flex:none;width:20px;height:20px;margin:4px 0 0;accent-color:var(--ie-accent)}.ie-explorer .ie-option strong{display:block;font-size:16px;font-weight:500}.ie-explorer .ie-option small{display:block;color:#ABB9CC;font-size:14px;line-height:1.5;margin-top:4px}.ie-explorer :focus-visible{outline:3px solid #92C7FF;outline-offset:4px}.ie-explorer .ie-outcome{margin:0 28px 28px;padding:20px 0 0;border-top:1px solid #263B57;min-height:110px}.ie-explorer .ie-outcome strong{display:block;font-size:15px;color:#8DC3FF;margin-bottom:7px}.ie-explorer .ie-outcome p{font-size:14px;color:#ABB9CC}.ie-explorer .ie-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-bottom:1px solid #263B57;padding:8px;gap:4px}.ie-explorer .ie-tab{font:inherit;font-size:15px;min-height:48px;background:transparent;color:#ABB9CC;border:1px solid transparent;border-radius:9px;padding:10px 8px;cursor:pointer;transition:background .2s,color .2s}.ie-explorer .ie-tab:hover{background:#15243A;color:#FFF}.ie-explorer .ie-tab[aria-selected=true]{background:linear-gradient(180deg,#1F69CF,#174B94);border-color:#548EDF;color:#FFF;box-shadow:inset 0 1px 0 #ffffff26}.ie-explorer .ie-panel{padding:36px;min-height:300px}.ie-explorer .ie-panel[hidden]{display:none}.ie-explorer .ie-panel h3{font-size:24px;letter-spacing:-.6px;font-weight:500;line-height:1.2}.ie-explorer .ie-panel p{font-size:16px;color:#ABB9CC;margin-top:12px;max-width:760px}.ie-explorer .ie-metrics{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:32px}.ie-explorer .ie-metric{display:flex;gap:20px;align-items:center}.ie-explorer .ie-metric+ .ie-metric{border-left:1px solid #263B57;padding-left:32px}.ie-explorer .ie-metric svg{width:50px;height:50px;padding:12px;border:1px solid #285082;border-radius:50%;background:#0C2647;stroke:#A2CDFF;flex:none}.ie-explorer .ie-value{display:block;font-size:34px;letter-spacing:-1px;line-height:1.2;font-weight:500;font-variant-numeric:tabular-nums}.ie-explorer .ie-caption{display:block;font-size:14px;color:#ABB9CC;margin-top:6px}.ie-explorer .ie-note{font-size:12px;color:#A3B2C5;letter-spacing:.04em;text-transform:uppercase;margin-top:28px}.ie-explorer .ie-panel:not([hidden]),.ie-explorer .ie-outcome{animation:ie-panel-in .28s ease-out both}.ie-explorer[data-static=true] *{animation:none!important}.ie-explorer .ie-insight{display:flex;align-items:center;gap:20px;margin:24px 0;padding:24px;background:#0D1B2E;border:1px solid #263B57;border-radius:12px;color:#A9D3FF}.ie-explorer .ie-insight span{display:block;height:8px;background:var(--ie-accent);border-radius:4px;flex:1;opacity:.4}.ie-explorer .ie-insight span:nth-child(2){opacity:.7}.ie-explorer .ie-insight span:nth-child(3){opacity:1}
.ie-explorer input[type=radio]{appearance:none;border:2px solid #7899BA;border-radius:50%;background:#07111F;cursor:pointer}.ie-explorer input[type=radio]:checked{border-color:#9BCFFF;background:var(--ie-accent);box-shadow:inset 0 0 0 4px #10253F}
@keyframes ie-panel-in{from{opacity:.4;transform:translateY(5px)}to{opacity:1;transform:none}}
@container (max-width:550px){.ie-explorer fieldset{padding:22px}.ie-explorer .ie-outcome{margin:0 22px 22px}.ie-explorer .ie-panel{padding:24px;min-height:350px}.ie-explorer .ie-tabs{grid-template-columns:repeat(2,minmax(0,1fr))}.ie-explorer .ie-metrics{grid-template-columns:1fr;gap:24px}.ie-explorer .ie-metric+.ie-metric{border-left:0;border-top:1px solid #263B57;padding:24px 0 0}.ie-explorer .ie-value{font-size:29px}.ie-explorer .ie-option{padding:12px}.ie-explorer .ie-panel h3{font-size:22px}}
@media(prefers-reduced-motion:reduce){.ie-explorer *{animation:none!important;transition:none!important}}
`

function ClockIcon({ calendar = false }: { calendar?: boolean }) {
    return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden="true">{calendar ? <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 2v6M17 2v6M3 11h18M7 15h3M14 15h3"/></> : <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>}</svg>
}

/**
 * @framerIntrinsicWidth 600
 * @framerIntrinsicHeight 440
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function OperatingExplorer(props: OperatingExplorerProps) {
    const { mode = "domain", accent = "#2F80ED", font = {}, style = {} } = props
    const [selected, setSelected] = React.useState(0)
    const [tab, setTab] = React.useState(0)
    const uid = React.useId().replace(/:/g, "")
    const tabs = React.useRef<Array<HTMLButtonElement | null>>([])
    const isStatic = useIsStaticRenderer()
    function moveTab(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
        let next = index
        if (event.key === "ArrowRight") next = (index + 1) % dimensions.length
        else if (event.key === "ArrowLeft") next = (index + dimensions.length - 1) % dimensions.length
        else if (event.key === "Home") next = 0
        else if (event.key === "End") next = dimensions.length - 1
        else return
        event.preventDefault()
        setTab(next)
        tabs.current[next]?.focus()
    }
    return <div className="ie-explorer" data-static={isStatic} style={{ ...font, ...style, position: "relative", "--ie-accent": accent } as React.CSSProperties}>
        <style>{css}</style>
        {mode === "domain" ? <>
            <fieldset><legend>What is holding work back?</legend><div className="ie-options">{domains.map((item, index) => <label className="ie-option" key={item.title}>
                <input type="radio" name={`${uid}-domain`} value={item.title} checked={selected === index} onChange={() => setSelected(index)} />
                <span><strong>{item.title}</strong><small>{item.description}</small></span>
            </label>)}</div></fieldset>
            <div className="ie-outcome" aria-live="polite" aria-atomic="true" key={selected}><strong>{domains[selected].outcome}</strong><p>{domains[selected].detail}</p></div>
        </> : <>
            <div className="ie-tabs" role="tablist" aria-label="Dimensions of operating work">{dimensions.map((item, index) => <button type="button" className="ie-tab" role="tab" key={item.title} ref={el => { tabs.current[index] = el }} id={`${uid}-tab-${index}`} aria-controls={`${uid}-panel-${index}`} aria-selected={tab === index} tabIndex={tab === index ? 0 : -1} onClick={() => setTab(index)} onKeyDown={event => moveTab(event, index)}>{item.title}</button>)}</div>
            {dimensions.map((item, index) => <div className="ie-panel" role="tabpanel" key={item.title} id={`${uid}-panel-${index}`} aria-labelledby={`${uid}-tab-${index}`} hidden={tab !== index} tabIndex={0}>
                {index === 0 ? <div className="ie-metrics"><div className="ie-metric"><ClockIcon/><div><span className="ie-value">20 minutes</span><span className="ie-caption">of active work</span></div></div><div className="ie-metric"><ClockIcon calendar/><div><span className="ie-value">10 days</span><span className="ie-caption">of elapsed time</span></div></div></div> : <div className="ie-insight" aria-hidden="true"><span/><span/><span/></div>}
                <h3>{item.heading}</h3><p>{item.detail}</p>
                <div className="ie-note">Illustrative process example · not a customer result</div>
            </div>)}
        </>}
    </div>
}

addPropertyControls(OperatingExplorer, {
    mode: { type: ControlType.Enum, options: ["domain", "measurement"], optionTitles: ["Operating domain", "Measurement tabs"], defaultValue: "domain", title: "Panel" },
    accent: { type: ControlType.Color, defaultValue: "#2F80ED", title: "Accent" },
    font: { type: ControlType.Font, controls: "extended", defaultFontType: "sans-serif", defaultValue: { fontSize: "16px", lineHeight: "1.55em", variant: "Regular" }, title: "Font" },
})
