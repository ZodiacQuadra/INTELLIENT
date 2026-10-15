import { useId } from 'react';
import { ArrowRight, FileText, User, Check, X, Sparkle, Key, Scroll, Gavel } from '@phosphor-icons/react';
import styles from './ResponsibleDesign.module.css';

const still = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SHIELD = 'M365 110 C334 135 305 152 267 165 Q251 171 251 199 C245 321 278 428 367 478 C458 425 498 319 497 200 Q497 173 480 167 C437 153 407 136 380 112 Q372 104 365 110Z';
// Open fingerprint ridges follow the shield's boundary; the permitted path crosses the field.
const RIDGES = [
  'M263 274 C255 231 259 185 282 172 C316 152 358 153 397 170 C451 188 476 237 470 293 C463 359 430 419 386 458',
  'M266 308 C251 233 267 196 301 178 C336 159 379 166 411 187 C463 221 466 273 451 328 C441 372 417 414 388 443',
  'M276 352 C258 297 260 225 290 199 C325 168 377 177 408 204 C450 241 448 283 431 330 C417 369 405 396 379 424',
  'M285 378 C267 334 269 248 299 220 C330 191 370 192 397 214 C436 246 435 281 421 320 C409 353 394 390 367 416',
  'M294 396 C277 363 278 276 305 244 C330 214 362 205 387 224 C422 249 423 279 409 313 C397 342 380 378 355 404',
  'M306 409 C294 391 283 323 298 283 C311 247 337 224 363 226 C394 228 412 255 404 284 C397 312 385 330 371 356 C361 375 352 392 335 405',
  'M318 424 C308 413 294 380 298 349 C301 320 302 280 327 254 C342 238 359 237 374 248 C396 265 393 287 381 311 C369 332 355 352 344 375 C335 393 326 401 317 405',
  'M330 437 C318 426 306 404 306 380 C306 352 316 339 316 313 C316 286 327 263 345 254 C363 245 383 259 382 279 C381 295 370 312 358 333 C344 357 335 384 319 389',
  'M343 449 C332 438 318 421 315 401 C311 379 324 357 329 337 C335 310 328 290 344 273 C354 262 367 266 369 279 C372 294 358 310 349 331 C340 353 335 371 322 374',
  'M356 460 C342 451 331 436 326 418 C319 397 336 375 341 354 C345 336 347 325 355 309 C364 290 363 283 356 282 C349 283 346 294 347 308 C348 327 340 347 331 354',
  'M369 465 C352 454 340 441 336 426 C329 406 345 387 352 365 C358 347 365 334 374 315 C382 296 391 279 387 260',
  'M382 462 C367 450 350 441 347 424 C341 408 357 391 365 371 C374 348 386 328 395 304 C409 270 410 244 391 231',
  'M397 448 C380 440 363 430 359 417 C354 401 368 388 377 366 C387 343 404 318 414 291 C426 256 418 224 392 209',
  'M414 431 C394 425 375 417 371 405 C368 392 383 377 393 357 C405 335 423 305 429 278 C437 239 420 211 394 195',
  'M432 410 C410 410 390 400 388 388 C386 376 401 359 412 339 C427 313 440 282 443 253 C445 219 425 192 397 180',
  'M453 372 C434 382 412 382 406 370 C401 358 415 343 426 321 C443 292 456 262 455 235 C453 207 432 180 401 167',
];
const MAIN = 'M61 282 H158 C203 282 233 327 276 329 C317 332 326 288 345 269 C361 251 373 248 390 256 C423 273 457 299 494 291 C528 283 549 245 585 245 H640';
const HELD = ['M61 303 H158 C202 303 231 341 277 344 C306 346 331 321 342 295 C351 274 364 269 379 280', 'M61 325 H158 C203 325 235 357 275 360 C312 362 336 342 352 312'];

// Glass elements are placed over the SVG in its own coordinates (viewBox 0 60 820 520).
const at = (x, y) => ({ left: `${(x / 820) * 100}%`, top: `${((y - 60) / 520) * 100}%` });
const Tag = ({ x, y, Icon, children }) => <span className={styles.tag} style={at(x, y)}><Icon weight="bold" aria-hidden="true" />{children}</span>;

function GovernanceDiagram() {
  const id = useId();
  const moving = !still();
  return <div className={styles.diagramWrap}><svg className={styles.governanceDiagram} viewBox="0 60 820 520" role="img" aria-label="Model signals pass through Access, Policy and Authority inside a fingerprint-shaped shield. Authorised action remains connected to an accountable person and retained evidence; unpermitted signals stop at the boundary.">
    <defs>
      <clipPath id={`${id}-boundary`}><path d={SHIELD} /></clipPath>
      <radialGradient id={`${id}-halo`}><stop stopColor="#1f5fff" stopOpacity=".5" /><stop offset="1" stopColor="#1f5fff" stopOpacity="0" /></radialGradient>
      <linearGradient id={`${id}-ridge`} x1="0" y1="0" x2=".65" y2="1"><stop stopColor="#e9f6ff" /><stop offset=".35" stopColor="#8fcbff" /><stop offset="1" stopColor="#3f8cff" /></linearGradient>
      <filter id={`${id}-glow`} filterUnits="userSpaceOnUse" x="0" y="0" width="820" height="600"><feGaussianBlur stdDeviation="7" /></filter>
    </defs>
    <ellipse cx="377" cy="290" rx="220" ry="260" fill={`url(#${id}-halo)`} className={styles.halo} />

    {/* The shield: a neon double edge over dense fingerprint ridges. */}
    <path d={SHIELD} className={styles.shieldFill} />
    <path d={SHIELD} className={styles.shieldGlow} filter={`url(#${id}-glow)`} />
    <g clipPath={`url(#${id}-boundary)`} fill="none" stroke={`url(#${id}-ridge)`} className={styles.ridges}>
      {RIDGES.map((d, index) => <path key={d} d={d} strokeWidth={index < 4 ? 2.4 : 2} opacity={1 - index * .02} />)}
      {moving && RIDGES.filter((_, i) => i % 3 === 0).map((d, i) => <path key={`s${d}`} d={d} pathLength="100" className={styles.ridgeScan} style={{ animationDelay: `-${i * 0.9}s` }} />)}
    </g>
    <path d={SHIELD} className={styles.shieldEdge} />
    <path d={SHIELD} className={styles.shieldInner} transform="translate(374 294) scale(0.94) translate(-374 -294)" />
    <path d="M365 111 C331 138 302 153 267 165 Q251 173 252 202" className={styles.shieldHighlight} />

    {/* Three bright signals leave the model; one crosses to authorised action, the others are held. */}
    {HELD.map((d) => <path key={d} d={d} className={styles.held} />)}
    <path d={MAIN} className={styles.signalGlow} filter={`url(#${id}-glow)`} />
    <path d={MAIN} className={styles.signal} />
    {moving && <>
      <path d={MAIN} pathLength="100" className={styles.signalFlow} />
      {[0, 1].map((k) => <circle key={k} r="4" className={styles.particle}><animateMotion dur="4.2s" begin={`-${k * 2.1}s`} repeatCount="indefinite" path={MAIN} /></circle>)}
      {HELD.map((d, k) => <circle key={d} r="3" className={styles.particleHeld}><animateMotion dur="3s" begin={`-${k * 1.4}s`} repeatCount="indefinite" path={d} /></circle>)}
    </>}

    <g className={styles.leaders}>
      <path d="M158 210 V282" /><path d="M380 110 V204" /><path d="M585 186 V245" />
      <path d="M585 245 V412" /><path d="M585 470 V500" />
      <path d="M403 394 C403 440 412 470 424 494" className={styles.dashed} />
    </g>
    <path d="M578 404 l7 9 l7 -9 M578 492 l7 9 l7 -9" className={styles.arrowTip} />

    {[[158, 282], [158, 303], [380, 204], [585, 245], [403, 394]].map(([x, y], k) => <g key={`${x}-${y}`}>
      <circle cx={x} cy={y} r="10" className={styles.jointHalo} style={{ animationDelay: `-${k * 0.7}s` }} />
      <circle cx={x} cy={y} r="4.5" className={styles.joint} />
    </g>)}

    <circle cx="664" cy="245" r="46" className={styles.orbHalo} />
  </svg>

    {/* The model, the three checks, and where the permitted action lands. */}
    <span className={styles.source} style={at(30, 303)}><Sparkle weight="fill" aria-hidden="true" /></span>
    <span className={styles.caption} style={at(30, 360)}>Model</span>
    <Tag x={158} y={192} Icon={Key}>Access</Tag>
    <Tag x={380} y={90} Icon={Scroll}>Policy</Tag>
    <Tag x={585} y={168} Icon={Gavel}>Authority</Tag>
    <span className={styles.authOrb} style={at(664, 245)}>
      <span className="orb-glass"><span className="orb-swirl" /><span className="orb-swirl two" /></span>
      <Check weight="bold" aria-hidden="true" />
    </span>
    <span className={`${styles.tag} ${styles.tagHot}`} style={at(664, 306)}>Authorised</span>
    <span className={styles.step} style={at(585, 440)}><span className={styles.stepIco}><User weight="duotone" aria-hidden="true" /></span>Accountable person</span>
    <span className={styles.step} style={at(585, 528)}><span className={styles.stepIco}><FileText weight="duotone" aria-hidden="true" /></span>Evidence retained</span>
    <span className={styles.stop} style={at(427, 511)}><X weight="bold" aria-hidden="true" /></span>
    <span className={styles.caption} style={at(427, 556)}>Held at the boundary</span>
  </div>;
}

export default function ResponsibleDesign({ page }) {
  const hero = page.blocks.find((block) => block.type === 'hero');
  const controls = page.blocks.find((block) => block.type === 'list');
  return <div className={styles.responsible}>
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <span className="hero-pill">Responsible AI</span>
          <h1>Responsible AI begins{' '}<br />with responsible{' '}<br /><span>operating design.</span></h1>
          <p>{hero.lead}</p>
          <a href={hero.cta.href} className="btn btn-primary">{hero.cta.label}<ArrowRight weight="bold" /></a>
        </div>
        <GovernanceDiagram />
      </div>
    </section>

    <section className={`container ${styles.controls}`} aria-labelledby="responsible-control-title">
      <div className={styles.flowHead} data-reveal>
        <div><span className="eyebrow">The Intellient approach</span><h2 id="responsible-control-title" className={`h-section ${styles.flowTitle}`}>Control enters the design <span className="accent">before production.</span></h2></div>
      </div>

      {/* The seven controls, numbered in order. */}
      <ol className={styles.controlSteps}>
        {controls.items.map((item, k) => <li key={item} data-reveal style={{ '--i': k }}><span>{String(k + 1).padStart(2, '0')}</span><p>{item}</p></li>)}
      </ol>

    </section>
  </div>;
}
