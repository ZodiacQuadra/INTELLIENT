import { useEffect, useId, useRef, useState, type CSSProperties } from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { motion, useInView, useReducedMotion } from "framer-motion"

interface Props { mode?: "earth" | "flow" | "horizon" | "layers" | "waves"; style?: CSSProperties }

/**
 * Page-local decoration: no content, navigation, or surrounding-DOM dependencies.
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function WhyIntellientAtmosphere({ mode = "earth", style }: Props) {
    const id = useId().replace(/:/g, "")
    const ref = useRef<HTMLDivElement>(null)
    const staticRenderer = useIsStaticRenderer()
    const reducedMotion = useReducedMotion()
    const visible = useInView(ref, { once: true, amount: 0.15 })
    const [stage, setStage] = useState(2)
    useEffect(() => {
        if (mode !== "layers" || !visible || staticRenderer || reducedMotion) return
        setStage(0)
        const first = window.setTimeout(() => setStage(1), 240)
        const second = window.setTimeout(() => setStage(2), 480)
        return () => { window.clearTimeout(first); window.clearTimeout(second) }
    }, [mode, visible, staticRenderer, reducedMotion])
    const g = (name: string) => `url(#${id}-${name})`
    const smooth = !staticRenderer && !reducedMotion
    return <div ref={ref} aria-hidden="true" style={{ ...style, position: "relative", width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none" }}>
        <svg width="100%" height="100%" viewBox={mode === "layers" || mode === "flow" ? "0 0 600 460" : "0 0 1500 700"} preserveAspectRatio={mode === "layers" || mode === "flow" ? "xMidYMid meet" : "xMidYMax slice"} style={{ display: "block" }}>
            <defs>
                <linearGradient id={`${id}-line`}><stop stopColor="#267AE7" stopOpacity="0"/><stop offset=".55" stopColor="#267AE7"/><stop offset=".8" stopColor="#8DC3FF"/><stop offset="1" stopColor="#267AE7" stopOpacity=".12"/></linearGradient>
                <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#267AE7" stopOpacity=".7"/><stop offset=".3" stopColor="#082950" stopOpacity=".6"/><stop offset="1" stopColor="#020407" stopOpacity=".9"/></linearGradient>
                <radialGradient id={`${id}-glow`}><stop stopColor="#267AE7" stopOpacity=".6"/><stop offset=".4" stopColor="#124EAE" stopOpacity=".22"/><stop offset="1" stopColor="#020407" stopOpacity="0"/></radialGradient>
                <linearGradient id={`${id}-earth`} x1="0" y1="0" x2=".2" y2="1"><stop stopColor="#082950"/><stop offset=".55" stopColor="#020D1D"/><stop offset="1" stopColor="#020407"/></linearGradient>
                <filter id={`${id}-blur`}><feGaussianBlur stdDeviation="9"/></filter>
                <clipPath id={`${id}-planet`}><path d="M-150 485Q300 410 900 860L-150 900Z"/></clipPath>
            </defs>
            {mode === "earth" && <>
                <ellipse cx="475" cy="625" rx="660" ry="240" fill={g("glow")}/>
                <path d="M-150 485Q300 410 900 860L-150 900Z" fill={g("earth")}/>
                <path d="M-150 485Q300 410 900 860" stroke="#267AE7" strokeWidth="14" fill="none" filter={g("blur")}/>
                <path d="M-150 485Q300 410 900 860" stroke={g("line")} strokeWidth="2.2" fill="none"/>
                <g clipPath={g("planet")}>{Array.from({length: 450}, (_, i) => { const x=(i*73.17)%960-120, y=485+(i*37.43)%270; return <circle key={i} cx={x} cy={y} r={i%11===0?1.6:.75} fill="#8DC3FF" opacity={.1+(i%6)*.08}/> })}
                    {Array.from({length:16},(_,i)=><path key={i} d={`M-100 ${520+i*16}Q${310+i*5} ${465+i*22} ${940+i*10} 860`} stroke="#267AE7" opacity=".08" fill="none"/>)}</g>
                {[940,1050,1165,1280,1360].map((x,i)=><g key={x}><path d={`M${x} 0V700`} stroke="#267AE7" opacity={i%2===0?.18:.07}/><path d={`M${x} ${80+i*95}v85`} stroke="#267AE7" strokeWidth="5" filter={g("blur")}/><path d={`M${x} ${80+i*95}v85`} stroke={g("line")} strokeWidth="1.5"/></g>)}
            </>}
            {mode === "flow" && <>
                {Array.from({length: 15}, (_,i)=><path key={i} d={`M${270+i*10} -50C${250+i*8} 150 ${10+i*9} 125 ${140+i*10} 250S${480+i*5} 320 600 ${400+i*9}`} stroke={g("line")} strokeWidth={i%4===0?1.5:.6} fill="none" opacity=".65"/>)}
                {[[280,180,1],[430,80,1.3],[405,310,1]].map(([x,y,s],i)=><g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
                    <path d="M-32-18L0-36L32-18V18L0 36L-32 18Z" fill={g("glass")} stroke="#267AE7"/>
                    <path d="M-32-18L0 0L32-18M0 0V36" stroke="#8DC3FF" opacity=".8" fill="none"/>
                </g>)}
            </>}
            {mode === "horizon" && <>
                <ellipse cx="750" cy="490" rx="700" ry="270" fill={g("glow")}/>
                <path d="M0 480Q750 545 1500 480" stroke="#267AE7" strokeWidth="9" filter={g("blur")} fill="none"/>
                <path d="M0 480Q750 545 1500 480" stroke={g("line")} strokeWidth="2" fill="none"/>
                {Array.from({length: 38},(_,i)=><path key={i} d={`M750 514L${-1100+i*100} 720`} stroke={g("line")} opacity={i%5===0?.8:.24} strokeWidth={i%5===0?2:.7} fill="none"/>)}
                {Array.from({length: 11},(_,i)=><path key={i} d={`M0 ${530+i*i*1.7}Q750 ${540+i*i} 1500 ${530+i*i*1.7}`} stroke="#267AE7" strokeWidth=".6" opacity=".2" fill="none"/>)}
                <ellipse cx="750" cy="514" rx="180" ry="11" fill="#8DC3FF" opacity=".35" filter={g("blur")}/>
            </>}
            {mode === "layers" && <>
                <ellipse cx="300" cy="270" rx="295" ry="180" fill={g("glow")}/>
                <path d="M300 50V410" stroke="#267AE7" strokeDasharray="3 7" opacity=".6"/>
                {[2,1,0].map(i=><motion.g key={i} initial={false} animate={{ opacity: !smooth || stage>=i ? 1:.5, y: !smooth || stage>=i ? 0:8 }} transition={{duration:.55,ease:[.22,1,.36,1]}}>
                    <path d={`M300 ${45+i*105}L575 ${140+i*105}L300 ${255+i*105}L25 ${140+i*105}Z`} fill={g("glass")} stroke="#267AE7" strokeWidth="1.3"/>
                    <path d={`M25 ${140+i*105}L300 ${255+i*105}L575 ${140+i*105}`} fill="none" stroke={g("line")} strokeWidth="3"/>
                    {Array.from({length:55},(_,j)=><circle key={j} cx={95+(j*41.3)%410} cy={140+i*105+(j*17.7)%60} r=".8" fill="#8DC3FF" opacity=".3"/>)}
                    <path d={`M270 ${164+i*105}L300 ${154+i*105}L330 ${164+i*105}L300 ${176+i*105}Z`} fill="#124EAE" stroke="#8DC3FF"/>
                </motion.g>)}
            </>}
            {mode === "waves" && <>
                <ellipse cx="750" cy="730" rx="800" ry="240" fill={g("glow")}/>
                {Array.from({length:9},(_,i)=><path key={i} d={`M-100 ${370+i*35}C260 ${620+i*5} 330 ${690+i*6} 750 ${690+i*2}S1180 ${420+i*22} 1600 ${460+i*25}`} stroke={g("line")} strokeWidth={i===3?3:1} fill="none" opacity={i===3?1:.24}/>) }
                <path d="M-100 425C260 695 330 700 750 700S1180 450 1600 505" stroke="#267AE7" strokeWidth="12" fill="none" opacity=".5" filter={g("blur")}/>
            </>}
        </svg>
    </div>
}

addPropertyControls(WhyIntellientAtmosphere, { mode: { type: ControlType.Enum, title: "Scene", options: ["earth", "flow", "horizon", "layers", "waves"], defaultValue: "earth" } })
