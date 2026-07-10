
Today 8:58 AM
Hey ChatGPT, let's finish up my memberships today.  I feel like I'm stuck and I want to just get them done and ready to launch so I can post it.  I have completed the July Monthly AI Prompt PDF, From the Posh Pink Desk PDF (the tips/monthly challenge), and The Business Boost (checklist of what to do) July PDF.  I have the three pricing plans active in my Wix Pricing Plans.  I have my Members Area Pages setup like the attached screen shot.  Tell me what to do now

Today 11:55 AM

Perfect! This is actually the simplest type of app. 🎉

I can already tell where your text is.

You only have:

✅ App.jsx ← This is where almost everything is.

main.jsx ← Leave this alone.

Step 1
Click App.jsx

Step 2
Click the pencil icon (Edit).

Step 3
You'll probably see something that starts like:

function App() {
or

const App = () => {
Scroll down until you see text that looks familiar, such as:

Brand Kit Builder
or

Logo Builder
or

Build Your Brand
Step 4
Change the wording however you'd like.

For example:

Instead of

<h1>Brand Kit Builder</h1>
change it to

<h1>The Posh Pink Brand Blueprint</h1>
Step 5
Scroll all the way down.

Click the green

Commit changes

button.

Netlify should automatically rebuild your site in about 30–60 seconds.

💗 Even Easier...
Since this app only has one file, I'd be happy to rewrite the entire page for you so it sounds polished and matches the rest of The Posh Pink Brand.

We'll make it include:

A better title

Better descriptions

Better button text

Better AI prompts

More premium branding

Upsell your memberships naturally

One question...
Can you click App.jsx and take one more screenshot of the code?

Or, even better, click Raw (or open the file) and copy/paste the code here.

Because it's all in one file, I can tell you exactly what to replace—or even rewrite the whole thing for you so it looks and reads like a professional product instead of an AI-generated app. I think we can make it feel much more like a true Posh Pink product in just one editing session.


Yes, let's rewrite the page.  

Great—let’s rewrite it properly.

Open App.jsx, click the pencil icon, then copy everything in that file and paste it here. I’ll revise the existing code so we keep the app working while updating:

the product name

headings and instructions

button wording

descriptions

the final results section

your Posh Pink tone and branding

natural links or mentions for your services and memberships

For the Brand Kit app, I recommend calling it:

The Posh Pink Brand Blueprint
Create a clear, cohesive brand with AI-guided strategy and inspiration.

Please paste the full App.jsx code inside a code block like this:

paste the code here
Do not delete or change anything in GitHub yet.



Pasted text(1).txt
Document
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const C = {
  hotPink:   "#ff1493",
  bubblegum: "#ff69b4",
  softPink:  "#ffb6c1",
  blush:     "#fbeaf0",
  berry:     "#c2185b",
  plum:      "#4b1528",
  white:     "#ffffff",
  ink:       "#1a0a10",
  inkMid:    "#4a2535",
  inkLight:  "#9a6878",
  p50:       "#FFF0F5",
  p100:      "#FFD6E7",
  p200:      "#FFB3CF",
  p400:      "#F472A8",
  p600:      "#C2185B",
  p800:      "#880E4F",
  bg:        "#FAFAFA",
  bgAlt:     "#FFF5F7",
};

const QUESTIONS = [
  { id:"businessName", type:"text",   num:"01", q:"What is your business called?",              hint:"Your name will appear in your personalized brand kit", placeholder:"Enter your business name…" },
  { id:"industry",     type:"multi",  num:"02", q:"What industry or industries do you serve?",  hint:"Select all that apply", options:["Beauty & Wellness","Health & Medical","Real Estate","Professional Services","Boutique Retail","Events & Hospitality","Pet Services","Creative & Design","Coaching & Education","Other"] },
  { id:"vibe",         type:"multi",  num:"03", q:"Which words feel most like your brand?",     hint:"Select all that resonate", options:["Luxurious & refined","Warm & approachable","Bold & modern","Playful & vibrant","Clean & minimal","Natural & organic","Elegant & feminine","Professional & credible"] },
  { id:"colors",       type:"multi",  num:"04", q:"Which color families appeal to you?",        hint:"Select everything that catches your eye", options:["Soft blush & rose","Deep burgundy & wine","Warm champagne & gold","Cool sage & olive","Classic black & white","Navy & midnight blue","Terracotta & rust","Lavender & lilac"] },
  { id:"audience",     type:"multi",  num:"05", q:"Who is your ideal client?",                  hint:"Select all that apply", options:["Busy professionals & executives","Individuals who value self-care & wellness","Small business owners","Families & homeowners","Health-conscious individuals","Couples & life events","Creatives & entrepreneurs"] },
  { id:"budget",       type:"single", num:"06", q:"What is your monthly marketing investment?", hint:"Choose the one that fits best", options:["Under $500","$500 – $1,000","$1,000 – $2,000","$2,000+","Not sure yet"] },
];

const injectStyles = () => {
  if (document.getElementById("ppq-styles")) return;
  const s = document.createElement("style");
  s.id = "ppq-styles";
  s.textContent = 
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');
    .ppq*{box-sizing:border-box;margin:0;padding:0}
    .ppq{font-family:'DM Sans',sans-serif;background:${C.bg};color:${C.ink};min-height:100vh}
    @keyframes ppqUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes ppqFade{from{opacity:0}to{opacity:1}}
    @keyframes ppqPulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes ppqSpin{to{transform:rotate(360deg)}}
    .ppq-up{animation:ppqUp .5s cubic-bezier(.22,.61,.36,1) both}
    .ppq-fade{animation:ppqFade .4s ease both}
    .ppq-pulse{animation:ppqPulse 1.8s ease-in-out infinite}
    .ppq-opt{display:flex;align-items:center;gap:14px;padding:13px 18px;margin-bottom:8px;cursor:pointer;border:0.5px solid ${C.p200};background:${C.white};border-radius:10px;transition:border-color .18s,background .18s,box-shadow .18s}
    .ppq-opt:hover,.ppq-opt.on{border-color:${C.hotPink};background:${C.p50};box-shadow:0 2px 12px rgba(255,20,147,.08)}
    .ppq-box{width:18px;height:18px;flex-shrink:0;border:1.5px solid ${C.p200};background:transparent;border-radius:4px;display:flex;align-items:center;justify-content:center;transition:all .18s}
    .ppq-box.on{background:${C.hotPink};border-color:${C.hotPink}}
    .ppq-box.circ{border-radius:50%}
    .ppq-btn{background:${C.p800};color:${C.white};border:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:.08em;padding:14px 44px;border-radius:8px;cursor:pointer;transition:background .2s,transform .12s,box-shadow .2s;box-shadow:0 2px 16px rgba(136,14,79,.18)}
    .ppq-btn:hover{background:${C.berry};transform:translateY(-1px);box-shadow:0 4px 20px rgba(136,14,79,.25)}
    .ppq-btn:active{transform:translateY(0)}
    .ppq-btn:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none}
    .ppq-btn.hot{background:linear-gradient(135deg,${C.hotPink},${C.berry});box-shadow:0 2px 16px rgba(255,20,147,.3)}
    .ppq-btn.hot:hover{background:linear-gradient(135deg,${C.berry},${C.p800});box-shadow:0 4px 24px rgba(255,20,147,.4)}
    .ppq-btn.ghost{background:transparent;border:1px solid ${C.p200};color:${C.p600};box-shadow:none}
    .ppq-btn.ghost:hover{background:${C.p50};box-shadow:none}
    .ppq-input{width:100%;background:transparent;border:none;border-bottom:1.5px solid ${C.p200};padding:12px 0;font-family:'Cormorant Garamond',serif;font-size:32px;font-style:italic;color:${C.p800};outline:none;transition:border-color .2s}
    .ppq-input:focus{border-bottom-color:${C.hotPink}}
    .ppq-input::placeholder{color:${C.p200}}
    .ppq-chip{display:inline-block;border:0.5px solid ${C.p200};color:${C.p600};font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.08em;padding:5px 12px;margin:4px 4px 4px 0;border-radius:20px;background:${C.white}}
    .ppq-label{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.18em;color:${C.p600};margin-bottom:16px;text-transform:uppercase;font-weight:600}
    .ppq-back{background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:.06em;color:${C.inkLight};padding:0}
    .ppq-back:hover{color:${C.berry}}
    .ppq-divider{height:0.5px;background:${C.p100};margin:24px 0}
  ;
  document.head.appendChild(s);
};

const Logo = () => (
  <div style={{marginBottom:32}}>
    <img src="/logo.png" alt="Posh Pink Marketing" style={{height:46,width:"auto",objectFit:"contain"}}/>
  </div>
);

const Bar = ({cur,tot}) => {
  const pct = Math.round((cur/tot)*100);
  return (
    <div style={{marginBottom:40}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,letterSpacing:".06em",color:C.inkLight,fontWeight:500}}>Question {cur} of {tot}</span>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:18,color:C.hotPink}}>{pct}%</span>
      </div>
      <div style={{height:2,background:C.p100,borderRadius:1,position:"relative"}}>
        <div style={{position:"absolute",top:0,left:0,height:"2px",borderRadius:1,width:${pct}%,background:linear-gradient(90deg,${C.berry},${C.hotPink}),transition:"width .5s cubic-bezier(.22,.61,.36,1)"}}/>
      </div>
    </div>
  );
};

const Opt = ({label,checked,onToggle,radio}) => (
  <div onClick={onToggle} className={ppq-opt${checked?" on":""}}>
    <div className={ppq-box${radio?" circ":""}${checked?" on":""}}>
      {checked && <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><polyline points="1,3.5 3.5,6 9,1" stroke={C.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:C.inkMid,fontWeight:400}}>{label}</span>
  </div>
);

const Spinner = ({msg}) => (
  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24,padding:"80px 0"}}>
    <div style={{width:40,height:40,border:1.5px solid ${C.p100},borderTop:1.5px solid ${C.hotPink},borderRadius:"50%",animation:"ppqSpin 1s linear infinite"}}/>
    <p className="ppq-pulse" style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:22,color:C.p600}}>{msg}</p>
  </div>
);

const hexRgb = h => [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];

const makePDF = (kit, bizName) => {
  const doc = new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
  const W=210,H=297,M=18;
  doc.setFillColor(...hexRgb(C.blush)); doc.rect(0,0,W,H,"F");
  doc.setFillColor(...hexRgb(C.plum)); doc.rect(0,0,5,H,"F");
  doc.setFillColor(...hexRgb(C.plum)); doc.rect(0,0,W,44,"F");
  doc.setFont("helvetica","bolditalic"); doc.setFontSize(24); doc.setTextColor(...hexRgb(C.white));
  doc.text(bizName||"Your Brand",M+2,22);
  doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(...hexRgb(C.softPink));
  doc.setCharSpace(2.5); doc.text("POSH PINK BRAND KIT BUILDER",M+2,32); doc.setCharSpace(0);
  doc.setFontSize(7); doc.setTextColor(...hexRgb(C.bubblegum));
  doc.text("poshpinkmarketing.com",W-M,32,{align:"right"});
  let y=54;
  const sec=(label,yy)=>{
    doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(...hexRgb(C.berry));
    doc.setCharSpace(2.5); doc.text(label.toUpperCase(),M,yy); doc.setCharSpace(0);
    doc.setDrawColor(...hexRgb(C.softPink)); doc.setLineWidth(0.4);
    doc.line(M+doc.getTextWidth(label.toUpperCase())+3,yy-1,W-M,yy-1);
    return yy+7;
  };
  y=sec("Brand Archetype",y);
  doc.setFont("helvetica","bolditalic"); doc.setFontSize(20); doc.setTextColor(...hexRgb(C.plum));
  doc.text(kit.archetype||"",M,y+7); y+=12;
  doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.inkMid));
  const al=doc.splitTextToSize(kit.archetypeDescription||"",W-M*2);
  doc.text(al,M,y); y+=al.length*4.5+8;
  y=sec("Signature Color Palette",y);
  const cols=kit.colors||[]; const sw=26,sh=20,sg=6;
  cols.forEach((c,i)=>{
    const sx=M+i*(sw+sg);
    doc.setFillColor(...hexRgb(c.hex)); doc.rect(sx,y,sw,sh,"F");
    const rgb=hexRgb(c.hex); const lum=0.299*rgb[0]+0.587*rgb[1]+0.114*rgb[2];
    const tc=lum>140?hexRgb(C.inkMid):hexRgb(C.white);
    doc.setTextColor(tc[0],tc[1],tc[2]); doc.setFontSize(5.5);
    doc.text(c.hex,sx+sw/2,y+sh-3,{align:"center"});
    doc.setTextColor(...hexRgb(C.inkMid)); doc.setFontSize(7);
    doc.text(c.name,sx+sw/2,y+sh+5,{align:"center"});
  });
  y+=sh+14;
  y=sec("Logo Direction Concepts",y);
  const lc=cols.map(c=>c.hex);
  const lc1=lc[0]||C.hotPink,lc2=lc[1]||C.berry,lc3=lc[2]||C.softPink,lc4=lc[3]||C.plum;
  const nm=bizName||"Your Brand";
  const sh2=nm.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  const cbW=(W-M*2-10)/3;
  [0,1,2].forEach(i=>{
    const cx=M+i*(cbW+5);
    doc.setFillColor(...hexRgb(C.white)); doc.rect(cx,y,cbW,36,"F");
    doc.setDrawColor(...hexRgb(C.softPink)); doc.setLineWidth(0.4); doc.rect(cx,y,cbW,36);
    doc.setFontSize(7); doc.setTextColor(...hexRgb(C.inkLight));
    doc.setCharSpace(1.5); doc.text(CONCEPT ${["A","B","C"][i]},cx+cbW/2,y+5,{align:"center"}); doc.setCharSpace(0);
    if(i===0){
      doc.setFillColor(...hexRgb(lc1)); doc.setGState(doc.GState({opacity:0.15})); doc.circle(cx+15,y+20,10,"F");
      doc.setGState(doc.GState({opacity:1})); doc.setDrawColor(...hexRgb(lc1)); doc.setLineWidth(0.8); doc.circle(cx+15,y+20,7,"S");
      doc.setFont("helvetica","bolditalic"); doc.setFontSize(8); doc.setTextColor(...hexRgb(lc4)); doc.text(sh2,cx+15,y+23,{align:"center"});
      doc.setFont("helvetica","italic"); doc.setFontSize(8); doc.text(nm,cx+28,y+19);
      doc.setDrawColor(...hexRgb(lc1)); doc.setLineWidth(0.4); doc.line(cx+28,y+22,cx+cbW-3,y+22);
      doc.setFont("helvetica","normal"); doc.setFontSize(5.5); doc.setTextColor(...hexRgb(lc2));
      doc.setCharSpace(2); doc.text("STUDIO",cx+28,y+28); doc.setCharSpace(0);
    } else if(i===1){
      const dx=cx+15,dy=y+20;
      doc.setFillColor(...hexRgb(lc2)); doc.setGState(doc.GState({opacity:0.2}));
      doc.triangle(dx,dy-10, dx+10,dy, dx,dy+10, "F");
      doc.triangle(dx,dy-10, dx-10,dy, dx,dy+10, "F");
      doc.setGState(doc.GState({opacity:1})); doc.setDrawColor(...hexRgb(lc2)); doc.setLineWidth(0.8);
      doc.triangle(dx,dy-10, dx+10,dy, dx,dy+10, "S");
      doc.triangle(dx,dy-10, dx-10,dy, dx,dy+10, "S");
      doc.setFont("helvetica","bold"); doc.setFontSize(7); doc.setTextColor(...hexRgb(lc4)); doc.text(sh2,dx,dy+2,{align:"center"});
      doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setCharSpace(1); doc.setTextColor(...hexRgb(lc4));
      doc.text(nm.toUpperCase(),cx+26,y+20); doc.setCharSpace(0);
      doc.setDrawColor(...hexRgb(lc3)); doc.line(cx+26,y+23,cx+cbW-3,y+23);
    } else {
      doc.setFillColor(...hexRgb(lc1)); doc.setGState(doc.GState({opacity:0.18}));
      doc.roundedRect(cx+5,y+15,18,10,5,5,"F"); doc.setGState(doc.GState({opacity:1}));
      doc.setFont("helvetica","bolditalic"); doc.setFontSize(8); doc.setTextColor(...hexRgb(lc4)); doc.text(sh2,cx+14,y+22,{align:"center"});
      doc.setFont("helvetica","italic"); doc.setFontSize(9); doc.text(nm,cx+26,y+21);
      doc.setFillColor(...hexRgb(lc1)); doc.circle(cx+cbW-5,y+20,2,"F");
      doc.setDrawColor(...hexRgb(lc1)); doc.circle(cx+cbW-5,y+20,3,"S");
    }
  });
  y+=44;
  y=sec("Typography Direction",y);
  (kit.fonts||[]).forEach((f,i)=>{
    const bx=M+i*(cbW+5);
    doc.setFillColor(...hexRgb(C.white)); doc.rect(bx,y,cbW,30,"F");
    doc.setDrawColor(...hexRgb(C.softPink)); doc.setLineWidth(0.4); doc.rect(bx,y,cbW,30);
    doc.setFont("helvetica","normal"); doc.setFontSize(6); doc.setTextColor(...hexRgb(C.inkLight));
    doc.setCharSpace(1.5); doc.text((f.role||"").toUpperCase(),bx+5,y+8); doc.setCharSpace(0);
    doc.setFont("helvetica","bolditalic"); doc.setFontSize(11); doc.setTextColor(...hexRgb(C.plum));
    doc.text(f.name||"",bx+5,y+18);
    doc.setFont("helvetica","normal"); doc.setFontSize(6.5); doc.setTextColor(...hexRgb(C.inkLight));
    const nl=doc.splitTextToSize(f.note||"",cbW-10); doc.text(nl[0]||"",bx+5,y+26);
  });
  y+=38;
  y=sec("Brand Voice & Keywords",y);
  let kx=M;
  (kit.voiceKeywords||[]).forEach(kw=>{
    const tw=doc.getTextWidth(kw.toUpperCase())+10;
    if(kx+tw>W-M){kx=M;y+=12;}
    doc.setDrawColor(...hexRgb(C.bubblegum)); doc.setLineWidth(0.5); doc.rect(kx,y,tw,8);
    doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(...hexRgb(C.berry));
    doc.setCharSpace(1.2); doc.text(kw.toUpperCase(),kx+5,y+5.5); doc.setCharSpace(0);
    kx+=tw+4;
  });
  y+=14;
  if(kit.tagline){
    doc.setDrawColor(...hexRgb(C.hotPink)); doc.setLineWidth(1.5); doc.line(M,y,M,y+14);
    doc.setFont("helvetica","bolditalic"); doc.setFontSize(12); doc.setTextColor(...hexRgb(C.plum));
    doc.text("${kit.tagline}",M+8,y+9); y+=20;
  }
  if(kit.brandPersonality&&y<H-55){
    y=sec("Brand Personality",y);
    doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.inkMid));
    const pl=doc.splitTextToSize(kit.brandPersonality||"",W-M*2);
    doc.text(pl,M,y); y+=pl.length*4.5+8;
  }
  if(kit.socialMediaTip&&y<H-40){
    y=sec("Social Media Direction",y);
    doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.inkMid));
    const sl=doc.splitTextToSize(kit.socialMediaTip||"",W-M*2);
    doc.text(sl,M,y); y+=sl.length*4.5+8;
  }
  if(y<H-40){
    y=sec("Recommended Services",y);
    (kit.services||[]).forEach((svc,i)=>{
      if(y>H-30)return;
      doc.setFont("helvetica","bolditalic"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.hotPink)); doc.text(0${i+1},M,y+4);
      doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.plum)); doc.text(svc.name||"",M+10,y+4);
      doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(...hexRgb(C.inkLight));
      const dl=doc.splitTextToSize(svc.description||"",W-M*2-14); doc.text(dl,M+10,y+9); y+=dl.length*4+10;
    });
  }
  doc.setFillColor(...hexRgb(C.plum)); doc.rect(0,H-16,W,16,"F");
  doc.setFont("helvetica","italic"); doc.setFontSize(7.5); doc.setTextColor(...hexRgb(C.softPink));
  doc.text("Crafted with love by Posh Pink Marketing  ·  poshpinkmarketing.com  ·  info@poshpinkmarketing.com",W/2,H-7,{align:"center"});
  return doc;
};

const logoSVGs = (name,colors) => {
  const c1=(colors[0]||{hex:C.hotPink}).hex,c2=(colors[1]||{hex:C.berry}).hex;
  const c3=(colors[2]||{hex:C.softPink}).hex,c4=(colors[3]||{hex:C.plum}).hex;
  const sh=name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  return [
    <svg xmlns="http://www.w3.org/2000/svg" width="190" height="64" viewBox="0 0 190 64"><circle cx="32" cy="32" r="24" fill="${c1}" opacity="0.15"/><circle cx="32" cy="32" r="16" fill="none" stroke="${c1}" stroke-width="1.5"/><text x="32" y="37" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="${c4}" letter-spacing="2">${sh}</text><text x="62" y="28" font-family="Georgia,serif" font-style="italic" font-size="13" fill="${c4}">${name}</text><line x1="62" y1="33" x2="185" y2="33" stroke="${c1}" stroke-width="0.8"/><text x="62" y="44" font-family="Arial,sans-serif" font-size="7" fill="${c2}" letter-spacing="3">BRAND STUDIO</text></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="190" height="64" viewBox="0 0 190 64"><polygon points="32,6 52,32 32,58 12,32" fill="none" stroke="${c2}" stroke-width="1.5"/><polygon points="32,16 46,32 32,48 18,32" fill="${c2}" opacity="0.2"/><text x="32" y="36" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="${c4}">${sh}</text><text x="60" y="30" font-family="Georgia,serif" font-size="12" fill="${c4}" letter-spacing="1">${name.toUpperCase()}</text><line x1="60" y1="36" x2="185" y2="36" stroke="${c3}" stroke-width="1"/></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="190" height="64" viewBox="0 0 190 64"><rect x="8" y="24" width="36" height="16" rx="8" fill="${c1}" opacity="0.18"/><text x="26" y="35" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="10" fill="${c4}">${sh}</text><text x="52" y="34" font-family="Georgia,serif" font-size="13" fill="${c4}">${name}</text><circle cx="182" cy="32" r="4" fill="none" stroke="${c1}" stroke-width="1.2"/><circle cx="182" cy="32" r="1.5" fill="${c1}"/></svg>,
  ];
};

const FullKit = ({kit,bizName}) => {
  const [busy,setBusy]=useState(false);
  const download=()=>{
    setBusy(true);
    try{
      const doc=makePDF(kit,bizName);
      doc.save(${(bizName||"brand-kit").replace(/\s+/g,"-").toLowerCase()}-brand-kit.pdf);
    } catch(e){
      console.error("PDF error:", e);
      alert("PDF error: " + e.message);
    }
    setBusy(false);
  };
  return (
    <div className="ppq-fade">
      <div style={{background:linear-gradient(135deg,${C.p800} 0%,${C.plum} 100%),padding:"52px 40px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",border:"1px solid rgba(255,20,147,.12)",pointerEvents:"none"}}/>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:".2em",color:C.p200,marginBottom:14,opacity:.8,fontWeight:500,textTransform:"uppercase"}}>Your Brand Identity</p>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:48,color:C.white,marginBottom:16,lineHeight:1.1}}>{kit.archetype}</h1>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:300,lineHeight:1.9,color:"rgba(255,209,226,.8)",maxWidth:440}}>{kit.archetypeDescription}</p>
      </div>
      <div style={{background:C.white,padding:"32px 40px 28px",borderBottom:0.5px solid ${C.p100}}}>
        <p className="ppq-label">Signature Color Palette</p>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {(kit.colors||[]).map((c,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{width:60,height:60,background:c.hex,border:0.5px solid ${C.p100},borderRadius:8,marginBottom:7}}/><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:C.inkLight,letterSpacing:".06em"}}>{c.hex}</p><p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:12,color:C.inkMid,marginTop:2}}>{c.name}</p></div>))}
        </div>
      </div>
      <div style={{background:C.bgAlt,padding:"32px 40px 28px",borderBottom:0.5px solid ${C.p100}}}>
        <p className="ppq-label">Typography Direction</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {(kit.fonts||[]).map((f,i)=>(<div key={i} style={{padding:"20px",background:C.white,border:0.5px solid ${C.p100},borderRadius:10}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:".14em",color:C.inkLight,marginBottom:8,textTransform:"uppercase",fontWeight:600}}>{f.role}</p><p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:26,color:C.p800,marginBottom:6}}>{f.name}</p><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.inkLight,lineHeight:1.7,fontWeight:300}}>{f.note}</p></div>))}
        </div>
      </div>
      <div style={{background:C.white,padding:"32px 40px 28px",borderBottom:0.5px solid ${C.p100}}}>
        <p className="ppq-label">Logo Direction Concepts</p>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.inkLight,marginBottom:16,lineHeight:1.8,fontWeight:300}}>These concepts use your brand colors. Share the PDF with a designer to bring them to life.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {["A","B","C"].map((letter,i)=>(<div key={i} style={{padding:"14px 8px",background:C.bgAlt,border:0.5px solid ${C.p100},borderRadius:8,textAlign:"center"}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:".16em",color:C.inkLight,marginBottom:8,textTransform:"uppercase",fontWeight:600}}>Concept {letter}</p><div style={{overflow:"hidden",display:"flex",justifyContent:"center"}} dangerouslySetInnerHTML={{__html:logoSVGs(bizName,kit.colors||[])[i]}}/></div>))}
        </div>
      </div>
      <div style={{background:C.bgAlt,padding:"32px 40px 28px",borderBottom:0.5px solid ${C.p100}}}>
        <p className="ppq-label">Brand Voice & Personality</p>
        <div style={{marginBottom:16}}>{(kit.voiceKeywords||[]).map((kw,i)=><span key={i} className="ppq-chip">{kw}</span>)}</div>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:24,color:C.berry,lineHeight:1.7,borderLeft:2px solid ${C.hotPink},paddingLeft:16,marginBottom:16}}>"{kit.tagline}"</p>
        {kit.brandPersonality&&<p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.inkMid,lineHeight:1.85,fontWeight:300}}>{kit.brandPersonality}</p>}
      </div>
      {kit.socialMediaTip&&(
        <div style={{background:C.white,padding:"32px 40px 28px",borderBottom:0.5px solid ${C.p100}}}>
          <p className="ppq-label">Social Media Direction</p>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.inkMid,lineHeight:1.85,fontWeight:300}}>{kit.socialMediaTip}</p>
        </div>
      )}
      <div style={{background:C.bgAlt,padding:"32px 40px 28px",borderBottom:0.5px solid ${C.p100}}}>
        <p className="ppq-label">Recommended Services</p>
        <div style={{display:"grid",gap:8}}>
          {(kit.services||[]).map((svc,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"16px 18px",background:C.white,border:0.5px solid ${C.p100},borderRadius:10}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:28,color:C.hotPink,opacity:.5,lineHeight:1,flexShrink:0,marginTop:2}}>{String(i+1).padStart(2,"0")}</span><div><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,letterSpacing:".06em",color:C.p800,marginBottom:4,fontWeight:500}}>{svc.name}</p><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.inkLight,lineHeight:1.8,fontWeight:300}}>{svc.description}</p></div></div>))}
        </div>
      </div>
      <div style={{background:linear-gradient(135deg,${C.p800} 0%,${C.plum} 100%),padding:"52px 40px",textAlign:"center"}}>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:36,color:C.softPink,marginBottom:10}}>Your Brand Kit is Ready</p>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:300,color:"rgba(255,209,226,.75)",marginBottom:28,maxWidth:340,margin:"0 auto 28px",lineHeight:1.9}}>Download your one-page PDF — colors, hex codes, fonts, logo concepts and more.</p>
        <button className="ppq-btn hot" onClick={download} disabled={busy} style={{marginBottom:14,minWidth:220}}>{busy?"Generating PDF…":"⬇ Download Brand Kit PDF"}</button>
        <br/>
        <a href="https://www.poshpinkmarketing.com/contact" style={{textDecoration:"none"}}><button className="ppq-btn ghost" style={{marginTop:12}}>Book a Brand Consultation</button></a>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:".1em",color:C.p200,marginTop:18,opacity:.7}}>info@poshpinkmarketing.com</p>
      </div>
    </div>
  );
};

export default function App() {
  useEffect(()=>{injectStyles();},[]);
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [result,setResult]=useState(null);
  const [error,setError]=useState(null);
  const total=QUESTIONS.length;
  const curQ=QUESTIONS[step-1];

  const ans=(qId,val,type)=>{
    if(type==="text"){setAnswers(p=>({...p,[qId]:val}));return;}
    if(type==="single"){setAnswers(p=>({...p,[qId]:val}));return;}
    setAnswers(p=>{const c=p[qId]||[];return{...p,[qId]:c.includes(val)?c.filter(v=>v!==val):[...c,val]};});
  };

  const canGo=()=>{
    if(!curQ)return false;
    const a=answers[curQ.id];
    if(curQ.type==="text")return a&&a.trim().length>0;
    if(curQ.type==="single")return !!a;
    return a&&a.length>0;
  };

  const next=()=>{
    if(step<total){setStep(s=>s+1);}
    else{setStep(total+1);generate();}
  };

  const generate=async()=>{
    const biz=answers["businessName"]||"your business";
    const prompt=You are a luxury brand strategist. Generate a personalized brand identity kit for ${biz}.
Quiz answers:
- Industry: ${(answers["industry"]||[]).join(", ")||"not specified"}
- Brand vibe: ${(answers["vibe"]||[]).join(", ")}
- Color preferences: ${(answers["colors"]||[]).join(", ")}
- Ideal client: ${(answers["audience"]||[]).join(", ")||"not specified"}
- Monthly budget: ${answers["budget"]||"not specified"}
Respond ONLY with valid JSON (no markdown, no preamble, no code fences):
{"archetype":"2-4 word poetic brand archetype title","archetypeDescription":"2-3 sentences describing this archetype","colors":[{"hex":"#HEXCODE","name":"Color Name"},{"hex":"#HEXCODE","name":"Color Name"},{"hex":"#HEXCODE","name":"Color Name"},{"hex":"#HEXCODE","name":"Color Name"}],"fonts":[{"role":"Display / Heading","name":"Font Name","note":"One sentence on why this suits the brand"},{"role":"Body / Supporting","name":"Font Name","note":"One sentence on why this suits the brand"}],"voiceKeywords":["word1","word2","word3","word4","word5"],"tagline":"Short evocative brand tagline","brandPersonality":"2-3 sentences describing the brand personality and how it shows up in all touchpoints","socialMediaTip":"2-3 sentences of specific social media direction — which platforms, what type of content, what visual style to use","services":[{"name":"Service Name","description":"1-2 sentences on priority"},{"name":"Service Name","description":"1-2 sentences on relevance"},{"name":"Service Name","description":"1-2 sentences on long-term value"}]}
All hex codes must be valid 6-digit hex values.;
    try{
      const res=await fetch("/.netlify/functions/claude",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt})});
      const d=await res.json();
      if(!d.result)throw new Error("Empty");
      setResult(d.result);
      setStep(total+2);
    }catch(e){
      setError("Something went wrong generating your brand kit. Please try again.");
      setStep(total+2);
    }
  };

  const parsed=(()=>{
    if(!result)return null;
    try{return JSON.parse(result.replace(/
json|
/g,"").trim());}catch{return null;}
  })();

  const wrap={maxWidth:600,margin:"0 auto",padding:"60px 32px"};

  return (
    <div className="ppq" style={{minHeight:"100vh"}}>
      {step===0&&(
        <div className="ppq-up" style={wrap}>
          <Logo/>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:".22em",color:C.p600,marginBottom:18,fontWeight:600,textTransform:"uppercase"}}>Posh Pink Brand Kit Builder</p>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:60,color:C.p800,marginBottom:18,lineHeight:1.05}}>Discover Your<br/>Brand Identity</h1>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:300,color:C.inkLight,lineHeight:1.95,marginBottom:40,maxWidth:400}}>Six thoughtful questions. A fully personalized brand kit — color palette, typography, logo concepts, brand personality, social media direction, and a beautiful downloadable PDF.</p>
          <button className="ppq-btn" onClick={()=>setStep(1)}>Begin the Quiz</button>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:C.inkLight,marginTop:14,letterSpacing:".06em"}}>About 3 minutes</p>
        </div>
      )}
      {step>=1&&step<=total&&curQ&&(
        <div key={step} className="ppq-up" style={wrap}>
          <Logo/>
          <Bar cur={step} tot={total}/>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:18,color:C.hotPink,marginBottom:6}}>{curQ.num}</p>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:500,color:C.p800,marginBottom:6,lineHeight:1.25}}>{curQ.q}</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.inkLight,marginBottom:curQ.type==="multi"?4:24,fontWeight:300}}>{curQ.hint}</p>
          {curQ.type==="multi"&&<p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:C.p400,fontStyle:"italic",marginBottom:18}}>You can select more than one.</p>}
          {curQ.type==="text"&&<input className="ppq-input" type="text" placeholder={curQ.placeholder} value={answers[curQ.id]||""} autoFocus onChange={e=>ans(curQ.id,e.target.value,"text")} onKeyDown={e=>{if(e.key==="Enter"&&canGo())next();}}/>}
          {(curQ.type==="single"||curQ.type==="multi")&&<div>{curQ.options.map(opt=><Opt key={opt} label={opt} radio={curQ.type==="single"} checked={curQ.type==="single"?answers[curQ.id]===opt:(answers[curQ.id]||[]).includes(opt)} onToggle={()=>ans(curQ.id,opt,curQ.type)}/>)}</div>}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:32}}>
            {step>1?<button className="ppq-back" onClick={()=>setStep(s=>s-1)}>← Back</button>:<div/>}
            <button className="ppq-btn" onClick={next} disabled={!canGo()}>{step===total?"Generate My Brand Kit":"Continue"}</button>
          </div>
        </div>
      )}
      {step===total+1&&(<div style={wrap}><Logo/><Spinner msg="Crafting your brand profile…"/></div>)}
      {step===total+2&&(
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{padding:"52px 32px 0"}}>
            <Logo/>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:".18em",color:C.inkLight,marginBottom:6,textTransform:"uppercase",fontWeight:500}}>Brand Kit prepared for</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:44,color:C.p800}}>{answers["businessName"]||"Your Brand"}</h2>
            <div className="ppq-divider"/>
          </div>
          {error?(
            <div style={{padding:"0 32px 60px",textAlign:"center"}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",color:C.inkLight,marginBottom:20,fontWeight:300}}>{error}</p>
              <button className="ppq-btn" onClick={()=>{setError(null);setStep(total);generate();}}>Try Again</button>
            </div>
          ):parsed?(
            <FullKit kit={parsed} bizName={answers["businessName"]}/>
          ):(
            <div style={{padding:"0 32px 60px"}}><Spinner msg="Preparing your results…"/></div>
          )}
        </div>
      )}
    </div>
  );
}

I rewrote the page while keeping the app’s existing functionality intact. The new product name is:

The Posh Pink Brand Blueprint
It now presents the tool as a guided brand-direction experience rather than just a “Brand Kit Builder.” Your original app already creates colors, typography, logo concepts, brand voice, social media direction, service recommendations, and a downloadable PDF. 


App-rewritten.jsx

What I changed
Posh Pink Brand Kit Builder → The Posh Pink Brand Blueprint

Discover Your Brand Identity → Bring Your Brand to Life

Begin the Quiz → Create My Brand Blueprint

Generate My Brand Kit → Build My Brand Blueprint

Recommended Services → Your Next Best Steps

Updated the AI instructions so recommendations can naturally mention:

The AI Logo Blueprint

Posh Pink memberships

Personalized marketing or brand support

Updated the downloaded file name to:

business-name-brand-blueprint.pdf

Added a short clarification that the generated concepts are creative direction, not finished professional logos.

Changed the PDF header branding to The Posh Pink Brand Blueprint.

Put it into GitHub
Open src

Open App.jsx

Click the pencil icon

Select all the existing code and delete it

Open the downloaded rewritten file and copy everything

Paste it into GitHub

Click Commit changes

Wait for Netlify to redeploy

Do not change main.jsx. 


Library
/
App-rewritten.jsx


import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const C = {
  hotPink:   "#ff1493",
  bubblegum: "#ff69b4",
  softPink:  "#ffb6c1",
  blush:     "#fbeaf0",
  berry:     "#c2185b",
  plum:      "#4b1528",
  white:     "#ffffff",
  ink:       "#1a0a10",
  inkMid:    "#4a2535",
  inkLight:  "#9a6878",
  p50:       "#FFF0F5",
  p100:      "#FFD6E7",
  p200:      "#FFB3CF",
  p400:      "#F472A8",
  p600:      "#C2185B",
  p800:      "#880E4F",
  bg:        "#FAFAFA",
  bgAlt:     "#FFF5F7",
};

const QUESTIONS = [
  { id:"businessName", type:"text",   num:"01", q:"What is your business called?",              hint:"Your business name will appear in your personalized Brand Blueprint", placeholder:"Enter your business name…" },
  { id:"industry",     type:"multi",  num:"02", q:"What industry or industries do you serve?",  hint:"Select all that apply", options:["Beauty & Wellness","Health & Medical","Real Estate","Professional Services","Boutique Retail","Events & Hospitality","Pet Services","Creative & Design","Coaching & Education","Other"] },
  { id:"vibe",         type:"multi",  num:"03", q:"Which words feel most like your brand?",     hint:"Select all that resonate", options:["Luxurious & refined","Warm & approachable","Bold & modern","Playful & vibrant","Clean & minimal","Natural & organic","Elegant & feminine","Professional & credible"] },
  { id:"colors",       type:"multi",  num:"04", q:"Which color families appeal to you?",        hint:"Select everything that catches your eye", options:["Soft blush & rose","Deep burgundy & wine","Warm champagne & gold","Cool sage & olive","Classic black & white","Navy & midnight blue","Terracotta & rust","Lavender & lilac"] },
  { id:"audience",     type:"multi",  num:"05", q:"Who is your ideal client?",                  hint:"Select all that apply", options:["Busy professionals & executives","Individuals who value self-care & wellness","Small business owners","Families & homeowners","Health-conscious individuals","Couples & life events","Creatives & entrepreneurs"] },
  { id:"budget",       type:"single", num:"06", q:"What is your monthly marketing investment?", hint:"Choose the one that fits best", options:["Under $500","$500 – $1,000","$1,000 – $2,000","$2,000+","Not sure yet"] },
];

const injectStyles = () => {
  if (document.getElementById("ppq-styles")) return;
  const s = document.createElement("style");
  s.id = "ppq-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');
    .ppq*{box-sizing:border-box;margin:0;padding:0}
    .ppq{font-family:'DM Sans',sans-serif;background:${C.bg};color:${C.ink};min-height:100vh}
    @keyframes ppqUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes ppqFade{from{opacity:0}to{opacity:1}}
    @keyframes ppqPulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes ppqSpin{to{transform:rotate(360deg)}}
    .ppq-up{animation:ppqUp .5s cubic-bezier(.22,.61,.36,1) both}
    .ppq-fade{animation:ppqFade .4s ease both}
    .ppq-pulse{animation:ppqPulse 1.8s ease-in-out infinite}
    .ppq-opt{display:flex;align-items:center;gap:14px;padding:13px 18px;margin-bottom:8px;cursor:pointer;border:0.5px solid ${C.p200};background:${C.white};border-radius:10px;transition:border-color .18s,background .18s,box-shadow .18s}
    .ppq-opt:hover,.ppq-opt.on{border-color:${C.hotPink};background:${C.p50};box-shadow:0 2px 12px rgba(255,20,147,.08)}
    .ppq-box{width:18px;height:18px;flex-shrink:0;border:1.5px solid ${C.p200};background:transparent;border-radius:4px;display:flex;align-items:center;justify-content:center;transition:all .18s}
    .ppq-box.on{background:${C.hotPink};border-color:${C.hotPink}}
    .ppq-box.circ{border-radius:50%}
    .ppq-btn{background:${C.p800};color:${C.white};border:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:.08em;padding:14px 44px;border-radius:8px;cursor:pointer;transition:background .2s,transform .12s,box-shadow .2s;box-shadow:0 2px 16px rgba(136,14,79,.18)}
    .ppq-btn:hover{background:${C.berry};transform:translateY(-1px);box-shadow:0 4px 20px rgba(136,14,79,.25)}
    .ppq-btn:active{transform:translateY(0)}
    .ppq-btn:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none}
    .ppq-btn.hot{background:linear-gradient(135deg,${C.hotPink},${C.berry});box-shadow:0 2px 16px rgba(255,20,147,.3)}
    .ppq-btn.hot:hover{background:linear-gradient(135deg,${C.berry},${C.p800});box-shadow:0 4px 24px rgba(255,20,147,.4)}
    .ppq-btn.ghost{background:transparent;border:1px solid ${C.p200};color:${C.p600};box-shadow:none}
    .ppq-btn.ghost:hover{background:${C.p50};box-shadow:none}
    .ppq-input{width:100%;background:transparent;border:none;border-bottom:1.5px solid ${C.p200};padding:12px 0;font-family:'Cormorant Garamond',serif;font-size:32px;font-style:italic;color:${C.p800};outline:none;transition:border-color .2s}
    .ppq-input:focus{border-bottom-color:${C.hotPink}}
    .ppq-input::placeholder{color:${C.p200}}
    .ppq-chip{display:inline-block;border:0.5px solid ${C.p200};color:${C.p600};font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.08em;padding:5px 12px;margin:4px 4px 4px 0;border-radius:20px;background:${C.white}}
    .ppq-label{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.18em;color:${C.p600};margin-bottom:16px;text-transform:uppercase;font-weight:600}
    .ppq-back{background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:.06em;color:${C.inkLight};padding:0}
    .ppq-back:hover{color:${C.berry}}
    .ppq-divider{height:0.5px;background:${C.p100};margin:24px 0}
  `;
  document.head.appendChild(s);
};

const Logo = () => (
  <div style={{marginBottom:32}}>
    <img src="/logo.png" alt="Posh Pink Marketing" style={{height:46,width:"auto",objectFit:"contain"}}/>
  </div>
);

const Bar = ({cur,tot}) => {
  const pct = Math.round((cur/tot)*100);
  return (
    <div style={{marginBottom:40}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,letterSpacing:".06em",color:C.inkLight,fontWeight:500}}>Question {cur} of {tot}</span>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:18,color:C.hotPink}}>{pct}%</span>
      </div>
      <div style={{height:2,background:C.p100,borderRadius:1,position:"relative"}}>
        <div style={{position:"absolute",top:0,left:0,height:"2px",borderRadius:1,width:`${pct}%`,background:`linear-gradient(90deg,${C.berry},${C.hotPink})`,transition:"width .5s cubic-bezier(.22,.61,.36,1)"}}/>
      </div>
    </div>
  );
};

const Opt = ({label,checked,onToggle,radio}) => (
  <div onClick={onToggle} className={`ppq-opt${checked?" on":""}`}>
    <div className={`ppq-box${radio?" circ":""}${checked?" on":""}`}>
      {checked && <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><polyline points="1,3.5 3.5,6 9,1" stroke={C.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:C.inkMid,fontWeight:400}}>{label}</span>
  </div>
);

const Spinner = ({msg}) => (
  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24,padding:"80px 0"}}>
    <div style={{width:40,height:40,border:`1.5px solid ${C.p100}`,borderTop:`1.5px solid ${C.hotPink}`,borderRadius:"50%",animation:"ppqSpin 1s linear infinite"}}/>
    <p className="ppq-pulse" style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:22,color:C.p600}}>{msg}</p>
  </div>
);

const hexRgb = h => [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];

const makePDF = (kit, bizName) => {
  const doc = new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
  const W=210,H=297,M=18;
  doc.setFillColor(...hexRgb(C.blush)); doc.rect(0,0,W,H,"F");
  doc.setFillColor(...hexRgb(C.plum)); doc.rect(0,0,5,H,"F");
  doc.setFillColor(...hexRgb(C.plum)); doc.rect(0,0,W,44,"F");
  doc.setFont("helvetica","bolditalic"); doc.setFontSize(24); doc.setTextColor(...hexRgb(C.white));
  doc.text(bizName||"Your Brand",M+2,22);
  doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(...hexRgb(C.softPink));
  doc.setCharSpace(2.5); doc.text("THE POSH PINK BRAND BLUEPRINT",M+2,32); doc.setCharSpace(0);
  doc.setFontSize(7); doc.setTextColor(...hexRgb(C.bubblegum));
  doc.text("poshpinkmarketing.com",W-M,32,{align:"right"});
  let y=54;
  const sec=(label,yy)=>{
    doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(...hexRgb(C.berry));
    doc.setCharSpace(2.5); doc.text(label.toUpperCase(),M,yy); doc.setCharSpace(0);
    doc.setDrawColor(...hexRgb(C.softPink)); doc.setLineWidth(0.4);
    doc.line(M+doc.getTextWidth(label.toUpperCase())+3,yy-1,W-M,yy-1);
    return yy+7;
  };
  y=sec("Brand Archetype",y);
  doc.setFont("helvetica","bolditalic"); doc.setFontSize(20); doc.setTextColor(...hexRgb(C.plum));
  doc.text(kit.archetype||"",M,y+7); y+=12;
  doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.inkMid));
  const al=doc.splitTextToSize(kit.archetypeDescription||"",W-M*2);
  doc.text(al,M,y); y+=al.length*4.5+8;
  y=sec("Signature Color Palette",y);
  const cols=kit.colors||[]; const sw=26,sh=20,sg=6;
  cols.forEach((c,i)=>{
    const sx=M+i*(sw+sg);
    doc.setFillColor(...hexRgb(c.hex)); doc.rect(sx,y,sw,sh,"F");
    const rgb=hexRgb(c.hex); const lum=0.299*rgb[0]+0.587*rgb[1]+0.114*rgb[2];
    const tc=lum>140?hexRgb(C.inkMid):hexRgb(C.white);
    doc.setTextColor(tc[0],tc[1],tc[2]); doc.setFontSize(5.5);
    doc.text(c.hex,sx+sw/2,y+sh-3,{align:"center"});
    doc.setTextColor(...hexRgb(C.inkMid)); doc.setFontSize(7);
    doc.text(c.name,sx+sw/2,y+sh+5,{align:"center"});
  });
  y+=sh+14;
  y=sec("Logo Direction Concepts",y);
  const lc=cols.map(c=>c.hex);
  const lc1=lc[0]||C.hotPink,lc2=lc[1]||C.berry,lc3=lc[2]||C.softPink,lc4=lc[3]||C.plum;
  const nm=bizName||"Your Brand";
  const sh2=nm.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  const cbW=(W-M*2-10)/3;
  [0,1,2].forEach(i=>{
    const cx=M+i*(cbW+5);
    doc.setFillColor(...hexRgb(C.white)); doc.rect(cx,y,cbW,36,"F");
    doc.setDrawColor(...hexRgb(C.softPink)); doc.setLineWidth(0.4); doc.rect(cx,y,cbW,36);
    doc.setFontSize(7); doc.setTextColor(...hexRgb(C.inkLight));
    doc.setCharSpace(1.5); doc.text(`CONCEPT ${["A","B","C"][i]}`,cx+cbW/2,y+5,{align:"center"}); doc.setCharSpace(0);
    if(i===0){
      doc.setFillColor(...hexRgb(lc1)); doc.setGState(doc.GState({opacity:0.15})); doc.circle(cx+15,y+20,10,"F");
      doc.setGState(doc.GState({opacity:1})); doc.setDrawColor(...hexRgb(lc1)); doc.setLineWidth(0.8); doc.circle(cx+15,y+20,7,"S");
      doc.setFont("helvetica","bolditalic"); doc.setFontSize(8); doc.setTextColor(...hexRgb(lc4)); doc.text(sh2,cx+15,y+23,{align:"center"});
      doc.setFont("helvetica","italic"); doc.setFontSize(8); doc.text(nm,cx+28,y+19);
      doc.setDrawColor(...hexRgb(lc1)); doc.setLineWidth(0.4); doc.line(cx+28,y+22,cx+cbW-3,y+22);
      doc.setFont("helvetica","normal"); doc.setFontSize(5.5); doc.setTextColor(...hexRgb(lc2));
      doc.setCharSpace(2); doc.text("STUDIO",cx+28,y+28); doc.setCharSpace(0);
    } else if(i===1){
      const dx=cx+15,dy=y+20;
      doc.setFillColor(...hexRgb(lc2)); doc.setGState(doc.GState({opacity:0.2}));
      doc.triangle(dx,dy-10, dx+10,dy, dx,dy+10, "F");
      doc.triangle(dx,dy-10, dx-10,dy, dx,dy+10, "F");
      doc.setGState(doc.GState({opacity:1})); doc.setDrawColor(...hexRgb(lc2)); doc.setLineWidth(0.8);
      doc.triangle(dx,dy-10, dx+10,dy, dx,dy+10, "S");
      doc.triangle(dx,dy-10, dx-10,dy, dx,dy+10, "S");
      doc.setFont("helvetica","bold"); doc.setFontSize(7); doc.setTextColor(...hexRgb(lc4)); doc.text(sh2,dx,dy+2,{align:"center"});
      doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setCharSpace(1); doc.setTextColor(...hexRgb(lc4));
      doc.text(nm.toUpperCase(),cx+26,y+20); doc.setCharSpace(0);
      doc.setDrawColor(...hexRgb(lc3)); doc.line(cx+26,y+23,cx+cbW-3,y+23);
    } else {
      doc.setFillColor(...hexRgb(lc1)); doc.setGState(doc.GState({opacity:0.18}));
      doc.roundedRect(cx+5,y+15,18,10,5,5,"F"); doc.setGState(doc.GState({opacity:1}));
      doc.setFont("helvetica","bolditalic"); doc.setFontSize(8); doc.setTextColor(...hexRgb(lc4)); doc.text(sh2,cx+14,y+22,{align:"center"});
      doc.setFont("helvetica","italic"); doc.setFontSize(9); doc.text(nm,cx+26,y+21);
      doc.setFillColor(...hexRgb(lc1)); doc.circle(cx+cbW-5,y+20,2,"F");
      doc.setDrawColor(...hexRgb(lc1)); doc.circle(cx+cbW-5,y+20,3,"S");
    }
  });
  y+=44;
  y=sec("Typography Direction",y);
  (kit.fonts||[]).forEach((f,i)=>{
    const bx=M+i*(cbW+5);
    doc.setFillColor(...hexRgb(C.white)); doc.rect(bx,y,cbW,30,"F");
    doc.setDrawColor(...hexRgb(C.softPink)); doc.setLineWidth(0.4); doc.rect(bx,y,cbW,30);
    doc.setFont("helvetica","normal"); doc.setFontSize(6); doc.setTextColor(...hexRgb(C.inkLight));
    doc.setCharSpace(1.5); doc.text((f.role||"").toUpperCase(),bx+5,y+8); doc.setCharSpace(0);
    doc.setFont("helvetica","bolditalic"); doc.setFontSize(11); doc.setTextColor(...hexRgb(C.plum));
    doc.text(f.name||"",bx+5,y+18);
    doc.setFont("helvetica","normal"); doc.setFontSize(6.5); doc.setTextColor(...hexRgb(C.inkLight));
    const nl=doc.splitTextToSize(f.note||"",cbW-10); doc.text(nl[0]||"",bx+5,y+26);
  });
  y+=38;
  y=sec("Brand Voice & Keywords",y);
  let kx=M;
  (kit.voiceKeywords||[]).forEach(kw=>{
    const tw=doc.getTextWidth(kw.toUpperCase())+10;
    if(kx+tw>W-M){kx=M;y+=12;}
    doc.setDrawColor(...hexRgb(C.bubblegum)); doc.setLineWidth(0.5); doc.rect(kx,y,tw,8);
    doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(...hexRgb(C.berry));
    doc.setCharSpace(1.2); doc.text(kw.toUpperCase(),kx+5,y+5.5); doc.setCharSpace(0);
    kx+=tw+4;
  });
  y+=14;
  if(kit.tagline){
    doc.setDrawColor(...hexRgb(C.hotPink)); doc.setLineWidth(1.5); doc.line(M,y,M,y+14);
    doc.setFont("helvetica","bolditalic"); doc.setFontSize(12); doc.setTextColor(...hexRgb(C.plum));
    doc.text(`"${kit.tagline}"`,M+8,y+9); y+=20;
  }
  if(kit.brandPersonality&&y<H-55){
    y=sec("Brand Personality",y);
    doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.inkMid));
    const pl=doc.splitTextToSize(kit.brandPersonality||"",W-M*2);
    doc.text(pl,M,y); y+=pl.length*4.5+8;
  }
  if(kit.socialMediaTip&&y<H-40){
    y=sec("Social Media Direction",y);
    doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.inkMid));
    const sl=doc.splitTextToSize(kit.socialMediaTip||"",W-M*2);
    doc.text(sl,M,y); y+=sl.length*4.5+8;
  }
  if(y<H-40){
    y=sec("Your Next Best Steps",y);
    (kit.services||[]).forEach((svc,i)=>{
      if(y>H-30)return;
      doc.setFont("helvetica","bolditalic"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.hotPink)); doc.text(`0${i+1}`,M,y+4);
      doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.plum)); doc.text(svc.name||"",M+10,y+4);
      doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(...hexRgb(C.inkLight));
      const dl=doc.splitTextToSize(svc.description||"",W-M*2-14); doc.text(dl,M+10,y+9); y+=dl.length*4+10;
    });
  }
  doc.setFillColor(...hexRgb(C.plum)); doc.rect(0,H-16,W,16,"F");
  doc.setFont("helvetica","italic"); doc.setFontSize(7.5); doc.setTextColor(...hexRgb(C.softPink));
  doc.text("Crafted with love by Posh Pink Marketing  ·  poshpinkmarketing.com  ·  info@poshpinkmarketing.com",W/2,H-7,{align:"center"});
  return doc;
};

const logoSVGs = (name,colors) => {
  const c1=(colors[0]||{hex:C.hotPink}).hex,c2=(colors[1]||{hex:C.berry}).hex;
  const c3=(colors[2]||{hex:C.softPink}).hex,c4=(colors[3]||{hex:C.plum}).hex;
  const sh=name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="190" height="64" viewBox="0 0 190 64"><circle cx="32" cy="32" r="24" fill="${c1}" opacity="0.15"/><circle cx="32" cy="32" r="16" fill="none" stroke="${c1}" stroke-width="1.5"/><text x="32" y="37" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="${c4}" letter-spacing="2">${sh}</text><text x="62" y="28" font-family="Georgia,serif" font-style="italic" font-size="13" fill="${c4}">${name}</text><line x1="62" y1="33" x2="185" y2="33" stroke="${c1}" stroke-width="0.8"/><text x="62" y="44" font-family="Arial,sans-serif" font-size="7" fill="${c2}" letter-spacing="3">BRAND STUDIO</text></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="190" height="64" viewBox="0 0 190 64"><polygon points="32,6 52,32 32,58 12,32" fill="none" stroke="${c2}" stroke-width="1.5"/><polygon points="32,16 46,32 32,48 18,32" fill="${c2}" opacity="0.2"/><text x="32" y="36" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="${c4}">${sh}</text><text x="60" y="30" font-family="Georgia,serif" font-size="12" fill="${c4}" letter-spacing="1">${name.toUpperCase()}</text><line x1="60" y1="36" x2="185" y2="36" stroke="${c3}" stroke-width="1"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="190" height="64" viewBox="0 0 190 64"><rect x="8" y="24" width="36" height="16" rx="8" fill="${c1}" opacity="0.18"/><text x="26" y="35" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="10" fill="${c4}">${sh}</text><text x="52" y="34" font-family="Georgia,serif" font-size="13" fill="${c4}">${name}</text><circle cx="182" cy="32" r="4" fill="none" stroke="${c1}" stroke-width="1.2"/><circle cx="182" cy="32" r="1.5" fill="${c1}"/></svg>`,
  ];
};

const FullKit = ({kit,bizName}) => {
  const [busy,setBusy]=useState(false);
  const download=()=>{
    setBusy(true);
    try{
      const doc=makePDF(kit,bizName);
      doc.save(`${(bizName||"brand-blueprint").replace(/\s+/g,"-").toLowerCase()}-brand-blueprint.pdf`);
    } catch(e){
      console.error("PDF error:", e);
      alert("PDF error: " + e.message);
    }
    setBusy(false);
  };
  return (
    <div className="ppq-fade">
      <div style={{background:`linear-gradient(135deg,${C.p800} 0%,${C.plum} 100%)`,padding:"52px 40px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",border:"1px solid rgba(255,20,147,.12)",pointerEvents:"none"}}/>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:".2em",color:C.p200,marginBottom:14,opacity:.8,fontWeight:500,textTransform:"uppercase"}}>Your Brand Direction</p>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:48,color:C.white,marginBottom:16,lineHeight:1.1}}>{kit.archetype}</h1>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:300,lineHeight:1.9,color:"rgba(255,209,226,.8)",maxWidth:440}}>{kit.archetypeDescription}</p>
      </div>
      <div style={{background:C.white,padding:"32px 40px 28px",borderBottom:`0.5px solid ${C.p100}`}}>
        <p className="ppq-label">Signature Color Palette</p>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {(kit.colors||[]).map((c,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{width:60,height:60,background:c.hex,border:`0.5px solid ${C.p100}`,borderRadius:8,marginBottom:7}}/><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:C.inkLight,letterSpacing:".06em"}}>{c.hex}</p><p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:12,color:C.inkMid,marginTop:2}}>{c.name}</p></div>))}
        </div>
      </div>
      <div style={{background:C.bgAlt,padding:"32px 40px 28px",borderBottom:`0.5px solid ${C.p100}`}}>
        <p className="ppq-label">Typography Direction</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {(kit.fonts||[]).map((f,i)=>(<div key={i} style={{padding:"20px",background:C.white,border:`0.5px solid ${C.p100}`,borderRadius:10}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:".14em",color:C.inkLight,marginBottom:8,textTransform:"uppercase",fontWeight:600}}>{f.role}</p><p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:26,color:C.p800,marginBottom:6}}>{f.name}</p><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.inkLight,lineHeight:1.7,fontWeight:300}}>{f.note}</p></div>))}
        </div>
      </div>
      <div style={{background:C.white,padding:"32px 40px 28px",borderBottom:`0.5px solid ${C.p100}`}}>
        <p className="ppq-label">Logo Direction Concepts</p>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.inkLight,marginBottom:16,lineHeight:1.8,fontWeight:300}}>These are visual direction concepts—not finished logos. Use them as inspiration or share them with a designer when you are ready to create your final logo.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {["A","B","C"].map((letter,i)=>(<div key={i} style={{padding:"14px 8px",background:C.bgAlt,border:`0.5px solid ${C.p100}`,borderRadius:8,textAlign:"center"}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:".16em",color:C.inkLight,marginBottom:8,textTransform:"uppercase",fontWeight:600}}>Concept {letter}</p><div style={{overflow:"hidden",display:"flex",justifyContent:"center"}} dangerouslySetInnerHTML={{__html:logoSVGs(bizName,kit.colors||[])[i]}}/></div>))}
        </div>
      </div>
      <div style={{background:C.bgAlt,padding:"32px 40px 28px",borderBottom:`0.5px solid ${C.p100}`}}>
        <p className="ppq-label">Brand Voice & Personality</p>
        <div style={{marginBottom:16}}>{(kit.voiceKeywords||[]).map((kw,i)=><span key={i} className="ppq-chip">{kw}</span>)}</div>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:24,color:C.berry,lineHeight:1.7,borderLeft:`2px solid ${C.hotPink}`,paddingLeft:16,marginBottom:16}}>"{kit.tagline}"</p>
        {kit.brandPersonality&&<p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.inkMid,lineHeight:1.85,fontWeight:300}}>{kit.brandPersonality}</p>}
      </div>
      {kit.socialMediaTip&&(
        <div style={{background:C.white,padding:"32px 40px 28px",borderBottom:`0.5px solid ${C.p100}`}}>
          <p className="ppq-label">Social Media Direction</p>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.inkMid,lineHeight:1.85,fontWeight:300}}>{kit.socialMediaTip}</p>
        </div>
      )}
      <div style={{background:C.bgAlt,padding:"32px 40px 28px",borderBottom:`0.5px solid ${C.p100}`}}>
        <p className="ppq-label">Your Next Best Steps</p>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.inkLight,marginBottom:16,lineHeight:1.8,fontWeight:300}}>Use these recommendations as a simple roadmap. Start with the step that feels most useful for your business right now.</p>
        <div style={{display:"grid",gap:8}}>
          {(kit.services||[]).map((svc,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"16px 18px",background:C.white,border:`0.5px solid ${C.p100}`,borderRadius:10}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:28,color:C.hotPink,opacity:.5,lineHeight:1,flexShrink:0,marginTop:2}}>{String(i+1).padStart(2,"0")}</span><div><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,letterSpacing:".06em",color:C.p800,marginBottom:4,fontWeight:500}}>{svc.name}</p><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.inkLight,lineHeight:1.8,fontWeight:300}}>{svc.description}</p></div></div>))}
        </div>
      </div>
      <div style={{background:`linear-gradient(135deg,${C.p800} 0%,${C.plum} 100%)`,padding:"52px 40px",textAlign:"center"}}>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:36,color:C.softPink,marginBottom:10}}>Your Brand Blueprint Is Ready</p>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:300,color:"rgba(255,209,226,.75)",marginBottom:28,maxWidth:340,margin:"0 auto 28px",lineHeight:1.9}}>Download your personalized one-page Brand Blueprint with your colors, fonts, brand voice, logo direction, and next-step recommendations.</p>
        <button className="ppq-btn hot" onClick={download} disabled={busy} style={{marginBottom:14,minWidth:220}}>{busy?"Generating PDF…":"⬇ Download My Brand Blueprint"}</button>
        <br/>
        <a href="https://www.poshpinkmarketing.com/contact" style={{textDecoration:"none"}}><button className="ppq-btn ghost" style={{marginTop:12}}>Get Personalized Brand Support</button></a>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:".1em",color:C.p200,marginTop:18,opacity:.7}}>info@poshpinkmarketing.com</p>
      </div>
    </div>
  );
};

export default function App() {
  useEffect(()=>{injectStyles();},[]);
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [result,setResult]=useState(null);
  const [error,setError]=useState(null);
  const total=QUESTIONS.length;
  const curQ=QUESTIONS[step-1];

  const ans=(qId,val,type)=>{
    if(type==="text"){setAnswers(p=>({...p,[qId]:val}));return;}
    if(type==="single"){setAnswers(p=>({...p,[qId]:val}));return;}
    setAnswers(p=>{const c=p[qId]||[];return{...p,[qId]:c.includes(val)?c.filter(v=>v!==val):[...c,val]};});
  };

  const canGo=()=>{
    if(!curQ)return false;
    const a=answers[curQ.id];
    if(curQ.type==="text")return a&&a.trim().length>0;
    if(curQ.type==="single")return !!a;
    return a&&a.length>0;
  };

  const next=()=>{
    if(step<total){setStep(s=>s+1);}
    else{setStep(total+1);generate();}
  };

  const generate=async()=>{
    const biz=answers["businessName"]||"your business";
    const prompt=`You are an experienced small-business brand strategist. Generate a clear, practical, personalized brand blueprint for ${biz}.
Quiz answers:
- Industry: ${(answers["industry"]||[]).join(", ")||"not specified"}
- Brand vibe: ${(answers["vibe"]||[]).join(", ")}
- Color preferences: ${(answers["colors"]||[]).join(", ")}
- Ideal client: ${(answers["audience"]||[]).join(", ")||"not specified"}
- Monthly budget: ${answers["budget"]||"not specified"}
Respond ONLY with valid JSON (no markdown, no preamble, no code fences):
{"archetype":"2-4 word poetic brand archetype title","archetypeDescription":"2-3 sentences describing this archetype","colors":[{"hex":"#HEXCODE","name":"Color Name"},{"hex":"#HEXCODE","name":"Color Name"},{"hex":"#HEXCODE","name":"Color Name"},{"hex":"#HEXCODE","name":"Color Name"}],"fonts":[{"role":"Display / Heading","name":"Font Name","note":"One sentence on why this suits the brand"},{"role":"Body / Supporting","name":"Font Name","note":"One sentence on why this suits the brand"}],"voiceKeywords":["word1","word2","word3","word4","word5"],"tagline":"Short evocative brand tagline","brandPersonality":"2-3 sentences describing the brand personality and how it shows up in all touchpoints","socialMediaTip":"2-3 sentences of specific social media direction — which platforms, what type of content, what visual style to use","services":[{"name":"Recommended Next Step","description":"1-2 sentences explaining the most useful next action"},{"name":"Helpful Posh Pink Resource","description":"1-2 sentences recommending an appropriate option such as the AI Logo Blueprint, a Posh Pink membership, or personalized marketing support"},{"name":"Future Growth Focus","description":"1-2 sentences explaining a longer-term brand or marketing priority"}]}
All hex codes must be valid 6-digit hex values.`;
    try{
      const res=await fetch("/.netlify/functions/claude",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt})});
      const d=await res.json();
      if(!d.result)throw new Error("Empty");
      setResult(d.result);
      setStep(total+2);
    }catch(e){
      setError("Something went wrong while creating your Brand Blueprint. Please try again.");
      setStep(total+2);
    }
  };

  const parsed=(()=>{
    if(!result)return null;
    try{return JSON.parse(result.replace(/```json|```/g,"").trim());}catch{return null;}
  })();

  const wrap={maxWidth:600,margin:"0 auto",padding:"60px 32px"};

  return (
    <div className="ppq" style={{minHeight:"100vh"}}>
      {step===0&&(
        <div className="ppq-up" style={wrap}>
          <Logo/>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:".22em",color:C.p600,marginBottom:18,fontWeight:600,textTransform:"uppercase"}}>The Posh Pink Brand Blueprint</p>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:60,color:C.p800,marginBottom:18,lineHeight:1.05}}>Bring Your<br/>Brand to Life</h1>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:300,color:C.inkLight,lineHeight:1.95,marginBottom:40,maxWidth:400}}>Answer six quick questions and receive a personalized brand direction with a color palette, font suggestions, logo inspiration, brand voice, social media guidance, and a downloadable PDF.</p>
          <button className="ppq-btn" onClick={()=>setStep(1)}>Create My Brand Blueprint</button>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:C.inkLight,marginTop:14,letterSpacing:".06em"}}>About 3 minutes</p>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:C.inkLight,marginTop:10,lineHeight:1.7,maxWidth:430}}>Your results provide creative direction and a starting point for your brand. They are not a substitute for a complete custom brand strategy or professionally designed logo.</p>
        </div>
      )}
      {step>=1&&step<=total&&curQ&&(
        <div key={step} className="ppq-up" style={wrap}>
          <Logo/>
          <Bar cur={step} tot={total}/>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:18,color:C.hotPink,marginBottom:6}}>{curQ.num}</p>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:500,color:C.p800,marginBottom:6,lineHeight:1.25}}>{curQ.q}</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.inkLight,marginBottom:curQ.type==="multi"?4:24,fontWeight:300}}>{curQ.hint}</p>
          {curQ.type==="multi"&&<p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:C.p400,fontStyle:"italic",marginBottom:18}}>You can select more than one.</p>}
          {curQ.type==="text"&&<input className="ppq-input" type="text" placeholder={curQ.placeholder} value={answers[curQ.id]||""} autoFocus onChange={e=>ans(curQ.id,e.target.value,"text")} onKeyDown={e=>{if(e.key==="Enter"&&canGo())next();}}/>}
          {(curQ.type==="single"||curQ.type==="multi")&&<div>{curQ.options.map(opt=><Opt key={opt} label={opt} radio={curQ.type==="single"} checked={curQ.type==="single"?answers[curQ.id]===opt:(answers[curQ.id]||[]).includes(opt)} onToggle={()=>ans(curQ.id,opt,curQ.type)}/>)}</div>}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:32}}>
            {step>1?<button className="ppq-back" onClick={()=>setStep(s=>s-1)}>← Back</button>:<div/>}
            <button className="ppq-btn" onClick={next} disabled={!canGo()}>{step===total?"Build My Brand Blueprint":"Continue"}</button>
          </div>
        </div>
      )}
      {step===total+1&&(<div style={wrap}><Logo/><Spinner msg="Creating your Brand Blueprint…"/></div>)}
      {step===total+2&&(
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{padding:"52px 32px 0"}}>
            <Logo/>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:".18em",color:C.inkLight,marginBottom:6,textTransform:"uppercase",fontWeight:500}}>Brand Blueprint prepared for</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:44,color:C.p800}}>{answers["businessName"]||"Your Brand"}</h2>
            <div className="ppq-divider"/>
          </div>
          {error?(
            <div style={{padding:"0 32px 60px",textAlign:"center"}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",color:C.inkLight,marginBottom:20,fontWeight:300}}>{error}</p>
              <button className="ppq-btn" onClick={()=>{setError(null);setStep(total);generate();}}>Try Again</button>
            </div>
          ):parsed?(
            <FullKit kit={parsed} bizName={answers["businessName"]}/>
          ):(
            <div style={{padding:"0 32px 60px"}}><Spinner msg="Preparing your results…"/></div>
          )}
        </div>
      )}
    </div>
  );
}
Library
/
App-rewritten.jsx


import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const C = {
  hotPink:   "#ff1493",
  bubblegum: "#ff69b4",
  softPink:  "#ffb6c1",
  blush:     "#fbeaf0",
  berry:     "#c2185b",
  plum:      "#4b1528",
  white:     "#ffffff",
  ink:       "#1a0a10",
  inkMid:    "#4a2535",
  inkLight:  "#9a6878",
  p50:       "#FFF0F5",
  p100:      "#FFD6E7",
  p200:      "#FFB3CF",
  p400:      "#F472A8",
  p600:      "#C2185B",
  p800:      "#880E4F",
  bg:        "#FAFAFA",
  bgAlt:     "#FFF5F7",
};

const QUESTIONS = [
  { id:"businessName", type:"text",   num:"01", q:"What is your business called?",              hint:"Your business name will appear in your personalized Brand Blueprint", placeholder:"Enter your business name…" },
  { id:"industry",     type:"multi",  num:"02", q:"What industry or industries do you serve?",  hint:"Select all that apply", options:["Beauty & Wellness","Health & Medical","Real Estate","Professional Services","Boutique Retail","Events & Hospitality","Pet Services","Creative & Design","Coaching & Education","Other"] },
  { id:"vibe",         type:"multi",  num:"03", q:"Which words feel most like your brand?",     hint:"Select all that resonate", options:["Luxurious & refined","Warm & approachable","Bold & modern","Playful & vibrant","Clean & minimal","Natural & organic","Elegant & feminine","Professional & credible"] },
  { id:"colors",       type:"multi",  num:"04", q:"Which color families appeal to you?",        hint:"Select everything that catches your eye", options:["Soft blush & rose","Deep burgundy & wine","Warm champagne & gold","Cool sage & olive","Classic black & white","Navy & midnight blue","Terracotta & rust","Lavender & lilac"] },
  { id:"audience",     type:"multi",  num:"05", q:"Who is your ideal client?",                  hint:"Select all that apply", options:["Busy professionals & executives","Individuals who value self-care & wellness","Small business owners","Families & homeowners","Health-conscious individuals","Couples & life events","Creatives & entrepreneurs"] },
  { id:"budget",       type:"single", num:"06", q:"What is your monthly marketing investment?", hint:"Choose the one that fits best", options:["Under $500","$500 – $1,000","$1,000 – $2,000","$2,000+","Not sure yet"] },
];

const injectStyles = () => {
  if (document.getElementById("ppq-styles")) return;
  const s = document.createElement("style");
  s.id = "ppq-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');
    .ppq*{box-sizing:border-box;margin:0;padding:0}
    .ppq{font-family:'DM Sans',sans-serif;background:${C.bg};color:${C.ink};min-height:100vh}
    @keyframes ppqUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes ppqFade{from{opacity:0}to{opacity:1}}
    @keyframes ppqPulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes ppqSpin{to{transform:rotate(360deg)}}
    .ppq-up{animation:ppqUp .5s cubic-bezier(.22,.61,.36,1) both}
    .ppq-fade{animation:ppqFade .4s ease both}
    .ppq-pulse{animation:ppqPulse 1.8s ease-in-out infinite}
    .ppq-opt{display:flex;align-items:center;gap:14px;padding:13px 18px;margin-bottom:8px;cursor:pointer;border:0.5px solid ${C.p200};background:${C.white};border-radius:10px;transition:border-color .18s,background .18s,box-shadow .18s}
    .ppq-opt:hover,.ppq-opt.on{border-color:${C.hotPink};background:${C.p50};box-shadow:0 2px 12px rgba(255,20,147,.08)}
    .ppq-box{width:18px;height:18px;flex-shrink:0;border:1.5px solid ${C.p200};background:transparent;border-radius:4px;display:flex;align-items:center;justify-content:center;transition:all .18s}
    .ppq-box.on{background:${C.hotPink};border-color:${C.hotPink}}
    .ppq-box.circ{border-radius:50%}
    .ppq-btn{background:${C.p800};color:${C.white};border:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:.08em;padding:14px 44px;border-radius:8px;cursor:pointer;transition:background .2s,transform .12s,box-shadow .2s;box-shadow:0 2px 16px rgba(136,14,79,.18)}
    .ppq-btn:hover{background:${C.berry};transform:translateY(-1px);box-shadow:0 4px 20px rgba(136,14,79,.25)}
    .ppq-btn:active{transform:translateY(0)}
    .ppq-btn:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none}
    .ppq-btn.hot{background:linear-gradient(135deg,${C.hotPink},${C.berry});box-shadow:0 2px 16px rgba(255,20,147,.3)}
    .ppq-btn.hot:hover{background:linear-gradient(135deg,${C.berry},${C.p800});box-shadow:0 4px 24px rgba(255,20,147,.4)}
    .ppq-btn.ghost{background:transparent;border:1px solid ${C.p200};color:${C.p600};box-shadow:none}
    .ppq-btn.ghost:hover{background:${C.p50};box-shadow:none}
    .ppq-input{width:100%;background:transparent;border:none;border-bottom:1.5px solid ${C.p200};padding:12px 0;font-family:'Cormorant Garamond',serif;font-size:32px;font-style:italic;color:${C.p800};outline:none;transition:border-color .2s}
    .ppq-input:focus{border-bottom-color:${C.hotPink}}
    .ppq-input::placeholder{color:${C.p200}}
    .ppq-chip{display:inline-block;border:0.5px solid ${C.p200};color:${C.p600};font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.08em;padding:5px 12px;margin:4px 4px 4px 0;border-radius:20px;background:${C.white}}
    .ppq-label{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.18em;color:${C.p600};margin-bottom:16px;text-transform:uppercase;font-weight:600}
    .ppq-back{background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:.06em;color:${C.inkLight};padding:0}
    .ppq-back:hover{color:${C.berry}}
    .ppq-divider{height:0.5px;background:${C.p100};margin:24px 0}
  `;
  document.head.appendChild(s);
};

const Logo = () => (
  <div style={{marginBottom:32}}>
    <img src="/logo.png" alt="Posh Pink Marketing" style={{height:46,width:"auto",objectFit:"contain"}}/>
  </div>
);

const Bar = ({cur,tot}) => {
  const pct = Math.round((cur/tot)*100);
  return (
    <div style={{marginBottom:40}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,letterSpacing:".06em",color:C.inkLight,fontWeight:500}}>Question {cur} of {tot}</span>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:18,color:C.hotPink}}>{pct}%</span>
      </div>
      <div style={{height:2,background:C.p100,borderRadius:1,position:"relative"}}>
        <div style={{position:"absolute",top:0,left:0,height:"2px",borderRadius:1,width:`${pct}%`,background:`linear-gradient(90deg,${C.berry},${C.hotPink})`,transition:"width .5s cubic-bezier(.22,.61,.36,1)"}}/>
      </div>
    </div>
  );
};

const Opt = ({label,checked,onToggle,radio}) => (
  <div onClick={onToggle} className={`ppq-opt${checked?" on":""}`}>
    <div className={`ppq-box${radio?" circ":""}${checked?" on":""}`}>
      {checked && <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><polyline points="1,3.5 3.5,6 9,1" stroke={C.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:C.inkMid,fontWeight:400}}>{label}</span>
  </div>
);

const Spinner = ({msg}) => (
  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24,padding:"80px 0"}}>
    <div style={{width:40,height:40,border:`1.5px solid ${C.p100}`,borderTop:`1.5px solid ${C.hotPink}`,borderRadius:"50%",animation:"ppqSpin 1s linear infinite"}}/>
    <p className="ppq-pulse" style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:22,color:C.p600}}>{msg}</p>
  </div>
);

const hexRgb = h => [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];

const makePDF = (kit, bizName) => {
  const doc = new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
  const W=210,H=297,M=18;
  doc.setFillColor(...hexRgb(C.blush)); doc.rect(0,0,W,H,"F");
  doc.setFillColor(...hexRgb(C.plum)); doc.rect(0,0,5,H,"F");
  doc.setFillColor(...hexRgb(C.plum)); doc.rect(0,0,W,44,"F");
  doc.setFont("helvetica","bolditalic"); doc.setFontSize(24); doc.setTextColor(...hexRgb(C.white));
  doc.text(bizName||"Your Brand",M+2,22);
  doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(...hexRgb(C.softPink));
  doc.setCharSpace(2.5); doc.text("THE POSH PINK BRAND BLUEPRINT",M+2,32); doc.setCharSpace(0);
  doc.setFontSize(7); doc.setTextColor(...hexRgb(C.bubblegum));
  doc.text("poshpinkmarketing.com",W-M,32,{align:"right"});
  let y=54;
  const sec=(label,yy)=>{
    doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(...hexRgb(C.berry));
    doc.setCharSpace(2.5); doc.text(label.toUpperCase(),M,yy); doc.setCharSpace(0);
    doc.setDrawColor(...hexRgb(C.softPink)); doc.setLineWidth(0.4);
    doc.line(M+doc.getTextWidth(label.toUpperCase())+3,yy-1,W-M,yy-1);
    return yy+7;
  };
  y=sec("Brand Archetype",y);
  doc.setFont("helvetica","bolditalic"); doc.setFontSize(20); doc.setTextColor(...hexRgb(C.plum));
  doc.text(kit.archetype||"",M,y+7); y+=12;
  doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.inkMid));
  const al=doc.splitTextToSize(kit.archetypeDescription||"",W-M*2);
  doc.text(al,M,y); y+=al.length*4.5+8;
  y=sec("Signature Color Palette",y);
  const cols=kit.colors||[]; const sw=26,sh=20,sg=6;
  cols.forEach((c,i)=>{
    const sx=M+i*(sw+sg);
    doc.setFillColor(...hexRgb(c.hex)); doc.rect(sx,y,sw,sh,"F");
    const rgb=hexRgb(c.hex); const lum=0.299*rgb[0]+0.587*rgb[1]+0.114*rgb[2];
    const tc=lum>140?hexRgb(C.inkMid):hexRgb(C.white);
    doc.setTextColor(tc[0],tc[1],tc[2]); doc.setFontSize(5.5);
    doc.text(c.hex,sx+sw/2,y+sh-3,{align:"center"});
    doc.setTextColor(...hexRgb(C.inkMid)); doc.setFontSize(7);
    doc.text(c.name,sx+sw/2,y+sh+5,{align:"center"});
  });
  y+=sh+14;
  y=sec("Logo Direction Concepts",y);
  const lc=cols.map(c=>c.hex);
  const lc1=lc[0]||C.hotPink,lc2=lc[1]||C.berry,lc3=lc[2]||C.softPink,lc4=lc[3]||C.plum;
  const nm=bizName||"Your Brand";
  const sh2=nm.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  const cbW=(W-M*2-10)/3;
  [0,1,2].forEach(i=>{
    const cx=M+i*(cbW+5);
    doc.setFillColor(...hexRgb(C.white)); doc.rect(cx,y,cbW,36,"F");
    doc.setDrawColor(...hexRgb(C.softPink)); doc.setLineWidth(0.4); doc.rect(cx,y,cbW,36);
    doc.setFontSize(7); doc.setTextColor(...hexRgb(C.inkLight));
    doc.setCharSpace(1.5); doc.text(`CONCEPT ${["A","B","C"][i]}`,cx+cbW/2,y+5,{align:"center"}); doc.setCharSpace(0);
    if(i===0){
      doc.setFillColor(...hexRgb(lc1)); doc.setGState(doc.GState({opacity:0.15})); doc.circle(cx+15,y+20,10,"F");
      doc.setGState(doc.GState({opacity:1})); doc.setDrawColor(...hexRgb(lc1)); doc.setLineWidth(0.8); doc.circle(cx+15,y+20,7,"S");
      doc.setFont("helvetica","bolditalic"); doc.setFontSize(8); doc.setTextColor(...hexRgb(lc4)); doc.text(sh2,cx+15,y+23,{align:"center"});
      doc.setFont("helvetica","italic"); doc.setFontSize(8); doc.text(nm,cx+28,y+19);
      doc.setDrawColor(...hexRgb(lc1)); doc.setLineWidth(0.4); doc.line(cx+28,y+22,cx+cbW-3,y+22);
      doc.setFont("helvetica","normal"); doc.setFontSize(5.5); doc.setTextColor(...hexRgb(lc2));
      doc.setCharSpace(2); doc.text("STUDIO",cx+28,y+28); doc.setCharSpace(0);
    } else if(i===1){
      const dx=cx+15,dy=y+20;
      doc.setFillColor(...hexRgb(lc2)); doc.setGState(doc.GState({opacity:0.2}));
      doc.triangle(dx,dy-10, dx+10,dy, dx,dy+10, "F");
      doc.triangle(dx,dy-10, dx-10,dy, dx,dy+10, "F");
      doc.setGState(doc.GState({opacity:1})); doc.setDrawColor(...hexRgb(lc2)); doc.setLineWidth(0.8);
      doc.triangle(dx,dy-10, dx+10,dy, dx,dy+10, "S");
      doc.triangle(dx,dy-10, dx-10,dy, dx,dy+10, "S");
      doc.setFont("helvetica","bold"); doc.setFontSize(7); doc.setTextColor(...hexRgb(lc4)); doc.text(sh2,dx,dy+2,{align:"center"});
      doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setCharSpace(1); doc.setTextColor(...hexRgb(lc4));
      doc.text(nm.toUpperCase(),cx+26,y+20); doc.setCharSpace(0);
      doc.setDrawColor(...hexRgb(lc3)); doc.line(cx+26,y+23,cx+cbW-3,y+23);
    } else {
      doc.setFillColor(...hexRgb(lc1)); doc.setGState(doc.GState({opacity:0.18}));
      doc.roundedRect(cx+5,y+15,18,10,5,5,"F"); doc.setGState(doc.GState({opacity:1}));
      doc.setFont("helvetica","bolditalic"); doc.setFontSize(8); doc.setTextColor(...hexRgb(lc4)); doc.text(sh2,cx+14,y+22,{align:"center"});
      doc.setFont("helvetica","italic"); doc.setFontSize(9); doc.text(nm,cx+26,y+21);
      doc.setFillColor(...hexRgb(lc1)); doc.circle(cx+cbW-5,y+20,2,"F");
      doc.setDrawColor(...hexRgb(lc1)); doc.circle(cx+cbW-5,y+20,3,"S");
    }
  });
  y+=44;
  y=sec("Typography Direction",y);
  (kit.fonts||[]).forEach((f,i)=>{
    const bx=M+i*(cbW+5);
    doc.setFillColor(...hexRgb(C.white)); doc.rect(bx,y,cbW,30,"F");
    doc.setDrawColor(...hexRgb(C.softPink)); doc.setLineWidth(0.4); doc.rect(bx,y,cbW,30);
    doc.setFont("helvetica","normal"); doc.setFontSize(6); doc.setTextColor(...hexRgb(C.inkLight));
    doc.setCharSpace(1.5); doc.text((f.role||"").toUpperCase(),bx+5,y+8); doc.setCharSpace(0);
    doc.setFont("helvetica","bolditalic"); doc.setFontSize(11); doc.setTextColor(...hexRgb(C.plum));
    doc.text(f.name||"",bx+5,y+18);
    doc.setFont("helvetica","normal"); doc.setFontSize(6.5); doc.setTextColor(...hexRgb(C.inkLight));
    const nl=doc.splitTextToSize(f.note||"",cbW-10); doc.text(nl[0]||"",bx+5,y+26);
  });
  y+=38;
  y=sec("Brand Voice & Keywords",y);
  let kx=M;
  (kit.voiceKeywords||[]).forEach(kw=>{
    const tw=doc.getTextWidth(kw.toUpperCase())+10;
    if(kx+tw>W-M){kx=M;y+=12;}
    doc.setDrawColor(...hexRgb(C.bubblegum)); doc.setLineWidth(0.5); doc.rect(kx,y,tw,8);
    doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(...hexRgb(C.berry));
    doc.setCharSpace(1.2); doc.text(kw.toUpperCase(),kx+5,y+5.5); doc.setCharSpace(0);
    kx+=tw+4;
  });
  y+=14;
  if(kit.tagline){
    doc.setDrawColor(...hexRgb(C.hotPink)); doc.setLineWidth(1.5); doc.line(M,y,M,y+14);
    doc.setFont("helvetica","bolditalic"); doc.setFontSize(12); doc.setTextColor(...hexRgb(C.plum));
    doc.text(`"${kit.tagline}"`,M+8,y+9); y+=20;
  }
  if(kit.brandPersonality&&y<H-55){
    y=sec("Brand Personality",y);
    doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.inkMid));
    const pl=doc.splitTextToSize(kit.brandPersonality||"",W-M*2);
    doc.text(pl,M,y); y+=pl.length*4.5+8;
  }
  if(kit.socialMediaTip&&y<H-40){
    y=sec("Social Media Direction",y);
    doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.inkMid));
    const sl=doc.splitTextToSize(kit.socialMediaTip||"",W-M*2);
    doc.text(sl,M,y); y+=sl.length*4.5+8;
  }
  if(y<H-40){
    y=sec("Your Next Best Steps",y);
    (kit.services||[]).forEach((svc,i)=>{
      if(y>H-30)return;
      doc.setFont("helvetica","bolditalic"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.hotPink)); doc.text(`0${i+1}`,M,y+4);
      doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(...hexRgb(C.plum)); doc.text(svc.name||"",M+10,y+4);
      doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(...hexRgb(C.inkLight));
      const dl=doc.splitTextToSize(svc.description||"",W-M*2-14); doc.text(dl,M+10,y+9); y+=dl.length*4+10;
    });
  }
  doc.setFillColor(...hexRgb(C.plum)); doc.rect(0,H-16,W,16,"F");
  doc.setFont("helvetica","italic"); doc.setFontSize(7.5); doc.setTextColor(...hexRgb(C.softPink));
  doc.text("Crafted with love by Posh Pink Marketing  ·  poshpinkmarketing.com  ·  info@poshpinkmarketing.com",W/2,H-7,{align:"center"});
  return doc;
};

const logoSVGs = (name,colors) => {
  const c1=(colors[0]||{hex:C.hotPink}).hex,c2=(colors[1]||{hex:C.berry}).hex;
  const c3=(colors[2]||{hex:C.softPink}).hex,c4=(colors[3]||{hex:C.plum}).hex;
  const sh=name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="190" height="64" viewBox="0 0 190 64"><circle cx="32" cy="32" r="24" fill="${c1}" opacity="0.15"/><circle cx="32" cy="32" r="16" fill="none" stroke="${c1}" stroke-width="1.5"/><text x="32" y="37" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="${c4}" letter-spacing="2">${sh}</text><text x="62" y="28" font-family="Georgia,serif" font-style="italic" font-size="13" fill="${c4}">${name}</text><line x1="62" y1="33" x2="185" y2="33" stroke="${c1}" stroke-width="0.8"/><text x="62" y="44" font-family="Arial,sans-serif" font-size="7" fill="${c2}" letter-spacing="3">BRAND STUDIO</text></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="190" height="64" viewBox="0 0 190 64"><polygon points="32,6 52,32 32,58 12,32" fill="none" stroke="${c2}" stroke-width="1.5"/><polygon points="32,16 46,32 32,48 18,32" fill="${c2}" opacity="0.2"/><text x="32" y="36" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="${c4}">${sh}</text><text x="60" y="30" font-family="Georgia,serif" font-size="12" fill="${c4}" letter-spacing="1">${name.toUpperCase()}</text><line x1="60" y1="36" x2="185" y2="36" stroke="${c3}" stroke-width="1"/></svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="190" height="64" viewBox="0 0 190 64"><rect x="8" y="24" width="36" height="16" rx="8" fill="${c1}" opacity="0.18"/><text x="26" y="35" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="10" fill="${c4}">${sh}</text><text x="52" y="34" font-family="Georgia,serif" font-size="13" fill="${c4}">${name}</text><circle cx="182" cy="32" r="4" fill="none" stroke="${c1}" stroke-width="1.2"/><circle cx="182" cy="32" r="1.5" fill="${c1}"/></svg>`,
  ];
};

const FullKit = ({kit,bizName}) => {
  const [busy,setBusy]=useState(false);
  const download=()=>{
    setBusy(true);
    try{
      const doc=makePDF(kit,bizName);
      doc.save(`${(bizName||"brand-blueprint").replace(/\s+/g,"-").toLowerCase()}-brand-blueprint.pdf`);
    } catch(e){
      console.error("PDF error:", e);
      alert("PDF error: " + e.message);
    }
    setBusy(false);
  };
  return (
    <div className="ppq-fade">
      <div style={{background:`linear-gradient(135deg,${C.p800} 0%,${C.plum} 100%)`,padding:"52px 40px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",border:"1px solid rgba(255,20,147,.12)",pointerEvents:"none"}}/>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:".2em",color:C.p200,marginBottom:14,opacity:.8,fontWeight:500,textTransform:"uppercase"}}>Your Brand Direction</p>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:48,color:C.white,marginBottom:16,lineHeight:1.1}}>{kit.archetype}</h1>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:300,lineHeight:1.9,color:"rgba(255,209,226,.8)",maxWidth:440}}>{kit.archetypeDescription}</p>
      </div>
      <div style={{background:C.white,padding:"32px 40px 28px",borderBottom:`0.5px solid ${C.p100}`}}>
        <p className="ppq-label">Signature Color Palette</p>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {(kit.colors||[]).map((c,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{width:60,height:60,background:c.hex,border:`0.5px solid ${C.p100}`,borderRadius:8,marginBottom:7}}/><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:C.inkLight,letterSpacing:".06em"}}>{c.hex}</p><p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:12,color:C.inkMid,marginTop:2}}>{c.name}</p></div>))}
        </div>
      </div>
      <div style={{background:C.bgAlt,padding:"32px 40px 28px",borderBottom:`0.5px solid ${C.p100}`}}>
        <p className="ppq-label">Typography Direction</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {(kit.fonts||[]).map((f,i)=>(<div key={i} style={{padding:"20px",background:C.white,border:`0.5px solid ${C.p100}`,borderRadius:10}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:".14em",color:C.inkLight,marginBottom:8,textTransform:"uppercase",fontWeight:600}}>{f.role}</p><p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:26,color:C.p800,marginBottom:6}}>{f.name}</p><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.inkLight,lineHeight:1.7,fontWeight:300}}>{f.note}</p></div>))}
        </div>
      </div>
      <div style={{background:C.white,padding:"32px 40px 28px",borderBottom:`0.5px solid ${C.p100}`}}>
        <p className="ppq-label">Logo Direction Concepts</p>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.inkLight,marginBottom:16,lineHeight:1.8,fontWeight:300}}>These are visual direction concepts—not finished logos. Use them as inspiration or share them with a designer when you are ready to create your final logo.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {["A","B","C"].map((letter,i)=>(<div key={i} style={{padding:"14px 8px",background:C.bgAlt,border:`0.5px solid ${C.p100}`,borderRadius:8,textAlign:"center"}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:".16em",color:C.inkLight,marginBottom:8,textTransform:"uppercase",fontWeight:600}}>Concept {letter}</p><div style={{overflow:"hidden",display:"flex",justifyContent:"center"}} dangerouslySetInnerHTML={{__html:logoSVGs(bizName,kit.colors||[])[i]}}/></div>))}
        </div>
      </div>
      <div style={{background:C.bgAlt,padding:"32px 40px 28px",borderBottom:`0.5px solid ${C.p100}`}}>
        <p className="ppq-label">Brand Voice & Personality</p>
        <div style={{marginBottom:16}}>{(kit.voiceKeywords||[]).map((kw,i)=><span key={i} className="ppq-chip">{kw}</span>)}</div>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:24,color:C.berry,lineHeight:1.7,borderLeft:`2px solid ${C.hotPink}`,paddingLeft:16,marginBottom:16}}>"{kit.tagline}"</p>
        {kit.brandPersonality&&<p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.inkMid,lineHeight:1.85,fontWeight:300}}>{kit.brandPersonality}</p>}
      </div>
      {kit.socialMediaTip&&(
        <div style={{background:C.white,padding:"32px 40px 28px",borderBottom:`0.5px solid ${C.p100}`}}>
          <p className="ppq-label">Social Media Direction</p>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.inkMid,lineHeight:1.85,fontWeight:300}}>{kit.socialMediaTip}</p>
        </div>
      )}
      <div style={{background:C.bgAlt,padding:"32px 40px 28px",borderBottom:`0.5px solid ${C.p100}`}}>
        <p className="ppq-label">Your Next Best Steps</p>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.inkLight,marginBottom:16,lineHeight:1.8,fontWeight:300}}>Use these recommendations as a simple roadmap. Start with the step that feels most useful for your business right now.</p>
        <div style={{display:"grid",gap:8}}>
          {(kit.services||[]).map((svc,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"16px 18px",background:C.white,border:`0.5px solid ${C.p100}`,borderRadius:10}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:28,color:C.hotPink,opacity:.5,lineHeight:1,flexShrink:0,marginTop:2}}>{String(i+1).padStart(2,"0")}</span><div><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,letterSpacing:".06em",color:C.p800,marginBottom:4,fontWeight:500}}>{svc.name}</p><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.inkLight,lineHeight:1.8,fontWeight:300}}>{svc.description}</p></div></div>))}
        </div>
      </div>
      <div style={{background:`linear-gradient(135deg,${C.p800} 0%,${C.plum} 100%)`,padding:"52px 40px",textAlign:"center"}}>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:36,color:C.softPink,marginBottom:10}}>Your Brand Blueprint Is Ready</p>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:300,color:"rgba(255,209,226,.75)",marginBottom:28,maxWidth:340,margin:"0 auto 28px",lineHeight:1.9}}>Download your personalized one-page Brand Blueprint with your colors, fonts, brand voice, logo direction, and next-step recommendations.</p>
        <button className="ppq-btn hot" onClick={download} disabled={busy} style={{marginBottom:14,minWidth:220}}>{busy?"Generating PDF…":"⬇ Download My Brand Blueprint"}</button>
        <br/>
        <a href="https://www.poshpinkmarketing.com/contact" style={{textDecoration:"none"}}><button className="ppq-btn ghost" style={{marginTop:12}}>Get Personalized Brand Support</button></a>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:".1em",color:C.p200,marginTop:18,opacity:.7}}>info@poshpinkmarketing.com</p>
      </div>
    </div>
  );
};

export default function App() {
  useEffect(()=>{injectStyles();},[]);
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [result,setResult]=useState(null);
  const [error,setError]=useState(null);
  const total=QUESTIONS.length;
  const curQ=QUESTIONS[step-1];

  const ans=(qId,val,type)=>{
    if(type==="text"){setAnswers(p=>({...p,[qId]:val}));return;}
    if(type==="single"){setAnswers(p=>({...p,[qId]:val}));return;}
    setAnswers(p=>{const c=p[qId]||[];return{...p,[qId]:c.includes(val)?c.filter(v=>v!==val):[...c,val]};});
  };

  const canGo=()=>{
    if(!curQ)return false;
    const a=answers[curQ.id];
    if(curQ.type==="text")return a&&a.trim().length>0;
    if(curQ.type==="single")return !!a;
    return a&&a.length>0;
  };

  const next=()=>{
    if(step<total){setStep(s=>s+1);}
    else{setStep(total+1);generate();}
  };

  const generate=async()=>{
    const biz=answers["businessName"]||"your business";
    const prompt=`You are an experienced small-business brand strategist. Generate a clear, practical, personalized brand blueprint for ${biz}.
Quiz answers:
- Industry: ${(answers["industry"]||[]).join(", ")||"not specified"}
- Brand vibe: ${(answers["vibe"]||[]).join(", ")}
- Color preferences: ${(answers["colors"]||[]).join(", ")}
- Ideal client: ${(answers["audience"]||[]).join(", ")||"not specified"}
- Monthly budget: ${answers["budget"]||"not specified"}
Respond ONLY with valid JSON (no markdown, no preamble, no code fences):
{"archetype":"2-4 word poetic brand archetype title","archetypeDescription":"2-3 sentences describing this archetype","colors":[{"hex":"#HEXCODE","name":"Color Name"},{"hex":"#HEXCODE","name":"Color Name"},{"hex":"#HEXCODE","name":"Color Name"},{"hex":"#HEXCODE","name":"Color Name"}],"fonts":[{"role":"Display / Heading","name":"Font Name","note":"One sentence on why this suits the brand"},{"role":"Body / Supporting","name":"Font Name","note":"One sentence on why this suits the brand"}],"voiceKeywords":["word1","word2","word3","word4","word5"],"tagline":"Short evocative brand tagline","brandPersonality":"2-3 sentences describing the brand personality and how it shows up in all touchpoints","socialMediaTip":"2-3 sentences of specific social media direction — which platforms, what type of content, what visual style to use","services":[{"name":"Recommended Next Step","description":"1-2 sentences explaining the most useful next action"},{"name":"Helpful Posh Pink Resource","description":"1-2 sentences recommending an appropriate option such as the AI Logo Blueprint, a Posh Pink membership, or personalized marketing support"},{"name":"Future Growth Focus","description":"1-2 sentences explaining a longer-term brand or marketing priority"}]}
All hex codes must be valid 6-digit hex values.`;
    try{
      const res=await fetch("/.netlify/functions/claude",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt})});
      const d=await res.json();
      if(!d.result)throw new Error("Empty");
      setResult(d.result);
      setStep(total+2);
    }catch(e){
      setError("Something went wrong while creating your Brand Blueprint. Please try again.");
      setStep(total+2);
    }
  };

  const parsed=(()=>{
    if(!result)return null;
    try{return JSON.parse(result.replace(/```json|```/g,"").trim());}catch{return null;}
  })();

  const wrap={maxWidth:600,margin:"0 auto",padding:"60px 32px"};

  return (
    <div className="ppq" style={{minHeight:"100vh"}}>
      {step===0&&(
        <div className="ppq-up" style={wrap}>
          <Logo/>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:".22em",color:C.p600,marginBottom:18,fontWeight:600,textTransform:"uppercase"}}>The Posh Pink Brand Blueprint</p>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:60,color:C.p800,marginBottom:18,lineHeight:1.05}}>Bring Your<br/>Brand to Life</h1>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:300,color:C.inkLight,lineHeight:1.95,marginBottom:40,maxWidth:400}}>Answer six quick questions and receive a personalized brand direction with a color palette, font suggestions, logo inspiration, brand voice, social media guidance, and a downloadable PDF.</p>
          <button className="ppq-btn" onClick={()=>setStep(1)}>Create My Brand Blueprint</button>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:C.inkLight,marginTop:14,letterSpacing:".06em"}}>About 3 minutes</p>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:C.inkLight,marginTop:10,lineHeight:1.7,maxWidth:430}}>Your results provide creative direction and a starting point for your brand. They are not a substitute for a complete custom brand strategy or professionally designed logo.</p>
        </div>
      )}
      {step>=1&&step<=total&&curQ&&(
        <div key={step} className="ppq-up" style={wrap}>
          <Logo/>
          <Bar cur={step} tot={total}/>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:18,color:C.hotPink,marginBottom:6}}>{curQ.num}</p>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:500,color:C.p800,marginBottom:6,lineHeight:1.25}}>{curQ.q}</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.inkLight,marginBottom:curQ.type==="multi"?4:24,fontWeight:300}}>{curQ.hint}</p>
          {curQ.type==="multi"&&<p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:C.p400,fontStyle:"italic",marginBottom:18}}>You can select more than one.</p>}
          {curQ.type==="text"&&<input className="ppq-input" type="text" placeholder={curQ.placeholder} value={answers[curQ.id]||""} autoFocus onChange={e=>ans(curQ.id,e.target.value,"text")} onKeyDown={e=>{if(e.key==="Enter"&&canGo())next();}}/>}
          {(curQ.type==="single"||curQ.type==="multi")&&<div>{curQ.options.map(opt=><Opt key={opt} label={opt} radio={curQ.type==="single"} checked={curQ.type==="single"?answers[curQ.id]===opt:(answers[curQ.id]||[]).includes(opt)} onToggle={()=>ans(curQ.id,opt,curQ.type)}/>)}</div>}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:32}}>
            {step>1?<button className="ppq-back" onClick={()=>setStep(s=>s-1)}>← Back</button>:<div/>}
            <button className="ppq-btn" onClick={next} disabled={!canGo()}>{step===total?"Build My Brand Blueprint":"Continue"}</button>
          </div>
        </div>
      )}
      {step===total+1&&(<div style={wrap}><Logo/><Spinner msg="Creating your Brand Blueprint…"/></div>)}
      {step===total+2&&(
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{padding:"52px 32px 0"}}>
            <Logo/>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:".18em",color:C.inkLight,marginBottom:6,textTransform:"uppercase",fontWeight:500}}>Brand Blueprint prepared for</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:44,color:C.p800}}>{answers["businessName"]||"Your Brand"}</h2>
            <div className="ppq-divider"/>
          </div>
          {error?(
            <div style={{padding:"0 32px 60px",textAlign:"center"}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",color:C.inkLight,marginBottom:20,fontWeight:300}}>{error}</p>
              <button className="ppq-btn" onClick={()=>{setError(null);setStep(total);generate();}}>Try Again</button>
            </div>
          ):parsed?(
            <FullKit kit={parsed} bizName={answers["businessName"]}/>
          ):(
            <div style={{padding:"0 32px 60px"}}><Spinner msg="Preparing your results…"/></div>
          )}
        </div>
      )}
    </div>
  );
}
