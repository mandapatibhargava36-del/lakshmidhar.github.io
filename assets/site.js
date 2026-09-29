(function(){
  var KEY='bci-ack-v1',dlg=document.getElementById('gate');
  function acked(){try{return sessionStorage.getItem(KEY)==='1'}catch(e){return false}}
  if(dlg&&typeof dlg.showModal==='function'&&!acked()){
    dlg.showModal();
    dlg.addEventListener('cancel',function(e){e.preventDefault()});
    document.getElementById('gate-agree').addEventListener('click',function(){
      try{sessionStorage.setItem(KEY,'1')}catch(e){}
      dlg.close();
    });
    document.getElementById('gate-leave').addEventListener('click',function(){
      location.href='about:blank';
    });
  }
  var f=document.getElementById('contact-form');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(f);
    var body='Name: '+d.get('name')+'\nPhone: '+(d.get('phone')||'-')+'\n\n'+d.get('msg')+
      '\n\n[I confirm I am writing voluntarily and have read the Disclaimer and Privacy Notice. I will not send confidential documents in this first email.]';
    location.href='mailto:'+f.dataset.to+'?subject='+encodeURIComponent('Enquiry from website')+'&body='+encodeURIComponent(body);
  })}
})();
(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('open');b.setAttribute('aria-expanded','false')}})}
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});
})();
(function(){
  var fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches,calm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(fine&&!calm){
    document.querySelectorAll('[data-tilt]').forEach(function(c){
      c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
        c.style.transform='perspective(900px) rotateY('+((x-.5)*12)+'deg) rotateX('+((.5-y)*12)+'deg) translateY(-4px)';
        c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%')});
      c.addEventListener('mouseleave',function(){c.style.transform=''});
    });
    var t=document.getElementById('tilt'),st=t&&t.parentNode;
    if(st){st.addEventListener('mousemove',function(e){var r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      t.style.transform='rotateY('+(x*18)+'deg) rotateX('+(-y*14)+'deg)'});
      st.addEventListener('mouseleave',function(){t.style.transform=''})}
  }
  var lb=document.getElementById('lb');
  if(lb&&lb.showModal){
    var items=[].slice.call(document.querySelectorAll('.gal button')),i=0,im=lb.querySelector('img'),cp=lb.querySelector('p');
    function show(n){i=(n+items.length)%items.length;im.src=items[i].dataset.src;im.alt=items[i].dataset.cap;cp.textContent=items[i].dataset.cap+' ('+(i+1)+'/'+items.length+')'}
    items.forEach(function(b,n){b.addEventListener('click',function(){show(n);lb.showModal()})});
    lb.addEventListener('click',function(e){var d=e.target.dataset&&e.target.dataset.d;if(d)show(i+ +d);if(e.target===lb||e.target.id==='lbx')lb.close()});
    lb.addEventListener('keydown',function(e){if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1)});
  }
})();
