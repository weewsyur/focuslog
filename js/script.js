(function(){
 var ROUTES={login:'https://focuslog.cloud/',register:'https://focuslog.cloud/'}; // set to the app's real routes
 document.querySelectorAll('[data-route]').forEach(function(a){a.setAttribute('href',ROUTES[a.dataset.route])});
 document.getElementById('yr').textContent=new Date().getFullYear();
 var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 var LOGO=document.querySelector('.logo img').src;

 var P={home:'<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/>',timer:'<circle cx="12" cy="14" r="7"/><path d="M12 10v4l2 1M10 2h4M12 2v3"/>',repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',chart:'<path d="M3 21h18"/><path d="m5 17 4-5 3 3 6-8"/>',layers:'<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',logout:'<path d="M9 21H5V3h4M16 17l5-5-5-5M21 12H9"/>',play:'<path d="M7 4l12 8-12 8z"/>',plus:'<path d="M12 5v14M5 12h14"/>',copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',flame:'<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z"/>',act:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',hist:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2"/>',pal:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="11" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="11" r="1"/>',check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>'};
 function I(n){return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">'+P[n]+'</svg>'}

 var F=[['timer','Focus Timer','A dedicated timer to help users concentrate on their tasks.'],['repeat','Habit Tracker','Create and monitor daily habits.'],['flame','Streak Tracking','Build consistency and track consecutive productive days.'],['chart','Productivity Analytics','Visualize focus time, completed sessions, and habit completion.'],['hist','Session History','Review previous focus sessions.'],['layers','Focus Templates','Use presets such as Pomodoro Classic, Deep Work, Quick Sprint, Study Session, Reading Time, and Coding Block.'],['gear','Profile and Settings','Customize appearance and focus/break timer defaults.']];
 document.getElementById('fgrid').innerHTML=F.map(function(f){return '<article class="card feat reveal"><div class="ico">'+I(f[0])+'</div><h3>'+f[1]+'</h3><p>'+f[2]+'</p></article>'}).join('');

 // Templates from the app
 var T=[['Pomodoro Classic','Classic Pomodoro timing using the 25-minute focus and 5-minute break fields.',25,5],['Deep Work','A long, uninterrupted block for demanding work.',90,15],['Quick Sprint','A short burst for a small task or a quick start.',15,3],['Study Session','A steady study block with a short recovery break.',50,10],['Reading Time','A calm block for focused reading.',30,5],['Creative Writing','A dedicated block to draft, revise, or explore ideas.',45,10],['Coding Block','A substantial block for coding without distractions.',60,10],['Admin & Emails','A short block to clear messages and administrative tasks.',20,5],['Workout','A focused 30-minute workout with no break.',30,0],['Reflection & Planning','A brief pause to reflect and plan your next steps.',10,0]];

 var NAV=[['home','Home','home'],['focus','Focus','timer'],['habits','Habits','repeat'],['analytics','Analytics','chart'],['templates','Templates','layers'],['settings','Settings','gear']];
 function top(t,x){return '<div class="top"><span>'+t+'</span>'+(x||'')+'</div>'}
 function greet(){var h=new Date().getHours();return h<12?'Good morning':h<18?'Good afternoon':'Good evening'}
 function week(){var L='SMTWTFS',o='',d=new Date();for(var i=6;i>=0;i--){var x=new Date(d);x.setDate(d.getDate()-i);o+='<i>'+L[x.getDay()]+'</i>'}return o}
 var ringSVG='<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="#2ECC59" stroke-width="8"/></svg>';
 var PN={
  home:function(){return top(greet())+'<div class="g2"><div class="card"><div class="ringrow"><div style="position:relative">'+ringSVG+'<b style="position:absolute;inset:0;display:grid;place-items:center;font-size:1.5rem">25:00</b></div><div style="flex:1;min-width:150px"><div class="ct"><span>'+I('timer')+'Ready to focus?</span></div><p class="mut">Name your session or tap one of your habits.</p><div class="lab" style="margin:8px 0 4px">Session</div><div class="inp mut">What are you working on?</div><div style="text-align:center;margin-top:10px"><span class="pill g">'+I('play')+'Start session</span></div></div></div></div><div class="card"><div class="ct"><span>'+I('repeat')+"Today's habits</span><span class=\"okc\">0/0</span></div><div class=\"pbar\"></div><p class=\"mut\">No habits yet. Add one on the Habits page.</p></div></div><div class=\"card stats\"><div><div class=\"lab\">"+I('flame')+'Current streak</div><div class="val">0 days</div></div><div><div class="lab">'+I('timer')+'Focused today</div><div class="val">0 min</div></div><div><div class="lab">'+I('act')+'Sessions today</div><div class="val">0</div></div></div>'},
  focus:function(){return top('Focus')+'<div class="g2"><div class="card fc"><div class="lab" style="justify-content:center" id="fl">Focus session</div><div class="bigt" id="ft">25:00</div><span class="pill g" id="fgo" role="button" tabindex="0">'+I('play')+'Start session</span> <span class="pill o" id="frs" role="button" tabindex="0">Reset</span><div class="stats" style="margin-top:20px"><div class="lab" style="justify-content:center">Average 0 min</div><div class="lab" style="justify-content:center">Today 0 min</div><div class="lab" style="justify-content:center">Best 0 min</div></div></div><div class="card"><div class="lab">Session</div><div class="inp mut" style="margin:6px 0 10px">What are you working on?</div><div class="srow">Focus<span class="step"><button data-s="f-1" aria-label="Less focus">&minus;</button><output id="fv">25</output> min<button data-s="f1" aria-label="More focus">+</button></span></div><div class="srow">Break<span class="step"><button data-s="b-1" aria-label="Less break">&minus;</button><output id="bv">5</output> min<button data-s="b1" aria-label="More break">+</button></span></div><div class="lab" style="margin:12px 0 6px">Use template</div><select id="ftpl" aria-label="Use template"><option value="">Choose a template</option>'+T.map(function(t,i){return '<option value="'+i+'">'+t[0]+'</option>'}).join('')+'</select><div class="lab" style="margin-top:14px">Sessions today</div><div class="val">0</div><div class="dots"><i></i><i></i><i></i><i></i></div><p class="mut" style="font-size:.78rem">Closing this tab mid-session discards it. Only finished sessions are saved.</p></div></div>'},
  habits:function(){var d=new Date().toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'}).replace(/,?\s/,', ').replace(/^(\w+),/,'$1 ·');return top('Habits · '+new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}).replace(',',',').replace(/^(\w+), /,'$1, '))+'<div class="g2"><div class="card"><div class="ct"><span>'+I('cal')+'Today</span><span class="okc">0/0 done</span></div><div class="pbar"></div><p class="mut">No habits yet. Add one on the Habits page.</p></div><div style="display:grid;gap:12px"><div class="card"><div class="lab">'+I('flame')+'Current streak</div><div class="val" style="font-size:2.6rem">0</div><p class="mut" style="font-size:.8rem">days in a row · best 0</p><div class="wk">'+week()+'</div></div><div class="card"><div class="ct"><span>'+I('repeat')+'Build your routine</span><span class="pill g" style="padding:4px 12px">'+I('plus')+'Add habit</span></div><p class="mut">Add a habit you want to keep up with each day.</p></div></div></div>'},
  analytics:function(){return top('Analytics','<span style="display:flex;gap:6px;flex-wrap:wrap"><span class="chip on">'+I('cal')+'Last 7 days</span><span class="chip">'+I('cal')+'Last 30 days</span><span class="chip">'+I('cal')+'Custom Date Range</span></span>')+'<div class="card stats"><div><div class="lab">'+I('timer')+'Focus time</div><div class="val">0 min</div></div><div><div class="lab">'+I('act')+'Sessions</div><div class="val">0</div></div><div><div class="lab">'+I('repeat')+'Habits done</div><div class="val">0 / 0</div></div><div><div class="lab">'+I('check')+'Completion rate</div><div class="val">0%</div></div><div><div class="lab">'+I('flame')+'Best streak in range</div><div class="val">0 days</div></div></div><div class="g2e"><div class="card"><div class="ct"><span>'+I('hist')+'Daily focus</span><small class="mut">minutes</small></div><p class="mut">No finished sessions in this range yet.</p></div><div class="card"><div class="ct"><span>'+I('act')+'Recent sessions</span></div><p class="mut">No sessions in this range yet.</p></div></div>'},
  templates:function(){return top('Templates','<span class="pill g" style="padding:6px 14px">'+I('plus')+'New template</span>')+'<div class="card"><div class="tabs"><span class="pill b">Presets</span><span class="pill" style="background:var(--soft);color:var(--navy)">My Templates</span></div><div class="th">'+T.map(function(t){return '<div class="tc"><b>'+t[0]+'</b><em>Preset</em><p>'+t[1]+'</p><p style="font-size:.74rem">'+t[2]+' min focus / '+(t[3]?t[3]+' min break':'no break')+'</p><span class="pill g">Use</span><span class="pill o">'+I('copy')+'Duplicate</span></div>'}).join('')+'</div></div>'},
  settings:function(){return top('Profile &amp; settings')+'<div class="card"><div class="ct"><span>'+I('pal')+'Appearance</span></div><p class="mut" style="margin-bottom:10px">Choose a theme</p><div class="themes"><div class="theme sel"><div class="sw"></div><div><b>Classic</b><p class="mut" style="font-size:.82rem">The familiar white and blue look.</p></div></div><div class="theme"><div class="sw d"></div><div><b>Interstellar</b><p class="mut" style="font-size:.82rem">Deep space colors and time effects.</p></div></div></div></div><div class="g2e"><div class="card"><div class="ct"><span>'+I('timer')+'Timer defaults</span></div><p class="mut">Focus: 25 min · Break: 5 min</p></div><div class="card"><div class="ct"><span>'+I('repeat')+'Your habits</span></div><p class="mut">No habits yet. Add one on the Habits page.</p></div></div>'}
 };

 function mount(el,start,clickable){
  var cur=start,st={f:25,b:5,left:1500,iv:0};
  el.innerHTML='<div class="sb"><div class="logo"><img src="'+LOGO+'" alt=""><span>Focus Log</span></div>'+NAV.map(function(n){return '<button data-n="'+n[0]+'" aria-label="'+n[1]+'">'+I(n[2])+'<span>'+n[1]+'</span></button>'}).join('')+'<button class="out" tabindex="-1">'+I('logout')+'<span>Sign out</span></button></div><div class="main"></div>';
  var main=el.querySelector('.main');
  function stop(){clearInterval(st.iv);st.iv=0}
  function paint(){var t=document.getElementById('ft');if(!t||!el.contains(t))return;t.textContent=String(Math.floor(st.left/60)).padStart(2,'0')+':'+String(st.left%60).padStart(2,'0')}
  function bind(){
   var go=main.querySelector('#fgo');if(!go)return;
   function reset(){stop();st.left=st.f*60;paint();go.lastChild.textContent='Start session'}
   function toggle(){if(st.iv){stop();go.lastChild.textContent='Resume';return}go.lastChild.textContent='Pause';st.iv=setInterval(function(){st.left--;paint();if(st.left<=0)reset()},1000)}
   go.onclick=toggle;main.querySelector('#frs').onclick=reset;
   [go,main.querySelector('#frs')].forEach(function(b){b.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();b.click()}}});
   function sync(){main.querySelector('#fv').textContent=st.f;main.querySelector('#bv').textContent=st.b;reset()}
   main.querySelectorAll('[data-s]').forEach(function(b){b.onclick=function(){var k=b.dataset.s;if(k[0]==='f')st.f=Math.min(180,Math.max(1,st.f+(+k.slice(1))));else st.b=Math.min(60,Math.max(0,st.b+(+k.slice(1))));sync()}});
   main.querySelector('#ftpl').onchange=function(){if(this.value===''){return}var t=T[+this.value];st.f=t[2];st.b=t[3];sync()};
   sync();
  }
  function show(n){stop();cur=n;st.left=st.f*60;main.innerHTML=PN[n]();el.querySelectorAll('.sb button[data-n]').forEach(function(b){b.classList.toggle('on',b.dataset.n===n)});bind()}
  if(clickable)el.querySelectorAll('.sb button[data-n]').forEach(function(b){b.addEventListener('click',function(){show(b.dataset.n)})});
  show(start);
  addEventListener('pagehide',stop);
 }
 mount(document.getElementById('heroApp'),'home',false);
 mount(document.getElementById('showApp'),'focus',true);

 // Mobile nav
 var bb=document.getElementById('burger'),lk=document.getElementById('links');
 bb.addEventListener('click',function(){var o=lk.classList.toggle('open');bb.setAttribute('aria-expanded',o)});
 lk.addEventListener('click',function(e){if(e.target.tagName==='A'){lk.classList.remove('open');bb.setAttribute('aria-expanded','false')}});

 // Live clock
 var arc=document.getElementById('arc'),hm=document.getElementById('hm'),ap=document.getElementById('ap'),dt=document.getElementById('dt');
 var C=2*Math.PI*136;arc.style.strokeDasharray=C;
 var raf=0,tm=0,last=-1;
 function draw(){
  var n=new Date(),s=n.getSeconds();
  if(s!==last){last=s;var h=n.getHours();hm.textContent=(h%12||12)+':'+String(n.getMinutes()).padStart(2,'0');ap.textContent=h>=12?'PM':'AM';dt.textContent=n.toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'})}
  var p=reduce?s/60:(s+n.getMilliseconds()/1000)/60;
  arc.style.strokeDashoffset=C*(1-Math.max(p,.02));
 }
 function loop(){draw();raf=requestAnimationFrame(loop)}
 function start(){stopC();if(reduce){draw();tm=setInterval(draw,1000)}else loop()}
 function stopC(){cancelAnimationFrame(raf);clearInterval(tm)}
 document.addEventListener('visibilitychange',function(){document.hidden?stopC():start()});
 addEventListener('pagehide',stopC);start();

 // Scroll progress + active nav
 var prog=document.getElementById('prog'),ids=['home','features','how'],navs=document.querySelectorAll('.links a[href^="#"]');
 function onScroll(){var h=document.documentElement,max=h.scrollHeight-innerHeight;prog.style.width=(max>0?scrollY/max*100:0)+'%';var c='home';ids.forEach(function(id){var s=document.getElementById(id);if(s&&s.getBoundingClientRect().top<=120)c=id});navs.forEach(function(a){a.classList.toggle('act',a.getAttribute('href')==='#'+c)})}
 addEventListener('scroll',onScroll,{passive:true});onScroll();

 // Tilt
 if(!reduce&&matchMedia('(hover:hover)').matches){
  [['heroApp','.hero',1],['showApp','.show',.6]].forEach(function(p){
   var hd=document.getElementById(p[0]),hero=document.querySelector(p[1]),k=p[2];
   hero.addEventListener('mousemove',function(e){var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;hd.style.transform='perspective(900px) rotateY('+(x*-5*k)+'deg) rotateX('+(y*4*k)+'deg)'});
   hero.addEventListener('mouseleave',function(){hd.style.transform=''});
  });
  document.querySelectorAll('.feat').forEach(function(c){
   c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transition='transform .1s';c.style.transform='perspective(700px) rotateY('+(x*8)+'deg) rotateX('+(y*-8)+'deg) translateY(-6px)'});
   c.addEventListener('mouseleave',function(){c.style.transition='';c.style.transform=''});
  });
 }

 // Fade-in
 var els=document.querySelectorAll('.reveal');
 if('IntersectionObserver' in window&&!reduce){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){(function(t){var i=Array.prototype.indexOf.call(t.parentNode.children,t);setTimeout(function(){t.classList.add('in')},(i%4)*90)})(e.target);io.unobserve(e.target)}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});
 }else els.forEach(function(e){e.classList.add('in')});
})();