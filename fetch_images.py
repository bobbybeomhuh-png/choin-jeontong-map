# -*- coding: utf-8 -*-
"""위키미디어 커먼즈에서 도시별 명소 사진을 자동 수집 → images.js 생성 (키 불필요).
검증: 커먼즈는 자유 라이선스(대개 CC/PD). 사진(jpg/png)·일정 크기 이상만 채택, 지도·도표·로고 회피."""
import json, urllib.parse, urllib.request, time, io, sys

# 도시 → 커먼즈 검색어(대표 명소). 우선 핵심 도시부터.
TERMS = {
 '강릉':'Ojukheon', '안동':'Hahoe village Andong', '경주':'Cheomseongdae', '전주':'Jeonju Hanok Village',
 '통영':'Dongpirang Tongyeong', '진도':'Jindo Bridge', '청주':'Cheongju Early Printing Museum',
 '합천':'Haeinsa Janggyeong Panjeon', '부여':'Jeongnimsa', '공주':'Tomb of King Muryeong',
 '남원':'Gwanghallu', '제주':'Seongsan Ilchulbong', '수원':'Hwaseong Fortress Suwon', '서울':'Gyeongbokgung',
 '담양':'Juknokwon', '순천':'Suncheon Bay', '여수':'Yeosu night sea', '강진':'Dasan Chodang Gangjin',
 '김해':'Gimhae Daeseong-dong tumuli', '창녕':'Upo Wetland', '영주':'Buseoksa', '포항':'Homigot',
 '단양':'Dodamsambong', '서산':'Seosan Buddha triad', '춘천':'Cheongpyeongsa', '영월':'Cheongnyeongpo',
 '독도':'Dokdo', '울릉도':'Ulleungdo'
}
API='https://commons.wikimedia.org/w/api.php'
def fetch(term):
    q={'action':'query','format':'json','generator':'search','gsrnamespace':'6','gsrlimit':'12',
       'gsrsearch':term,'prop':'imageinfo','iiprop':'url|mime|size','iiurlwidth':'1000'}
    url=API+'?'+urllib.parse.urlencode(q)
    req=urllib.request.Request(url,headers={'User-Agent':'CHOIN-storymap/1.0 (contact: choin)'})
    data=json.load(urllib.request.urlopen(req,timeout=20))
    pages=(data.get('query',{}) or {}).get('pages',{})
    best=None
    for p in sorted(pages.values(), key=lambda x:x.get('index',99)):
        ii=(p.get('imageinfo') or [{}])[0]
        mime=ii.get('mime',''); w=ii.get('width',0) or 0
        title=p.get('title','').lower()
        if mime in ('image/jpeg','image/png') and w>=800 and not any(b in title for b in ('map','svg','logo','locator','icon','flag','coat')):
            best=ii.get('thumburl') or ii.get('url'); break
    return best

out={}
for city,term in TERMS.items():
    try:
        u=fetch(term); out[city]=u or ''
        print(('OK ' if u else 'MISS ')+city+' <- '+term)
    except Exception as e:
        out[city]=''; print('ERR '+city+' '+str(e)[:60])
    time.sleep(0.4)

with io.open('images.js','w',encoding='utf-8') as f:
    f.write('// 위키미디어 커먼즈 자동 수집 (검수 권장). 자유 라이선스.\nconst IMAGES = ')
    f.write(json.dumps({k:v for k,v in out.items() if v}, ensure_ascii=False, indent=0))
    f.write(';\n')
print('--- saved images.js, %d/%d filled' % (len([v for v in out.values() if v]), len(TERMS)))
