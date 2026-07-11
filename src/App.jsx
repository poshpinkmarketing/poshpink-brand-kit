
import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";

const C={pink:"#ff1493",rose:"#c2185b",blush:"#fff5f8",soft:"#f8d6e4",plum:"#4b1528",ink:"#21181d",mid:"#5d4a53",muted:"#806d76",line:"#eadde4",white:"#fff"};
const LINKS={
  memberships:"https://www.poshpinkmarketing.com/pricing-plans/memberships",
  store:"https://www.poshpinkmarketing.com/category/all-products",
  contact:"https://www.poshpinkmarketing.com/contact",
  services:"https://www.poshpinkmarketing.com/myservices"
};
const MEMBERSHIPS={
  Blush:{name:"The Blush Membership",price:"$595/month + $200 startup",summary:"Up to 10 hours of marketing support, personalized advice, social media management, a quick marketing audit, content creation, and a marketing kit."},
  Tulip:{name:"The Tulip Membership",price:"$895/month + $300 startup",summary:"Everything in Blush, plus website updates, Google Business Profile management, marketing planning, a business organization audit, strategy setup, and management of up to four social profiles."},
  Diamond:{name:"The Diamond Membership",price:"$1,395/month + $400 startup",summary:"Everything in Blush and Tulip, plus full marketing and business strategy support, Google Business support, priority support, and management of up to six social profiles."}
};
const CANVA_FONTS=["Playfair Display","Cormorant Garamond","Libre Baskerville","Merriweather","Cinzel","Montserrat","Poppins","Raleway","Lato","Open Sans","DM Sans","League Spartan","Bebas Neue","Nunito","Quicksand"];

const Q=[
{id:"businessName",s:"Your Business",t:"text",q:"What is your business name?",h:"This will appear throughout your Brand & Logo Blueprint.",p:"Enter your business name…",r:1},
{id:"tagline",s:"Your Business",t:"text",q:"Do you already have a tagline?",h:"Optional. Leave this blank and I’ll create ideas for you.",p:"Enter your tagline, or leave blank…"},
{id:"industry",s:"Your Business",t:"single",q:"Which industry best describes your business?",h:"Choose the closest fit.",o:["Beauty & Wellness","Health & Medical","Real Estate","Professional Services","Boutique Retail","Events & Hospitality","Pet Services","Creative & Design","Coaching & Education","Restaurant & Food","Fitness & Sports","Tech & Digital","Home Services","Other"],r:1},
{id:"offer",s:"Your Business",t:"area",q:"What do you sell or provide?",h:"A short description is perfect.",p:"Describe your main products or services…",r:1},
{id:"stage",s:"Your Business",t:"single",q:"Where are you in your business journey?",h:"This helps personalize your next steps.",o:["Planning or pre-launch","Newly launched","Established but inconsistent","Growing and ready to scale","Rebranding an existing business"],r:1},
{id:"audience",s:"Your Audience",t:"multi",q:"Who are you trying to reach?",h:"Select all that apply.",o:["Busy professionals","Small business owners","Families or homeowners","Women-focused audience","Health-conscious customers","Luxury buyers","Budget-conscious customers","Local customers","Online or national audience","Creatives and entrepreneurs"],r:1},
{id:"customerFeeling",s:"Your Audience",t:"single",q:"How should customers feel when they experience your brand?",h:"Choose the feeling that matters most.",o:["Confident and reassured","Inspired and excited","Calm and cared for","Welcomed and understood","Impressed and elevated","Energized and motivated","Curious and creative"],r:1},
{id:"vibe",s:"Brand Personality",t:"multi",q:"Which words feel most like your ideal brand?",h:"Select all that resonate.",o:["Luxurious & refined","Warm & approachable","Bold & modern","Playful & vibrant","Clean & minimal","Natural & organic","Elegant & feminine","Professional & credible","Creative & expressive","Classic & timeless"],r:1},
{id:"values",s:"Brand Personality",t:"multi",q:"Which values should your brand communicate?",h:"Choose the values you want customers to notice.",o:["Trust","Quality","Creativity","Care","Innovation","Simplicity","Expertise","Community","Luxury","Reliability"],r:1},
{id:"colors",s:"Visual Direction",t:"multi",q:"Which color families appeal to you?",h:"Select your favorites.",o:["Soft pinks & blush","Deep burgundy & wine","Black & white","Gold & champagne","Navy & midnight blue","Sage & olive green","Terracotta & rust","Lavender & purple","Teal & turquoise","Warm neutrals"],r:1},
{id:"avoidColors",s:"Visual Direction",t:"text",q:"Are there any colors you want to avoid?",h:"Optional.",p:"Example: neon colors, bright orange…"},
{id:"fontMood",s:"Visual Direction",t:"multi",q:"Which typography styles appeal to you?",h:"Select all that fit.",o:["Elegant serif","Clean sans serif","Bold statement font","Friendly rounded font","Classic editorial","Modern minimal","Handwritten accent","No preference"],r:1},
{id:"logoStyles",s:"Logo Direction",t:"multi",q:"Which logo styles appeal to you?",h:"Select all that resonate.",o:["Wordmark","Monogram","Badge or emblem","Icon plus business name","Minimal symbol","Geometric","Handwritten or organic","Classic and timeless"],r:1},
{id:"symbols",s:"Logo Direction",t:"text",q:"Are there symbols or images you would like explored?",h:"Optional. You can also say “none” or “surprise me.”",p:"Example: flower, house, star, leaf, initials…"},
{id:"avoid",s:"Logo Direction",t:"multi",q:"What should the logo avoid?",h:"Select all that apply.",o:["Too many colors","Clip art or generic icons","Script or cursive fonts","All-caps text","Dark or moody tones","Overly complex designs","Anything too trendy","Nothing — surprise me"],r:1},
{id:"marketingNeeds",s:"Marketing Readiness",t:"multi",q:"Where would more support help most?",h:"Select all that apply.",o:["Brand clarity","Logo and visual identity","Social media management","Content creation","Website updates","Google Business Profile","Marketing planning","Business strategy","Ongoing full marketing support"],r:1},
{id:"budget",s:"Marketing Readiness",t:"single",q:"What level of monthly marketing support are you considering?",h:"This helps match you with the best next step.",o:["DIY resources only","Under $600 per month","$600–$900 per month","$900–$1,400 per month","$1,400+ per month","I’m not sure yet"],r:1}
];

function styles(){
 if(document.getElementById("ppbl"))return;
 const x=document.createElement("style");x.id="ppbl";x.textContent=`
 @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;600;700&family=Lato:wght@400;700&family=Montserrat:wght@500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&family=Poppins:wght@500;600&family=Raleway:wght@500;600&display=swap');
 *{box-sizing:border-box}body{margin:0;background:#fff}.app{min-height:100vh;background:#fff;color:${C.ink};font-family:'DM Sans',sans-serif}.shell{max-width:760px;margin:auto;padding:42px 24px 96px}.logo{display:block;width:auto;height:64px;max-width:300px;object-fit:contain}.k{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${C.rose};font-weight:700}.title{font-family:'Cormorant Garamond',serif;font-size:58px;line-height:.98;color:${C.plum};margin:14px 0 18px}.copy{font-size:15px;line-height:1.85;color:${C.mid};max-width:650px}.btn{border:0;border-radius:8px;background:${C.plum};color:#fff;padding:15px 26px;font-weight:700;cursor:pointer;box-shadow:0 6px 18px rgba(75,21,40,.12)}.btn:hover{background:${C.rose}}.btn:disabled{opacity:.35;cursor:not-allowed}.btn.alt{background:#fff;color:${C.rose};border:1px solid ${C.soft};box-shadow:none}.btn.sm{padding:10px 14px;font-size:12px}.prog{height:5px;background:${C.blush};border-radius:20px;overflow:hidden}.prog div{height:100%;background:linear-gradient(90deg,${C.rose},${C.pink});transition:.3s}.opt{-webkit-appearance:none;appearance:none;width:100%;display:flex;align-items:center;gap:13px;text-align:left;border:1.5px solid ${C.line};background:#fff;border-radius:10px;padding:15px 16px;margin:10px 0;cursor:pointer;color:${C.mid};font-size:15px;line-height:1.35;font-family:'DM Sans',sans-serif}.opt:hover,.opt.on{border-color:${C.pink};background:${C.blush}}.box{width:20px;height:20px;border:1.5px solid #cbb9c2;border-radius:5px;display:flex;align-items:center;justify-content:center;flex:0 0 auto}.box.radio{border-radius:50%}.opt.on .box{background:${C.pink};border-color:${C.pink};color:#fff}.input,.area{display:block;width:100%;min-height:58px;border:1.5px solid ${C.line};border-radius:10px;padding:16px 18px;color:${C.ink};background:#fff;outline:none;font-size:19px;line-height:1.4}.input:focus,.area:focus{border-color:${C.pink};box-shadow:0 0 0 3px rgba(255,20,147,.08)}.area{min-height:120px;resize:vertical}.foot{position:fixed;left:0;right:0;bottom:0;background:${C.soft};border-top:1px solid #efc9d9;padding:11px 18px;z-index:30}.footin{max-width:960px;margin:auto;display:flex;justify-content:center;gap:9px;flex-wrap:wrap;font-size:11px;color:${C.plum}}.sec{padding:30px 0;border-bottom:1px solid ${C.line}}.label{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:${C.rose};font-weight:700;margin-bottom:12px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.card{border:1px solid ${C.line};border-radius:14px;background:#fff;padding:22px}.swatches{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}.swatch{height:85px;border-radius:10px;border:1px solid ${C.line};display:flex;align-items:flex-end;padding:8px}.logos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.logoCard{border:1px solid ${C.line};border-radius:12px;padding:18px}.preview{min-height:190px;display:flex;align-items:center;justify-content:center;overflow:auto}.chip{display:inline-flex;border:1px solid ${C.soft};background:${C.blush};color:${C.rose};border-radius:999px;padding:7px 11px;margin:4px;font-size:11px;font-weight:600}.prompt{white-space:pre-wrap;background:${C.blush};border:1px solid ${C.soft};padding:15px;border-radius:10px;font-size:12px;line-height:1.7;color:${C.mid}}@keyframes spin{to{transform:rotate(360deg)}}.spin{width:44px;height:44px;border-radius:50%;border:3px solid ${C.soft};border-top-color:${C.pink};animation:spin 1s linear infinite}@media(max-width:640px){.title{font-size:46px}.grid,.logos{grid-template-columns:1fr}.swatches{grid-template-columns:repeat(2,1fr)}.logo{height:54px;max-width:250px}}
 `;document.head.appendChild(x)
}
const Logo=()=> <img className="logo" src="/logo.png" alt="Posh Pink Marketing"/>;
const Footer=()=> <div className="foot"><div className="footin"><b>The Posh Pink Brand</b><span>•</span><span>hello@poshpinkmarketing.com</span><span>•</span><span>www.poshpinkmarketing.com</span></div></div>;
const esc=(s="")=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;");
const safe=(s="blueprint")=>s.trim().replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,"").toLowerCase();
const rgb=h=>{h=/^#[0-9a-f]{6}$/i.test(h||"")?h:"#4b1528";return[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]};

function svg(logo,biz,tagline){
 const name=esc(biz||"Your Brand"),tag=esc(tagline||""),init=esc((biz||"YB").split(/\s+/).filter(Boolean).map(w=>w[0]).join("").slice(0,2).toUpperCase());
 const p=logo.primaryColor||C.rose,s=logo.secondaryColor||C.plum,a=logo.accentColor||C.soft,id=Math.random().toString(36).slice(2,8);
 const t={
 badge:`<svg xmlns="http://www.w3.org/2000/svg" width="420" height="420" viewBox="0 0 420 420"><defs><linearGradient id="g${id}"><stop stop-color="${p}"/><stop offset="1" stop-color="${s}"/></linearGradient></defs><circle cx="210" cy="210" r="168" fill="${a}" opacity=".28"/><circle cx="210" cy="210" r="166" fill="none" stroke="url(#g${id})" stroke-width="4"/><circle cx="210" cy="210" r="145" fill="none" stroke="${p}" stroke-width="1.5" stroke-dasharray="7 7"/><text x="210" y="196" text-anchor="middle" font-family="Georgia,serif" font-size="72" font-weight="bold" fill="${s}">${init}</text><line x1="105" y1="225" x2="315" y2="225" stroke="${p}" stroke-width="2"/><text x="210" y="258" text-anchor="middle" font-family="Arial" font-size="17" font-weight="bold" letter-spacing="4" fill="${s}">${name.toUpperCase()}</text>${tag?`<text x="210" y="286" text-anchor="middle" font-family="Arial" font-size="12" fill="${p}">${tag}</text>`:""}</svg>`,
 geometric:`<svg xmlns="http://www.w3.org/2000/svg" width="520" height="260" viewBox="0 0 520 260"><polygon points="90,35 175,130 90,225 5,130" fill="${a}" opacity=".3"/><polygon points="90,42 167,130 90,218 13,130" fill="none" stroke="${p}" stroke-width="4"/><text x="90" y="145" text-anchor="middle" font-family="Arial" font-size="34" font-weight="bold" fill="${s}">${init}</text><line x1="200" y1="70" x2="200" y2="190" stroke="${p}" stroke-width="3"/><text x="225" y="124" font-family="Arial" font-size="28" font-weight="bold" letter-spacing="3" fill="${s}">${name.toUpperCase()}</text>${tag?`<text x="225" y="157" font-family="Arial" font-size="13" fill="${p}">${tag.toUpperCase()}</text>`:""}</svg>`,
 minimal:`<svg xmlns="http://www.w3.org/2000/svg" width="520" height="240" viewBox="0 0 520 240"><circle cx="260" cy="42" r="6" fill="${p}"/><line x1="260" y1="52" x2="260" y2="76" stroke="${p}" stroke-width="2"/><text x="260" y="126" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="38" fill="${s}">${name}</text><line x1="80" y1="145" x2="440" y2="145" stroke="${p}" stroke-width="2"/>${tag?`<text x="260" y="177" text-anchor="middle" font-family="Arial" font-size="13" fill="${p}">${tag.toUpperCase()}</text>`:""}</svg>`,
 script:`<svg xmlns="http://www.w3.org/2000/svg" width="520" height="280" viewBox="0 0 520 280"><path d="M45 145 C120 35,195 35,260 140 C325 245,400 245,475 135" fill="none" stroke="${a}" stroke-width="18" opacity=".45"/><text x="260" y="145" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="46" fill="${s}">${name}</text><line x1="115" y1="165" x2="405" y2="165" stroke="${p}" stroke-width="2"/>${tag?`<text x="260" y="198" text-anchor="middle" font-family="Arial" font-size="13" fill="${p}">${tag.toUpperCase()}</text>`:""}</svg>`,
 monogram:`<svg xmlns="http://www.w3.org/2000/svg" width="420" height="420" viewBox="0 0 420 420"><circle cx="210" cy="175" r="122" fill="${a}" opacity=".3"/><circle cx="210" cy="175" r="122" fill="none" stroke="${p}" stroke-width="4"/><text x="210" y="215" text-anchor="middle" font-family="Georgia,serif" font-size="118" font-weight="bold" fill="${s}">${init}</text><line x1="100" y1="330" x2="320" y2="330" stroke="${p}" stroke-width="2"/><text x="210" y="365" text-anchor="middle" font-family="Arial" font-size="17" font-weight="bold" letter-spacing="4" fill="${s}">${name.toUpperCase()}</text></svg>`
 };return t[logo.svgStyle]||t.minimal
}
function dlSvg(x,biz,i){const b=new Blob([x],{type:"image/svg+xml"}),u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download=`${safe(biz)}-logo-${String.fromCharCode(65+i)}.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(u),400)}
const imgData=src=>new Promise(r=>{const i=new Image();i.crossOrigin="anonymous";i.onload=()=>{const c=document.createElement("canvas");c.width=i.naturalWidth;c.height=i.naturalHeight;c.getContext("2d").drawImage(i,0,0);r(c.toDataURL("image/png"))};i.onerror=()=>r(null);i.src=src});

async function pdf(d,a){
 const doc=new jsPDF({unit:"mm",format:"a4"}),W=210,H=297,M=18,lg=await imgData("/logo.png");let pg=0;
 const footer=()=>{
  doc.setFillColor(...rgb(C.soft));
  doc.rect(0,H-18,W,18,"F");
  if(lg)try{doc.addImage(lg,"PNG",12,H-15.5,26,10.5)}catch{}
  doc.setFont("helvetica","bold");
  doc.setFontSize(7.2);
  doc.setTextColor(...rgb(C.plum));
  doc.text("hello@poshpinkmarketing.com",48,H-10.5);
  doc.text("www.poshpinkmarketing.com",48,H-5.5);
  doc.setFont("helvetica","normal");
  doc.text("The Posh Pink Brand & Logo Blueprint",W-12,H-7.5,{align:"right"});
 };
 const watermark=()=>{
  if(!lg)return;
  try{
   doc.setGState(doc.GState({opacity:.035}));
   doc.addImage(lg,"PNG",W/2-42,H/2-18,84,36);
   doc.setGState(doc.GState({opacity:1}));
  }catch{}
 };
 const page=(title,sub="")=>{
  if(pg)doc.addPage();
  pg++;
  doc.setFillColor(255,255,255);
  doc.rect(0,0,W,H,"F");
  watermark();
  doc.setFillColor(...rgb(C.rose));
  doc.rect(0,0,W,6,"F");
  doc.setFont("helvetica","bold");
  doc.setTextColor(...rgb(C.plum));
  doc.setFontSize(20);
  doc.text(title,M,25);
  if(sub){
   doc.setFont("helvetica","normal");
   doc.setFontSize(8.5);
   doc.setTextColor(...rgb(C.muted));
   doc.text(sub,M,32);
  }
  doc.setDrawColor(...rgb(C.soft));
  doc.setLineWidth(.7);
  doc.line(M,38,W-M,38);
  footer();
  return 48;
 };
 const head=(t,y)=>{
  const label=String(t||"").toUpperCase();
  doc.setFont("helvetica","bold");
  doc.setFontSize(10);
  doc.setTextColor(...rgb(C.rose));
  doc.text(label,M,y);
  const lineStart=Math.min(W-M-6,M+doc.getTextWidth(label)+7);
  doc.setDrawColor(...rgb(C.soft));
  doc.setLineWidth(.45);
  doc.line(lineStart,y-1,W-M,y-1);
  return y+8;
 };
 const para=(t,y,size=9.2)=>{doc.setFont("helvetica","normal");doc.setFontSize(size);doc.setTextColor(...rgb(C.mid));const l=doc.splitTextToSize(t||"",W-M*2);doc.text(l,M,y);return y+l.length*(size*.48)+5};
 pg=1;
 doc.setFillColor(255,255,255);
 doc.rect(0,0,W,H,"F");

 // Softer, lighter cover header
 doc.setFillColor(...rgb(C.soft));
 doc.rect(0,0,W,72,"F");
 doc.setFillColor(...rgb(C.blush));
 doc.rect(0,72,W,16,"F");

 // Centered Posh Pink logo
 if(lg)try{doc.addImage(lg,"PNG",W/2-27,14,54,22)}catch{}

 // Product title
 doc.setFont("helvetica","bold");
 doc.setTextColor(...rgb(C.rose));
 doc.setFontSize(8.5);
 doc.setCharSpace(2.2);
 doc.text("THE POSH PINK",W/2,49,{align:"center"});
 doc.setCharSpace(0);

 doc.setTextColor(...rgb(C.plum));
 doc.setFontSize(18);
 doc.text("BRAND & LOGO BLUEPRINT",W/2,61,{align:"center"});

 // Decorative line
 doc.setDrawColor(...rgb(C.pink));
 doc.setLineWidth(.6);
 doc.line(55,82,95,82);
 doc.line(115,82,155,82);
 doc.setFillColor(...rgb(C.pink));
 doc.circle(W/2,82,1.6,"F");

 // Prepared-for label
 doc.setFont("helvetica","bold");
 doc.setFontSize(8);
 doc.setTextColor(...rgb(C.rose));
 doc.setCharSpace(1.4);
 doc.text("PREPARED EXCLUSIVELY FOR",W/2,108,{align:"center"});
 doc.setCharSpace(0);

 // Large centered business name with automatic wrapping
 const coverName=a.businessName||"Your Business";
 const coverFontSize=coverName.length>34?24:coverName.length>22?28:34;
 doc.setFont("helvetica","bold");
 doc.setFontSize(coverFontSize);
 doc.setTextColor(...rgb(C.plum));
 const coverNameLines=doc.splitTextToSize(coverName,W-44);
 const coverNameY=coverNameLines.length>1?132:141;
 doc.text(coverNameLines,W/2,coverNameY,{align:"center",lineHeightFactor:1.08});

 // Soft framed description area
 const descriptionY=coverNameLines.length>1?179:171;
 doc.setFillColor(...rgb(C.blush));
 doc.setDrawColor(...rgb(C.soft));
 doc.setLineWidth(.5);
 doc.roundedRect(28,descriptionY-12,W-56,50,4,4,"FD");

 doc.setFont("helvetica","bold");
 doc.setFontSize(11);
 doc.setTextColor(...rgb(C.rose));
 doc.text("Your Complete Brand Direction",W/2,descriptionY,{align:"center"});

 doc.setFont("helvetica","normal");
 doc.setFontSize(9.5);
 doc.setTextColor(...rgb(C.mid));
 const coverCopy=doc.splitTextToSize(
  "A personalized roadmap for your brand strategy, visual identity, logo direction, messaging, marketing presence, and next best steps.",
  W-76
 );
 doc.text(coverCopy,W/2,descriptionY+11,{align:"center",lineHeightFactor:1.35});

 // Prepared date
 doc.setFontSize(8);
 doc.setTextColor(...rgb(C.muted));
 doc.text(`Created ${new Date().toLocaleDateString()}`,W/2,238,{align:"center"});

 footer();
 let y=page("Brand Foundation","Your strategic brand summary");y=head("Brand Archetype",y);doc.setFont("helvetica","bolditalic");doc.setFontSize(18);doc.setTextColor(...rgb(C.plum));doc.text(d.archetype||"",M,y);y+=10;y=para(d.archetypeDescription,y);y=head("Mission Statement",y+3);y=para(d.missionStatement,y);y=head("Brand Story",y+3);y=para(d.brandStory,y);y=head("Core Values",y+3);para((d.coreValues||[]).join(" • "),y);
 y=page("Audience & Positioning","Who your brand is designed to reach");y=head("Ideal Customer",y);y=para(d.idealCustomer,y);y=head("Positioning Statement",y+5);y=para(d.positioningStatement,y);y=head("Customer Experience",y+5);y=para(d.customerExperience,y);y=head("Brand Promise",y+5);para(d.brandPromise,y);
 y=page("Voice & Messaging","How your brand should sound and connect");y=head("Brand Voice",y);y=para(d.brandVoice,y);y=head("Signature Keywords",y+5);let x=M,cy=y;doc.setFont("helvetica","bold");doc.setFontSize(7.5);(d.voiceKeywords||[]).forEach(w=>{const z=String(w).toUpperCase(),ww=Math.max(25,doc.getTextWidth(z)+10);if(x+ww>W-M){x=M;cy+=12}doc.setFillColor(...rgb(C.blush));doc.setDrawColor(...rgb(C.pink));doc.roundedRect(x,cy-6,ww,9,2,2,"FD");doc.setTextColor(...rgb(C.rose));doc.text(z,x+ww/2,cy,{align:"center"});x+=ww+4});y=cy+16;y=head("Tagline Ideas",y);(d.taglines||[]).forEach((t,i)=>{doc.setFont("helvetica","italic");doc.setFontSize(10);doc.setTextColor(...rgb(C.plum));const l=doc.splitTextToSize(`${i+1}. “${t}”`,W-M*2);doc.text(l,M,y);y+=l.length*5+5});
 y=page("Color Palette","A printer-friendly visual system with clear color roles");
 const cols=d.colors||[],roles=["Primary","Secondary","Accent","Neutral","Background"],sw=32,g=3;
 cols.slice(0,5).forEach((c,i)=>{
  const xx=M+i*(sw+g);
  doc.setFillColor(...rgb(c.hex));
  doc.roundedRect(xx,y,sw,40,2.5,2.5,"F");
  doc.setDrawColor(...rgb(C.line));
  doc.setLineWidth(.45);
  doc.roundedRect(xx,y,sw,40,2.5,2.5,"S");
  doc.setFont("helvetica","bold");
  doc.setFontSize(7);
  doc.setTextColor(...rgb(C.plum));
  doc.text(roles[i]||c.role||"",xx+sw/2,y+49,{align:"center"});
  doc.setFont("helvetica","normal");
  doc.setFontSize(6.8);
  doc.text(c.hex||"",xx+sw/2,y+56,{align:"center"});
  doc.text(c.name||"",xx+sw/2,y+63,{align:"center"});
 });
 y+=78;
 y=head("How to Use Your Palette",y);
 para(d.colorUsage,y);
 y=page("Typography","Free font recommendations commonly available in Canva");
 (d.fonts||[]).forEach((f)=>{
  doc.setFillColor(...rgb(C.blush));
  doc.setDrawColor(...rgb(C.soft));
  doc.setLineWidth(.5);
  doc.roundedRect(M,y,W-M*2,38,3,3,"FD");
  doc.setFillColor(...rgb(C.soft));
  doc.roundedRect(M,y,48,38,3,3,"F");
  doc.setFont("helvetica","bold");
  doc.setFontSize(8);
  doc.setTextColor(...rgb(C.rose));
  doc.text((f.role||"").toUpperCase(),M+7,y+10);
  doc.setFont("helvetica","bolditalic");
  doc.setFontSize(14);
  doc.setTextColor(...rgb(C.plum));
  const fontLines=doc.splitTextToSize(f.name||"",38);
  doc.text(fontLines,M+7,y+22);
  doc.setFont("helvetica","normal");
  doc.setFontSize(8.2);
  doc.setTextColor(...rgb(C.mid));
  const noteLines=doc.splitTextToSize(f.note||"",W-M*2-66);
  doc.text(noteLines,M+58,y+13);
  y+=45;
 });
 y=head("Typography Guidance",y+3);
 para(d.typographyUsage,y);
 y=page("Logo Direction","Five editable SVG concepts and the thinking behind them");(d.logos||[]).forEach((l,i)=>{doc.setFillColor(...rgb(C.blush));doc.setDrawColor(...rgb(C.soft));doc.roundedRect(M,y,W-M*2,32,3,3,"FD");doc.setFont("helvetica","bold");doc.setFontSize(8.5);doc.setTextColor(...rgb(C.rose));doc.text(`CONCEPT ${String.fromCharCode(65+i)} — ${l.styleName||""}`,M+8,y+10);doc.setFont("helvetica","normal");doc.setFontSize(8);doc.setTextColor(...rgb(C.mid));doc.text(doc.splitTextToSize(l.description||"",W-M*2-16),M+8,y+19);y+=38});y=head("Logo Use Note",y+4);para("These SVG concepts are editable starting points for creative direction. Before commercial use, customize your chosen concept and confirm that it does not conflict with an existing trademark.",y);
 y=page("AI-Ready Logo Prompts","Copy these prompts into your preferred AI image or design tool");(d.logoPrompts||[]).forEach((p,i)=>{if(y>258)y=page("AI-Ready Logo Prompts","Continued");doc.setFont("helvetica","bold");doc.setFontSize(8);doc.setTextColor(...rgb(C.pink));doc.text(`PROMPT ${i+1}`,M,y);y+=5;doc.setFont("helvetica","normal");doc.setFontSize(7.6);doc.setTextColor(...rgb(C.mid));const l=doc.splitTextToSize(p||"",W-M*2);doc.text(l,M,y);y+=l.length*3.9+7});
 y=page("Digital Brand Direction","How your visual identity can show up online");y=head("Social Media Direction",y);y=para(d.socialMediaDirection,y);y=head("Website Direction",y+5);y=para(d.websiteDirection,y);y=head("Photography & Graphics",y+5);y=para(d.photographyDirection,y);y=head("Content Themes",y+5);(d.contentThemes||[]).forEach((t,i)=>{doc.setFont("helvetica","normal");doc.setFontSize(8.3);doc.setTextColor(...rgb(C.mid));const l=doc.splitTextToSize(`${i+1}. ${t}`,W-M*2);doc.text(l,M,y);y+=l.length*4+4});
 y=page("Your Brand Action Plan","Practical steps to put your new direction to work");(d.actionPlan||[]).forEach((t,i)=>{doc.setFillColor(...rgb(C.blush));doc.setDrawColor(...rgb(C.pink));doc.roundedRect(M,y-6,8,8,2,2,"FD");doc.setFont("helvetica","bold");doc.setFontSize(8);doc.setTextColor(...rgb(C.rose));doc.text(String(i+1),M+4,y,{align:"center"});doc.setFont("helvetica","normal");doc.setTextColor(...rgb(C.mid));const l=doc.splitTextToSize(t||"",W-M*2-14);doc.text(l,M+14,y);y+=Math.max(12,l.length*4.2+6)});
 y=page("Recommended Posh Pink Support","Your personalized next best step");
 const r=d.membershipRecommendation||{};
 doc.setFillColor(...rgb(C.blush));
 doc.setDrawColor(...rgb(C.pink));
 doc.setLineWidth(.8);
 doc.roundedRect(M,y,W-M*2,78,5,5,"FD");
 doc.setFillColor(...rgb(C.soft));
 doc.roundedRect(M,y,W-M*2,18,5,5,"F");
 doc.setFont("helvetica","bold");
 doc.setFontSize(9);
 doc.setTextColor(...rgb(C.rose));
 doc.text("YOUR RECOMMENDED NEXT STEP",W/2,y+12,{align:"center"});
 doc.setFontSize(17);
 doc.setTextColor(...rgb(C.plum));
 doc.text(r.name||"Explore Posh Pink Memberships",W/2,y+32,{align:"center"});
 doc.setFontSize(10.5);
 doc.setTextColor(...rgb(C.rose));
 doc.text(r.price||"",W/2,y+43,{align:"center"});
 doc.setFont("helvetica","normal");
 doc.setFontSize(8.6);
 doc.setTextColor(...rgb(C.mid));
 const reasonLines=doc.splitTextToSize(r.reason||"",W-M*2-24);
 doc.text(reasonLines,W/2,y+55,{align:"center",lineHeightFactor:1.3});
 y+=92;

 const resources=[
  ["Explore Memberships",LINKS.memberships],
  ["View Marketing Services",LINKS.services],
  ["Visit the Posh Pink Store",LINKS.store],
  ["Contact Tara",LINKS.contact]
 ];
 resources.forEach(([label,url],i)=>{
  const col=i%2,row=Math.floor(i/2);
  const bx=M+col*88,by=y+row*22;
  doc.setFillColor(...rgb(i===0?C.rose:C.blush));
  doc.setDrawColor(...rgb(C.soft));
  doc.roundedRect(bx,by,82,15,3,3,"FD");
  doc.setFont("helvetica","bold");
  doc.setFontSize(8);
  doc.setTextColor(...rgb(i===0?C.white:C.rose));
  doc.textWithLink(label,bx+41,by+9.7,{url,align:"center"});
 });
 y+=55;
 y=head("A Note from Tara",y);
 doc.setFont("helvetica","italic");
 doc.setFontSize(10);
 doc.setTextColor(...rgb(C.mid));
 const note=doc.splitTextToSize(
  "Thank you for trusting me to be part of your branding journey. I created this Blueprint to give you clarity, confidence, and a practical direction for moving forward. When you are ready to bring it all to life, I would love to support you.",
  W-M*2
 );
 doc.text(note,M,y,{lineHeightFactor:1.35});

 // Final contact and social page
 y=page("Let's Stay Connected","");
 if(lg)try{doc.addImage(lg,"PNG",W/2-28,18,56,22)}catch{}

 doc.setFont("helvetica","bold");
 doc.setFontSize(26);
 doc.setTextColor(...rgb(C.plum));
 doc.text("Let's Stay",W/2,64,{align:"center"});

 doc.setFont("times","bold");
 doc.setFontSize(34);
 doc.setTextColor(...rgb(C.rose));
 doc.text("CONNECTED",W/2,82,{align:"center"});

 doc.setDrawColor(...rgb(C.soft));
 doc.line(48,92,88,92);
 doc.line(122,92,162,92);
 doc.setFillColor(...rgb(C.pink));
 doc.circle(W/2,92,1.6,"F");

 doc.setFont("helvetica","normal");
 doc.setFontSize(9.5);
 doc.setTextColor(...rgb(C.mid));
 const msg=doc.splitTextToSize(
  `This Blueprint was created exclusively for ${a.businessName||"your business"}. My goal is to give you clarity, confidence, and a professional roadmap for building a brand that truly represents your business. Whether you're just getting started or refreshing an established brand, I hope these recommendations help you make every marketing decision with purpose. Great brands are built with consistency, intention, and authenticity.`,
  W-62
 );
 doc.text(msg,W/2,106,{align:"center",lineHeightFactor:1.35});

 doc.setFont("times","italic");
 doc.setFontSize(17);
 doc.setTextColor(...rgb(C.rose));
 doc.text("I'm cheering you on every step of the way.",W/2,143,{align:"center"});

 doc.setFont("times","italic");
 doc.setFontSize(15);
 doc.text("xo, Tara ♡",W/2,153,{align:"center"});

 const socials=[
  ["WEBSITE","www.poshpinkmarketing.com","https://www.poshpinkmarketing.com"],
  ["EMAIL","hello@poshpinkmarketing.com","mailto:hello@poshpinkmarketing.com"],
  ["FACEBOOK","facebook.com/poshpinkmarketing","https://facebook.com/poshpinkmarketing"],
  ["INSTAGRAM","@poshpinkmarketing","https://instagram.com/poshpinkmarketing"],
  ["TIKTOK","@posh_pink_marketing","https://tiktok.com/@posh_pink_marketing"]
 ];

 let sy=164;
 socials.forEach(([label,value,url])=>{
   doc.setFillColor(...rgb(C.blush));
   doc.setDrawColor(...rgb(C.soft));
   doc.roundedRect(36,sy,W-72,17,4,4,"FD");
   doc.setFont("helvetica","bold");
   doc.setFontSize(8);
   doc.setTextColor(...rgb(C.rose));
   doc.text(label,48,sy+6.5);
   doc.setFont("helvetica","normal");
   doc.setFontSize(10);
   doc.setTextColor(...rgb(C.plum));
   doc.textWithLink(value,W-46,sy+11,{url,align:"right"});
   sy+=22;
 });

 doc.setFont("helvetica","bold");
 doc.setFontSize(11);
 doc.setTextColor(...rgb(C.plum));
 doc.text("YOU'VE GOT THIS!",W/2,274,{align:"center"});

 doc.setFont("helvetica","normal");
 doc.setFontSize(8.5);
 doc.setTextColor(...rgb(C.muted));
 doc.text("CREATED EXCLUSIVELY FOR",W/2,282,{align:"center"});

 doc.setFont("helvetica","bold");
 doc.setFontSize(10.5);
 doc.setTextColor(...rgb(C.rose));
 doc.text((a.businessName||"Your Business").slice(0,38),W/2,288,{align:"center"});

 doc.setFont("helvetica","normal");
 doc.setFontSize(8);
 doc.setTextColor(...rgb(C.plum));
 doc.text("Prepared by Tara • Posh Pink Marketing",W/2,293,{align:"center"});

 const totalPages=doc.getNumberOfPages();
 for(let i=1;i<=totalPages;i++){
   doc.setPage(i);
   doc.setFillColor(...rgb(C.soft));
   doc.rect(W-45,H-13,33,8,"F");
   doc.setFont("helvetica","normal");
   doc.setFontSize(7);
   doc.setTextColor(...rgb(C.plum));
   doc.text(`Page ${i} of ${totalPages}`,W-12,H-7.5,{align:"right"});
 }

 doc.save(`${safe(a.businessName)}-posh-pink-brand-logo-blueprint.pdf`)
}

function Copy({text}){const[ok,setOk]=useState(false);return <button className="btn alt sm" onClick={async()=>{try{await navigator.clipboard.writeText(text);setOk(true);setTimeout(()=>setOk(false),1200)}catch{alert("Please copy the prompt manually.")}}}>{ok?"Copied!":"Copy Prompt"}</button>}
function Results({d,a}){
 const[busy,setBusy]=useState(false),tag=(d.taglines||[])[0]||a.tagline||"";
 return <><section style={{background:C.blush,padding:"42px 24px",borderBottom:`1px solid ${C.line}`}}><div style={{maxWidth:960,margin:"auto"}}><p className="k">Your Blueprint Is Ready</p><h1 className="title" style={{fontSize:50}}>{a.businessName}</h1><p className="copy">{d.archetypeDescription}</p><button className="btn" onClick={async()=>{setBusy(true);try{await pdf(d,a)}catch(e){console.error(e);alert(e.message)}setBusy(false)}}>{busy?"Creating PDF…":"Download My Complete Blueprint PDF"}</button></div></section><main style={{maxWidth:960,margin:"auto",padding:"0 24px 110px"}}>
 <section className="sec"><p className="label">Brand Archetype</p><h2 style={{fontFamily:"'Cormorant Garamond',serif",color:C.plum,fontSize:40}}>{d.archetype}</h2><p className="copy">{d.archetypeDescription}</p></section>
 <section className="sec"><p className="label">Signature Color Palette</p><div className="swatches">{(d.colors||[]).map((c,i)=><div key={i}><div className="swatch" style={{background:c.hex}}><span style={{background:"rgba(255,255,255,.88)",padding:"4px 6px",borderRadius:5,fontSize:10}}>{c.hex}</span></div><p style={{fontSize:12,color:C.mid}}>{c.role}: {c.name}</p></div>)}</div></section>
 <section className="sec"><p className="label">Typography</p><div className="grid">{(d.fonts||[]).map((f,i)=><div className="card" key={i}><small style={{color:C.rose,fontWeight:700}}>{f.role}</small><h3 style={{fontFamily:`'${f.name}',sans-serif`,color:C.plum,fontSize:27}}>{f.name}</h3><p style={{color:C.muted,lineHeight:1.7,fontSize:13}}>{f.note}</p></div>)}</div></section>
 <section className="sec"><p className="label">Brand Voice & Keywords</p>{(d.voiceKeywords||[]).map((w,i)=><span className="chip" key={i}>{w}</span>)}<h3 style={{fontFamily:"'Cormorant Garamond',serif",color:C.plum,fontSize:30}}>Tagline Ideas</h3>{(d.taglines||[]).map((t,i)=><p key={i}>“{t}”</p>)}</section>
 <section className="sec"><p className="label">Logo Concepts</p><p className="copy">Download each concept as an editable SVG starting point. These are creative directions, not final trademark-cleared logos.</p><div className="logos">{(d.logos||[]).map((l,i)=>{const x=svg(l,a.businessName,tag);return <div className="logoCard" key={i}><p className="label">Concept {String.fromCharCode(65+i)} · {l.styleName}</p><div className="preview" dangerouslySetInnerHTML={{__html:x}}/><p style={{color:C.muted,fontSize:12,lineHeight:1.6}}>{l.description}</p><button className="btn alt sm" onClick={()=>dlSvg(x,a.businessName,i)}>Download SVG</button></div>})}</div></section>
 <section className="sec"><p className="label">AI-Ready Logo Prompts</p><div style={{display:"grid",gap:12}}>{(d.logoPrompts||[]).map((p,i)=><div className="card" key={i}><b style={{color:C.rose}}>Prompt {i+1}</b><p className="prompt">{p}</p><Copy text={p}/></div>)}</div></section>
 <section className="sec"><p className="label">Recommended Next Step</p><div className="card" style={{background:C.blush}}><h2 style={{color:C.plum}}>{d.membershipRecommendation?.name}</h2><b style={{color:C.rose}}>{d.membershipRecommendation?.price}</b><p className="copy">{d.membershipRecommendation?.reason}</p><a href={LINKS.memberships} target="_blank" rel="noreferrer"><button className="btn">Explore Memberships</button></a></div></section>
 </main></>
}

export default function App(){
 useEffect(styles,[]);const[step,setStep]=useState(0),[a,setA]=useState({}),[d,setD]=useState(null),[err,setErr]=useState("");const q=Q[step-1],total=Q.length;
 const valid=useMemo(()=>{if(!q)return false;const v=a[q.id];if(!q.r)return true;if(q.t==="text"||q.t==="area")return !!v?.trim();if(q.t==="single")return !!v;return Array.isArray(v)&&v.length},[q,a]);
 const set=(id,v,t)=>t==="multi"?setA(p=>{const c=p[id]||[];return{...p,[id]:c.includes(v)?c.filter(x=>x!==v):[...c,v]}}):setA(p=>({...p,[id]:v}));
 async function generate(){
  const mem=Object.values(MEMBERSHIPS).map(m=>`${m.name}: ${m.price}. ${m.summary}`).join("\n");

  async function callClaude(prompt,label){
   const r=await fetch("/.netlify/functions/claude",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({prompt})
   });

   const raw=await r.text();
   let j;

   try{j=JSON.parse(raw)}
   catch{throw new Error(`${label} returned an unreadable response (${r.status}).`)}

   if(!r.ok||!j.result)throw new Error(j.error||`${label} failed (${r.status}).`);

   const cleaned=String(j.result).replace(/```json|```/g,"").trim();
   const first=cleaned.indexOf("{");
   const last=cleaned.lastIndexOf("}");
   if(first<0||last<0||last<=first)throw new Error(`${label} returned an incomplete response.`);

   const rawJson=cleaned.slice(first,last+1);

   try{
    return JSON.parse(rawJson);
   }catch(parseError){
    console.warn(`${label} returned invalid JSON. Attempting repair.`,parseError);

    const repairPrompt=`Repair the malformed JSON below.

Return ONLY the complete corrected JSON.
Do not include markdown, explanations, comments, or code fences.
Preserve all existing information.
Fix missing commas, quotation marks, brackets, braces, trailing commas, and invalid line breaks.
Before responding, verify that the entire response can be parsed with JSON.parse().

MALFORMED JSON:
${rawJson}`;

    const repairResponse=await fetch("/.netlify/functions/claude",{
     method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify({prompt:repairPrompt})
    });

    const repairRaw=await repairResponse.text();
    let repairJson;

    try{repairJson=JSON.parse(repairRaw)}
    catch{throw new Error(`${label} repair returned an unreadable response (${repairResponse.status}).`)}

    if(!repairResponse.ok||!repairJson.result)throw new Error(repairJson.error||`${label} formatting repair failed.`);

    const repaired=String(repairJson.result).replace(/```json|```/g,"").trim();
    const repairedFirst=repaired.indexOf("{");
    const repairedLast=repaired.lastIndexOf("}");
    if(repairedFirst<0||repairedLast<0||repairedLast<=repairedFirst)throw new Error(`${label} repair was incomplete.`);

    return JSON.parse(repaired.slice(repairedFirst,repairedLast+1));
   }
  }

  const businessDetails=`Business details:
- Business name: ${a.businessName}
- Existing tagline: ${a.tagline||"none"}
- Industry: ${a.industry}
- Main offer: ${a.offer}
- Business stage: ${a.stage}
- Audience: ${(a.audience||[]).join(", ")}
- Desired customer feeling: ${a.customerFeeling}
- Brand vibe: ${(a.vibe||[]).join(", ")}
- Brand values: ${(a.values||[]).join(", ")}
- Preferred colors: ${(a.colors||[]).join(", ")}
- Colors to avoid: ${a.avoidColors||"none"}
- Typography preferences: ${(a.fontMood||[]).join(", ")}
- Logo preferences: ${(a.logoStyles||[]).join(", ")}
- Symbols to explore: ${a.symbols||"none"}
- Logo elements to avoid: ${(a.avoid||[]).join(", ")}
- Marketing needs: ${(a.marketingNeeds||[]).join(", ")}
- Budget/support level: ${a.budget}`;

  const brandPrompt=`You are an experienced small-business brand strategist working for The Posh Pink Brand.

Create PART ONE of a practical Brand & Logo Blueprint for "${a.businessName}".

${businessDetails}

Use only these commonly available free Canva font names:
${CANVA_FONTS.join(", ")}

Return ONLY strict, complete, valid JSON using this exact shape:
{"archetype":"","archetypeDescription":"","missionStatement":"","brandStory":"","coreValues":["","","",""],"idealCustomer":"","positioningStatement":"","customerExperience":"","brandPromise":"","brandVoice":"","voiceKeywords":["","","","",""],"taglines":["","","","",""],"colors":[{"role":"Primary","hex":"#RRGGBB","name":""},{"role":"Secondary","hex":"#RRGGBB","name":""},{"role":"Accent","hex":"#RRGGBB","name":""},{"role":"Neutral","hex":"#RRGGBB","name":""},{"role":"Background","hex":"#RRGGBB","name":""}],"colorUsage":"","fonts":[{"role":"Display / Heading","name":"","note":""},{"role":"Subheading","name":"","note":""},{"role":"Body","name":"","note":""},{"role":"Accent","name":"","note":""}],"typographyUsage":""}

JSON rules:
- Use double quotation marks around every key and string value.
- Include commas between every property and array item.
- Do not use unescaped quotation marks inside strings.
- Do not include markdown, comments, explanations, or code fences.
- Complete and close every array and object.
- All hex values must be valid six-digit hex codes.
- Keep the writing concise, useful, encouraging, and specific.
- Before responding, verify that JSON.parse() can parse the entire response.`;

  const logoMarketingPrompt=`You are an experienced logo-direction and small-business marketing strategist working for The Posh Pink Brand.

Create PART TWO of a practical Brand & Logo Blueprint for "${a.businessName}".

${businessDetails}

Choose exactly one membership recommendation from these accurate details:
${mem}

Recommendation rules:
- Recommend Blush for foundational marketing, content, social media help, or budgets under about $900.
- Recommend Tulip when website updates, Google Business Profile, organization, planning, strategy, or up to four profiles are important.
- Recommend Diamond when full marketing creation, full strategy, priority support, Google Business support, or up to six profiles are needed.
- Never invent benefits, prices, or guarantees.

Return ONLY strict, complete, valid JSON using this exact shape:
{"logos":[{"styleName":"","description":"","primaryColor":"#RRGGBB","secondaryColor":"#RRGGBB","accentColor":"#RRGGBB","svgStyle":"badge"},{"styleName":"","description":"","primaryColor":"#RRGGBB","secondaryColor":"#RRGGBB","accentColor":"#RRGGBB","svgStyle":"geometric"},{"styleName":"","description":"","primaryColor":"#RRGGBB","secondaryColor":"#RRGGBB","accentColor":"#RRGGBB","svgStyle":"minimal"},{"styleName":"","description":"","primaryColor":"#RRGGBB","secondaryColor":"#RRGGBB","accentColor":"#RRGGBB","svgStyle":"script"},{"styleName":"","description":"","primaryColor":"#RRGGBB","secondaryColor":"#RRGGBB","accentColor":"#RRGGBB","svgStyle":"monogram"}],"logoPrompts":["","","","",""],"socialMediaDirection":"","websiteDirection":"","photographyDirection":"","contentThemes":["","","","",""],"actionPlan":["","","","","","","",""],"membershipRecommendation":{"name":"","price":"","reason":""}}

JSON rules:
- Use double quotation marks around every key and string value.
- Include commas between every property and array item.
- Do not use unescaped quotation marks inside strings.
- Do not include markdown, comments, explanations, or code fences.
- Complete and close every array and object.
- All hex values must be valid six-digit hex codes.
- Keep descriptions and prompts useful but concise enough to return quickly.
- Before responding, verify that JSON.parse() can parse the entire response.`;

  try{
   const brandData=await callClaude(brandPrompt,"Brand strategy");
   const logoMarketingData=await callClaude(logoMarketingPrompt,"Logo and marketing strategy");
   setD({...brandData,...logoMarketingData});
   setStep(total+2);
  }catch(e){
   console.error(e);
   setErr(`Something went wrong while creating your Blueprint. ${e.message}`);
   setStep(total+2);
  }
 }
 const next=()=>step<total?setStep(step+1):(setStep(total+1),generate());
 return <div className="app">{step===0&&<div className="shell"><Logo/><p className="k" style={{marginTop:28}}>The Posh Pink Brand & Logo Blueprint</p><h1 className="title">Build a Brand<br/>That Feels Like You.</h1><p className="copy">Answer a guided set of questions and receive a personalized brand direction—including your archetype, messaging, color palette, free Canva font recommendations, five editable SVG logo concepts, AI-ready logo prompts, and a multi-page downloadable Blueprint.</p><button className="btn" onClick={()=>setStep(1)}>Build My Brand Blueprint</button><p style={{color:C.muted,fontSize:12}}>About 7–10 minutes</p></div>}
 {step>=1&&step<=total&&q&&<div className="shell" key={step}><Logo/><div style={{margin:"28px 0 34px"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:9,fontSize:12,color:C.muted}}><span>{q.s} · Question {step} of {total}</span><b style={{color:C.rose}}>{Math.round(step/total*100)}%</b></div><div className="prog"><div style={{width:`${step/total*100}%`}}/></div></div><p className="k">{q.s}</p><h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,color:C.plum}}>{q.q}</h2><p style={{color:C.muted}}>{q.h}</p>{q.t==="text"&&<input className="input" value={a[q.id]||""} placeholder={q.p} autoFocus onChange={e=>set(q.id,e.target.value,"text")} onKeyDown={e=>e.key==="Enter"&&valid&&next()}/>} {q.t==="area"&&<textarea className="area" value={a[q.id]||""} placeholder={q.p} onChange={e=>set(q.id,e.target.value,"area")}/>} {(q.t==="single"||q.t==="multi")&&<div>{q.o.map(o=>{const on=q.t==="single"?a[q.id]===o:(a[q.id]||[]).includes(o);return <button className={`opt${on?" on":""}`} key={o} onClick={()=>set(q.id,o,q.t)}><span className={`box${q.t==="single"?" radio":""}`}>{on?(q.t==="single"?"●":"✓"):""}</span><span>{o}</span></button>})}</div>}<div style={{display:"flex",justifyContent:"space-between",marginTop:30}}>{step>1?<button className="btn alt" onClick={()=>setStep(step-1)}>← Back</button>:<span/>}<button className="btn" disabled={!valid} onClick={next}>{step===total?"Create My Complete Blueprint":"Continue"}</button></div></div>}
 {step===total+1&&<div className="shell" style={{textAlign:"center"}}><Logo/><div style={{display:"grid",placeItems:"center",padding:"90px 0"}}><div className="spin"/><h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:34,color:C.plum}}>Creating Your Blueprint…</h2><p style={{color:C.muted}}>Building your strategy, visual direction, logo concepts, and recommendations.</p></div></div>}
 {step===total+2&&(err?<div className="shell" style={{textAlign:"center"}}><Logo/><h2 style={{color:C.plum,marginTop:60}}>{err}</h2><button className="btn" onClick={()=>{setErr("");setStep(total+1);generate()}}>Try Again</button></div>:d?<Results d={d} a={a}/>:null)}<Footer/></div>
}
