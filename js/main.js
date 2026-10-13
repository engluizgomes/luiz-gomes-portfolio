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
    case "globe":return `<div class="v-map"><span class="dots" aria-hidden="true"></span><svg viewBox="0 0 1000 450" aria-hidden="true">
      <path class="arc" d="M902.7 388.9 Q 760 150 525.5 109.3"/><path class="arc" d="M902.7 388.9 Q 900 250 837.4 157.1"/>
      <circle class="pulse" cx="902.7" cy="388.9" r="10"/><circle class="hub" cx="902.7" cy="388.9" r="6"/>
      <circle class="node" cx="525.5" cy="109.3" r="5"/><circle class="node" cx="837.4" cy="157.1" r="5"/>
      <text x="902.7" y="420" text-anchor="middle">Melbourne</text><text x="525.5" y="92" text-anchor="middle">${lang==="pt"?"Europa":"Europe"}</text><text x="837.4" y="140" text-anchor="middle">${lang==="pt"?"Ásia":"Asia"}</text></svg></div>`;
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

/* ---------- design gallery (story cards) ---------- */
const CAT={brand:"d.brand",social:"d.social",editorial:"d.editorial"};
const imgs=k=>Array.from({length:k.n},(_,i)=>`assets/work/${k.s}-0${i+1}.jpg`);
let filter="all";
const HERO={"armiel":2,"noiva-dosal":2,"paulino-diagnosticos":1,"pro-solucoes":0};
function cardVis(k){
  const im=imgs(k);const src=im[HERO[k.s]||0];
  return `<span class="dv-full"><img src="${src}" alt="" loading="lazy"></span>`;
}
function renderGallery(silent){
  const g=$("#dgrid");if(!g)return;
  const card=(k,i,dup)=>{const cp=(window.CASE_COPY||{})[k.s]||{};
    return `<button type="button" class="dc" data-i="${i}" style="--c:${k.bg}" ${dup?'aria-hidden="true" tabindex="-1"':`aria-label="${esc(t("d.view")+": "+k.c)}"`}>
      <span class="dc-txt"><span class="dc-client">${esc(k.c)}</span><span class="dc-title">${esc(L(cp.t)||k.c)}</span><span class="dc-sub">${esc(L(cp.s)||"")}</span><span class="dc-tags">${k.cat.map(c=>esc(t(CAT[c]))).join(" · ")}</span></span>
      ${cardVis(k)}
    </button>`};
  const list=CASES.map((k,i)=>[k,i]).filter(([k])=>filter==="all"||k.cat.includes(filter));
  let items=list;while(items.length<6)items=items.concat(list);
  const html=items.map(([k,i])=>card(k,i,false)).join("");
  g.innerHTML=`<div class="dmq"><div class="dmq-track" style="--dur:${items.length*6}s">${html}${items.map(([k,i])=>card(k,i,true)).join("")}</div></div>`;
  if(!silent&&window.gsap&&!reduce)gsap.fromTo(g,{opacity:0},{opacity:1,duration:.6});
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
const fusionSet=()=>({t:"Fusion Clinic",s:"UX/UI · Figma",imgs:["assets/img/fusion-desktop-room.jpg","assets/img/fusion-desktop-gallery.jpg","assets/img/fusion-mobile-search.jpg","assets/img/fusion-mobile-room.jpg","assets/img/fusion-mobile-book.jpg","assets/img/fusion-email.jpg","assets/work/fusion-clinic-uxui-01.jpg","assets/work/fusion-clinic-social-01.jpg"]});
["#openFusion","#openFusion2","#openFusion3"].forEach(id=>{const b=$(id);if(b)b.addEventListener("click",()=>open(fusionSet(),0))});
$$("#fusionRail .sc").forEach(f=>f.addEventListener("click",()=>{const set=fusionSet();open(set,Math.max(0,set.imgs.indexOf(f.dataset.img)))}));

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


/* ---------- Fusion live prototype ---------- */
(function(){
  const P=$("#proto");if(!P)return;
  const views=$("#views",P),tap=$("#tap",P),slots=$$("#slots button",P);
  let step=0,timer=null,paused=0,typing=null,visible=false;
  const fmt=n=>"R$ "+n.toFixed(2).replace(".",",");
  function totals(){const n=slots.filter(b=>b.classList.contains("sel")).length;
    $("#hrs",P).textContent=n+(n===1?" hora":" horas");$("#tot",P).textContent=fmt(n*30);$("#tot2",P).textContent=fmt(Math.max(n,1)*30)}
  function type(){clearInterval(typing);const txt="Natal, Lagoa Nova";$$("[data-typed]",P).forEach(el=>el.textContent="");let i=0;
    if(reduce){$$("[data-typed]",P).forEach(el=>el.textContent=txt);return}
    typing=setInterval(()=>{i++;$$("[data-typed]",P).forEach(el=>el.textContent=txt.slice(0,i));if(i>=txt.length)clearInterval(typing)},70)}
  function setStep(n){step=(n+4)%4;views.style.transform=`translateX(-${step*25}%)`;
    $$(".fl",P).forEach(f=>f.classList.toggle("on",+f.dataset.step===step));
    $$(".steps button",P).forEach(b=>b.setAttribute("aria-selected",+b.dataset.step===step));
    if(step===0)type();
    if(step===2){slots.forEach(b=>b.classList.remove("sel"));totals()}}
  function tapAt(el){if(!el)return;const r=el.getBoundingClientRect(),s=$(".dev-scr",P).getBoundingClientRect();
    tap.style.left=(r.left-s.left+r.width/2)+"px";tap.style.top=(r.top-s.top+r.height/2)+"px";
    tap.classList.remove("on");void tap.offsetWidth;tap.classList.add("on");el.classList.add("press");setTimeout(()=>el.classList.remove("press"),180)}
  const goBtn=()=>$(`.v${step} [data-go]`,P);
  async function auto(){
    if(!visible||reduce||Date.now()<paused)return;
    if(step===2){for(const i of [2,3,4,5]){if(step!==2||Date.now()<paused)return;tapAt(slots[i]);slots[i].classList.add("sel");totals();await new Promise(r=>setTimeout(r,520))}}
    if(Date.now()<paused)return;
    const b=goBtn();tapAt(b);setTimeout(()=>{if(Date.now()>=paused)setStep(+b.dataset.go)},380);
  }
  function loop(){clearInterval(timer);timer=setInterval(auto,step===2?4200:3400)}
  P.addEventListener("click",e=>{
    const go=e.target.closest("[data-go]"),sl=e.target.closest("#slots button"),st=e.target.closest(".steps button"),dy=e.target.closest(".days button");
    if(go||sl||st||dy)paused=Date.now()+9000;
    if(go){tapAt(go);setTimeout(()=>setStep(+go.dataset.go),200)}
    if(sl){sl.classList.toggle("sel");totals()}
    if(dy){$$(".days button",P).forEach(x=>x.classList.toggle("on",x===dy))}
    if(st)setStep(+st.dataset.step);
  });
  new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible){setStep(step);loop()}else clearInterval(timer)},{threshold:.35}).observe(P);
  setStep(0);
  if(!reduce&&window.matchMedia("(pointer:fine)").matches){
    const stage=$(".proto-stage",P);
    stage.addEventListener("mousemove",e=>{const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      $$(".fl",P).forEach((f,i)=>{const d=(i%3+1)*10;f.style.marginLeft=(x*d)+"px";f.style.marginTop=(y*d)+"px"});
      $("#dev",P).style.transform=`perspective(1200px) rotateY(${x*8}deg) rotateX(${-y*6}deg)`});
    stage.addEventListener("mouseleave",()=>{$("#dev",P).style.transform="";$$(".fl",P).forEach(f=>{f.style.marginLeft="";f.style.marginTop=""})});
  }
})();

/* ---------- tech zone: cursor spotlight on glass ---------- */
(function(){
  const z=$("#tech");if(!z||reduce||!matchMedia("(pointer:fine)").matches)return;
  const sel=".tile,.cap,.pl,.vid,.mini,.gdetail,.gantt-wrap";
  z.querySelectorAll(sel).forEach(el=>el.classList.add("spot"));
  z.addEventListener("pointermove",e=>{const c=e.target.closest(".spot");if(!c)return;const r=c.getBoundingClientRect();
    c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")});
})();

/* ---------- TME video: plays in view, editing playhead follows the clip ---------- */
(function(){
  const v=$("#tmeVid");if(!v)return;
  const head=$("#tmeHead"),tc=$("#tmeTc"),snd=$("#tmeSnd");
  const fmt=t=>{const f=Math.floor((t%1)*25),s=Math.floor(t)%60,m=Math.floor(t/60);return `00:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(f).padStart(2,"0")}`};
  v.addEventListener("timeupdate",()=>{if(!v.duration)return;head.style.left=(v.currentTime/v.duration*100)+"%";tc.textContent=fmt(v.currentTime)});
  head.style.animation="none";
  new IntersectionObserver(es=>{if(es[0].isIntersecting){if(!reduce)v.play().catch(()=>{})}else v.pause()},{threshold:.4}).observe(v);
  snd.addEventListener("click",()=>{v.muted=!v.muted;snd.setAttribute("aria-pressed",String(!v.muted));snd.setAttribute("aria-label",t(v.muted?"snd.on":"snd.off"));if(v.paused)v.play().catch(()=>{})});
})();

/* ---------- live case: highlight current chapter ---------- */
(function(){
  const links=$$(".chapters a");if(!links.length)return;
  const map=new Map(links.map(a=>[a.getAttribute("href").slice(1),a]));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.remove("on"));const a=map.get(e.target.id);if(a)a.classList.add("on")}}),{rootMargin:"-45% 0px -50% 0px"});
  [...map.keys()].forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el)});
})();

/* ---------- floating "Let's talk" widget ---------- */
(function(){
  const t=$("#talk"),hero=$(".hero2"),ct=$("#contact");if(!t)return;
  let past=false,atEnd=false;setTimeout(()=>t.classList.add("in"),reduce?0:1600);
  const upd=()=>{t.classList.toggle("is-mini",past);t.classList.toggle("hide",atEnd)};
  if(hero)new IntersectionObserver(es=>{past=!es[0].isIntersecting||es[0].intersectionRatio<.55;upd()},{threshold:[0,.55,1]}).observe(hero);
  if(ct)new IntersectionObserver(es=>{atEnd=es[0].isIntersecting;upd()},{threshold:.2}).observe(ct);
})();

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
  .from(".h2-ghost",{opacity:0,y:40,duration:1.6,ease:"power3.out"},"<")
  .from(".h2-photo img",{y:140,opacity:0,scale:1.04,duration:1.6,ease:"power4.out"},"<.1")
  .from(".h2-h .ln > span",{yPercent:110,duration:1.2,stagger:.12},"-=1.1")
  .from(".h2-year,.h2-tag",{y:16,opacity:0,duration:.9,stagger:.08},"-=.9")
  .from(".h2-build",{x:40,opacity:0,duration:1.1},"-=.8")
  .from(".h2-build .sel,.h2-build .ruler,.h2-build .guide",{opacity:0,duration:.6,stagger:.08},"-=.6")
  .from(".h2-grid i,.h2-grid b",{opacity:0,duration:1.2,stagger:.03},"-=1.2");

/* hero parallax */
gsap.to(".h2-photo img",{yPercent:6,ease:"none",scrollTrigger:{trigger:".hero2",start:"top top",end:"bottom top",scrub:true}});
gsap.to(".h2-ghost",{xPercent:-8,ease:"none",scrollTrigger:{trigger:".hero2",start:"top top",end:"bottom top",scrub:true}});
gsap.to(".h2-build",{y:-60,ease:"none",scrollTrigger:{trigger:".hero2",start:"top top",end:"bottom top",scrub:true}});
/* building the card: cursor drags it into place, guides snap */
const btl=gsap.timeline({repeat:-1,repeatDelay:2.2,defaults:{ease:"power2.inOut"}});
btl.set(".h2-card",{rotation:0,x:0,y:0}).set(".h2-cursor",{x:-140,y:260,opacity:0})
   .to(".h2-cursor",{opacity:1,duration:.3})
   .to(".h2-cursor",{x:8,y:150,duration:1})
   .to(".h2-card",{x:-22,y:14,duration:.5,ease:"power1.out"},"+=.1")
   .to(".h2-cursor",{x:-14,y:164,duration:.5,ease:"power1.out"},"<")
   .to(".h2-build .guide",{opacity:1,duration:.15},"-=.2")
   .to(".h2-card",{x:0,y:0,duration:.5,ease:"back.out(2)"})
   .to(".h2-cursor",{x:8,y:150,duration:.5,ease:"back.out(2)"},"<")
   .to(".h2-build .guide",{opacity:0,duration:.4},"+=.3")
   .to(".h2-cursor",{x:240,y:330,opacity:0,duration:1});

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

/* highlights HUD */
gsap.from(".hud .hc",{y:24,opacity:0,duration:.8,stagger:.06,ease:"power3.out",scrollTrigger:{trigger:".hud",start:"top 88%",once:true}});
gsap.from(".hud .hb i",{scaleY:0,transformOrigin:"bottom",duration:.8,stagger:.03,delay:.3,ease:"power3.out",scrollTrigger:{trigger:".hud",start:"top 88%",once:true}});
gsap.from(".hud .hg i",{scale:0,opacity:0,duration:.35,stagger:.02,delay:.3,ease:"back.out(2)",scrollTrigger:{trigger:".hud",start:"top 88%",once:true}});
/* process phases */
gsap.from(".phase",{y:60,opacity:0,duration:.9,stagger:.09,ease:"power3.out",scrollTrigger:{trigger:".phases",start:"top 85%",once:true}});
/* language bars */
gsap.from(".lr .bar i",{scaleX:0,duration:1.2,stagger:.08,ease:"power3.out",scrollTrigger:{trigger:".langs",start:"top 88%",once:true}});

/* gallery boards */


/* contact headline */
gsap.from(".c-h .w",{yPercent:60,opacity:0,duration:1.1,stagger:.12,ease:"expo.out",scrollTrigger:{trigger:".contact",start:"top 75%",once:true}});

addEventListener("load",()=>ScrollTrigger.refresh());
})();
