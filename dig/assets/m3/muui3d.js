/* 2026-11-10 시험: 발굴 터 신라 고분 앞에 3D 무이(매쉬 모델 + 블렌더로 직접 넣은 뼈대·동작)를 둔다. 주소에 ?muui3d=1 일 때만.
   ctx: {scene, floorAt, site:{x,z}, start:[x,z], H, height} */
window.setupMuui3D=function(ctx){
 const T=THREE,loader=new T.GLTFLoader(),M=[],base='assets/m3/';
 const C=ctx.site,S=[ctx.start[0],ctx.site.z+ctx.site.r+3];/* 무덤 둔덕 바깥 평지, 굴 입구 앞 */
 const face=(x,z)=>Math.atan2(C.x-x,C.z-z);
 const ground=(x,z)=>ctx.floorAt(x,z,ctx.H-4);
 /* 역할: 자리, 하는 일 */
 const PLAN=[
  {k:'carpenter',x:S[0]+2.6,z:S[1]-2.4,job:'dig'},
  {k:'ceramic',x:S[0]-2.2,z:S[1]-2.8,job:'brush'},
  {k:'metal',x:S[0]+.6,z:S[1]-1.6,job:'carry',to:[S[0]+8,S[1]+5]},
  {k:'science',x:S[0]-4.6,z:S[1]+.6,job:'look'},
  {k:'painter',x:S[0]+4.8,z:S[1]+.8,job:'joy'}];
 function act(me,n,fade=.3){const a=me.A[n];if(!a||me.cur===a)return;a.reset().fadeIn(fade).play();if(me.cur)me.cur.fadeOut(fade);me.cur=a;for(const p of me.props)p.o.visible=p.when===n}
 PLAN.forEach(pl=>loader.load(base+'muui_'+pl.k+'.glb',g=>{const root=new T.Group(),m=g.scene;root.add(m);ctx.scene.add(root);
  m.traverse(o=>{if(o.isMesh){o.castShadow=true;o.frustumCulled=false}});
  m.updateMatrixWorld(true);const rb=m.getObjectByName('root'),hb=m.getObjectByName('head'),vr=new T.Vector3(),vh=new T.Vector3();rb.getWorldPosition(vr);hb.getWorldPosition(vh);
  const hm=Math.max(.2,2*(vh.y-vr.y));m.scale.setScalar(ctx.height/hm);m.updateMatrixWorld(true);rb.getWorldPosition(vr);m.position.y-=vr.y;
  const mx=new T.AnimationMixer(m),A={};for(const c of g.animations)A[c.name]=mx.clipAction(c);
  const props=[['prop_shovel','dig'],['prop_brush','brush'],['prop_pot','carry']].map(([n,w])=>({o:m.getObjectByName(n),when:w})).filter(p=>p.o);
  const me={...pl,root,mx,A,props,cur:null,t:0,leg:0,home:[pl.x,pl.z]};M.push(me);
  root.position.set(pl.x,ground(pl.x,pl.z),pl.z);root.rotation.y=face(pl.x,pl.z);
  if(pl.job==='dig')act(me,'dig',0);else if(pl.job==='brush')act(me,'brush',0);else if(pl.job==='carry'){act(me,'carry',0);me.leg=1}else if(pl.job==='look')act(me,'look_up',0);else act(me,'idle',0);
 },undefined,e=>console.warn('muui3d',pl.k,e)));
 return function tick(dt){for(const me of M){me.mx.update(dt);me.t+=dt;const R=me.root;
  if(me.job==='carry'){/* 항아리를 들고 쉼터로 뛰어가고, 빈손으로 뛰어 돌아온다 */const tgt=me.leg===1?me.to:me.home,dx=tgt[0]-R.position.x,dz=tgt[1]-R.position.z,L=Math.hypot(dx,dz);
   if(L<.15){me.leg=me.leg===1?2:1;act(me,me.leg===1?'carry':'run',.25)}else{const sp=me.leg===1?2.1:2.6,want=Math.atan2(dx,dz);let d=want-R.rotation.y;d=Math.atan2(Math.sin(d),Math.cos(d));R.rotation.y+=d*Math.min(1,dt*7);
    R.position.x+=dx/L*Math.min(L,sp*dt);R.position.z+=dz/L*Math.min(L,sp*dt);const gy=ground(R.position.x,R.position.z);R.position.y+=(gy-R.position.y)*Math.min(1,dt*12)}}
  else if(me.job==='joy'){/* 가끔 기뻐 뛴다 */if(me.cur===me.A.idle&&me.t>4+Math.random()*3){me.t=0;act(me,'joy',.2)}else if(me.cur===me.A.joy&&me.t>2.4){me.t=0;act(me,'idle',.3)}}
  else if(me.job==='look'){if(me.t>7){me.t=0;act(me,me.cur===me.A.look_up?'idle':'look_up',.5)}}}};
};
