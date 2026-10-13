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
}
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

/* mini stages */
gsap.from(".dchart i",{scaleY:0,duration:1,stagger:.06,ease:"power3.out",scrollTrigger:{trigger:".dash",start:"top 85%",once:true}});
gsap.from(".flowchart > *",{opacity:0,x:-14,duration:.5,stagger:.08,ease:"power2.out",scrollTrigger:{trigger:".auto",start:"top 85%",once:true}});

/* language bars */
gsap.from(".lr .bar i",{scaleX:0,duration:1.2,stagger:.08,ease:"power3.out",scrollTrigger:{trigger:".langs",start:"top 88%",once:true}});

/* gallery boards */
ScrollTrigger.batch(".dc",{start:"top 92%",once:true,onEnter:b=>gsap.from(b,{opacity:0,y:50,duration:1,stagger:.08,ease:"power3.out"})});

/* contact headline */
gsap.from(".c-h .w",{yPercent:60,opacity:0,duration:1.1,stagger:.12,ease:"expo.out",scrollTrigger:{trigger:".contact",start:"top 75%",once:true}});

addEventListener("load",()=>ScrollTrigger.refresh());
})();
