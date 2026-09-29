/* Signature 3D scene: fragmented forms resolve into a clean colonnade as the page scrolls.
   Pure CSS 3D (no WebGL / no libraries) so it stays light on mid-range phones. */
(function(){
  var hero=document.querySelector('.hero'),world=document.getElementById('world'),scene=document.getElementById('scene');
  if(!hero||!world||!scene)return;
  var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isStatic=calm||matchMedia('(max-height:520px) and (orientation:landscape)').matches;
  var small=matchMedia('(max-width:900px)').matches;
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  if(isStatic)hero.classList.add('static');

  var seed=11;function rnd(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646}
  function R(a){return (rnd()*2-1)*a}
  function box(w,h,d,cls){
    var el=document.createElement('div');el.className='bx '+cls;
    el.style.cssText='width:'+w+'px;height:'+h+'px;margin:'+(-h/2)+'px 0 0 '+(-w/2)+'px';
    function face(c,t,fw,fh){var f=document.createElement('i');f.className='fc '+c;
      f.style.cssText='width:'+fw+'px;height:'+fh+'px;left:'+((w-fw)/2)+'px;top:'+((h-fh)/2)+'px;transform:'+t;el.appendChild(f)}
    face('fr','translateZ('+d/2+'px)',w,h);face('bk','rotateY(180deg) translateZ('+d/2+'px)',w,h);
    face('rt','rotateY(90deg) translateZ('+w/2+'px)',d,h);face('lf','rotateY(-90deg) translateZ('+w/2+'px)',d,h);
    face('tp','rotateX(90deg) translateZ('+h/2+'px)',w,d);
    world.appendChild(el);return el}

  var defs=[];
  function add(w,h,d,cls,x,y,z,ry,spread){defs.push({w:w,h:h,d:d,cls:cls,fin:{x:x,y:y,z:z,rx:0,ry:ry||0,rz:0},spread:spread||1})}
  add(680,18,210,'stone',0,176,0);
  add(620,30,170,'stone',0,148,0);
  for(var i=0;i<5;i++)add(50,262,50,'col',-240+i*120,2,0,0,1.15);
  add(620,34,170,'stone',0,-146,0);
  add(668,14,190,'gold',0,-170,0);
  add(560,264,6,'glass',0,2,-74,0,.6);
  add(120,156,3,'paper',-70,72,132,-8,1.3);
  add(120,156,3,'paper',-50,76,142,-4,1.3);
  add(120,156,3,'paper',-30,80,152,0,1.3);

  var parts=defs.map(function(o,i){
    var s=o.spread;
    return {el:box(o.w,o.h,o.d,o.cls),fin:o.fin,
      sc:{x:o.fin.x+R(360)*s,y:o.fin.y+R(300)*s,z:o.fin.z+R(440)*s-60,rx:R(75),ry:R(85),rz:R(65)},
      dl:i/defs.length*.3,ph:rnd()*6.28,amp:6+rnd()*10}});

  var target=isStatic?1:0,cur=target,mx=0,my=0,tmx=0,tmy=0,vis=true,last=0,tick=0,scale=1;
  function clamp(v,a,b){return v<a?a:v>b?b:v}
  function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
  function lerp(a,b,t){return a+(b-a)*t}
  function fit(){var w=scene.clientWidth,h=scene.clientHeight;scale=clamp(Math.min(w/720,h/520),.42,1.25);
    if(small){scale=Math.min(scale*.9,.78)}}
  function readScroll(){
    if(isStatic){target=1;return}
    var max=hero.offsetHeight-innerHeight;target=max>0?clamp(scrollY/max,0,1):1}
  function draw(t){
    var p=cur;
    for(var i=0;i<parts.length;i++){
      var o=parts[i],k=ease(clamp((p-o.dl)/.7,0,1)),f=o.fin,s=o.sc,b=(1-k)*Math.sin(t/1500+o.ph)*o.amp;
      o.el.style.transform='translate3d('+lerp(s.x,f.x,k).toFixed(1)+'px,'+(lerp(s.y,f.y,k)+b).toFixed(1)+'px,'+lerp(s.z,f.z,k).toFixed(1)+'px) rotateX('+lerp(s.rx,f.rx,k).toFixed(2)+'deg) rotateY('+lerp(s.ry,f.ry,k).toFixed(2)+'deg) rotateZ('+lerp(s.rz,f.rz,k).toFixed(2)+'deg)'}
    var ry=lerp(-46,-19,ease(p))+mx*12,rx=-11+my*6+(1-p)*4;
    world.style.transform='scale('+(scale*lerp(.86,1,ease(p))).toFixed(3)+') rotateX('+rx.toFixed(2)+'deg) rotateY('+ry.toFixed(2)+'deg)';
    scene.style.setProperty('--lx',(60+mx*30)+'%');scene.style.setProperty('--ly',(30+my*30)+'%')}
  function loop(t){
    if(!vis||document.hidden){return}
    requestAnimationFrame(loop);
    tick++;if(small&&(tick&1))return;
    cur+=(target-cur)*.11;if(Math.abs(target-cur)<.0004)cur=target;
    mx+=(tmx-mx)*.07;my+=(tmy-my)*.07;
    draw(t);dust(t)}
  function start(){if(calm||isStatic){draw(0);dust(0);return}requestAnimationFrame(loop)}

  /* particles */
  var cv=document.getElementById('dust'),cx=cv&&cv.getContext&&cv.getContext('2d'),pts=[],dpr=Math.min(devicePixelRatio||1,2);
  function sizeCv(){if(!cv)return;cv.width=cv.clientWidth*dpr;cv.height=cv.clientHeight*dpr}
  function initDust(){if(!cx||calm)return;var n=small?14:38;pts=[];for(var i=0;i<n;i++)pts.push({x:rnd(),y:rnd(),z:.3+rnd()*.9,r:.6+rnd()*1.4,v:.02+rnd()*.05})}
  function dust(t){
    if(!cx||calm||!pts.length)return;
    var w=cv.width,h=cv.height;cx.clearRect(0,0,w,h);cx.fillStyle='#c4a765';
    for(var i=0;i<pts.length;i++){var q=pts[i];q.y-=q.v*.004;if(q.y<-.05){q.y=1.05;q.x=rnd()}
      var x=(q.x+mx*.03*q.z)*w,y=q.y*h;cx.globalAlpha=.16+.34*q.z*(.6+.4*Math.sin(t/900+i));
      cx.beginPath();cx.arc(x,y,q.r*dpr*q.z,0,6.283);cx.fill()}
    cx.globalAlpha=1}

  /* input */
  if(fine&&!calm){
    addEventListener('pointermove',function(e){tmx=(e.clientX/innerWidth-.5)*2;tmy=(e.clientY/innerHeight-.5)*2},{passive:true})}
  else if(!calm&&typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission!=='function'){
    addEventListener('deviceorientation',function(e){if(e.gamma==null)return;tmx=clamp(e.gamma/30,-1,1);tmy=clamp((e.beta-45)/30,-1,1)},{passive:true})}
  addEventListener('scroll',readScroll,{passive:true});
  addEventListener('resize',function(){fit();sizeCv();readScroll();if(isStatic)draw(0)});
  if('IntersectionObserver' in window){new IntersectionObserver(function(en){var was=vis;vis=en[0].isIntersecting;if(vis&&!was&&!calm&&!isStatic)requestAnimationFrame(loop)},{rootMargin:'100px'}).observe(hero)}
  document.addEventListener('visibilitychange',function(){if(!document.hidden&&vis&&!calm&&!isStatic)requestAnimationFrame(loop)});
  fit();sizeCv();initDust();readScroll();cur=isStatic?1:target;start();
  var cue=document.querySelector('.cue');
  if(cue)addEventListener('scroll',function(){cue.style.opacity=scrollY>60?0:1},{passive:true});
})();
