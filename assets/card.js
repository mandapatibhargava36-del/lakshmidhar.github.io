/* Digital visiting card: front + back drawn on canvases; exports PNG (per side), a 2-page PDF (built in-browser) and a vCard. */
(function(){
  var CARD={name:'Kotha Lakshmidhar',role:'Advocate',court:'High Court of Andhra Pradesh',
    phone:'+91 95050 78050',tel:'+919505078050',email:'',
    address:[],   /* office address, one entry per line, e.g. ['Chamber No. __','Building, Area','City – PIN'] */
    mapsUrl:''};  /* optional: paste a Google Maps share link; otherwise a maps search is built from the address */
  var W=1050,H=600,front=document.getElementById('card'),back=document.getElementById('card-back');
  if(!front||!back||!window.QRUI)return;
  var hasAddr=CARD.address.length>0;
  var mapsUrl=CARD.mapsUrl||(hasAddr?'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(CARD.address.join(', ')):'');
  [front,back].forEach(function(c){c.width=W;c.height=H});
  var fx=front.getContext('2d'),bx=back.getContext('2d');
  function spaced(c,t,x,y,ls){c.letterSpacing=ls||'0px';c.fillText(t,x,y);c.letterSpacing='0px'}
  function frame(c){
    var g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,'#0b0c0f');g.addColorStop(1,'#15263f');c.fillStyle=g;c.fillRect(0,0,W,H);
    var r=c.createRadialGradient(W*.85,H*.5,10,W*.85,H*.5,420);r.addColorStop(0,'rgba(196,167,101,.16)');r.addColorStop(1,'rgba(196,167,101,0)');c.fillStyle=r;c.fillRect(0,0,W,H);
    c.strokeStyle='rgba(196,167,101,.55)';c.lineWidth=2;c.strokeRect(24,24,W-48,H-48);
    c.strokeStyle='#c4a765';c.strokeRect(72,72,64,64);
    c.fillStyle='#c4a765';c.font='600 30px "Cormorant Garamond",Georgia,serif';c.textAlign='center';c.textBaseline='middle';c.fillText('KL',104,105);c.textAlign='left';c.textBaseline='alphabetic'}
  function qrTile(c,text,caption){
    var q=QRUI.make(text),n=q.getModuleCount(),cell=Math.floor(250/(n+8)),size=cell*(n+8),ox=W-72-size,oy=150;
    c.fillStyle='#f2ede2';c.fillRect(ox,oy,size,size);c.fillStyle='#0b0c0f';
    for(var i=0;i<n;i++)for(var j=0;j<n;j++)if(q.isDark(i,j))c.fillRect(ox+(j+4)*cell,oy+(i+4)*cell,cell,cell);
    c.fillStyle='#a4a9b5';c.font='600 14px Manrope,system-ui,sans-serif';c.textAlign='center';spaced(c,caption,ox+size/2,oy+size+34,'3px');c.textAlign='left'}
  function placeholderBox(c,label,x,y,w,h){
    c.save();c.setLineDash([8,7]);c.strokeStyle='#c4a765';c.lineWidth=2;c.strokeRect(x,y,w,h);c.restore();
    c.fillStyle='#c4a765';c.font='500 22px Manrope,system-ui,sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(label,x+w/2,y+h/2);c.textAlign='left';c.textBaseline='alphabetic'}
  function drawFront(){
    var c=fx;frame(c);
    c.fillStyle='#fff';c.font='500 78px "Cormorant Garamond",Georgia,serif';c.fillText(CARD.name,72,262);
    c.fillStyle='#c4a765';c.font='italic 500 40px "Cormorant Garamond",Georgia,serif';c.fillText(CARD.role,72,314);
    c.fillStyle='#a4a9b5';c.font='500 19px Manrope,system-ui,sans-serif';spaced(c,CARD.court.toUpperCase(),72,352,'3px');
    c.fillStyle='#c4a765';c.fillRect(72,384,90,2);
    c.fillStyle='#ece7db';c.font='500 27px Manrope,system-ui,sans-serif';
    var y=432;[CARD.phone,CARD.email].filter(Boolean).forEach(function(t){c.fillText(t,72,y);y+=42});
    qrTile(c,QRUI.cardURL(),'SCAN FOR DIGITAL CARD')}
  function wrap(c,t,x,y,mw,lh){
    var words=t.split(' '),line='';
    words.forEach(function(w){var test=line?line+' '+w:w;if(c.measureText(test).width>mw&&line){c.fillText(line,x,y);y+=lh;line=w}else line=test});
    c.fillText(line,x,y);return y+lh}
  function drawBack(){
    var c=bx;frame(c);
    c.fillStyle='#c4a765';c.font='600 16px Manrope,system-ui,sans-serif';spaced(c,'OFFICE',72,206,'4px');
    if(hasAddr){
      c.fillStyle='#ece7db';c.font='500 30px Manrope,system-ui,sans-serif';var y=256;
      CARD.address.forEach(function(l){y=wrap(c,l,72,y,600,44)});
    }else placeholderBox(c,'[OFFICE ADDRESS]',72,232,560,150);
    c.fillStyle='#c4a765';c.fillRect(72,470,90,2);
    c.fillStyle='#ece7db';c.font='500 26px Manrope,system-ui,sans-serif';c.fillText(CARD.phone,72,520);
    if(mapsUrl)qrTile(c,mapsUrl,'SCAN FOR LOCATION');
    else{placeholderBox(c,'[LOCATION QR]',W-72-250,150,250,250);c.fillStyle='#a4a9b5';c.font='600 14px Manrope,system-ui,sans-serif';c.textAlign='center';spaced(c,'SCAN FOR LOCATION',W-72-125,184+250,'3px');c.textAlign='left'}}
  function draw(){try{drawFront()}catch(e){}try{drawBack()}catch(e){}}
  var fonts=document.fonts?Promise.all([document.fonts.load('500 40px "Cormorant Garamond"'),document.fonts.load('italic 500 40px "Cormorant Garamond"'),document.fonts.load('600 30px "Cormorant Garamond"'),document.fonts.load('500 20px Manrope'),document.fonts.load('600 16px Manrope')]):Promise.resolve();
  fonts.then(draw,draw);
  var summary=[CARD.name,CARD.role,CARD.court,CARD.phone,CARD.email].filter(Boolean).join(', ');
  front.setAttribute('aria-label','Front of digital visiting card: '+summary);
  back.setAttribute('aria-label','Back of digital visiting card: '+(hasAddr?'office address '+CARD.address.join(', ')+', with a QR code to the location':'office address and location to be added'));

  var note=document.getElementById('addr-note');if(note)note.hidden=hasAddr;
  var mp=document.getElementById('map-link');if(mp){if(mapsUrl){mp.href=mapsUrl;mp.hidden=false}else mp.hidden=true}

  var st=document.getElementById('dl-status'),lastURL=null;
  function save(blob,name){
    if(lastURL)URL.revokeObjectURL(lastURL);
    var url=lastURL=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();
    if(!st)return;
    st.hidden=false;st.textContent='';
    st.appendChild(document.createTextNode('Saving “'+name+'”. If nothing downloaded, '));
    var o=document.createElement('a');o.href=url;o.target='_blank';o.rel='noopener';o.textContent='open it in a new tab';st.appendChild(o);
    var f=null;try{f=new File([blob],name,{type:blob.type})}catch(e){}
    if(f&&navigator.canShare&&navigator.canShare({files:[f]})){
      st.appendChild(document.createTextNode(' or '));
      var b=document.createElement('button');b.type='button';b.className='inl';b.textContent='share it';
      b.addEventListener('click',function(){navigator.share({files:[f],title:name}).catch(function(){})});st.appendChild(b)}
    st.appendChild(document.createTextNode('.'))}
  function both(){
    var pad=40,c=document.createElement('canvas');c.width=W+pad*2;c.height=H*2+pad*3;
    var x=c.getContext('2d');x.fillStyle='#07080a';x.fillRect(0,0,c.width,c.height);
    x.drawImage(front,pad,pad);x.drawImage(back,pad,pad*2+H);return c}
  function pdf(pages,pw,ph){
    var enc=new TextEncoder(),parts=[],off=[],len=0,n=pages.length;
    function push(x){var b=typeof x==='string'?enc.encode(x):x;parts.push(b);len+=b.length}
    function obj(k,body){off[k]=len;push(k+' 0 obj\n'+body+'\nendobj\n')}
    push('%PDF-1.4\n');
    obj(1,'<< /Type /Catalog /Pages 2 0 R >>');
    var kids=[];for(var i=0;i<n;i++)kids.push((3+3*i)+' 0 R');
    obj(2,'<< /Type /Pages /Kids ['+kids.join(' ')+'] /Count '+n+' >>');
    pages.forEach(function(p,i){
      var po=3+3*i,co=po+1,io=po+2,cs='q '+pw+' 0 0 '+ph+' 0 0 cm /Im0 Do Q';
      obj(po,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 '+pw+' '+ph+'] /Resources << /XObject << /Im0 '+io+' 0 R >> >> /Contents '+co+' 0 R >>');
      obj(co,'<< /Length '+cs.length+' >>\nstream\n'+cs+'\nendstream');
      off[io]=len;push(io+' 0 obj\n<< /Type /XObject /Subtype /Image /Width '+W+' /Height '+H+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+p.length+' >>\nstream\n');push(p);push('\nendstream\nendobj\n')});
    var total=3+3*n,x=len;push('xref\n0 '+total+'\n0000000000 65535 f \n');
    for(var k=1;k<total;k++)push(('0000000000'+off[k]).slice(-10)+' 00000 n \n');
    push('trailer\n<< /Size '+total+' /Root 1 0 R >>\nstartxref\n'+x+'\n%%EOF');
    return new Blob(parts,{type:'application/pdf'})}
  function jpg(cv){return new Promise(function(res){cv.toBlob(function(b){b.arrayBuffer().then(function(ab){res(new Uint8Array(ab))})},'image/jpeg',.95)})}
  var base='Kotha-Lakshmidhar-Visiting-Card';
  document.getElementById('dl-png-both').addEventListener('click',function(){both().toBlob(function(b){save(b,base+'-front-and-back.png')},'image/png')});
  document.getElementById('dl-png').addEventListener('click',function(){front.toBlob(function(b){save(b,base+'-front.png')},'image/png')});
  document.getElementById('dl-png-back').addEventListener('click',function(){back.toBlob(function(b){save(b,base+'-back.png')},'image/png')});
  document.getElementById('dl-pdf').addEventListener('click',function(){Promise.all([jpg(front),jpg(back)]).then(function(p){save(pdf(p,252,144),base+'.pdf')})});
  document.getElementById('dl-vcf').addEventListener('click',function(){
    var v=['BEGIN:VCARD','VERSION:3.0','FN:'+CARD.name,'N:Lakshmidhar;Kotha;;;','TITLE:'+CARD.role+', '+CARD.court,'TEL;TYPE=CELL:'+CARD.tel];
    if(CARD.email)v.push('EMAIL:'+CARD.email);
    if(hasAddr)v.push('ADR;TYPE=WORK:;;'+CARD.address.join(', ').replace(/[;,]/g,' ')+';;;;');
    v.push('URL:'+new URL('./',location.href).href,'END:VCARD');
    save(new Blob([v.join('\r\n')+'\r\n'],{type:'text/vcard'}),base+'.vcf')});
})();
