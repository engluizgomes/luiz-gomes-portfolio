/* Luiz Gomes — portfolio behaviour */
(function(){
const root=document.documentElement;
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
let lang=root.dataset.lang==="pt"?"pt":"en";
const t=k=>(I18N[lang]&&I18N[lang][k])??I18N.en[k]??k;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---------- language ---------- */
function applyLang(){
  $$("[data-i18n]").forEach(el=>{el.textContent=t(el.dataset.i18n)});
  $$("[data-i18n-aria]").forEach(el=>el.setAttribute("aria-label",t(el.dataset.i18nAria)));
  $$("[data-set-lang]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.setLang===lang));
  document.title=t("meta.title");
  const md=$('meta[name="description"]');if(md)md.content=t("meta.desc");
  renderGallery(true);
  renderStories();renderPillars();renderGantt();
}

/* ---------- v3: stories ---------- */
const K={p:"var(--k-p)",r:"var(--k-r)",d:"var(--k-d)",o:"var(--k-o)",c:"var(--k-c)"};
const L=o=>o==null?"":(typeof o==="string"?o:(o[lang]??o.en));
const SNL_SITES=["CBD","Docklands","Southbank","Richmond","Carlton","Box Hill","St Kilda","Footscray"];
function vis(st){
  switch(st.vis){
    case "auto":return `<div class="win"><div class="win-top"><i></i><i></i><i></i><span>workflow · onboarding</span></div><div class="win-body v-auto">
      <div class="row"><span class="nd">Lead</span><span class="ar"></span><span class="nd">CRM</span><span class="ar"></span><span class="nd hot">Automation</span><span class="ar"></span><span class="nd">Report</span></div>
      <div class="bars"><span>${lang==="pt"?"antes":"before"}</span><i style="--v:100%;--c:var(--muted)"></i><span>100</span><span>${lang==="pt"?"depois":"after"}</span><i style="--v:75%;--c:var(--k)"></i><span>75</span></div></div></div>`;
    case "dash":return `<div class="win"><div class="win-top"><i></i><i></i><i></i><span>Power BI · ${lang==="pt"?"painel estadual":"state dashboard"}</span></div><div class="win-body v-dash">
      <div class="kc"><span></span><b>●●●</b></div><div class="kc"><span></span><b>▲</b></div><div class="kc"><span></span><b>12+</b></div>
      <div class="ch">${[38,55,47,66,58,80,72,92].map(h=>`<i style="--h:${h}%"></i>`).join("")}</div>
      <div class="mp"><svg viewBox="0 0 60 64"><path d="M22 2 L44 6 L56 22 L50 40 L40 60 L26 62 L18 46 L8 30 L10 12Z"/>${[[34,14],[44,24],[28,28],[40,38],[30,48],[22,20],[48,34]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3"/>`).join("")}</svg></div></div></div>`;
    case "sites":return `<div class="win"><div class="win-top"><i></i><i></i><i></i><span>${lang==="pt"?"painel de sites":"site board"} · Melbourne</span></div><div class="win-body v-sites">
      ${SNL_SITES.map((n,i)=>`<div class="st ${i===2||i===6?"w":""}"><b>${n}<i></i></b><span class="pg" style="--v:${[92,100,64,88,100,96,70,84][i]}%"></span></div>`).join("")}</div></div>`;
    case "globe":return `<svg class="v-globe" viewBox="0 0 400 220" aria-hidden="true">
      <path class="land" d="M178 40 Q205 22 232 34 Q236 58 214 66 Q222 96 206 128 Q190 140 182 112 Q170 86 176 64Z"/>
      <path class="land" d="M236 30 Q300 14 352 40 Q360 70 330 84 Q300 96 276 86 Q250 76 240 58Z"/>
      <path class="land" d="M310 150 Q340 140 362 152 Q366 176 344 184 Q318 186 308 170Z"/>
      <path class="land" d="M60 40 Q110 30 128 54 Q118 80 98 92 Q112 120 104 160 Q90 176 82 150 Q74 116 70 92 Q48 70 60 40Z"/>
      <path class="arc" d="M336 166 Q280 90 210 56"/><path class="arc" d="M336 166 Q326 120 300 70"/>
      <circle class="pulse" cx="336" cy="166" r="8"/><circle class="hub" cx="336" cy="166" r="5"/><circle class="hub" cx="210" cy="56" r="4"/><circle class="hub" cx="300" cy="70" r="4"/>
      <text x="344" y="196">Melbourne</text><text x="180" y="40">${lang==="pt"?"Europa":"Europe"}</text><text x="290" y="56">${lang==="pt"?"Ásia":"Asia"}</text></svg>`;
    case "process":return `<div class="win"><div class="win-top"><i></i><i></i><i></i><span>${lang==="pt"?"mapa de processo":"process map"}</span></div><div class="win-body v-proc">
      ${[["As-is",[[0,30,lang==="pt"?"mapear":"map"],[34,30,lang==="pt"?"medir":"measure"]]],["To-be",[[30,34,lang==="pt"?"redesenhar":"redesign"],[68,30,lang==="pt"?"padronizar":"standardise"]]],[lang==="pt"?"Projeto":"Project",[[10,40,lang==="pt"?"plano":"plan"],[54,44,lang==="pt"?"implantar":"roll out"]]]].map(([n,bs])=>`<div class="lane"><span>${n}</span><div class="track">${bs.map(([a,w,l])=>`<i style="--a:${a}%;--w:${w}%">${l}</i>`).join("")}</div></div>`).join("")}</div></div>`;
    case "tender":return `<div class="win"><div class="win-top"><i></i><i></i><i></i><span>${lang==="pt"?"licitação":"public tender"}</span></div><div class="win-body v-tender">
      <div class="steps">${(lang==="pt"?["Edital","Proposta","Habilitação","Contrato"]:["Notice","Bid","Qualification","Contract"]).map((x,i)=>`<div class="sp ${i<2?"on":""}"><i></i>${x}</div>`).join("")}</div>
      <div class="doc"><div class="ln"><span style="width:80%"></span><span style="width:95%"></span><span style="width:60%"></span><span style="width:88%"></span></div><span class="stamp2">LK<br>${lang==="pt"?"PROPOSTA":"BID"}</span></div></div></div>`;
    case "collage":return `<div class="v-col"><img src="assets/work/cp-idiomas-01.jpg" alt="" loading="lazy"><img src="assets/work/noiva-dosal-01.jpg" alt="" loading="lazy"><img src="assets/work/armiel-01.jpg" alt="" loading="lazy"></div>`;
  }
  return "";
}
function renderStories(){
  const el=$("#storyList");if(!el||!window.STORIES)return;
  el.innerHTML=STORIES.map(st=>`<article class="story" id="s-${st.id}" style="--k:${K[st.kind]}">
    <div class="sv" aria-hidden="true">${vis(st)}</div>
    <div class="story-text">
      <p class="ek"><span class="kdot"></span>${esc(st.org)} · ${esc(L(st.when))}</p>
      <h3>${esc(L(st.t))}</h3>
      <p class="sub">${esc(L(st.s))}</p>
      <div class="kpi"><strong>${esc(st.k)}</strong><span>${esc(L(st.kl))}</span></div>
      <div class="meta"><span><b>${esc(L(st.role))}</b></span><span>${esc(L(st.where))}</span></div>
      ${st.link?`<a class="go" href="${st.link}">${t("st.see")} →</a>`:""}
    </div></article>`).join("");
}

/* ---------- v3: education pillars ---------- */
const PIC={eng:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg>`,
  sw:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>`,
  h:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>`};
const PK={eng:"var(--k-o)",sw:"var(--k-p)",h:"var(--k-d)"};
function renderPillars(){
  const el=$("#pillars");if(!el||!window.PILLARS)return;
  el.innerHTML=PILLARS.map(p=>`<article class="pl" style="--k:${PK[p.id]}">
    <div class="pl-head"><span class="ic">${PIC[p.id]}</span><h3>${t("pl."+p.id+".t")}</h3><p>${t("pl."+p.id+".d")}</p></div>
    <ol>${p.items.map(i=>`<li><span class="y">${i.y}</span><div><b>${esc(L(i.t))}</b><span>${esc(L(i.s))}</span></div></li>`).join("")}</ol></article>`).join("");
}

/* ---------- v3: career map ---------- */
const TODAY=2026.79;let gSel="fusion";
function renderGantt(){
  const g=$("#gantt");if(!g||!window.TIMELINE)return;
  const T=TIMELINE,span=T.to-T.from,pct=x=>((x-T.from)/span*100);
  g.style.setProperty("--lab","150px");
  const years=[];for(let y=Math.ceil(T.from);y<=Math.floor(T.to);y++)years.push(y);
  const fusionStory={id:"fusion",org:"Fusion Clinic",t:{en:t("fc.st"),pt:t("fc.st")},s:{en:t("fc.ss"),pt:t("fc.ss")},role:{en:t("fc.role.v"),pt:t("fc.role.v")},when:"2023–2024"};
  g.innerHTML=`<div class="g-axis">${years.map(y=>`<span style="left:${pct(y)}%">${y}</span>`).join("")}</div>
   <div class="g-grid">${years.map(y=>`<i style="left:${pct(y)}%"></i>`).join("")}</div>
   <div class="g-group">${t("career.work")}</div>
   ${T.work.map(w=>{const b=w.b??TODAY;return `<div class="g-row"><span class="g-lab">${esc(w.org)}<small>${w.c}</small></span><div class="g-track">
     <button type="button" class="g-bar ${w.b?"":"open"}" style="--k:${K[w.kind]};--a:${pct(w.a)}%;--w:${pct(b)-pct(w.a)}%" data-story="${w.story}" aria-pressed="false" aria-label="${esc(w.org)}"></button></div></div>`}).join("")}
   <div class="g-group">${t("career.study")}</div>
   <div class="g-study" id="gStudy">${T.study.map((s,i)=>s.at!=null
      ?`<button type="button" class="g-ms ${s.expected?"exp":""}" data-study="${i}" style="--k:${PK[s.p]};left:${pct(s.at)}%" aria-pressed="false" aria-label="${esc(L(s.t))}"></button><span class="g-mlab" data-for="${i}">${esc(L(s.t))}${s.expected?" ("+t("career.expected")+")":""}</span>`
      :`<span class="g-span" data-study="${i}" role="button" tabindex="0" style="--k:${PK[s.p]};left:${pct(s.a)}%;width:${pct(s.b)-pct(s.a)}%" aria-label="${esc(L(s.t))}"></span><span class="g-mlab" data-for="${i}">${esc(L(s.t))}</span>`).join("")}</div>
   <div class="g-today" style="left:calc(20px + 150px + (100% - 40px - 150px) * ${pct(TODAY)/100})"><span>${t("career.now")}</span></div>`;
  layoutStudy();
  const pick=id=>{
    gSel=id;$$(".g-bar,.g-ms,.g-span",g).forEach(b=>b.setAttribute("aria-pressed",b.dataset.story===id||("study"+b.dataset.study)===id));
    const d=$("#gdetail");
    if(id.startsWith("study")){const s=T.study[+id.slice(5)];
      d.innerHTML=`<p class="ek"><span class="kdot" style="--k:${PK[s.p]}"></span>${t("career.study")} · ${t("pl."+s.p+".t")}</p><h4>${esc(L(s.t))}</h4><p>${t("pl."+s.p+".d")}</p><a class="btn ghost" href="#education">${t("pill.eyebrow")} →</a>`;return}
    const st=id==="fusion"?fusionStory:STORIES.find(x=>x.id===id);if(!st)return;
    const w=T.work.find(x=>x.story===id);
    d.innerHTML=`<p class="ek"><span class="kdot" style="--k:${K[w.kind]}"></span>${esc(st.org)} · ${esc(L(st.role))} · ${esc(L(st.when))}</p><h4>${esc(L(st.t))}</h4><p>${esc(L(st.s))}</p><a class="btn ghost" href="${id==="fusion"?"#fusion":"#s-"+id}">${t("st.read")} →</a>`;
  };
  g.onclick=e=>{const b=e.target.closest(".g-bar,.g-ms,.g-span");if(!b)return;pick(b.dataset.story||("study"+b.dataset.study))};
  g.onkeydown=e=>{const b=e.target.closest(".g-span");if(b&&(e.key==="Enter"||e.key===" ")){e.preventDefault();pick("study"+b.dataset.study)}};
  pick(gSel);
}
function layoutStudy(){
  const box=$("#gStudy");if(!box)return;const W=box.clientWidth||800;
  const T=TIMELINE,span=T.to-T.from;
  const items=T.study.map((s,i)=>({i,x:((s.at??s.a)-T.from)/span*W,span:s.at==null,end:s.b?((s.b-T.from)/span*W):null})).sort((a,b)=>a.x-b.x);
  const levels=[];
  items.forEach(it=>{
    const lab=$(`.g-mlab[data-for="${it.i}"]`,box),w=lab.offsetWidth+16;
    let left=it.span?it.x:it.x-8; if(left+w>W){left=W-w}
    let lv=levels.findIndex(r=>r<left); if(lv<0){lv=levels.length;levels.push(0)} levels[lv]=left+w;
    const top=lv*38;
    lab.style.left=(left+(it.span?0:0))+"px";lab.style.transform="none";lab.style.top=(top+18)+"px";
    const mk=$(`[data-study="${it.i}"]`,box);mk.style.top=(top+(it.span?6:2))+"px";
  });
  box.style.height=(levels.length*38+20)+"px";
}
addEventListener("resize",()=>{clearTimeout(window.__gs);window.__gs=setTimeout(layoutStudy,150)});
function setLang(l){
  lang=l;root.dataset.lang=l;root.lang=l==="pt"?"pt-BR":"en";
  try{localStorage.setItem("lg-lang",l)}catch(e){}
  try{const u=new URL(location.href);u.searchParams.set("lang",l);history.replaceState(null,"",u)}catch(e){}
  applyLang();
  if(window.ScrollTrigger)ScrollTrigger.refresh();
}
$$("[data-set-lang]").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.setLang)));

/* ---------- theme ---------- */
$("#themeBtn").addEventListener("click",()=>{
  const dark=root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme=dark?"light":"dark";
  try{localStorage.setItem("lg-theme",root.dataset.theme)}catch(e){}
});

/* ---------- design gallery ---------- */
const CAT={brand:"d.brand",social:"d.social",editorial:"d.editorial"};
const imgs=k=>Array.from({length:k.n},(_,i)=>`assets/work/${k.s}-0${i+1}.jpg`);
const ICONS=`<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg><svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2"><path d="m22 3-9.5 18-2.5-8-8-2.5z"/></svg>`;
let filter="all";
function board(k){
  const im=imgs(k),cls=[];
  if(k.cat.includes("editorial"))cls.push("editorial");
  if(k.social){
    const back=im[1]?`<span class="sheet s3"><img src="${im[1]}" alt="" loading="lazy"></span>`:"";
    const back2=im[2]?`<span class="sheet s2"><img src="${im[2]}" alt="" loading="lazy"></span>`:"";
    return{cls,html:`${back2}${back}<span class="mphone"><span class="mscreen"><span class="mhead"><i></i><span>${esc(k.c)}</span></span><span class="mpost"><img src="${im[0]}" alt="" loading="lazy"></span><span class="mact">${ICONS}</span></span></span>`}
  }
  if(im.length===1){cls.push("single");return{cls,html:`<span class="sheet s1"><img src="${im[0]}" alt="" loading="lazy"></span>`}}
  return{cls,html:im.slice(0,3).map((src,i)=>`<span class="sheet s${i+1}"><img src="${src}" alt="" loading="lazy"></span>`).join("")};
}
function renderGallery(silent){
  const g=$("#dgrid");if(!g)return;
  g.innerHTML=CASES.map((k,i)=>{
    const b=board(k),cats=k.cat.map(c=>t(CAT[c])).join(" · ");
    const show=filter==="all"||k.cat.includes(filter);
    return `<button type="button" class="dc ${k.size==="wide"?"wide":""} ${b.cls.join(" ")}" data-i="${i}" ${show?"":"hidden"} style="--c:${k.bg}" aria-label="${esc(t("d.view")+": "+k.c)}">
      <span class="board">${b.html}</span>
      <span class="meta"><b>${esc(k.c)}</b><span>${esc(cats)}</span></span>
      <span class="dsec">${esc(k.sec[lang])} · ${k.n} ${k.n>1?t("d.pieces"):t("d.piece")}</span>
    </button>`}).join("");
  if(!silent&&window.gsap&&!reduce){
    gsap.fromTo($$(".dc:not([hidden])",g),{opacity:0,y:30,scale:.98},{opacity:1,y:0,scale:1,duration:.7,stagger:.05,ease:"power3.out"});
  }
  if(window.ScrollTrigger)ScrollTrigger.refresh();
}
$$(".filters button").forEach(b=>b.addEventListener("click",()=>{
  filter=b.dataset.f;$$(".filters button").forEach(x=>x.setAttribute("aria-pressed",x===b));renderGallery(false);
}));

/* ---------- lightbox ---------- */
const lb=$("#lb"),lbImg=$("#lbImg");let set=null,idx=0;
function show(){
  lbImg.src=set.imgs[idx];lbImg.alt=`${set.t} ${idx+1}`;
  $("#lbT").textContent=set.t;$("#lbS").textContent=set.s;$("#lbC").textContent=`${idx+1} / ${set.imgs.length}`;
  const m=set.imgs.length>1;$("#lbPrev").hidden=!m;$("#lbNext").hidden=!m;
}
function open(s,i){set=s;idx=i||0;show();if(!lb.open){try{lb.showModal()}catch(e){lb.setAttribute("open","")}}if(window.lenis)lenis.stop()}
lb.addEventListener("close",()=>{if(window.lenis)lenis.start()});
const step=d=>{idx=(idx+d+set.imgs.length)%set.imgs.length;show()};
$("#lbPrev").onclick=()=>step(-1);$("#lbNext").onclick=()=>step(1);$("#lbX").onclick=()=>lb.close();
lb.addEventListener("click",e=>{if(e.target===lb)lb.close()});
lb.addEventListener("keydown",e=>{if(!set)return;if(e.key==="ArrowRight")step(1);if(e.key==="ArrowLeft")step(-1)});
$("#dgrid").addEventListener("click",e=>{const c=e.target.closest(".dc");if(!c)return;const k=CASES[+c.dataset.i];
  open({t:k.c,s:`${k.sec[lang]} · ${k.cat.map(x=>t(CAT[x])).join(" · ")}`,imgs:imgs(k)},0)});
const fusionSet=()=>({t:"Fusion Clinic",s:"UX/UI",imgs:["assets/work/fusion-clinic-uxui-01.jpg","assets/work/fusion-clinic-uxui-03.jpg","assets/work/fusion-clinic-uxui-04.jpg","assets/work/fusion-clinic-uxui-02.jpg","assets/work/fusion-clinic-social-01.jpg"]});
$("#openFusion").addEventListener("click",()=>open(fusionSet(),0));
$("#openFusion2").addEventListener("click",()=>open(fusionSet(),0));

/* ---------- copy + form ---------- */
$$(".copy").forEach(b=>b.addEventListener("click",()=>{
  const done=()=>{b.textContent=t("c.copied");setTimeout(()=>b.textContent=t("c.copy"),1600)};
  const fallback=()=>{const v=b.parentElement.querySelector(".v");const r=document.createRange();r.selectNodeContents(v);const s=getSelection();s.removeAllRanges();s.addRange(r);done()};
  try{navigator.clipboard.writeText(b.dataset.copy).then(done,fallback)}catch(e){fallback()}
}));
$("#cForm").addEventListener("submit",e=>{
  e.preventDefault();
  const n=$("#cName").value.trim(),m=$("#cEmail").value.trim(),msg=$("#cMsg").value.trim(),note=$("#cNote");
  if(!n||!/^\S+@\S+\.\S+$/.test(m)||!msg){note.textContent=t("c.err");return}
  const subject=(lang==="pt"?"Contato pelo portfólio — ":"Portfolio enquiry — ")+n;
  location.href=`mailto:eng.prod.luizgomes@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg+"\n\n— "+n+" <"+m+">")}`;
  note.textContent=t("c.ok");
});

/* ---------- timecode ---------- */
if(!reduce){let f=0;setInterval(()=>{f++;const fr=f%25,s=Math.floor(f/25)%60,mi=Math.floor(f/1500)%60;
  const tc=`00:${String(mi).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(fr).padStart(2,"0")}`;$$("[data-tc]").forEach(el=>el.textContent=tc)},40)}

applyLang();

/* ---------- motion ---------- */
if(!window.gsap||!window.ScrollTrigger||reduce)return;
gsap.registerPlugin(ScrollTrigger);

if(window.Lenis){
  const lenis=new Lenis({duration:1.1,smoothWheel:true});window.lenis=lenis;
  lenis.on("scroll",ScrollTrigger.update);
  gsap.ticker.add(x=>lenis.raf(x*1000));gsap.ticker.lagSmoothing(0);
  $$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const id=a.getAttribute("href");if(id.length<2)return;const el=$(id);if(!el)return;e.preventDefault();lenis.scrollTo(el,{offset:-80})}));
}

/* intro */
const tl=gsap.timeline({defaults:{ease:"expo.out"}});
tl.from(".pill",{y:-40,opacity:0,duration:1})
  .from(".hero-h .ln > span",{yPercent:110,duration:1.2,stagger:.1},"<.1")
  .fromTo(".hero-h .u",{"--ux":0},{"--ux":1,duration:1,ease:"power3.inOut"},"-=.6")
  .from(".hero-sub,.hero-links",{y:16,opacity:0,duration:.9,stagger:.08},"-=.9")
  .from(".portrait img",{y:120,opacity:0,duration:1.6,ease:"power4.out"},"-=.9")
  .from(".halo",{scale:.6,opacity:0,duration:1.6},"<");

/* portrait parallax */
gsap.to(".portrait img",{yPercent:8,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
gsap.to(".halo",{scale:1.25,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});

/* reveals */
ScrollTrigger.batch("[data-reveal]",{start:"top 90%",once:true,
  onEnter:b=>gsap.from(b,{opacity:0,y:36,duration:1,stagger:.07,ease:"power3.out"})});

/* counters */
$$(".num[data-to]").forEach(el=>{const o={v:0},n=+el.dataset.to;
  gsap.to(o,{v:n,duration:1.8,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 92%",once:true},onUpdate:()=>el.textContent=Math.round(o.v)})});

/* fusion stage: devices rise in, then parallax */
const st=$("#fusionStage");
if(st){
  gsap.from(".laptop",{y:120,opacity:0,rotateX:18,transformPerspective:1200,duration:1.4,ease:"power4.out",scrollTrigger:{trigger:st,start:"top 80%",once:true}});
  gsap.from(".phone",{y:200,opacity:0,rotate:8,duration:1.4,delay:.2,ease:"power4.out",scrollTrigger:{trigger:st,start:"top 80%",once:true}});
  gsap.from(".tagchip",{scale:.6,opacity:0,duration:.8,stagger:.15,delay:.7,ease:"back.out(2)",scrollTrigger:{trigger:st,start:"top 80%",once:true}});
  $$("[data-par]",st).forEach(el=>gsap.to(el,{y:+el.dataset.par,ease:"none",scrollTrigger:{trigger:st,start:"top bottom",end:"bottom top",scrub:true}}));
  gsap.to(".blob.b1",{xPercent:40,yPercent:30,ease:"none",scrollTrigger:{trigger:st,start:"top bottom",end:"bottom top",scrub:true}});
  gsap.to(".blob.b2",{xPercent:-30,yPercent:-30,ease:"none",scrollTrigger:{trigger:st,start:"top bottom",end:"bottom top",scrub:true}});
}

/* stories: visuals rise, bars grow */
$$(".story").forEach(st=>{
  const tl2=gsap.timeline({scrollTrigger:{trigger:st,start:"top 80%",once:true}});
  tl2.from($(".sv",st),{y:60,opacity:0,scale:.96,duration:1.1,ease:"power3.out"})
     .from($$(".story-text > *",st),{y:24,opacity:0,duration:.8,stagger:.07,ease:"power3.out"},"<.15");
  const bars=$$(".v-dash .ch i",st);if(bars.length)tl2.from(bars,{scaleY:0,duration:.9,stagger:.05,ease:"power3.out"},"<.2");
  const nd=$$(".v-auto .nd,.v-auto .ar",st);if(nd.length)tl2.from(nd,{opacity:0,x:-10,duration:.4,stagger:.06},"<.2");
  const arcs=$$(".v-globe .arc",st);arcs.forEach(a=>{const Ln=a.getTotalLength();tl2.fromTo(a,{strokeDashoffset:Ln},{strokeDashoffset:0,duration:1.4,ease:"power2.inOut"},"<.1")});
  const tr=$$(".v-proc .track i",st);if(tr.length)tl2.from(tr,{scaleX:0,transformOrigin:"left",duration:.6,stagger:.08,ease:"power3.out"},"<.2");
});
/* capability cards */
gsap.from(".cv-gantt i",{scaleX:0,transformOrigin:"left",duration:.9,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:".caps",start:"top 85%",once:true}});
gsap.from(".cv-chart .line",{strokeDasharray:400,strokeDashoffset:400,duration:1.6,ease:"power2.out",scrollTrigger:{trigger:".caps",start:"top 85%",once:true}});
/* career map: bars draw in on the timeline */
ScrollTrigger.create({trigger:"#gantt",start:"top 85%",once:true,onEnter:()=>{
  gsap.from("#gantt .g-bar",{scaleX:0,duration:1,stagger:.08,ease:"power3.out"});
  gsap.from("#gantt .g-ms,#gantt .g-span",{opacity:0,scale:0,duration:.5,stagger:.06,delay:.5,ease:"back.out(2)"});
}});
gsap.from(".pl",{y:40,opacity:0,duration:1,stagger:.12,ease:"power3.out",scrollTrigger:{trigger:".pillars",start:"top 85%",once:true}});

/* language bars */
gsap.from(".lr .bar i",{scaleX:0,duration:1.2,stagger:.08,ease:"power3.out",scrollTrigger:{trigger:".langs",start:"top 88%",once:true}});

/* gallery boards */
ScrollTrigger.batch(".dc",{start:"top 92%",once:true,onEnter:b=>gsap.from(b,{opacity:0,y:50,duration:1,stagger:.08,ease:"power3.out"})});

/* contact headline */
gsap.from(".c-h .w",{yPercent:60,opacity:0,duration:1.1,stagger:.12,ease:"expo.out",scrollTrigger:{trigger:".contact",start:"top 75%",once:true}});

addEventListener("load",()=>ScrollTrigger.refresh());
})();
