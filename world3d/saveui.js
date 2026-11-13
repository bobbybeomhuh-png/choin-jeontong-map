/* 무이 월드: 이어하기 화면(기록 코드 만들기, 다른 기기 기록 불러오기). 갱신 2026-11-13 */
import {makeCode,readCode,applySave,snapshot,summary} from '../heritage3d/save.js';
export function initSaveUI({hint,trk}){
 const top=document.getElementById('top');let bt=document.getElementById('bSave');
 if(!bt&&top){bt=document.createElement('button');bt.className='btn';bt.id='bSave';bt.type='button';bt.textContent='이어하기';top.append(bt);bt.addEventListener('click',()=>open())}
 const css='background:#3b2a1c;color:#fff4dc;border:0;border-radius:8px;padding:8px 12px;font:15px "Gowun Dodum",sans-serif;cursor:pointer';
 function open(pre){let o=document.getElementById('saveP');if(!o){o=document.createElement('section');o.id='saveP';o.style.cssText='position:fixed;inset:0;z-index:27;background:rgba(10,6,3,.62);display:grid;place-items:center;padding:12px';o.addEventListener('click',e=>{if(e.target===o)o.hidden=true});document.body.append(o)}
  o.hidden=false;o.innerHTML='';const b=document.createElement('div');b.style.cssText='background:#f4ecd8;color:#2b1d12;border:4px double #8e2b20;border-radius:12px;width:min(520px,100%);max-height:calc(100vh - 24px);overflow:auto;padding:14px;font:14px "Gowun Dodum",sans-serif;line-height:1.6';o.append(b);
  b.innerHTML=`<div style="display:flex;align-items:center;gap:8px"><b style="flex:1;font:22px 'Do Hyeon',sans-serif;color:#8e2b20">이어하기</b></div><p style="margin:6px 0 10px">휴대폰과 컴퓨터를 오가며 이어서 할 수 있어요. 지금 기록: ${summary(snapshot())}. 기념 엽서 사진은 크기가 커서 옮기지 않아요.</p>`;
  const x=document.createElement('button');x.type='button';x.textContent='닫기 ✕';x.style.cssText=css;x.onclick=()=>o.hidden=true;b.firstChild.append(x);
  const h1=document.createElement('b');h1.style.cssText='display:block;font:17px "Do Hyeon",sans-serif;margin:6px 0';h1.textContent='1. 이 기기 기록 보내기';b.append(h1);
  const out=document.createElement('textarea');out.readOnly=true;out.rows=3;out.style.cssText='width:100%;box-sizing:border-box;font:12px monospace;border:1px solid #cdbfa6;border-radius:8px;padding:6px;background:#fffaf0';out.placeholder='코드 만들기를 누르면 여기에 나와요.';
  const row=document.createElement('div');row.style.cssText='display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 12px';let code='';
  const mk=(t,f)=>{const e=document.createElement('button');e.type='button';e.textContent=t;e.style.cssText=css;e.onclick=f;row.append(e);return e};
  const link=()=>location.origin+'/world3d/#save='+code;
  mk('코드 만들기',async()=>{code=await makeCode();out.value=code;try{trk&&trk('w3_save','make')}catch(e){}});
  mk('복사',async()=>{if(!code){code=await makeCode();out.value=code}try{await navigator.clipboard.writeText(code);hint('코드를 복사했어요. 다른 기기의 이어하기에 붙여 넣으세요.',4000)}catch(e){out.select();document.execCommand&&document.execCommand('copy')}});
  mk('링크로 보내기',async()=>{if(!code){code=await makeCode();out.value=code}const u=link();try{if(navigator.share){await navigator.share({title:'무이 월드 이어하기',text:'무이 월드 기록을 이 링크로 이어서 해요.',url:u});return}}catch(e){return}try{await navigator.clipboard.writeText(u);hint('링크를 복사했어요. 다른 기기에서 열면 기록을 불러올 수 있어요.',4500)}catch(e){out.value=u}});
  mk('파일로 저장',async()=>{if(!code){code=await makeCode();out.value=code}const a=document.createElement('a');const d=new Date();a.download=`muui_world_save_${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}.txt`;a.href=URL.createObjectURL(new Blob([code+'\n'],{type:'text/plain'}));a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)});
  b.append(out,row);
  const h2=document.createElement('b');h2.style.cssText=h1.style.cssText;h2.textContent='2. 다른 기기 기록 불러오기';b.append(h2);
  const inp=document.createElement('textarea');inp.rows=3;inp.style.cssText=out.style.cssText;inp.style.background='#fff';inp.placeholder='받은 코드나 링크를 붙여 넣으세요.';if(pre)inp.value=pre;const msg=document.createElement('p');msg.style.cssText='margin:6px 0;font-size:13px;color:#8e2b20';
  const go=document.createElement('button');go.type='button';go.textContent='불러오기';go.style.cssText=css+';background:#8e2b20';
  go.onclick=async()=>{msg.textContent='';let o2;try{o2=await readCode(inp.value)}catch(e){msg.textContent=e.message||'코드를 읽지 못했어요.';return}const s=summary(o2.d);if(!confirm(`불러올 기록: ${s}.\n지금 이 기기 기록은 이 기록으로 바뀌어요. 불러올까요?`))return;try{applySave(o2);try{trk&&trk('w3_save','load')}catch(e){}msg.textContent='불러왔어요. 다시 여는 중…';setTimeout(()=>location.replace(location.pathname),700)}catch(e){msg.textContent='저장 공간에 쓰지 못했어요.'}};
  b.append(inp,go,msg);if(pre){msg.textContent='링크로 받은 기록이에요. 불러오기를 누르면 이 기기에서 이어서 할 수 있어요.';msg.style.color='#2f6a4a'}}
 /* 링크(#save=)로 들어오면 불러오기 화면을 띄운다(바로 덮어쓰지 않음) */
 if(/^#save=/.test(location.hash)){const c=location.hash.slice(6);try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}setTimeout(()=>open(c),1500)}
 return{open}}
