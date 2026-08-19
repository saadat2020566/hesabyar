const CACHE="hesabyar-v1";
const SHELL=["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  if(new URL(e.request.url).origin===location.origin){
    e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{
      const cp=r.clone();caches.open(CACHE).then(x=>x.put(e.request,cp));return r;
    }).catch(()=>caches.match("./index.html"))))
  }
});