import { useId, type CSSProperties } from "react"
import { addPropertyControls, ControlType } from "framer"

interface Props {
  scene?: "model" | "blueprint" | "architecture" | "network" | "modelChoice" | "wave" | "journey" | "terrain"
  style?: CSSProperties
}

/**
 * Responsive, decorative artwork for the three core-page mockups.
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function IntellientMockupArt({ scene = "model", style }: Props) {
  const id = useId().replace(/:/g, "")
  const url = (key: string) => `url(#${id}-${key})`
  const plate = (y: number, label: string, index: number, wide = false) => {
    const x = wide ? 116 : 162
    const w = wide ? 430 : 344
    return <g key={label} transform={`translate(0 ${y})`}>
      <path d={`M${x} 90 L${x + w * .56} 4 L${x + w} 91 L${x + w * .46} 178 Z`} fill={url("plate")} stroke="#5aabff" strokeWidth="2" filter={url("lightShadow")} />
      <path d={`M${x} 90 L${x + w * .46} 178 L${x + w * .46} 197 L${x} 109 Z`} fill="#061c3a" stroke="#247deb" strokeWidth="1.3" />
      <path d={`M${x + w * .46} 178 L${x + w} 91 L${x + w} 111 L${x + w * .46} 197 Z`} fill="#053b85" stroke="#59b6ff" strokeWidth="1.2" />
      <path d={`M${x + 9} 90 L${x + w * .56} 11 L${x + w - 8} 91 L${x + w * .46} 171 Z`} fill="none" stroke="#b5deff" opacity=".48" />
      <path d={`M${x + 22} 103 L${x + w * .46} 169 L${x + w - 22} 99`} fill="none" stroke="#56aaff" opacity=".45" />
      <text x={x + w * .53} y="116" textAnchor="middle" transform={`rotate(11 ${x + w * .53} 116)`} fill="#eef8ff" fontSize="14" fontWeight="700" letterSpacing="1.6">{label}</text>
      <circle cx={x + w * .56} cy="4" r={index === 0 ? 4 : 2} fill="#d8f5ff" filter={url("glow")}/>
    </g>
  }
  return <div aria-hidden="true" style={{ ...style, width: "100%", height: "100%", position: "relative", pointerEvents: "none", overflow: "hidden" }}>
    <svg width="100%" height="100%" viewBox="0 0 700 500" preserveAspectRatio="xMidYMid meet" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}-plate`} x1=".1" y1="0" x2=".9" y2="1"><stop stopColor="#2b82e9" stopOpacity=".74"/><stop offset=".34" stopColor="#0a418e" stopOpacity=".48"/><stop offset="1" stopColor="#020d22" stopOpacity=".94"/></linearGradient>
        <linearGradient id={`${id}-pane`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#176bc8" stopOpacity=".28"/><stop offset=".7" stopColor="#03142e" stopOpacity=".8"/><stop offset="1" stopColor="#061f48" stopOpacity=".95"/></linearGradient>
        <linearGradient id={`${id}-stroke`}><stop stopColor="#0056f8" stopOpacity="0"/><stop offset=".45" stopColor="#36a7ff"/><stop offset=".65" stopColor="#b9f3ff"/><stop offset="1" stopColor="#036bff" stopOpacity=".12"/></linearGradient>
        <radialGradient id={`${id}-halo`}><stop stopColor="#1168ff" stopOpacity=".45"/><stop offset="1" stopColor="#042451" stopOpacity="0"/></radialGradient>
        <filter id={`${id}-glow`} x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id={`${id}-lightShadow`} x="-40%" y="-40%" width="180%" height="200%"><feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#006aff" floodOpacity=".55"/></filter>
      </defs>
      <ellipse cx="360" cy="300" rx="310" ry="225" fill={url("halo")}/>
      {(scene === "model" || scene === "architecture") && <>
        {Array.from({ length: 15 }, (_, i) => <path key={i} d={`M${225 + i * 21} 0 V420`} stroke="#0870db" strokeOpacity={i % 3 === 0 ? ".26" : ".09"}/>) }
        {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={75 + i * 63} cy={443 - (i % 3) * 17} r="1.6" fill="#2b9eff" opacity=".5"/>) }
        {scene === "model" ? <g transform="translate(0 -16) scale(1 .77)">{plate(0, "OUTCOME", 0)}{plate(125, "PEOPLE", 1)}{plate(250, "TECHNOLOGY", 2)}{plate(375, "GOVERNANCE", 3)}</g> : <g transform="translate(-25 -12) scale(1 .69)">{plate(0, "APPLICATIONS", 0, true)}{plate(130, "MODELS", 1, true)}{plate(260, "PLATFORM", 2, true)}{plate(390, "DATA", 3, true)}{plate(520, "SECURITY & GOVERNANCE", 4, true)}</g>}
        <path d="M40 420 C185 330 450 455 690 336" fill="none" stroke={url("stroke")} strokeWidth="2" opacity=".72"/>
      </>}
      {scene === "blueprint" && <>
        <path d="M35 455 C180 355 520 473 682 339" fill="none" stroke={url("stroke")} strokeWidth="6" filter={url("glow")}/><path d="M35 455 C180 355 520 473 682 339" fill="none" stroke={url("stroke")} strokeWidth="2"/>
        {[0, 1, 2].map(i => <rect key={i} x={140 + i * 19} y={55 - i * 17} width="408" height="360" rx="13" fill={url("pane")} stroke="#2d8bec" strokeWidth="1.5" opacity={.54 + i * .18} filter={i === 2 ? url("lightShadow") : undefined}/>)}
        <rect x="203" y="37" width="408" height="360" rx="13" fill="#031127" stroke="#55adff" strokeWidth="1.6" />
        <text x="229" y="72" fill="#52adff" fontSize="12" fontWeight="700" letterSpacing="2">AIR AUDIT / BLUEPRINT</text>
        {[["Outcome", "What should change?"],["Operating reality", "Where are we today?"],["Future state", "What will the work look like?"],["Value baseline", "How will we measure it?"]].map(([a,b],i)=><g key={a} transform={`translate(0 ${i*64})`}><rect x="225" y="93" width="360" height="53" rx="8" fill="#051b35" stroke="#2377d9" opacity=".95"/><rect x="237" y="103" width="29" height="29" rx="6" fill="#0a3d77" stroke="#49adff"/><circle cx="251.5" cy="117.5" r="7" fill="none" stroke="#8bd5ff" strokeWidth="2"/><text x="281" y="117" fill="#eaf4ff" fontSize="13" fontWeight="700">{a}</text><text x="281" y="133" fill="#86a8d3" fontSize="9">{b}</text><text x="566" y="124" fill="#4baeff" fontSize="19">›</text></g>)}
      </>}
      {scene === "network" && <>
        {Array.from({length:9},(_,i)=><path key={i} d={`M${40+i*34} 465 L${310+i*8} 235 L${660-i*14} 342`} fill="none" stroke="#1265c8" opacity=".2"/>)}
        <path d="M65 436 C175 395 220 244 350 267 S536 159 680 89" fill="none" stroke="#1876f8" strokeWidth="11" filter={url("glow")}/><path d="M65 436 C175 395 220 244 350 267 S536 159 680 89" fill="none" stroke="#6ec6ff" strokeWidth="2.3"/>
        {[130,305,483,620].map((x,i)=><g key={x} transform={`translate(${x} ${[385,264,219,119][i]})`}><path d="M0 0 L31 -19 L64 0 L33 19 Z" fill="#184b91" stroke="#85c9ff"/><path d="M0 0 L33 19 L33 59 L0 39 Z" fill="#062656" stroke="#50a6ff"/><path d="M33 19 L64 0 L64 39 L33 59 Z" fill="#0a4da3" stroke="#60b4ff"/><circle cx="33" cy="19" r="6" fill="#a6e6ff" filter={url("glow")}/></g>)}
      </>}
      {scene === "modelChoice" && <>
        {[0,1,2,3,4,5].map(i=><path key={i} d={`M${115+i*62} 390 L${248+i*20} 215 L${440+i*25} 349`} stroke="#0766d1" opacity=".16" fill="none"/>)}
        <path d="M295 227 L373 184 L450 226 L373 270 Z" fill="#15539c" stroke="#a2dcff" strokeWidth="2" filter={url("lightShadow")}/><path d="M295 227 L373 270 V360 L295 314 Z" fill="#08264f" stroke="#5ab6ff" strokeWidth="2"/><path d="M373 270 L450 226 V314 L373 360 Z" fill="#0b54ab" stroke="#5ab6ff" strokeWidth="2"/><path d="M373 184 V360 M295 227 L450 314 M450 226 L295 314" stroke="#4bb5ff" opacity=".5"/>
        {[["OpenAI",130,230],["Microsoft",472,112],["Anthropic",488,264],["Meta",470,359],["Google",155,380]].map(([name,x,y])=><g key={name} transform={`translate(${x} ${y})`}><rect width="116" height="36" rx="8" fill="#061934" stroke="#337fdf" filter={url("lightShadow")}/><circle cx="17" cy="18" r="5" fill="#41a8ff"/><text x="31" y="23" fill="#eff8ff" fontSize="12" fontWeight="600">{name}</text></g>)}
      </>}
      {(scene === "wave" || scene === "terrain" || scene === "journey") && <>
        {Array.from({length:22},(_,i)=><path key={i} d={`M-40 ${360+i*9} C160 ${230+i*5} 243 ${466-i*4} 380 ${330+i*3} S550 ${275+i*8} 750 ${220+i*8}`} fill="none" stroke="#1881ee" strokeWidth=".8" opacity={.16+i*.012}/>)}
        <path d="M-40 415 C160 260 265 460 390 350 S590 271 750 252" fill="none" stroke="#0b6fe3" strokeWidth="15" filter={url("glow")}/><path d="M-40 415 C160 260 265 460 390 350 S590 271 750 252" fill="none" stroke="#8edaff" strokeWidth="2.5"/>
        {scene === "journey" && [95,175,260,345,425,515,594].map((x,i)=><circle key={x} cx={x} cy={355-i*12} r="8" fill="#0a3c78" stroke="#9bdcff" strokeWidth="2"/>)}
        {scene === "terrain" && <><path d="M560 245 V67" stroke="#3094ff"/><circle cx="560" cy="245" r="10" fill="#0a3c78" stroke="#a4e3ff" strokeWidth="2"/></>}
      </>}
    </svg>
  </div>
}

addPropertyControls(IntellientMockupArt, { scene: { type: ControlType.Enum, title: "Scene", options: ["model", "blueprint", "architecture", "network", "modelChoice", "wave", "journey", "terrain"], defaultValue: "model" } })
