/* Renders QR codes in the browser (nothing is sent to any third-party service). */
(function(){
  var PHONE='+919505078050';
  function make(text){var q=qrcode(0,'M');q.addData(text);q.make();return q}
  function svg(text,label){
    var q=make(text),n=q.getModuleCount(),m=4,s=n+m*2,d='';
    for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(q.isDark(r,c))d+='M'+(c+m)+' '+(r+m)+'h1v1h-1z';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+s+' '+s+'" shape-rendering="crispEdges" role="img" aria-label="'+label+'"><rect width="'+s+'" height="'+s+'" fill="#f2ede2"/><path d="'+d+'" fill="#0b0c0f"/></svg>'}
  function cardURL(){return new URL('card.html',location.href).href}
  window.QRUI={make:make,svg:svg,PHONE:PHONE,cardURL:cardURL};
  [].forEach.call(document.querySelectorAll('[data-qr]'),function(el){
    var t=el.dataset.qr==='tel'?'tel:'+PHONE:cardURL();
    el.innerHTML=svg(t,el.dataset.label||'QR code')});
})();
