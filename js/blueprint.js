/* Fusion Clinic — live blueprint
   Scene A: brand construction grid on #FF5900 (like a logo construction sheet).
   Scene B: the room page (Figma frame 24:851, original coordinates) sketched,
            filled into UI and annotated with the hand-off notes from the file. */
(function(){
const host=document.getElementById("bp");if(!host)return;
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const O="#FF5900",R="#FF0000",G="#636363",A="#FF385C";
const r2p=(x,y,w,h,r=0)=>r?`M${x+r} ${y}H${x+w-r}A${r} ${r} 0 0 1 ${x+w} ${y+r}V${y+h-r}A${r} ${r} 0 0 1 ${x+w-r} ${y+h}H${x+r}A${r} ${r} 0 0 1 ${x} ${y+h-r}V${y+r}A${r} ${r} 0 0 1 ${x+r} ${y}Z`:`M${x} ${y}H${x+w}V${y+h}H${x}Z`;
const P=(d,c="w",extra="")=>`<path class="${c}" d="${d}" pathLength="1" ${extra}/>`;

/* ---------- Scene A: brand grid ---------- */
const VA=[180,420,540,720,900,1020,1260],HA=[150,300,420,640,760,910];
let sa=`<rect width="1440" height="1060" fill="${O}"/>`;
sa+=`<defs><pattern id="hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="14" stroke="rgba(0,0,0,.18)" stroke-width="3"/></pattern></defs>`;
sa+=`<g class="hz">${[[180,300,240,120],[1020,300,240,120],[180,640,240,120],[1020,640,240,120]].map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#hatch)"/>`).join("")}</g>`;
sa+=`<g class="gl" stroke="rgba(60,15,0,.35)" stroke-width="1.5" fill="none">${VA.map(x=>P(`M${x} 40V1020`,"g")).join("")}${HA.map(y=>P(`M60 ${y}H1380`,"g")).join("")}</g>`;
sa+=`<g class="cc" stroke="rgba(60,15,0,.45)" stroke-width="1.5" fill="rgba(255,255,255,.08)">${[[540,420,48],[720,530,110],[900,420,48],[420,530,60],[1020,530,60]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>`;
sa+=`<text class="lab" x="180" y="120" font-family="IBM Plex Mono,monospace" font-size="22" fill="rgba(60,15,0,.7)" letter-spacing="3">FUSION · BRAND GRID</text>`;
sa+=`<text class="lab" x="1260" y="980" text-anchor="end" font-family="IBM Plex Mono,monospace" font-size="22" fill="rgba(60,15,0,.7)" letter-spacing="3">#FF5900 → #FF0000</text>`;

/* ---------- Scene B: room page sketch ---------- */
let sb=`<rect width="1440" height="1060" fill="#2C2D31"/><defs><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="rgba(255,255,255,.08)"/></pattern>
<linearGradient id="btn" x1="0" x2="1"><stop offset="0" stop-color="${O}"/><stop offset="1" stop-color="${R}"/></linearGradient>
<clipPath id="g1"><rect x="181" y="318" width="533" height="393" rx="10"/></clipPath><clipPath id="g2"><rect x="725" y="318" width="262" height="193"/></clipPath><clipPath id="g3"><rect x="725" y="518" width="262" height="193"/></clipPath><clipPath id="g4"><rect x="997" y="318" width="262" height="193"/></clipPath><clipPath id="g5"><rect x="997" y="518" width="262" height="193"/></clipPath>
<filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="10" flood-opacity=".18"/></filter></defs><rect width="1440" height="1060" fill="url(#dots)"/>`;
sb+=`<text class="frame-lab" x="200" y="30" font-family="Inter,sans-serif" font-size="16" fill="#9AA0A8">Desktop | Fundo FFFFFF — Tela de Reservas</text>`;
const page=[];
page.push(`<rect class="paper" x="0" y="0" width="1440" height="1400" fill="#fff"/>`);
/* wireframe strokes */
const wf=[];
wf.push(P("M0 76H1440"));
wf.push(P(r2p(181,22,100,36,6)));                 // logo slot
wf.push(P(r2p(400,20,410,40,20)));                // search
wf.push(P(r2p(817,20,136,40,20)));                // date
wf.push(P("M987 22a18 18 0 1 0 0.01 0"));         // search button
wf.push(P(r2p(1183,20,76,40,20)));                // avatar pill
wf.push(P(r2p(181,190,250,30,4)));                // title
wf.push(P(r2p(181,230,180,20,4)));                // location
[[181,318,533,393],[725,318,262,193],[725,518,262,193],[997,318,262,193],[997,518,262,193]].forEach(([x,y,w,h])=>{wf.push(P(r2p(x,y,w,h,6)));wf.push(P(`M${x} ${y}L${x+w} ${y+h}M${x+w} ${y}L${x} ${y+h}`,"w x"))});
for(let i=0;i<6;i++)wf.push(P(`M181 ${830+i*30}H${i===5?560:920}`,"w t"));     // description lines
wf.push(P(r2p(985,810,274,270,12)));              // price card
wf.push(P(r2p(1003,1022,237,43,8)));              // book button
for(let i=0;i<4;i++){wf.push(P(`M196 ${1100+i*62}m-16 0a16 16 0 1 0 32 0a16 16 0 1 0 -32 0`));wf.push(P(`M232 ${1100+i*62}H${[420,300,330,380][i]}`,"w t"))}
wf.push(P(r2p(182,1335,237,46,10)));              // mostrar mais
page.push(`<g class="wf" fill="none" stroke="${G}" stroke-width="2.4" stroke-linecap="round">${wf.join("")}</g>`);
/* UI layer */
const ui=[];
ui.push(`<image href="assets/img/fusion-logo.png" x="181" y="20" width="108" height="40" preserveAspectRatio="xMinYMid meet"/>`);
ui.push(`<rect x="400" y="20" width="410" height="40" rx="20" fill="#fff" stroke="#D7D9DD"/><text x="422" y="46" font-size="15" fill="#8A8F96">Digite a cidade, bairro ou cep</text>`);
ui.push(`<rect x="817" y="20" width="136" height="40" rx="20" fill="#fff" stroke="#D7D9DD"/><text x="832" y="46" font-size="15" fill="#8A8F96">21 Mar. 2024</text>`);
ui.push(`<circle cx="987" cy="40" r="18" fill="${O}"/>`);
ui.push(`<rect x="1183" y="20" width="76" height="40" rx="20" fill="#fff" filter="url(#sh)"/><circle cx="1238" cy="40" r="16" fill="${O}"/><text x="1238" y="46" text-anchor="middle" font-size="16" font-weight="600" fill="#fff">G</text>`);
ui.push(`<text x="181" y="215" font-size="36" font-weight="500" fill="#1F2328">Sala Fusion 04</text><text x="204" y="250" font-size="21" fill="${G}">Natal, Lagoa Nova</text><path d="M188 236a6 6 0 0 1 12 0c0 5-6 11-6 11s-6-6-6-11z" fill="${O}"/>`);
ui.push(`<image href="assets/img/room-1.jpg" x="181" y="318" width="533" height="393" preserveAspectRatio="xMidYMid slice" clip-path="url(#g1)"/>`);
[["g2",725,318,"50% 50%"],["g3",725,518,""],["g4",997,318,""],["g5",997,518,""]].forEach(([c,x,y])=>ui.push(`<image href="assets/img/room-1.jpg" x="${x}" y="${y}" width="262" height="193" preserveAspectRatio="xMidYMid slice" clip-path="url(#${c})"/>`));
ui.push(`<text font-size="21" fill="${G}"><tspan x="181" y="840">No coração do Manhattan Business Office, o consultório</tspan><tspan x="181" y="870">odontológico "Sorriso Radiante" oferece um ambiente moderno</tspan><tspan x="181" y="900">e acolhedor para cuidados dentários de excelência. Com uma</tspan><tspan x="181" y="930">equipe especializada e tecnologia de ponta, cada visita é</tspan><tspan x="181" y="960">uma experiência tranquila e confortável.</tspan></text>`);
ui.push(`<rect x="985" y="810" width="274" height="270" rx="12" fill="#fff" filter="url(#sh)"/><text x="1003" y="860" font-size="20" fill="${G}">A partir de</text><text x="1003" y="900" font-size="35" font-weight="700" fill="${G}">R$ 30,00/h</text>`);
ui.push(`<rect x="1003" y="1022" width="237" height="43" rx="8" fill="url(#btn)"/><text x="1121" y="1050" text-anchor="middle" font-size="16" font-weight="700" fill="#fff">Reservar</text>`);
["Ambiente Privilegiado","Wi-Fi","Água e Café","Estacionamento"].forEach((t,i)=>ui.push(`<circle cx="196" cy="${1100+i*62}" r="16" fill="none" stroke="${O}" stroke-width="2.4"/><path d="M188 ${1100+i*62}l6 6 10-11" fill="none" stroke="${O}" stroke-width="2.4" stroke-linecap="round"/><text x="232" y="${1108+i*62}" font-size="24" font-weight="500" fill="${O}">${t}</text>`));
ui.push(`<rect x="182" y="1335" width="237" height="46" rx="10" fill="#fff" stroke="${O}" stroke-width="2"/><text x="300" y="1365" text-anchor="middle" font-size="24" fill="${O}">Mostrar mais</text>`);
page.push(`<g class="ui" font-family="Inter,sans-serif">${ui.map(u=>`<g class="u">${u}</g>`).join("")}</g>`);
sb+=`<g class="page" transform="translate(205 48) scale(.72)">${page.join("")}</g>`;
/* annotations (text from the Figma hand-off) — anchors in page space converted */
const T=(x,y)=>[205+x*.72,48+y*.72];
const notes=[
  {t:"Título, cidade e bairro",at:T(181,205),side:"l",y:190},
  {t:"Descrição",at:T(181,880),side:"l",y:680},
  {t:"Diferenciais",at:T(180,1160),side:"l",y:880},
  {t:"Layout grudento",at:T(1259,860),side:"r",y:560},
  {t:"Degradê linear",s:"FF5900 → FF0000",at:T(1240,1043),side:"r",y:820}
];
sb+=`<g class="notes" font-family="Inter,sans-serif">${notes.map(n=>{const x=n.side==="l"?24:1260,w=156,h=n.s?58:40,cx=n.side==="l"?x+w:x,cy=n.y+h/2;
  return `<g class="note">${P(`M${cx} ${cy}H${(cx+n.at[0])/2}V${n.at[1]}H${n.at[0]}`,"nl",`fill="none" stroke="${A}" stroke-width="2"`)}<circle class="nd" cx="${n.at[0]}" cy="${n.at[1]}" r="5" fill="${A}"/><g class="nt"><rect x="${x}" y="${n.y}" width="${w}" height="${h}" rx="6" fill="${A}"/><text x="${x+12}" y="${n.y+25}" font-size="15" font-weight="700" fill="#fff">${n.t}</text>${n.s?`<text x="${x+12}" y="${n.y+45}" font-size="13" fill="#fff" opacity=".9">${n.s}</text>`:""}</g></g>`}).join("")}</g>`;
/* multiplayer cursor */
sb+=`<g class="cur"><path d="M0 0L0 26L7 19L12 31L17 29L12 17L22 17Z" fill="${O}" stroke="#fff" stroke-width="2"/><rect x="18" y="26" width="58" height="26" rx="6" fill="${O}"/><text x="47" y="44" text-anchor="middle" font-family="Inter,sans-serif" font-size="14" font-weight="600" fill="#fff">Luiz</text></g>`;

host.innerHTML=`<svg viewBox="0 0 1440 1060" xmlns="http://www.w3.org/2000/svg"><g class="sA">${sa}</g><g class="sB">${sb}</g></svg><span class="bp-badge"><i></i><b>Figma</b> · Fusion Clinic — Plataform</span>`;
const svg=host.querySelector("svg"),q=s=>svg.querySelectorAll(s);
const setDash=els=>els.forEach(e=>{e.style.strokeDasharray="1";e.style.strokeDashoffset="1"});

function finalState(){svg.querySelector(".sA").style.opacity=0;q(".w,.nl,.g").forEach(e=>{e.style.strokeDasharray="";e.style.strokeDashoffset=""});q(".wf").forEach(e=>e.style.opacity=0);
  q(".u,.nt,.nd,.paper").forEach(e=>{e.style.opacity=1});svg.querySelector(".cur").style.display="none"}
if(reduce||!window.gsap){finalState();return}

let tl;
function build(){
  if(tl)tl.kill();
  const sA=svg.querySelector(".sA"),sB=svg.querySelector(".sB");
  setDash([...q(".g"),...q(".w"),...q(".nl")]);
  gsap.set(sA,{opacity:1,scale:1,transformOrigin:"50% 50%"});gsap.set(sB,{opacity:0});
  gsap.set(q(".cc circle"),{scale:0,transformOrigin:"50% 50%",transformBox:"fill-box"});
  gsap.set([q(".hz"),q(".lab")],{opacity:0});
  gsap.set(q(".paper"),{scaleY:0,transformOrigin:"50% 0%",transformBox:"fill-box"});
  gsap.set(q(".wf"),{opacity:1});gsap.set(q(".u"),{opacity:0});gsap.set([q(".nt"),q(".nd")],{opacity:0});
  gsap.set(q(".nt"),{scale:.6,transformOrigin:"50% 50%",transformBox:"fill-box"});
  const cur=svg.querySelector(".cur");gsap.set(cur,{x:1300,y:980,opacity:0});
  tl=gsap.timeline({repeat:-1,repeatDelay:.6,defaults:{ease:"power2.inOut"}});
  /* scene A */
  tl.to(q(".lab"),{opacity:1,duration:.4})
    .to(q(".g"),{strokeDashoffset:0,duration:1,stagger:.05},"<")
    .to(q(".hz"),{opacity:1,duration:.5},"-=.4")
    .to(q(".cc circle"),{scale:1,duration:.6,stagger:.08,ease:"back.out(1.7)"},"-=.3")
    .to({},{duration:.6})
    .to(sA,{opacity:0,scale:1.06,duration:.6})
    .to(sB,{opacity:1,duration:.5},"<.2")
  /* scene B: paper + wireframe */
    .to(q(".paper"),{scaleY:1,duration:.6,ease:"power3.out"})
    .to(cur,{opacity:1,duration:.2},"<")
    .to(q(".wf .w"),{strokeDashoffset:0,duration:.5,stagger:.045},"<.2")
    .to(cur,{keyframes:[{x:300,y:180,duration:.5},{x:520,y:500,duration:.6},{x:880,y:420,duration:.5},{x:420,y:700,duration:.5},{x:980,y:700,duration:.5},{x:300,y:900,duration:.5}]},"<")
  /* UI fill, top to bottom */
    .to(q(".wf"),{opacity:.15,duration:.5})
    .to(q(".u"),{opacity:1,duration:.45,stagger:.1},"<")
    .to(cur,{x:1000,y:800,duration:.6},"<.4")
  /* annotations */
    .to(q(".nl"),{strokeDashoffset:0,duration:.5,stagger:.25})
    .to(q(".nd"),{opacity:1,duration:.2,stagger:.25},"<")
    .to(q(".nt"),{opacity:1,scale:1,duration:.4,stagger:.25,ease:"back.out(2)"},"<.15")
    .to(cur,{x:1360,y:900,duration:.8},"<")
    .to({},{duration:2.6})
    .to(sB,{opacity:0,duration:.6});
}
build();
let started=false;
new IntersectionObserver(es=>{const v=es[0].isIntersecting;if(v&&!started){started=true;tl.restart()}if(tl){v?tl.resume():tl.pause()}},{threshold:.3}).observe(host);
tl.pause();
const rp=document.getElementById("bpReplay");if(rp)rp.addEventListener("click",()=>{build();tl.restart()});
})();
