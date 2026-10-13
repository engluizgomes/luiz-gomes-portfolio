/* Fusion Clinic — attention / clicks / scroll-depth heatmap over the room page.
   Coordinates are the Figma desktop frame (1440 wide), cropped to the first 1600px.
   All numbers are illustrative and labelled as such on the page. */
(function(){
const view=document.getElementById("hmView");if(!view)return;
const cv=document.getElementById("hmCanvas"),ctx=cv.getContext("2d");
const line=document.getElementById("hmLine"),tip=document.getElementById("hmTip"),knob=document.getElementById("hmKnob");
const badge=document.getElementById("hmBadge"),pct=document.getElementById("hmPct"),what=document.getElementById("hmWhat"),t1=document.getElementById("hmT1");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const W=1440,H=1600,SC=.2,CW=W*SC,CH=H*SC;cv.width=CW;cv.height=CH;
const lang=()=>document.documentElement.dataset.lang==="pt"?"pt":"en";
const T=k=>(window.I18N[lang()]||{})[k]||window.I18N.en[k]||k;

const ZONES=[
 {en:"the search bar",pt:"a barra de busca",x:0,y:0,w:1440,h:90,a:6,t:3.1},
 {en:"the room title",pt:"o título da sala",x:181,y:150,w:480,h:120,a:12,t:6.8},
 {en:"the photo gallery",pt:"a galeria de fotos",x:181,y:300,w:1078,h:420,a:34,t:21.4},
 {en:"the description",pt:"a descrição",x:181,y:780,w:770,h:260,a:7,t:4.0},
 {en:"the price card",pt:"o cartão de preço",x:975,y:800,w:300,h:290,a:22,t:12.9},
 {en:"the amenities",pt:"as comodidades",x:170,y:1060,w:420,h:340,a:10,t:5.6},
 {en:"the calendar",pt:"a agenda",x:140,y:1420,w:1140,h:180,a:9,t:5.2}];
const BLOBS=[[447,514,230,170,1],[855,415,120,90,.62],[1128,515,120,120,.55],[1122,900,130,120,.95],[1121,1043,120,34,.92],[300,205,150,45,.6],[700,40,520,40,.25],[520,880,300,90,.26],[300,1200,160,150,.42],[580,1530,320,60,.36]];
const CLICKS=[{en:"Reservar",pt:"Reservar",x:1121,y:1043,a:31},{en:"the main photo",pt:"a foto principal",x:447,y:514,a:24},{en:"“+7 photos”",pt:"“+7 fotos”",x:1230,y:690,a:11},{en:"the calendar",pt:"a agenda",x:580,y:1530,a:10},{en:"search",pt:"a busca",x:987,y:40,a:9},{en:"the date picker",pt:"o seletor de data",x:885,y:40,a:8},{en:"“Mostrar mais”",pt:"“Mostrar mais”",x:300,y:1358,a:7}];
const reach=y=>Math.round(100-(y/H)*62);

function jet(t){t=Math.max(0,Math.min(1,t));const r=Math.max(0,Math.min(1,1.5-Math.abs(4*t-3))),g=Math.max(0,Math.min(1,1.5-Math.abs(4*t-2))),b=Math.max(0,Math.min(1,1.5-Math.abs(4*t-1)));return [r*255,g*255,b*255]}
let field=null;
function attentionField(){const f=new Float32Array(CW*CH);let mx=0;
  for(let j=0;j<CH;j++)for(let i=0;i<CW;i++){const x=i/SC,y=j/SC;let v=0;for(const [cx,cy,sx,sy,w] of BLOBS){const dx=(x-cx)/sx,dy=(y-cy)/sy;v+=w*Math.exp(-(dx*dx+dy*dy)/2)}f[j*CW+i]=v;if(v>mx)mx=v}
  for(let k=0;k<f.length;k++)f[k]/=mx;return f}
function clickField(){const f=new Float32Array(CW*CH);let mx=0;
  for(let j=0;j<CH;j++)for(let i=0;i<CW;i++){const x=i/SC,y=j/SC;let v=0;for(const c of CLICKS){const dx=(x-c.x)/36,dy=(y-c.y)/30;v+=(c.a/31)*Math.exp(-(dx*dx+dy*dy)/2)}f[j*CW+i]=v;if(v>mx)mx=v}
  for(let k=0;k<f.length;k++)f[k]/=mx;return f}
const FIELDS={};
let mode="attention";
function draw(){
  const img=ctx.createImageData(CW,CH),d=img.data;
  if(mode==="scroll"){for(let j=0;j<CH;j++){const t=reach(j/SC)/100,c=jet((t-.38)/.62);for(let i=0;i<CW;i++){const k=(j*CW+i)*4;d[k]=c[0];d[k+1]=c[1];d[k+2]=c[2];d[k+3]=120}}}
  else{const f=FIELDS[mode]||(FIELDS[mode]=mode==="clicks"?clickField():attentionField());field=f;
    for(let k=0;k<f.length;k++){const t=f[k],c=jet(mode==="clicks"?.25+t*.75:t);const p=k*4;d[p]=c[0];d[p+1]=c[1];d[p+2]=c[2];d[p+3]=mode==="clicks"?Math.min(220,t*420):Math.min(170,40+t*170)}}
  ctx.putImageData(img,0,0);
}
function intensityAt(x,y){if(mode==="scroll")return reach(y)/100;const f=FIELDS[mode];if(!f)return 0;const i=Math.min(CW-1,Math.max(0,Math.round(x*SC))),j=Math.min(CH-1,Math.max(0,Math.round(y*SC)));return f[j*CW+i]}
function zoneAt(x,y){let best=null,bd=1e9;for(const z of ZONES){const cx=Math.max(z.x,Math.min(x,z.x+z.w)),cy=Math.max(z.y,Math.min(y,z.y+z.h));const dd=(cx-x)**2+(cy-y)**2;if(dd<bd){bd=dd;best=z}}return best}
function clickAt(x,y){let best=null,bd=1e9;for(const c of CLICKS){const dd=(c.x-x)**2+(c.y-y)**2;if(dd<bd){bd=dd;best=c}}return best}
function update(x,y,px,py){
  const r=view.getBoundingClientRect(),s=r.width/W;
  line.style.transform=`translateY(${y*s}px)`;knob.style.top=`${(y/H)*100}%`;
  const it=intensityAt(x,y);
  badge.textContent=T(it>.6?"hm.hi":it>.3?"hm.mid":"hm.lo");badge.dataset.lv=it>.6?"hi":it>.3?"mid":"lo";
  if(mode==="attention"){const z=zoneAt(x,y);pct.textContent=z.a+"%";what.textContent=`${T("hm.of")} ${z[lang()]}.`;t1.textContent=z.t.toFixed(1)+"s";tip.classList.remove("no-t")}
  else if(mode==="clicks"){const c=clickAt(x,y);pct.textContent=c.a+"%";what.textContent=`${T("hm.clk")} ${c[lang()]}.`;tip.classList.add("no-t")}
  else{pct.textContent=reach(y)+"%";what.textContent=T("hm.scr")+".";tip.classList.add("no-t")}
  if(matchMedia('(max-width:900px)').matches)return;const tw=tip.offsetWidth,th=tip.offsetHeight;let tx=px+24,ty=py-th/2;if(tx+tw>r.width-8)tx=px-tw-24;ty=Math.max(8,Math.min(r.height-th-8,ty));tip.style.transform=`translate(${tx}px,${ty}px)`;
}
/* auto tour through zones */
const TOUR=[[447,514],[1122,920],[300,205],[300,1220],[520,880],[580,1530]];let ti=0,auto=true,timer=null;
function step(){if(!auto)return;const r=view.getBoundingClientRect(),s=r.width/W;let [x,y]=mode==="clicks"?[CLICKS[ti%CLICKS.length].x,CLICKS[ti%CLICKS.length].y]:TOUR[ti%TOUR.length];ti++;update(x,y,x*s,y*s)}
function start(){clearInterval(timer);if(reduce){step();return}step();timer=setInterval(step,2600)}
view.addEventListener("pointermove",e=>{auto=false;view.classList.add("live");const r=view.getBoundingClientRect(),s=r.width/W;const px=e.clientX-r.left,py=e.clientY-r.top;update(px/s,py/s,px,py)});
view.addEventListener("pointerleave",()=>{auto=true;view.classList.remove("live");start()});
document.querySelectorAll(".hm-tabs button").forEach(b=>b.addEventListener("click",()=>{mode=b.dataset.mode;document.querySelectorAll(".hm-tabs button").forEach(x=>x.setAttribute("aria-selected",x===b));draw();ti=0;auto=true;start()}));
document.querySelectorAll("[data-set-lang]").forEach(b=>b.addEventListener("click",()=>setTimeout(step,50)));
let seen=false;new IntersectionObserver(es=>{if(es[0].isIntersecting){if(!seen){seen=true;draw()}start()}else clearInterval(timer)},{threshold:.25}).observe(view);
})();
