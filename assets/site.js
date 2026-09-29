(function(){
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
  var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  function clamp(v,a,b){return v<a?a:v>b?b:v}

  /* Bar Council of India acknowledgement gate */
  var KEY='bci-ack-v1',gate=$('#gate');
  function acked(){try{return sessionStorage.getItem(KEY)==='1'}catch(e){return false}}
  function ready(){document.documentElement.classList.add('ready')}
  if(gate&&gate.showModal&&!acked()){
    gate.showModal();
    gate.addEventListener('cancel',function(e){e.preventDefault()});
    $('#gate-agree').addEventListener('click',function(){try{sessionStorage.setItem(KEY,'1')}catch(e){}gate.close();ready()});
    $('#gate-leave').addEventListener('click',function(){location.href='about:blank'});
  }else ready();

  /* nav: solid on scroll, mobile menu, active indicator, progress bar */
  var nav=$('#nav'),menu=$('#menu'),burger=$('.burger'),bar=$('.progress');
  function setMenu(o){menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':''}
  if(burger){burger.addEventListener('click',function(){setMenu(!menu.classList.contains('open'))});
    menu.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
    addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.classList.contains('open')){setMenu(false);burger.focus()}});
    matchMedia('(min-width:901px)').addEventListener('change',function(m){if(m.matches)setMenu(false)})}
  var ind=$('.ind'),links=$$('nav.main a[data-k]');
  function moveInd(a){if(!ind)return;if(!a){ind.style.opacity=0;return}
    var ul=a.closest('ul').getBoundingClientRect(),r=a.getBoundingClientRect();
    ind.style.opacity=1;ind.style.width=r.width+'px';ind.style.transform='translateX('+(r.left-ul.left)+'px)'}
  function onScroll(){
    nav.classList.toggle('solid',scrollY>40);
    var h=document.documentElement.scrollHeight-innerHeight;
    if(bar)bar.style.transform='scaleX('+(h>0?clamp(scrollY/h,0,1):0)+')'}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  var map={about:'about',practice:'practice',journey:'experience',experience:'experience',insights:'insights',contact:'contact'};
  if('IntersectionObserver' in window&&links.length){
    var so=new IntersectionObserver(function(en){en.forEach(function(x){
      if(!x.isIntersecting)return;var k=map[x.target.id],a=null;
      links.forEach(function(l){var on=l.dataset.k===k;l.classList.toggle('act',on);if(on){a=l;l.setAttribute('aria-current','true')}else l.removeAttribute('aria-current')});moveInd(a)})},{rootMargin:'-45% 0px -50% 0px'});
    $$('main > section[id]').forEach(function(s){so.observe(s)});
    addEventListener('resize',function(){moveInd($('nav.main a.act'))})}

  /* scroll reveal */
  var rv=$$('.rv,.portrait');
  if('IntersectionObserver' in window&&!calm){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    rv.forEach(function(e){io.observe(e)});
  }else rv.forEach(function(e){e.classList.add('in')});

  /* timeline draws with scroll */
  var tl=$('#tl');
  if(tl){var lis=$$('li',tl);
    var upd=function(){var r=tl.getBoundingClientRect(),vh=innerHeight,horiz=getComputedStyle(tl).gridTemplateColumns.split(' ').length>1;
      var p=clamp((vh*.78-r.top)/(horiz?vh*.5:r.height+vh*.1),0,1);if(calm)p=1;
      tl.style.setProperty('--tl',p.toFixed(3));
      lis.forEach(function(li,i){li.classList.toggle('on',p>=(i+.4)/lis.length-.02)})};
    addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd()}

  /* parallax numerals */
  if(!calm){var par=$$('[data-par]');
    var pu=function(){par.forEach(function(e){var r=e.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;e.style.transform='translate3d(0,'+(r.top*+e.dataset.par).toFixed(1)+'px,0)'})};
    addEventListener('scroll',pu,{passive:true});pu()}

  /* desktop-only: tilt cards, magnetic buttons, cursor ring */
  if(fine&&!calm){
    $$('[data-tilt]').forEach(function(c){
      c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
        c.style.transform='rotateY('+((x-.5)*11)+'deg) rotateX('+((.5-y)*11)+'deg) translateZ(0)';c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%')});
      c.addEventListener('pointerleave',function(){c.style.transform=''})});
    $$('[data-magnetic]').forEach(function(b){
      b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.setProperty('--bx',((e.clientX-r.left-r.width/2)*.22).toFixed(1)+'px');b.style.setProperty('--by',((e.clientY-r.top-r.height/2)*.35).toFixed(1)+'px')});
      b.addEventListener('pointerleave',function(){b.style.setProperty('--bx','0px');b.style.setProperty('--by','0px')})});
    var cur=$('.cursor');
    if(cur){var tx=0,ty=0,x=0,y=0,run=false;
      var go=function(){x+=(tx-x)*.2;y+=(ty-y)*.2;cur.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)';requestAnimationFrame(go)};
      addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;cur.classList.add('on');if(!run){run=true;x=tx;y=ty;go()}},{passive:true});
      document.addEventListener('pointerover',function(e){cur.classList.toggle('big',!!e.target.closest('a,button,[data-tilt],.gal button'))});
      document.addEventListener('mouseleave',function(){cur.classList.remove('on')})}
  }

  /* gallery lightbox */
  var lb=$('#lb');
  if(lb&&lb.showModal){
    var items=$$('.gal button'),i=0,im=$('img',lb),cp=$('p',lb);
    var show=function(n){i=(n+items.length)%items.length;im.src=items[i].dataset.src;im.alt=items[i].dataset.cap;cp.textContent=items[i].dataset.cap+' ('+(i+1)+'/'+items.length+')'};
    items.forEach(function(b,n){b.addEventListener('click',function(){show(n);lb.showModal()})});
    lb.addEventListener('click',function(e){var d=e.target.dataset&&e.target.dataset.d;if(d)show(i+ +d);if(e.target===lb||e.target.id==='lbx')lb.close()});
    lb.addEventListener('keydown',function(e){if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1)})}

  /* contact form: opens the visitor's own email app; nothing is stored or sent by this site */
  var f=$('#cf'),st=$('#fstat');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();
    if(!f.checkValidity()){f.reportValidity();return}
    var to=f.dataset.to;
    if(!to){st.textContent='This form will be activated once the advocate’s contact email is added.';return}
    var d=new FormData(f);
    var body='Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nPhone: '+(d.get('phone')||'-')+'\n\n'+d.get('msg')+'\n\n[Sent voluntarily; disclaimer and privacy notice read. No confidential documents included.]';
    st.textContent='Opening your email application…';
    location.href='mailto:'+to+'?subject='+encodeURIComponent(d.get('subject'))+'&body='+encodeURIComponent(body)})}
})();
