/* 무이 기념 엽서. 갱신 2026-11-16
   진짜 우편엽서처럼: 왼쪽에 찍은 장면, 오른쪽에 실제 유물 우표(공개 3D 실측·소장품 사진)와 소인, 손글씨 한 줄, 받는 사람 줄, 출처.
   우표 그림은 그 마당의 대표 유물. 복원 공방 유물 가까이서 찍으면 그 유물이 우표가 된다. */
import * as THREE from 'three';
import {getModel} from './hanokkit.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {ART} from './restore3d.js';

const TX=p=>new URL('../textures/'+p,import.meta.url).href;
/* 마당별 대표 유물: m=3D 모델, p=사진, n=이름, e=시대, c=출처, msg=엽서 한 줄 */
export const STAMPS={
 gyeongju:{m:'gyeongju/crown',n:'천마총 금관',e:'신라 5~6세기',c:'3D 국가유산청',msg:'천마총에서 나온 신라 금관을 봤어요. 곱은옥이 주렁주렁 달려 있었어요.'},
 buyeo:{m:'buyeo/hyangro',n:'백제 금동대향로',e:'백제 · 국보',c:'3D junhapark1, CC BY',msg:'능산리 절터에서 나온 백제 금동대향로를 봤어요. 꼭대기에 봉황이 앉아 있어요.'},
 gangjin:{m:'gangjin/maebyeong',n:'청자 매병',e:'고려',c:'3D 클리블랜드 미술관, CC0',msg:'고려 청자의 고향 강진에서 비색 매병을 만났어요.'},
 icheon:{m:'icheon/jar1983',n:'달항아리',e:'조선 1700년대',c:'클리블랜드 미술관 1983.28, CC0',msg:'보름달을 닮은 조선 백자 달항아리를 봤어요.'},
 jongmyo:{m:'jongmyo/tukjong',n:'종묘제례 악기',e:'조선 · 유네스코 인류무형유산',c:'3D 국가유산청',msg:'종묘 월대에서 제례악 악기를 차례로 울려 봤어요.'},
 hanyang:{m:'hanyang/angbu',n:'앙부일구',e:'조선',c:'3D 국가유산청',msg:'오목한 해시계 앙부일구로 그림자 시간을 읽어 봤어요.'},
 cheongju:{m:'cheongju/jikji_type',n:'금속활자',e:'고려 1377년 직지',c:'3D 한국문화정보원, CC BY',msg:'1377년 흥덕사에서 직지를 찍어 낸 금속활자를 봤어요.'},
 tongyeong:{m:'tongyeong/najeonham',n:'나전칠함',e:'조선',c:'3D KCDF, CC BY',msg:'자개로 꽃과 넝쿨을 놓은 통영 나전칠함이 반짝였어요.'},
 jinju:{m:'jinju/cannon',n:'현자총통',e:'조선',c:'3D 국가유산청 재현 에셋',msg:'진주성을 지키던 현자총통 앞에 서 봤어요.'},
 suwon:{m:'suwon/geojunggi',n:'거중기',e:'조선 정조 때',c:'3D KBU jiin712921, CC BY',msg:'수원 화성을 쌓을 때 무거운 돌을 들어 올린 거중기를 봤어요.'},
 seokguram:{m:'vairocana',n:'석굴암 본존불',e:'통일신라',c:'3D 스캔 국가유산청 KHS, CC BY',msg:'석굴암 본존불 앞에서 조용히 인사했어요.'},
 wolji:{p:'stamps/wolji.jpg',n:'경주 동궁과 월지',e:'통일신라',c:'무이 월드 장면',msg:'주령구를 굴렸더니 벌칙이 나왔어요. 밤 연못이 정말 예뻤어요.'},
 pohang:{p:'stamps/wolji.jpg',n:'포항 영일만',e:'실측 3D',c:'무이 월드 장면',msg:'영일만에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 usuyeong:{p:'stamps/wolji.jpg',n:'해남 우수영·울돌목',e:'실측 3D',c:'무이 월드 장면',msg:'우수영·울돌목에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 naeso:{p:'stamps/wolji.jpg',n:'부안 내소사',e:'실측 3D',c:'무이 월드 장면',msg:'내소사에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 byeokgol:{p:'stamps/wolji.jpg',n:'김제 벽골제',e:'실측 3D',c:'무이 월드 장면',msg:'벽골제에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 chungju:{p:'stamps/wolji.jpg',n:'충주 중앙탑·고구려비',e:'실측 3D',c:'무이 월드 장면',msg:'중앙탑·고구려비에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 ulleung:{p:'stamps/wolji.jpg',n:'울릉 울릉도',e:'실측 3D',c:'무이 월드 장면',msg:'울릉도에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 naksan:{p:'stamps/wolji.jpg',n:'양양 낙산사',e:'실측 3D',c:'무이 월드 장면',msg:'낙산사에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 cheongpyeong:{p:'stamps/wolji.jpg',n:'춘천 청평사',e:'실측 3D',c:'무이 월드 장면',msg:'청평사에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 jeongok:{p:'stamps/wolji.jpg',n:'연천 전곡리 구석기 유적',e:'실측 3D',c:'무이 월드 장면',msg:'전곡리 구석기 유적에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 namhan:{p:'stamps/wolji.jpg',n:'경기 광주 남한산성',e:'실측 3D',c:'무이 월드 장면',msg:'남한산성에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 oeam:{p:'stamps/wolji.jpg',n:'아산 외암마을',e:'실측 3D',c:'무이 월드 장면',msg:'외암마을에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 beopju:{p:'stamps/wolji.jpg',n:'보은 법주사',e:'실측 3D',c:'무이 월드 장면',msg:'법주사에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 naganeup:{p:'stamps/wolji.jpg',n:'순천 낙안읍성',e:'실측 3D',c:'무이 월드 장면',msg:'낙안읍성에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 tongdo:{p:'stamps/wolji.jpg',n:'양산 통도사',e:'실측 3D',c:'무이 월드 장면',msg:'통도사에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 miryang:{p:'stamps/wolji.jpg',n:'밀양 영남루',e:'실측 3D',c:'무이 월드 장면',msg:'영남루에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 chojijin:{p:'stamps/wolji.jpg',n:'강화 초지진',e:'실측 3D',c:'무이 월드 장면',msg:'초지진에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 gimhae:{p:'stamps/wolji.jpg',n:'김해 수로왕릉·대성동 고분군',e:'실측 3D',c:'무이 월드 장면',msg:'수로왕릉·대성동 고분군에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 goryeong:{p:'stamps/wolji.jpg',n:'고령 대가야 고분군',e:'실측 3D',c:'무이 월드 장면',msg:'대가야 고분군에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 daegu:{p:'stamps/wolji.jpg',n:'대구 경상감영·약령시',e:'실측 3D',c:'무이 월드 장면',msg:'경상감영·약령시에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 hwasun:{p:'stamps/wolji.jpg',n:'화순 고인돌 유적',e:'실측 3D',c:'무이 월드 장면',msg:'고인돌 유적에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 bangudae:{p:'stamps/wolji.jpg',n:'울산 반구천의 암각화',e:'실측 3D',c:'무이 월드 장면',msg:'반구천의 암각화에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 gochang:{p:'stamps/wolji.jpg',n:'고창 고창읍성',e:'실측 3D',c:'무이 월드 장면',msg:'고창읍성에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 mireuk:{p:'stamps/wolji.jpg',n:'익산 미륵사지',e:'실측 3D',c:'무이 월드 장면',msg:'미륵사지에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 jumak:{p:'stamps/wolji.jpg',n:'문경 새재 주막',e:'실측 3D',c:'무이 월드 장면',msg:'새재 주막에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 jeonju:{p:'stamps/wolji.jpg',n:'전주 한옥마을·경기전',e:'실측 3D',c:'무이 월드 장면',msg:'한옥마을·경기전에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 woljeong:{p:'stamps/wolji.jpg',n:'평창 월정사',e:'실측 3D',c:'무이 월드 장면',msg:'월정사에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 daegak:{p:'stamps/wolji.jpg',n:'부산 대각사',e:'실측 3D',c:'무이 월드 장면',msg:'대각사에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 geumoreum:{p:'stamps/wolji.jpg',n:'제주 금오름',e:'실측 3D',c:'무이 월드 장면',msg:'금오름에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 seondol:{p:'stamps/wolji.jpg',n:'영월 선돌',e:'실측 3D',c:'무이 월드 장면',msg:'선돌에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 sinbok:{p:'stamps/wolji.jpg',n:'강릉 신복사지',e:'실측 3D',c:'무이 월드 장면',msg:'신복사지에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 seoseok:{p:'stamps/wolji.jpg',n:'영양 서석지',e:'실측 3D',c:'무이 월드 장면',msg:'서석지에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 godal:{p:'stamps/wolji.jpg',n:'여주 고달사지 승탑',e:'실측 3D',c:'무이 월드 장면',msg:'고달사지 승탑에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 gulsan:{p:'stamps/wolji.jpg',n:'강릉 굴산사지',e:'실측 3D',c:'무이 월드 장면',msg:'굴산사지에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 daechon:{p:'stamps/wolji.jpg',n:'정선 대촌마을',e:'실측 3D',c:'무이 월드 장면',msg:'대촌마을에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 pasa:{p:'stamps/wolji.jpg',n:'여주 파사산성',e:'실측 3D',c:'무이 월드 장면',msg:'파사산성에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 juwang:{p:'stamps/wolji.jpg',n:'청송 주왕산',e:'실측 3D',c:'무이 월드 장면',msg:'주왕산에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 mugi:{p:'stamps/wolji.jpg',n:'함안 무기연당',e:'실측 3D',c:'무이 월드 장면',msg:'무기연당에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 bangcho:{p:'stamps/wolji.jpg',n:'김천 방초정',e:'실측 3D',c:'무이 월드 장면',msg:'방초정에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 beopcheon:{p:'stamps/wolji.jpg',n:'원주 법천사지',e:'실측 3D',c:'무이 월드 장면',msg:'법천사지에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 maisan:{p:'stamps/wolji.jpg',n:'진안 마이산',e:'실측 3D',c:'무이 월드 장면',msg:'마이산에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 kimyusin:{p:'stamps/wolji.jpg',n:'경주 김유신 장군묘',e:'실측 3D',c:'무이 월드 장면',msg:'김유신 장군묘에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 gyeongdeok:{p:'stamps/wolji.jpg',n:'경주 경덕왕릉',e:'실측 3D',c:'무이 월드 장면',msg:'경덕왕릉에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 heungdeok:{p:'stamps/wolji.jpg',n:'경주 흥덕왕릉',e:'실측 3D',c:'무이 월드 장면',msg:'흥덕왕릉에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 goseong:{p:'stamps/wolji.jpg',n:'고성 계승사 공룡 바위',e:'실측 3D',c:'무이 월드 장면',msg:'계승사 공룡 바위에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 mudeung:{p:'stamps/wolji.jpg',n:'광주 무등산 주상절리',e:'실측 3D',c:'무이 월드 장면',msg:'무등산 주상절리에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 jangan:{p:'stamps/paldal.jpg',n:'수원 장안문',e:'실측 3D',c:'무이 월드 장면',msg:'장안문에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 paldal:{p:'stamps/suwon.jpg',n:'수원 팔달문',e:'실측 3D',c:'무이 월드 장면',msg:'팔달문에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 seongdeok:{p:'stamps/gyeongju.jpg',n:'경주 성덕왕릉',e:'실측 3D',c:'무이 월드 장면',msg:'성덕왕릉에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 inwang:{p:'stamps/wolji.jpg',n:'경주 인왕동 절터',e:'실측 3D',c:'무이 월드 장면',msg:'인왕동 절터에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 changwon:{p:'stamps/hahoe.jpg',n:'창원 창원의 집',e:'실측 3D',c:'무이 월드 장면',msg:'창원의 집에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 seoulstation:{p:'stamps/wolji.jpg',n:'서울 옛 서울역',e:'실측 3D',c:'무이 월드 장면',msg:'옛 서울역에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 haenggung:{p:'stamps/wolji.jpg',n:'수원 화성행궁',e:'실측 3D',c:'무이 월드 장면',msg:'화성행궁에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 jejumok:{p:'stamps/seongeup.jpg',n:'제주 제주목 관아',e:'실측 3D',c:'무이 월드 장면',msg:'제주목 관아에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 chunyanggyo:{p:'stamps/wolji.jpg',n:'경주 남천 춘양교',e:'실측 3D',c:'무이 월드 장면',msg:'남천 춘양교에 다녀왔어요. 실제 크기라 정말 컸어요!'},
 namwon:{p:'stamps/namwon.jpg',n:'남원 광한루원',e:'조선',c:'무이 월드 장면',msg:'오작교를 건너 춘향 그네를 높이 뛰었어요. 딸랑!'},
 hahoe:{p:'stamps/hahoe.jpg',n:'안동 하회마을',e:'조선',c:'무이 월드 장면',msg:'낙동강이 S자로 감싸 도는 마을에서 줄불놀이를 봤어요.'},
 seongeup:{p:'stamps/seongeup.jpg',n:'제주 성읍 민속마을',e:'조선',c:'무이 월드 장면',msg:'검은 돌담 올레를 걷고 돌하르방 코를 만졌어요.'},
 soswae:{p:'stamps/soswae.jpg',n:'담양 소쇄원',e:'조선',c:'무이 월드 장면',msg:'계곡 물소리 들으며 징검다리를 건넜어요.'},
 haenyeo:{p:'stamps/haenyeo.jpg',n:'제주 해녀 바닷가',e:'유네스코 인류무형문화유산',c:'무이 월드 장면',msg:'물속에 들어가 소라와 전복을 땄어요. 호오이~'},
 hoeamsa:{m:'hoeamsa/scan',n:'회암사 터',e:'고려 말 조선 초',c:'드론 실측 3D lacomi1975, CC BY 4.0',msg:'층층이 쌓은 돌축대 위에 옛 전각을 되살려 봤어요.'},
 gongsan:{m:'gongsan/scan',n:'공산성',e:'백제 웅진 시기 · 세계유산',c:'드론 실측 3D lacomi1975, CC BY 4.0',msg:'금강을 끼고 산등성이를 두른 공산성을 내려다봤어요.'},
 haemi:{m:'haemi/scan_mini',n:'해미읍성',e:'조선',c:'드론 실측 3D lacomi1975, CC BY 4.0',msg:'해미읍성 성벽을 따라 한 바퀴 걸었어요.'},
 gangneung:{p:'gangneung/cc_1.jpg',n:'초충도',e:'조선 · 신사임당 전',c:'사진 국립중앙박물관, 공공누리 제1유형',msg:'풀과 벌레를 그린 초충도를 가까이서 봤어요.'},
 minhwa:{p:'minhwa/tiger1.jpg',n:'까치호랑이',e:'조선 민화',c:'사진 퍼블릭 도메인',msg:'까치와 호랑이가 웃고 있는 민화를 봤어요.'},
 naju:{p:'najumg/crown2.jpg',n:'나주 신촌리 금동관',e:'삼국시대 · 국보',c:'사진 Gihoon81, CC BY-SA 3.0',msg:'나주 신촌리 무덤에서 나온 금동관을 만났어요.'},
 yeongju:{p:'goryeo/mr1.jpg',n:'부석사 무량수전',e:'고려',c:'사진 Bernard Gagnon, CC0',msg:'부석사 무량수전 배흘림기둥을 올려다봤어요.'},
 yesan:{p:'goryeo/sd2.jpg',n:'수덕사 대웅전',e:'고려 1308년',c:'사진 Jjw, CC BY 4.0',msg:'수덕사 대웅전 앞마당에 서 봤어요.'},
 mungyeong:{p:'najumg/saejae2.jpg',n:'문경새재 제2관문',e:'조선',c:'사진 hyolee2, CC BY-SA 4.0',msg:'옛 선비들이 넘던 문경새재 관문을 지났어요.'},
 sungnyemun:{p:'sungnyemun/hyeonpan.jpg',n:'숭례문 현판',e:'조선 · 국보',c:'사진 한국관광공사, 공공누리 제1유형',msg:'서울의 남쪽 큰 문, 숭례문 현판을 올려다봤어요.'}};
const credOf=d=>{const m=/\(([^()]*(?:3D|CC0|CC BY|국가유산청|미술관)[^()]*)\)\s*$/.exec(d||'');return m?m[1].replace(/^3D:\s*/,'3D '):''};
/* 지금 가까이 있는 볼거리 이름이 복원 공방 유물이면 그 유물, 아니면 마당 대표 유물 */
export function stampFor(site,spotTitle){if(spotTitle){const a=ART.find(a=>spotTitle.includes(a.n)||a.n.includes(spotTitle));if(a&&STAMPS[site]&&STAMPS[site].m===a.m)return STAMPS[site];if(a)return{m:a.m,n:a.n,e:ERA[a.k]||a.site,c:credOf(a.d)||'공개 자료',msg:`${a.n}${/[가-힣]$/.test(a.n)&&((a.n.charCodeAt(a.n.length-1)-0xac00)%28)?'을':'를'} 가까이서 봤어요.`}}return STAMPS[site]||null}

let RR=null;
/* 우표 그림 만들기: 3D 유물은 작은 화면에 따로 그려서, 사진은 그대로 불러서 */
export async function stampImage(def,W=420,H=520){if(!def)return null;
 if(def.p)return await new Promise(res=>{const im=new Image();im.crossOrigin='anonymous';im.onload=()=>res(im);im.onerror=()=>res(null);im.src=TX(def.p)});
 const s=await getModel(def.m);if(!s)return null;
 if(!RR){RR=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});RR.outputColorSpace=THREE.SRGBColorSpace;RR.toneMapping=THREE.ACESFilmicToneMapping;RR.toneMappingExposure=1.08;RR.setPixelRatio(1)}RR.setSize(W,H,false);
 const sc=new THREE.Scene();try{const pm=new THREE.PMREMGenerator(RR);sc.environment=pm.fromScene(new RoomEnvironment(),.04).texture;pm.dispose()}catch(e){}
 sc.add(new THREE.HemisphereLight(0xfff8ec,0x8a7a66,1.5));const dl=new THREE.DirectionalLight(0xffffff,2.6);dl.position.set(2,4,3);sc.add(dl);const fl=new THREE.DirectionalLight(0xffd8a0,.9);fl.position.set(-3,1.5,-2);sc.add(fl);
 const o=s.clone(true);o.updateMatrixWorld(true);/* 꼭짓점 기준으로 정확히 잰 크기(뼈대·빈 물체 때문에 상자가 부풀어 유물이 작게 찍히던 것 막기) */let b=new THREE.Box3().setFromObject(o,true);if(!isFinite(b.min.x)||b.isEmpty())b=new THREE.Box3().setFromObject(o);const z=b.getSize(new THREE.Vector3());const k=1.6/Math.max(z.y,z.x*1.15,z.z*1.15);o.scale.setScalar(k);o.position.set(-(b.min.x+b.max.x)/2*k,-(b.min.y+b.max.y)/2*k,-(b.min.z+b.max.z)/2*k);const g=new THREE.Group();g.add(o);g.rotation.y=-.55;sc.add(g);
 const cam=new THREE.PerspectiveCamera(30,W/H,.05,50);const hh=Math.max(z.y*k,Math.max(z.x,z.z)*k*H/W)*.5;const d=hh/Math.tan(15*Math.PI/180)*1.18;cam.position.set(0,d*.2,d);cam.lookAt(0,0,0);
 RR.setClearColor(0x000000,0);RR.render(sc,cam);const c=document.createElement('canvas');c.width=W;c.height=H;c.getContext('2d').drawImage(RR.domElement,0,0);try{sc.environment&&sc.environment.dispose()}catch(e){}return c}

const rr=(x,a,b,w,h,r)=>{x.beginPath();x.roundRect(a,b,w,h,r)};
function cover(x,im,dx,dy,dw,dh){const sr=im.width/im.height,dr=dw/dh;let sw=im.width,sh=im.height,sx=0,sy=0;if(sr>dr){sw=im.height*dr;sx=(im.width-sw)/2}else{sh=im.width/dr;sy=(im.height-sh)/2}x.drawImage(im,sx,sy,sw,sh,dx,dy,dw,dh)}
function wrap(x,t,maxW){const out=[];let cur='';for(const ch of t){if(x.measureText(cur+ch).width>maxW&&cur){/* 낱말 중간보다 띄어쓰기에서 끊기 */const sp=cur.lastIndexOf(' ');if(sp>cur.length*.5&&ch!==' '){out.push(cur.slice(0,sp));cur=cur.slice(sp+1)+ch}else{out.push(cur.trim());cur=ch===' '?'':ch}}else cur+=ch}if(cur.trim())out.push(cur.trim());return out}

/* 엽서 그리기(2026-11-16 고침). 주인공은 복원된 유물: 왼쪽 큰 그림에 실제 유물(실측 3D·소장품 사진)을 전시실 조명 아래 크게 놓고,
   찍은 장면(무이)은 우표 속에 작게 넣는다. o={title(장소),date,def,hero(유물 큰 그림),shot(찍은 장면),nick} */
export function drawPostcard(shot,o){const W=1500,H=1000,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');const def=o.def;
 /* 종이 */x.fillStyle='#f7efdc';x.fillRect(0,0,W,H);for(let i=0;i<2600;i++){const v=Math.random();x.fillStyle=v<.5?'rgba(120,90,50,.035)':'rgba(255,255,255,.12)';x.fillRect(Math.random()*W,Math.random()*H,1+Math.random()*2.5,1)}{const g=x.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,H*.95);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(90,60,20,.16)');x.fillStyle=g;x.fillRect(0,0,W,H)}
 const PX=44,PY=44,PW=930,PH=700;x.save();x.shadowColor='rgba(60,40,10,.35)';x.shadowBlur=18;x.shadowOffsetY=6;x.fillStyle='#fffdf6';x.fillRect(PX-12,PY-12,PW+24,PH+24);x.restore();
 if(o.hero&&def){x.save();x.beginPath();x.rect(PX,PY,PW,PH);x.clip();
  if(def.p){/* 그림·사진 유물: 짙은 전시 벽에 흰 여백 액자로 */const g=x.createLinearGradient(0,PY,0,PY+PH);g.addColorStop(0,'#4a3a2c');g.addColorStop(1,'#2a2018');x.fillStyle=g;x.fillRect(PX,PY,PW,PH);const m=54,s=Math.min((PW-m*2-40)/o.hero.width,(PH-m*2-40)/o.hero.height),dw=o.hero.width*s,dh=o.hero.height*s,dx=PX+(PW-dw)/2,dy=PY+(PH-dh)/2;x.save();x.shadowColor='rgba(0,0,0,.55)';x.shadowBlur=30;x.shadowOffsetY=14;x.fillStyle='#f4ecd8';x.fillRect(dx-20,dy-20,dw+40,dh+40);x.restore();x.drawImage(o.hero,dx,dy,dw,dh);x.strokeStyle='rgba(60,40,20,.6)';x.lineWidth=2;x.strokeRect(dx,dy,dw,dh);x.strokeStyle='#6b4a2e';x.lineWidth=8;x.strokeRect(dx-20,dy-20,dw+40,dh+40)}
  else{/* 입체 유물: 전시실 어둠 속 한 줄기 조명, 받침대 */const g=x.createRadialGradient(PX+PW/2,PY+PH*.42,20,PX+PW/2,PY+PH*.5,PW*.62);g.addColorStop(0,'#8a6e52');g.addColorStop(.45,'#4e3c2c');g.addColorStop(1,'#1c140e');x.fillStyle=g;x.fillRect(PX,PY,PW,PH);
   /* 위에서 내려오는 빛 */{const lg=x.createLinearGradient(0,PY,0,PY+PH*.8);lg.addColorStop(0,'rgba(255,236,196,.20)');lg.addColorStop(1,'rgba(255,236,196,0)');x.fillStyle=lg;x.beginPath();x.moveTo(PX+PW/2-70,PY);x.lineTo(PX+PW/2+70,PY);x.lineTo(PX+PW/2+330,PY+PH*.86);x.lineTo(PX+PW/2-330,PY+PH*.86);x.closePath();x.fill()}
   /* 받침대 */const by=PY+PH-118;{const pg=x.createLinearGradient(0,by,0,PY+PH);pg.addColorStop(0,'#5a4230');pg.addColorStop(1,'#2a1c12');x.fillStyle=pg;x.fillRect(PX+PW/2-250,by,500,PH-(by-PY));x.fillStyle='#7a5c40';x.fillRect(PX+PW/2-262,by-14,524,16);x.fillStyle='rgba(216,168,56,.75)';x.fillRect(PX+PW/2-262,by,524,3)}
   const ih=PH-118-46,s=Math.min((PW-160)/o.hero.width,ih/o.hero.height),dw=o.hero.width*s,dh=o.hero.height*s,dx=PX+(PW-dw)/2,dy=by-14-dh+Math.round(dh*.045);
   /* 바닥 그림자 */{x.save();x.translate(PX+PW/2,by-12);x.scale(1,.16);const sg=x.createRadialGradient(0,0,10,0,0,dw*.42);sg.addColorStop(0,'rgba(0,0,0,.6)');sg.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=sg;x.beginPath();x.arc(0,0,dw*.42,0,7);x.fill();x.restore()}
   x.drawImage(o.hero,dx,dy,dw,dh);
   /* 이름표 */{x.fillStyle='#f3ead6';x.fillRect(PX+PW/2-120,by+26,240,54);x.strokeStyle='#8a6a3a';x.lineWidth=2;x.strokeRect(PX+PW/2-120,by+26,240,54);x.fillStyle='#2b1d10';x.textAlign='center';x.textBaseline='alphabetic';x.font="24px 'Do Hyeon',sans-serif";x.fillText(def.n,PX+PW/2,by+52,224);x.font="14px 'Gowun Dodum',sans-serif";x.fillStyle='#6b4a26';x.fillText(def.e,PX+PW/2,by+71,224)}}
  x.restore()}
 else if(shot){cover(x,shot,PX,PY,PW,PH)}
 x.strokeStyle='rgba(60,40,20,.5)';x.lineWidth=1.5;x.strokeRect(PX,PY,PW,PH);
 /* 아래 글: 유물 이름이 제목, 장소·날짜는 둘째 줄 */x.textBaseline='alphabetic';x.textAlign='left';x.fillStyle='#2b1d10';x.font="64px 'Do Hyeon','Gowun Dodum',sans-serif";x.fillText(def?def.n:o.title,PX-4,PY+PH+98,PW-170);
 x.font="28px 'Gowun Dodum','Noto Sans KR',sans-serif";x.fillStyle='#6b4a26';x.fillText(def?(o.sub||`${def.e} · ${o.title}에서`):`${o.title}`,PX,PY+PH+146,PW-170);
 x.font="24px 'Gowun Dodum','Noto Sans KR',sans-serif";x.fillStyle='#8a6a40';x.fillText(`${o.date} · 무이 복원단과 함께`,PX,PY+PH+188,PW-170);
 /* 무이 복원 도장 */{const cx=PX+PW-70,cy=PY+PH+118;x.save();x.translate(cx,cy);x.rotate(-.1);x.globalAlpha=.9;x.strokeStyle='#b8322a';x.fillStyle='#b8322a';x.lineWidth=6;x.strokeRect(-58,-58,116,116);x.lineWidth=2;x.strokeRect(-48,-48,96,96);x.font="900 38px 'Noto Serif KR',serif";x.textAlign='center';x.fillText('무이',0,-6);x.fillText('복원',0,36);x.restore()}
 /* 가운데 세로줄 */const DX=1010;x.strokeStyle='rgba(90,60,30,.55)';x.lineWidth=2;x.beginPath();x.moveTo(DX,70);x.lineTo(DX,H-70);x.stroke();
 const RX=DX+34,RW=W-RX-44;x.textAlign='left';x.fillStyle='#8e2b20';x.font="30px 'Do Hyeon',sans-serif";x.fillText('우 편 엽 서',RX,86);x.font="15px 'Gowun Dodum',sans-serif";x.fillStyle='#8a6a40';x.fillText('POST CARD',RX,110);
 /* 우표: 찍은 장면 속 무이를 작게 */const SW=214,SH=270,SX=W-44-SW,SY=54;x.save();x.shadowColor='rgba(60,40,10,.3)';x.shadowBlur=8;x.shadowOffsetY=3;x.fillStyle='#fffdf6';x.fillRect(SX,SY,SW,SH);x.restore();
 x.fillStyle='#f7efdc';for(let i=0;i<=SW;i+=14){x.beginPath();x.arc(SX+i,SY,5,0,7);x.fill();x.beginPath();x.arc(SX+i,SY+SH,5,0,7);x.fill()}for(let j=0;j<=SH;j+=14){x.beginPath();x.arc(SX,SY+j,5,0,7);x.fill();x.beginPath();x.arc(SX+SW,SY+j,5,0,7);x.fill()}
 {const ix=SX+14,iy=SY+14,iw=SW-28,ih=SH-74;x.fillStyle='#efe6d2';x.fillRect(ix,iy,iw,ih);if(shot&&o.hero&&def){/* 무이가 서는 가운데 아래쪽만 오려서 */const sh=shot.height*.66,sw=sh*iw/ih,sx=Math.max(0,(shot.width-sw)/2),sy=shot.height*.3;x.drawImage(shot,sx,sy,Math.min(sw,shot.width),sh,ix,iy,iw,ih)}else if(o.stampImg){cover(x,o.stampImg,ix,iy,iw,ih)}else{x.fillStyle='#8e2b20';x.font="900 54px 'Noto Serif KR',serif";x.textAlign='center';x.fillText('무이',ix+iw/2,iy+ih/2+18)}x.strokeStyle='#8e2b20';x.lineWidth=2;x.strokeRect(ix,iy,iw,ih);
  x.textAlign='center';x.fillStyle='#2b1d10';x.font="20px 'Do Hyeon',sans-serif";x.fillText(o.stampName||'무이 복원단',SX+SW/2,SY+SH-36,SW-24);x.font="13px 'Gowun Dodum',sans-serif";x.fillStyle='#8e2b20';x.fillText('무이 우체국 · 대한민국 유산',SX+SW/2,SY+SH-16,SW-20)}
 /* 소인 */{const cx=SX-46,cy=SY+SH+40,r=68;x.save();x.translate(cx,cy);x.rotate(-.2);x.globalAlpha=.78;x.strokeStyle='#3a3a52';x.fillStyle='#3a3a52';x.lineWidth=3.5;x.beginPath();x.arc(0,0,r,0,7);x.stroke();x.lineWidth=1.5;x.beginPath();x.arc(0,0,r-9,0,7);x.stroke();x.textAlign='center';x.font="22px 'Do Hyeon',sans-serif";x.fillText(o.place||'무이 월드',0,-22,r*1.5);x.font="19px 'Gowun Dodum',sans-serif";x.fillText(o.date,0,8);x.font="13px 'Gowun Dodum',sans-serif";x.fillText('무이 우체국',0,32,r*1.2);x.lineWidth=3;for(let k=0;k<4;k++){x.beginPath();for(let t=0;t<=96;t+=5){const px=r+6+t,py=-34+k*17+Math.sin(t/11)*5;t?x.lineTo(px,py):x.moveTo(px,py)}x.stroke()}x.restore()}
 /* 손글씨 */{x.save();x.translate(RX+4,478);x.rotate(-.025);x.fillStyle='#2a3a6a';x.font="32px 'Gowun Dodum','Noto Sans KR',sans-serif";x.textAlign='left';const msg=o.msg||(def&&def.msg)||`${o.title}에 다녀왔어요.`;const L=wrap(x,msg,RW-10).slice(0,4);L.forEach((l,i)=>x.fillText(l,0,i*47));x.font="26px 'Gowun Dodum',sans-serif";x.fillText(`- ${o.nick||'무이 복원단'}`,RW-230,L.length*47+12);x.restore()}
 /* 받는 사람 */{const y0=782;x.strokeStyle='rgba(90,60,30,.5)';x.lineWidth=1.5;x.fillStyle='#8a6a40';x.font="20px 'Gowun Dodum',sans-serif";x.textAlign='left';x.fillText('받는 사람',RX,y0-14);for(let i=0;i<1;i++){x.beginPath();x.moveTo(RX,y0+26+i*46);x.lineTo(RX+RW,y0+26+i*58);x.stroke()}x.fillStyle='#2a3a6a';x.font="30px 'Gowun Dodum',sans-serif";x.fillText('유산을 아끼는 친구에게',RX+8,y0+18)}
 /* 출처 */x.textAlign='left';x.fillStyle='#8a6a40';x.font="16px 'Gowun Dodum',sans-serif";if(def)x.fillText(`${def.n} ${def.c}`,RX,H-88,RW);x.fillText('무이 캐릭터 © 초인 스튜디오',RX,H-64,RW);x.fillStyle='#6b4a26';x.font="18px 'Gowun Dodum',sans-serif";x.fillText('choin-studio.pages.dev/heritage3d',RX,H-38,RW);
 return c}
/* 엽서에 쓰는 글자의 글꼴 조각을 먼저 받아 둠(한 글자만 다른 글꼴로 찍히는 것 막기) */
export async function postcardFonts(texts){const s=texts.filter(Boolean).join('')+'우편엽서무이복원단우체국대한민국유산받는사람을아끼친구에게캐릭터초스튜디오과함께서';try{await Promise.race([Promise.all(['400 30px "Do Hyeon"','400 30px "Gowun Dodum"','700 30px "Noto Serif KR"'].map(f=>document.fonts.load(f,s))),new Promise(r=>setTimeout(r,3000))])}catch(e){}}

/* 복원한 유물로 엽서 만들기: 큰 그림은 유물, 우표는 복원단 무이 초상 */
const ERA={crown:'신라 5~6세기',maebyeong:'고려',hyangro:'백제 · 국보',moonjar:'조선 1700년대',sumaksae:'신라 · 보물',bansa:'삼국시대 · 국보',angbu:'조선',dragonjar:'조선 1700년대',kundika:'고려',unhyun:'조선',fishbottle:'조선 1400년대',eobo:'조선',bell:'통일신라 771년 · 국보',scrollbox:'조선',jikjitype:'고려',haetae:'조선',najeonham:'조선',pitcher:'고려 1100년대',lion:'고려',kettle:'고려',gamsari:'통일신라 682년 무렵',dujeonggap:'조선',cannon:'조선',hongipo:'조선 17세기',geojunggi:'조선 정조 때'};
const CREW={science:'과학 무이',metal:'금속 무이',ceramic:'도예 무이',painter:'화공 무이',carpenter:'목수 무이'};
export async function artPostcard(key,o={}){const a=ART.find(x=>x.k===key);if(!a)return null;const sd=Object.values(STAMPS).find(s=>s.m===a.m);const def={m:a.m,n:a.n,e:ERA[a.k]||(sd?sd.e:a.site),c:credOf(a.d)||'공개 자료'};
 const ck=o.crew&&CREW[o.crew]?o.crew:(a.kind==='metal'?'metal':a.kind==='ceramic'?'ceramic':a.kind==='lacquer'?'carpenter':'science');
 const face=new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src=new URL('../../world3d/media/crew_'+ck+'.jpg',import.meta.url).href});
 const stars=o.stars||0;const josa=((a.n.charCodeAt(a.n.length-1)-0xac00)%28)?'을':'를';const msg=`깨진 ${a.n}${josa} 조각조각 맞추고 닦아서 되살렸어요.`+(stars?` 솜씨 별 ${stars}개!`:'');
 const [hero,simg]=await Promise.all([Promise.race([stampImage(def,900,820),new Promise(r=>setTimeout(()=>r(null),7000))]),face]);await postcardFonts([a.n,def.e,def.c,msg,o.date,CREW[ck]]);
 return drawPostcard(null,{title:'무이 복원 공방',place:'무이 복원 공방',date:o.date,def,hero,stampImg:simg,stampName:CREW[ck],sub:`${def.e} · 무이 복원 공방에서 되살림`,msg})}
