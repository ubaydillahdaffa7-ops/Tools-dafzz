const CACHE='dafzz-tools-v5';
const CORE=['./','./index.html','./style.css','./script.js','./tools.json','./manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  e.respondWith(fetch(e.request).then(res=>{
    if(res.ok&&url.origin===location.origin){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}
    return res;
  }).catch(()=>caches.match(e.request).then(r=>{
    if(r)return r;
    if(e.request.mode==='navigate')return caches.match('./index.html');
    return Response.error();
  })));
});
