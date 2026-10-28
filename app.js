/* ===== FoodieExpress – shared code (Firebase Realtime Database via REST) ===== */
const DB='https://iwt-food-delivery-default-rtdb.firebaseio.com';
const MENU_DEFAULT=[
{id:1,name:"Margherita Pizza",cat:"Pizza",price:249,emoji:"🍕",veg:1,rating:4.5,desc:"Classic cheese & tomato"},
{id:2,name:"Pepperoni Pizza",cat:"Pizza",price:329,emoji:"🍕",veg:0,rating:4.6,desc:"Loaded with pepperoni"},
{id:3,name:"Veg Burger",cat:"Burgers",price:129,emoji:"🍔",veg:1,rating:4.2,desc:"Crispy patty, fresh veggies"},
{id:4,name:"Chicken Burger",cat:"Burgers",price:159,emoji:"🍔",veg:0,rating:4.4,desc:"Juicy grilled chicken"},
{id:5,name:"Chicken Biryani",cat:"Indian",price:299,emoji:"🍛",veg:0,rating:4.8,desc:"Aromatic basmati rice"},
{id:6,name:"Paneer Tikka",cat:"Indian",price:199,emoji:"🍢",veg:1,rating:4.5,desc:"Smoky grilled paneer"},
{id:7,name:"Masala Dosa",cat:"Indian",price:99,emoji:"🥞",veg:1,rating:4.6,desc:"Crispy with potato filling"},
{id:8,name:"French Fries",cat:"Snacks",price:89,emoji:"🍟",veg:1,rating:4.1,desc:"Golden and salted"},
{id:9,name:"Chocolate Shake",cat:"Drinks",price:119,emoji:"🥤",veg:1,rating:4.3,desc:"Thick & creamy"},
{id:10,name:"Cold Coffee",cat:"Drinks",price:99,emoji:"☕",veg:1,rating:4.4,desc:"Chilled & refreshing"},
{id:11,name:"Chocolate Brownie",cat:"Desserts",price:109,emoji:"🍫",veg:1,rating:4.7,desc:"Warm, gooey, fudgy"},
{id:12,name:"Ice Cream Sundae",cat:"Desserts",price:129,emoji:"🍨",veg:1,rating:4.5,desc:"Three scoops with syrup"}];
let MENU=[...MENU_DEFAULT];
const COUPONS={FOOD10:{t:'p',v:10,d:'10% off'},WELCOME50:{t:'f',v:50,d:'₹50 off'},FREEDEL:{t:'d',v:0,d:'Free delivery'}};

/* ---------- small helpers ---------- */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ls=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch{return d}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let cart=ls('cart',{}),wish=ls('wish',[]),user=ls('user',null),theme=ls('theme','light');

/* ---------- Firebase REST helpers ---------- */
async function api(path,method='GET',body){            // path like 'users/abc' ; '' = database root
  const r=await fetch(`${DB}/${path}.json`,{method,body:body===undefined?undefined:JSON.stringify(body)});
  if(!r.ok)throw new Error('Database error '+r.status);
  return r.json();
}
const ekey=e=>e.toLowerCase().trim().replace(/\./g,',');   // Firebase keys cannot contain "."
async function sha(t){                                      // password hashing (SHA-256)
  try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
  catch{return btoa(unescape(encodeURIComponent(t)))}
}
let dbOk=null;
function setDb(ok){dbOk=ok;const d=$('#dbs');if(d){d.textContent=ok?'● Database connected':'● Offline mode – database unreachable';d.style.color=ok?'#4cd37b':'#ff8a5b'}}
async function loadMenu(){                                  // menu lives in Firebase; seeded on first run
  try{let m=await api('menu');
    if(!m){m={};MENU_DEFAULT.forEach(i=>m[i.id]=i);await api('menu','PUT',m)}
    MENU=Object.values(m).filter(Boolean).sort((a,b)=>a.id-b.id);setDb(true);
  }catch(e){console.warn('Using local menu:',e.message);setDb(false)}
}
const ready=loadMenu();

/* ---------- UI helpers ---------- */
function toast(m){let t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove('show'),2200)}
function cnt(){const c=$('#cnt');if(c)c.textContent=Object.values(cart).reduce((a,b)=>a+b,0)}
function card(m){const out=m.available===false;return `<div class="card"><button class="heart ${wish.includes(m.id)?'on':''}" data-w="${m.id}" title="Wishlist">♥</button><div class="em">${m.emoji}</div>
<span class="tag ${m.veg?'v':'n'}">${m.veg?'VEG':'NON-VEG'}</span><h3>${m.name}</h3><p>${m.desc}</p><div class="rt">⭐ ${m.rating}</div>
<div class="row"><b>₹${m.price}</b><button class="add" data-add="${m.id}" ${out?'disabled style="opacity:.5;cursor:not-allowed"':''}>${out?'Sold out':'Add +'}</button></div></div>`}
function shell(){
 const p=document.body.dataset.page;document.documentElement.dataset.theme=theme;
 const L=[['index','Home'],['menu','Menu'],['about','About'],['contact','Contact']];
 document.body.insertAdjacentHTML('afterbegin',`<header><a class="logo" href="index.html">🍴 FoodieExpress</a><button id="burger" aria-label="menu">☰</button><nav id="nav">${L.map(([f,n])=>`<a href="${f}.html" class="${p==f?'on':''}">${n}</a>`).join('')}
<a href="login.html" class="${p=='login'?'on':''}">${user?'👤 '+esc(user.name.split(' ')[0]):'Login'}</a>${user?'<a href="#" id="logout">Logout</a>':''}
<button class="ic" id="theme" title="Dark mode">${theme=='dark'?'☀️':'🌙'}</button><a class="cartb" href="cart.html">🛒 <span id="cnt">0</span></a></nav></header>`);
 document.body.insertAdjacentHTML('beforeend',`<footer><p>© 2026 FoodieExpress | Internet &amp; Web Technology Lab Mini Project</p><p><a href="index.html">Home</a><a href="menu.html">Menu</a><a href="about.html">About</a><a href="contact.html">Contact</a><a href="admin.html">Admin</a></p><p id="dbs" style="font-size:.85rem;margin-top:6px">● Connecting…</p></footer><div id="toast"></div>`);
 cnt();if(dbOk!==null)setDb(dbOk);
}
document.addEventListener('click',e=>{
 const t=e.target.closest('button,a'),d=t?t.dataset:{};if(!t)return;
 if(t.id=='burger')$('#nav').classList.toggle('show');
 if(t.id=='theme'){theme=theme=='dark'?'light':'dark';save('theme',theme);document.documentElement.dataset.theme=theme;t.textContent=theme=='dark'?'☀️':'🌙'}
 if(t.id=='logout'){e.preventDefault();user=null;save('user',null);location.href='index.html'}
 if(d.add){cart[d.add]=(cart[d.add]||0)+1;save('cart',cart);cnt();toast('🛒 Added to cart');if(window.drawCart)drawCart()}
 if(d.w){const i=+d.w;wish=wish.includes(i)?wish.filter(x=>x!=i):[...wish,i];save('wish',wish);t.classList.toggle('on');toast(wish.includes(i)?'❤️ Added to wishlist':'Removed from wishlist')}
});
document.addEventListener('DOMContentLoaded',shell);
