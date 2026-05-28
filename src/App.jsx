import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const PAYMENT_LINK = "https://www.poshpinkmarketing.com/product-page/personalized-posh-pink-brand-kit-builder";
const PRICE = "$47";

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
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+SC:wght@300;400;500;600&family=Raleway:wght@300;400;500;600&display=swap');
    .ppq*{box-sizing:border-box;margin:0;padding:0}
    .ppq{font-family:'Raleway',sans-serif;background:${C.blush};color:${C.ink};min-height:100vh}
    @keyframes ppqUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
    @keyframes ppqFade{from{opacity:0}to{opacity:1}}
    @keyframes ppqPulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes ppqSpin{to{transform:rotate(360deg)}}
    .ppq-up{animation:ppqUp .55s cubic-bezier(.22,.61,.36,1) both}
    .ppq-fade{animation:ppqFade .4s ease both}
    .ppq-pulse{animation:ppqPulse 1.8s ease-in-out infinite}
    .ppq-opt{display:flex;align-items:center;gap:16px;padding:15px 20px;margin-bottom:9px;cursor:pointer;border:1.5px solid ${C.softPink};background:${C.white};transition:border-color .18s,background .18s}
    .ppq-opt:hover,.ppq-opt.on{border-color:${C.hotPink};background:${C.blush}}
    .ppq-box{width:20px;height:20px;flex-shrink:0;border:1.5px solid ${C.softPink};background:transparent;display:flex;align-items:center;justify-content:center;transition:all .18s}
    .ppq-box.on{background:${C.hotPink};border-color:${C.hotPink}}
    .ppq-box.circ{border-radius:50%}
    .ppq-btn{background:${C.plum};color:${C.white};border:none;font-family:'Cormorant SC',serif;font-size:13px;font-weight:500;letter-spacing:.15em;padding:17px 52px;cursor:pointer;transition:background .2s,transform .12s}
    .ppq-btn:hover{background:${C.berry};transform:translateY(-1px)}
    .ppq-btn:active{transform:translateY(0)}
    .ppq-btn:disabled{opacity:.35;cursor:not-allowed;transform:none}
    .ppq-btn.hot{background:${C.hotPink}}
    .ppq-btn.hot:hover{background:${C.berry}}
    .ppq-btn.ghost{background:transparent;border:1px solid ${C.softPink};color:${C.softPink}}
    .ppq-btn.ghost:hover{background:rgba(255,255,255,.08)}
    .ppq-input{width:100%;background:transparent;border:none;border-bottom:1.5px solid ${C.bubblegum};padding:14px 0;font-family:'Great Vibes',cursive;font-size:36px;color:${C.ink};outline:none;transition:border-color .2s}
    .ppq-input:focus{border-bottom-color:${C.hotPink}}
    .ppq-input::placeholder{color:${C.bubblegum};opacity:.6}
    .ppq-chip{display:inline-block;border:1px solid ${C.bubblegum};color:${C.berry};font-family:'Cormorant SC',serif;font-size:11px;letter-spacing:.14em;padding:6px 14px;margin:4px 4px 4px 0}
    .ppq-label{font-family:'Cormorant SC',serif;font-size:11px;letter-spacing:.22em;color:${C.berry};margin-bottom:18px;text-transform:uppercase}
    .ppq-back{background:none;border:none;cursor:pointer;font-family:'Cormorant SC',serif;font-size:11px;letter-spacing:.18em;color:${C.inkLight};padding:0}
    .ppq-back:hover{color:${C.berry}}
    .ppq-divider{height:1px;background:${C.softPink};margin:28px 0}
  `;
  document.head.appendChild(s);
};

const Logo = () => (
  <div style={{marginBottom:36}}>
    <img src="/logo.png" alt="Posh Pink Marketing" style={{height:52,width:"auto",objectFit:"contain"}}/>
  </div>
);

const Bar = ({cur,tot}) => {
  const pct = Math.round((cur/tot)*100);
  return (
    <div style={{marginBottom:44}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <span style={{fontFamily:"'Cormorant SC',serif",fontSize:11,letterSpacing:".18em",color:C.inkLight}}>Question {cur} of {tot}</span>
        <span style={{fontFamily:"'Great Vibes',cursive",fontSize:20,color:C.hotPink}}>{pct}%</span>
      </div>
      <div style={{height:2,background:C.softPink,borderRadius:1,position:"relative"}}>
        <div style={{position:"absolute",top:0,left:0,height:"2px",borderRadius:1,width:`${pct}%`,background:`linear-gradient(90deg,${C.berry},${C.hotPink})`,transition:"width .5s cubic-bezier(.22,.61,.36,1)"}}/>
      </div>
    </div>
  );
};

const Opt = ({label,checked,onToggle,radio}) => (
  <div onClick={onToggle} className={`ppq-opt${checked?" on":""}`}>
    <div className={`ppq-box${radio?" circ":""}${checked?" on":""}`}>
      {checked && <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><polyline points="1,4 4,7 10,1" stroke={C.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
    <span style={{fontFamily:"'Raleway',sans-serif",fontSize:14,color:C.inkMid}}>{label}</span>
  </div>
);

const Spinner = ({msg}) => (
  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:28,padding:"80px 0"}}>
    <div style={{width:48,height:48,border:`2px solid ${C.softPink}`,borderTop:`2px solid ${C.hotPink}`,borderRadius:"50%",animation:"ppqSpin 1s linear infinite"}}/>
    <p className="ppq-pulse" style={{fontFamily:"'Great Vibes',cursive",fontSize:28,color:C.berry}}>{msg}</p>
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
      doc.lines([[8,10],[-8,10],[-8,-10],[8,-10]],[dx,dy-10],"eo","F");
      doc.setGState(doc.GState({opacity:1})); doc.setDrawColor(...hexRgb(lc2)); doc.setLineWidth(0.8);
      doc.lines([[8,10],[-8,10],[-8,-10],[8,-10]],[dx,dy-10],"eo","S");
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
    y=sec("Recommended Services",y);
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

const Teaser = ({kit,onPay}) => (
  <div className="ppq-fade">
    <div style={{background:C.plum,padding:"52px 44px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-80,right:-80,width:260,height:260,borderRadius:"50%",border:`1px solid rgba(255,20,147,.1)`,pointerEvents:"none"}}/>
      <p style={{fontFamily:"'Cormorant SC',serif",fontSize:10,letterSpacing:".28em",color:C.bubblegum,marginBottom:16,opacity:.8}}>Your Brand Identity</p>
      <h1 style={{fontFamily:"'Great Vibes',cursive",fontSize:52,color:C.white,marginBottom:18,lineHeight:1.1}}>{kit.archetype}</h1>
      <p style={{fontFamily:"'Raleway',sans-serif",fontSize:14,fontWeight:300,lineHeight:1.95,color:"rgba(251,234,240,.75)",maxWidth:440}}>{kit.archetypeDescription}</p>
    </div>
    <div style={{background:C.white,padding:"36px 44px 32px",borderBottom:`1px solid ${C.softPink}`}}>
      <p className="ppq-label">Signature Color Palette</p>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        {(kit.colors||[]).map((c,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{width:58,height:58,background:c.hex,border:`1px solid ${C.softPink}`,marginBottom:7}}/><p style={{fontFamily:"'Raleway',sans-serif",fontSize:10,color:C.inkLight,letterSpacing:".08em"}}>{c.hex}</p><p style={{fontFamily:"'Cormorant SC',serif",fontSize:11,color:C.inkMid,marginTop:3}}>{c.name}</p></div>))}
      </div>
    </div>
    <div style={{position:"relative"}}>
      <div style={{filter:"blur(5px)",userSelect:"none",pointerEvents:"none"}}>
        <div style={{background:C.blush,padding:"32px 44px 28px",borderBottom:`1px solid ${C.softPink}`}}>
          <p className="ppq-label">Typography Direction</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {(kit.fonts||[]).map((f,i)=>(<div key={i} style={{padding:"18px",background:C.white,border:`1px solid ${C.softPink}`}}><p style={{fontFamily:"'Cormorant SC',serif",fontSize:10,color:C.inkLight,marginBottom:8}}>{f.role}</p><p style={{fontFamily:"'Great Vibes',cursive",fontSize:24,color:C.ink}}>{f.name}</p></div>))}
          </div>
        </div>
        <div style={{background:C.white,padding:"32px 44px 28px",borderBottom:`1px solid ${C.softPink}`}}>
          <p className="ppq-label">Logo Direction Concepts</p>
          <div style={{display:"flex",gap:10}}>{["A","B","C"].map(l=>(<div key={l} style={{flex:1,height:72,background:C.blush,border:`1px solid ${C.softPink}`,display:"flex",alignItems:"center",justifyContent:"center"}}><p style={{fontFamily:"'Cormorant SC',serif",fontSize:11,color:C.inkLight,letterSpacing:".14em"}}>CONCEPT {l}</p></div>))}</div>
        </div>
        <div style={{background:C.blush,padding:"28px 44px"}}>
          <p className="ppq-label">Brand Voice</p>
          <div>{(kit.voiceKeywords||[]).map((kw,i)=><span key={i} className="ppq-chip">{kw}</span>)}</div>
        </div>
      </div>
      <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(251,234,240,.6)"}}>
        <div style={{textAlign:"center",padding:"36px 40px",background:C.white,border:`1.5px solid ${C.softPink}`,maxWidth:380,boxShadow:"0 8px 40px rgba(75,21,40,.1)"}}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" style={{marginBottom:14}}><rect x="7" y="15" width="20" height="13" rx="2" stroke={C.hotPink} strokeWidth="1.5" fill="none"/><path d="M11 15v-4a6 6 0 0112 0v4" stroke={C.hotPink} strokeWidth="1.5" strokeLinecap="round" fill="none"/><circle cx="17" cy="21.5" r="1.8" fill={C.hotPink}/></svg>
          <h3 style={{fontFamily:"'Cormorant SC',serif",fontSize:20,color:C.plum,marginBottom:10}}>Unlock Your Full Brand Kit</h3>
          <p style={{fontFamily:"'Raleway',sans-serif",fontSize:13,color:C.inkLight,lineHeight:1.9,marginBottom:22}}>Get your complete brand identity — typography, 3 logo concepts, brand personality, social media direction, and a beautiful downloadable PDF.</p>
          <button className="ppq-btn hot" onClick={onPay} style={{width:"100%",padding:"18px 0",fontSize:"14px",marginBottom:12}}>Unlock & Download — {PRICE}</button>
          <p style={{fontFamily:"'Raleway',sans-serif",fontSize:11,color:C.inkLight,letterSpacing:".06em"}}>Secure payment · Instant access</p>
        </div>
      </div>
    </div>
  </div>
);

const FullKit = ({kit,bizName}) => {
  const [busy,setBusy]=useState(false);
  const download=()=>{
    setBusy(true);
    try{
      const doc=makePDF(kit,bizName);
      doc.save(`${(bizName||"brand-kit").replace(/\s+/g,"-").toLowerCase()}-brand-kit.pdf`);
    } catch(e){
      alert("PDF generation failed — please try again.");
    }
    setBusy(false);
  };
  return (
    <div className="ppq-fade">
      <div style={{background:C.plum,padding:"52px 44px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-80,right:-80,width:260,height:260,borderRadius:"50%",border:`1px solid rgba(255,20,147,.1)`,pointerEvents:"none"}}/>
        <p style={{fontFamily:"'Cormorant SC',serif",fontSize:10,letterSpacing:".28em",color:C.bubblegum,marginBottom:16,opacity:.8}}>Your Brand Identity</p>
        <h1 style={{fontFamily:"'Great Vibes',cursive",fontSize:52,color:C.white,marginBottom:18,lineHeight:1.1}}>{kit.archetype}</h1>
        <p style={{fontFamily:"'Raleway',sans-serif",fontSize:14,fontWeight:300,lineHeight:1.95,color:"rgba(251,234,240,.75)",maxWidth:440}}>{kit.archetypeDescription}</p>
      </div>
      <div style={{background:C.white,padding:"36px 44px 32px",borderBottom:`1px solid ${C.softPink}`}}>
        <p className="ppq-label">Signature Color Palette</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          {(kit.colors||[]).map((c,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{width:62,height:62,background:c.hex,border:`1px solid ${C.softPink}`,marginBottom:8}}/><p style={{fontFamily:"'Raleway',sans-serif",fontSize:10,color:C.inkLight,letterSpacing:".08em"}}>{c.hex}</p><p style={{fontFamily:"'Cormorant SC',serif",fontSize:11,color:C.inkMid,marginTop:3}}>{c.name}</p></div>))}
        </div>
      </div>
      <div style={{background:C.blush,padding:"36px 44px 32px",borderBottom:`1px solid ${C.softPink}`}}>
        <p className="ppq-label">Typography Direction</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {(kit.fonts||[]).map((f,i)=>(<div key={i} style={{padding:"22px",background:C.white,border:`1px solid ${C.softPink}`}}><p style={{fontFamily:"'Cormorant SC',serif",fontSize:10,letterSpacing:".18em",color:C.inkLight,marginBottom:10}}>{f.role}</p><p style={{fontFamily:"'Great Vibes',cursive",fontSize:28,color:C.ink,marginBottom:7}}>{f.name}</p><p style={{fontFamily:"'Raleway',sans-serif",fontSize:12,color:C.inkLight,lineHeight:1.75}}>{f.note}</p></div>))}
        </div>
      </div>
      <div style={{background:C.white,padding:"36px 44px 32px",borderBottom:`1px solid ${C.softPink}`}}>
        <p className="ppq-label">Logo Direction Concepts</p>
        <p style={{fontFamily:"'Raleway',sans-serif",fontSize:12,color:C.inkLight,marginBottom:18,lineHeight:1.8}}>These concepts use your brand colors. Share the PDF with a designer to bring them to life.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {["A","B","C"].map((letter,i)=>(<div key={i} style={{padding:"16px 10px",background:C.blush,border:`1px solid ${C.softPink}`,textAlign:"center"}}><p style={{fontFamily:"'Cormorant SC',serif",fontSize:9,letterSpacing:".2em",color:C.inkLight,marginBottom:10}}>CONCEPT {letter}</p><div style={{overflow:"hidden",display:"flex",justifyContent:"center"}} dangerouslySetInnerHTML={{__html:logoSVGs(bizName,kit.colors||[])[i]}}/></div>))}
        </div>
      </div>
      <div style={{background:C.blush,padding:"36px 44px 32px",borderBottom:`1px solid ${C.softPink}`}}>
        <p className="ppq-label">Brand Voice & Personality</p>
        <div style={{marginBottom:18}}>{(kit.voiceKeywords||[]).map((kw,i)=><span key={i} className="ppq-chip">{kw}</span>)}</div>
        <p style={{fontFamily:"'Great Vibes',cursive",fontSize:28,color:C.berry,lineHeight:1.7,borderLeft:`3px solid ${C.hotPink}`,paddingLeft:18,marginBottom:18}}>"{kit.tagline}"</p>
        {kit.brandPersonality&&<p style={{fontFamily:"'Raleway',sans-serif",fontSize:13,color:C.inkMid,lineHeight:1.8}}>{kit.brandPersonality}</p>}
      </div>
      {kit.socialMediaTip&&(
        <div style={{background:C.white,padding:"36px 44px 32px",borderBottom:`1px solid ${C.softPink}`}}>
          <p className="ppq-label">Social Media Direction</p>
          <p style={{fontFamily:"'Raleway',sans-serif",fontSize:13,color:C.inkMid,lineHeight:1.8}}>{kit.socialMediaTip}</p>
        </div>
      )}
      <div style={{background:C.blush,padding:"36px 44px 32px",borderBottom:`1px solid ${C.softPink}`}}>
        <p className="ppq-label">Recommended Services</p>
        <div style={{display:"grid",gap:10}}>
          {(kit.services||[]).map((svc,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:16,padding:"18px 20px",background:C.white,border:`1px solid ${C.softPink}`}}><span style={{fontFamily:"'Great Vibes',cursive",fontSize:34,color:C.hotPink,opacity:.4,lineHeight:1,flexShrink:0,marginTop:2}}>{String(i+1).padStart(2,"0")}</span><div><p style={{fontFamily:"'Cormorant SC',serif",fontSize:13,letterSpacing:".1em",color:C.ink,marginBottom:5}}>{svc.name}</p><p style={{fontFamily:"'Raleway',sans-serif",fontSize:13,color:C.inkLight,lineHeight:1.8}}>{svc.description}</p></div></div>))}
        </div>
      </div>
      <div style={{background:C.plum,padding:"52px 44px",textAlign:"center"}}>
        <p style={{fontFamily:"'Great Vibes',cursive",fontSize:40,color:C.softPink,marginBottom:12}}>Your Brand Kit is Ready</p>
        <p style={{fontFamily:"'Raleway',sans-serif",fontSize:13,fontWeight:300,color:"rgba(251,234,240,.7)",marginBottom:30,maxWidth:340,margin:"0 auto 30px",lineHeight:1.9}}>Download your one-page PDF — colors, hex codes, fonts, logo concepts and more.</p>
        <button className="ppq-btn hot" onClick={download} disabled={busy} style={{marginBottom:14,minWidth:240}}>{busy?"Generating PDF…":"⬇ Download Brand Kit PDF"}</button>
        <br/>
        <a href="https://www.poshpinkmarketing.com/contact" style={{textDecoration:"none"}}><button className="ppq-btn ghost" style={{marginTop:12}}>Book a Brand Consultation</button></a>
        <p style={{fontFamily:"'Cormorant SC',serif",fontSize:11,letterSpacing:".15em",color:C.bubblegum,marginTop:20,opacity:.7}}>info@poshpinkmarketing.com</p>
      </div>
    </div>
  );
};

export default function App() {
  useEffect(()=>{injectStyles();},[]);
  const urlPaid = new URLSearchParams(window.location.search).get("paid")==="true";
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [result,setResult]=useState(null);
  const [paid,setPaid]=useState(urlPaid);
  const [error,setError]=useState(null);
  const total=QUESTIONS.length;
  const curQ=QUESTIONS[step-1];

  useEffect(()=>{
    if(urlPaid){
      const r=sessionStorage.getItem("ppq_result");
      const a=sessionStorage.getItem("ppq_answers");
      if(r){setResult(r);setAnswers(JSON.parse(a||"{}"));setStep(total+2);}
    }
  },[]);

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
    const prompt=`You are a luxury brand strategist. Generate a personalized brand identity kit for ${biz}.
Quiz answers:
- Industry: ${(answers["industry"]||[]).join(", ")||"not specified"}
- Brand vibe: ${(answers["vibe"]||[]).join(", ")}
- Color preferences: ${(answers["colors"]||[]).join(", ")}
- Ideal client: ${(answers["audience"]||[]).join(", ")||"not specified"}
- Monthly budget: ${answers["budget"]||"not specified"}
Respond ONLY with valid JSON (no markdown, no preamble, no code fences):
{"archetype":"2-4 word poetic brand archetype title","archetypeDescription":"2-3 sentences describing this archetype","colors":[{"hex":"#HEXCODE","name":"Color Name"},{"hex":"#HEXCODE","name":"Color Name"},{"hex":"#HEXCODE","name":"Color Name"},{"hex":"#HEXCODE","name":"Color Name"}],"fonts":[{"role":"Display / Heading","name":"Font Name","note":"One sentence on why this suits the brand"},{"role":"Body / Supporting","name":"Font Name","note":"One sentence on why this suits the brand"}],"voiceKeywords":["word1","word2","word3","word4","word5"],"tagline":"Short evocative brand tagline","brandPersonality":"2-3 sentences describing the brand personality and how it shows up in all touchpoints","socialMediaTip":"2-3 sentences of specific social media direction — which platforms, what type of content, what visual style to use","services":[{"name":"Service Name","description":"1-2 sentences on priority"},{"name":"Service Name","description":"1-2 sentences on relevance"},{"name":"Service Name","description":"1-2 sentences on long-term value"}]}
All hex codes must be valid 6-digit hex values.`;
    try{
      const res=await fetch("/.netlify/functions/claude",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({prompt})
      });
      const d=await res.json();
      if(!d.result)throw new Error("Empty");
      sessionStorage.setItem("ppq_result",d.result);
      sessionStorage.setItem("ppq_answers",JSON.stringify(answers));
      setResult(d.result);setStep(total+2);
    }catch(e){
      setError("Something went wrong generating your brand kit. Please try again.");
      setStep(total+2);
    }
  };

  const parsed=(()=>{
    if(!result)return null;
    try{return JSON.parse(result.replace(/```json|```/g,"").trim());}catch{return null;}
  })();

  const pay=()=>{ window.location.href=PAYMENT_LINK; };
  const wrap={maxWidth:640,margin:"0 auto",padding:"64px 36px"};

  return (
    <div className="ppq" style={{minHeight:"100vh"}}>
      {step===0&&(
        <div className="ppq-up" style={wrap}>
          <Logo/>
          <p style={{fontFamily:"'Cormorant SC',serif",fontSize:11,letterSpacing:".28em",color:C.berry,marginBottom:20}}>Posh Pink Brand Kit Builder</p>
          <h1 style={{fontFamily:"'Great Vibes',cursive",fontSize:68,color:C.plum,marginBottom:20,lineHeight:1.05}}>Discover Your<br/>Brand Identity</h1>
          <p style={{fontFamily:"'Raleway',sans-serif",fontSize:14,fontWeight:300,color:C.inkLight,lineHeight:2,marginBottom:44,maxWidth:400}}>Six thoughtful questions. A fully personalized brand kit — color palette, typography, logo concepts, brand personality, social media direction, and a beautiful downloadable PDF.</p>
          <button className="ppq-btn" onClick={()=>setStep(1)}>Begin the Quiz</button>
          <p style={{fontFamily:"'Raleway',sans-serif",fontSize:11,color:C.inkLight,marginTop:16,letterSpacing:".1em"}}>About 3 minutes · Full kit {PRICE}</p>
        </div>
      )}
      {step>=1&&step<=total&&curQ&&(
        <div key={step} className="ppq-up" style={wrap}>
          <Logo/>
          <Bar cur={step} tot={total}/>
          <p style={{fontFamily:"'Great Vibes',cursive",fontSize:22,color:C.hotPink,marginBottom:8}}>{curQ.num}</p>
          <h2 style={{fontFamily:"'Cormorant SC',serif",fontSize:28,fontWeight:400,color:C.ink,marginBottom:8,lineHeight:1.25}}>{curQ.q}</h2>
          <p style={{fontFamily:"'Raleway',sans-serif",fontSize:12,color:C.inkLight,marginBottom:curQ.type==="multi"?6:28}}>{curQ.hint}</p>
          {curQ.type==="multi"&&<p style={{fontFamily:"'Raleway',sans-serif",fontSize:11,color:C.bubblegum,fontStyle:"italic",marginBottom:20}}>You can select more than one.</p>}
          {curQ.type==="text"&&<input className="ppq-input" type="text" placeholder={curQ.placeholder} value={answers[curQ.id]||""} autoFocus onChange={e=>ans(curQ.id,e.target.value,"text")} onKeyDown={e=>{if(e.key==="Enter"&&canGo())next();}}/>}
          {(curQ.type==="single"||curQ.type==="multi")&&<div>{curQ.options.map(opt=><Opt key={opt} label={opt} radio={curQ.type==="single"} checked={curQ.type==="single"?answers[curQ.id]===opt:(answers[curQ.id]||[]).includes(opt)} onToggle={()=>ans(curQ.id,opt,curQ.type)}/>)}</div>}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:36}}>
            {step>1?<button className="ppq-back" onClick={()=>setStep(s=>s-1)}>← Back</button>:<div/>}
            <button className="ppq-btn" onClick={next} disabled={!canGo()}>{step===total?"Generate My Brand Kit":"Continue"}</button>
          </div>
        </div>
      )}
      {step===total+1&&(<div style={wrap}><Logo/><Spinner msg="Crafting your brand profile…"/></div>)}
      {step===total+2&&(
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <div style={{padding:"56px 36px 0"}}>
            <Logo/>
            <p style={{fontFamily:"'Cormorant SC',serif",fontSize:10,letterSpacing:".22em",color:C.inkLight,marginBottom:8}}>Brand Kit prepared for</p>
            <h2 style={{fontFamily:"'Great Vibes',cursive",fontSize:50,color:C.plum}}>{answers["businessName"]||"Your Brand"}</h2>
            <div className="ppq-divider"/>
          </div>
          {error?(
            <div style={{padding:"0 36px 60px",textAlign:"center"}}>
              <p style={{fontFamily:"'Raleway',sans-serif",color:C.inkLight,marginBottom:22}}>{error}</p>
              <button className="ppq-btn" onClick={()=>{setError(null);setStep(total);generate();}}>Try Again</button>
            </div>
          ):parsed?(
            paid?<FullKit kit={parsed} bizName={answers["businessName"]}/>:<Teaser kit={parsed} onPay={pay}/>
          ):(
            <div style={{padding:"0 36px 60px"}}><Spinner msg="Preparing your results…"/></div>
          )}
        </div>
      )}
    </div>
  );
}
