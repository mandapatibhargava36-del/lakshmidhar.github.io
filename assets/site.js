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
