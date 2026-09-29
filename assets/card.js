/* Digital visiting card: draws the card on a canvas and exports PNG, PDF (built in-browser) and vCard. */
(function(){
  var CARD={name:'Kotha Lakshmidhar',role:'Advocate',court:'High Court of Andhra Pradesh',
    phone:'+91 95050 78050',tel:'+919505078050',email:'',address:''}; /* add email/address here when verified; empty fields are skipped */
  var cv=document.getElementById('card'),W=1050,H=600;
  if(!cv||!window.QRUI)return;
  cv.width=W;cv.height=H;
  var ctx=cv.getContext('2d');
  function spaced(t,x,y,ls){ctx.letterSpacing=ls||'0px';ctx.fillText(t,x,y);ctx.letterSpacing='0px'}
  function draw(){
    var g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#0b0c0f');g.addColorStop(1,'#15263f');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    var r=ctx.createRadialGradient(W*.85,H*.5,10,W*.85,H*.5,420);r.addColorStop(0,'rgba(196,167,101,.16)');r.addColorStop(1,'rgba(196,167,101,0)');
    ctx.fillStyle=r;ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(196,167,101,.55)';ctx.lineWidth=2;ctx.strokeRect(24,24,W-48,H-48);
    /* monogram */
    ctx.strokeStyle='#c4a765';ctx.lineWidth=2;ctx.strokeRect(72,72,64,64);
    ctx.fillStyle='#c4a765';ctx.font='600 30px "Cormorant Garamond",Georgia,serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('KL',104,105);
    ctx.textAlign='left';ctx.textBaseline='alphabetic';
    /* identity */
    ctx.fillStyle='#ffffff';ctx.font='500 78px "Cormorant Garamond",Georgia,serif';ctx.fillText(CARD.name,72,262);
    ctx.fillStyle='#c4a765';ctx.font='italic 500 40px "Cormorant Garamond",Georgia,serif';ctx.fillText(CARD.role,72,314);
    ctx.fillStyle='#a4a9b5';ctx.font='500 19px Manrope,system-ui,sans-serif';spaced(CARD.court.toUpperCase(),72,352,'3px');
    ctx.fillStyle='#c4a765';ctx.fillRect(72,384,90,2);
    /* contact lines */
    var lines=[CARD.phone,CARD.email,CARD.address].filter(Boolean),y=432;
    ctx.fillStyle='#ece7db';ctx.font='500 27px Manrope,system-ui,sans-serif';
    lines.forEach(function(t){ctx.fillText(t,72,y);y+=42});
    /* QR (links to this digital card) */
    var q=QRUI.make(QRUI.cardURL()),n=q.getModuleCount(),tile=250,cell=Math.floor(tile/(n+8)),size=cell*(n+8),ox=W-72-size,oy=150;
    ctx.fillStyle='#f2ede2';ctx.fillRect(ox,oy,size,size);ctx.fillStyle='#0b0c0f';
    for(var i=0;i<n;i++)for(var j=0;j<n;j++)if(q.isDark(i,j))ctx.fillRect(ox+(j+4)*cell,oy+(i+4)*cell,cell,cell);
    ctx.fillStyle='#a4a9b5';ctx.font='600 14px Manrope,system-ui,sans-serif';ctx.textAlign='center';spaced('SCAN FOR DIGITAL CARD',ox+size/2,oy+size+34,'3px');ctx.textAlign='left'}
  var fonts=document.fonts?Promise.all([document.fonts.load('500 40px "Cormorant Garamond"'),document.fonts.load('italic 500 40px "Cormorant Garamond"'),document.fonts.load('600 30px "Cormorant Garamond"'),document.fonts.load('500 20px Manrope')]):Promise.resolve();
  fonts.then(draw,draw);
  cv.setAttribute('aria-label','Digital visiting card: '+[CARD.name,CARD.role,CARD.court,CARD.phone,CARD.email,CARD.address].filter(Boolean).join(', '));

  function save(blob,name){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},2000)}
  function pdf(jpeg,w,h,pw,ph){
    var enc=new TextEncoder(),parts=[],off=[],len=0;
    function push(x){var b=typeof x==='string'?enc.encode(x):x;parts.push(b);len+=b.length}
    function obj(n,body){off[n]=len;push(n+' 0 obj\n'+body+'\nendobj\n')}
    push('%PDF-1.4\n');
    obj(1,'<< /Type /Catalog /Pages 2 0 R >>');
    obj(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    obj(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 '+pw+' '+ph+'] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>');
    var cs='q '+pw+' 0 0 '+ph+' 0 0 cm /Im0 Do Q';
    obj(4,'<< /Length '+cs.length+' >>\nstream\n'+cs+'\nendstream');
    off[5]=len;push('5 0 obj\n<< /Type /XObject /Subtype /Image /Width '+w+' /Height '+h+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+jpeg.length+' >>\nstream\n');push(jpeg);push('\nendstream\nendobj\n');
    var x=len;push('xref\n0 6\n0000000000 65535 f \n');
    for(var i=1;i<=5;i++)push(('0000000000'+off[i]).slice(-10)+' 00000 n \n');
    push('trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n'+x+'\n%%EOF');
    return new Blob(parts,{type:'application/pdf'})}
  var base='Kotha-Lakshmidhar-Visiting-Card';
  document.getElementById('dl-png').addEventListener('click',function(){cv.toBlob(function(b){save(b,base+'.png')},'image/png')});
  document.getElementById('dl-pdf').addEventListener('click',function(){
    cv.toBlob(function(b){b.arrayBuffer().then(function(ab){save(pdf(new Uint8Array(ab),W,H,252,144),base+'.pdf')})},'image/jpeg',.95)});
  document.getElementById('dl-vcf').addEventListener('click',function(){
    var v=['BEGIN:VCARD','VERSION:3.0','FN:'+CARD.name,'N:Lakshmidhar;Kotha;;;','TITLE:'+CARD.role+', '+CARD.court,'TEL;TYPE=CELL:'+CARD.tel];
    if(CARD.email)v.push('EMAIL:'+CARD.email);if(CARD.address)v.push('ADR;TYPE=WORK:;;'+CARD.address+';;;;');
    v.push('URL:'+new URL('./',location.href).href,'END:VCARD');
    save(new Blob([v.join('\r\n')+'\r\n'],{type:'text/vcard'}),base+'.vcf')});
})();
