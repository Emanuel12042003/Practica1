// Simple demo data + cart logic using localStorage
const MENU = [
  {id:1, name:'Taco al Pastor', price:18, img:'https://picsum.photos/seed/pastor/400/240'},
  {id:2, name:'Taco de Asada', price:20, img:'https://picsum.photos/seed/asada/400/240'},
  {id:3, name:'Taco de Suadero', price:19, img:'https://picsum.photos/seed/suadero/400/240'},
  {id:4, name:'Gringa', price:35, img:'https://picsum.photos/seed/gringa/400/240'}
];

function getCart(){ return JSON.parse(localStorage.getItem('cart')||'[]'); }
function setCart(c){ localStorage.setItem('cart', JSON.stringify(c)); }

function renderMenu(){
  const list = document.getElementById('menu-list');
  list.innerHTML = '';
  MENU.forEach(item => {
    const el = document.createElement('div');
    el.className = 'menu-item';
    el.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <h4>${item.name}</h4>
      <p>$${item.price.toFixed(2)}</p>
      <button class="btn">Agregar</button>`;
    el.querySelector('button').onclick = () => {
      const cart = getCart();
      const idx = cart.findIndex(x => x.id === item.id);
      if(idx >= 0){ cart[idx].qty += 1; } else { cart.push({...item, qty:1}); }
      setCart(cart);
      updateCartCount();
      alert('Agregado al carrito');
    };
    list.appendChild(el);
  });
}

function updateCartCount(){
  const el = document.getElementById('cart-count');
  if(el){ el.textContent = getCart().reduce((s,x)=>s+x.qty,0); }
}

function renderCart(){
  const items = getCart();
  const box = document.getElementById('cart-items');
  let total = 0;
  box.innerHTML = '';
  items.forEach(it => {
    const row = document.createElement('div');
    row.className = 'cart-row';
    const line = (it.qty * it.price);
    total += line;
    row.innerHTML = `<span>${it.qty} × ${it.name}</span><strong>$${line.toFixed(2)}</strong>`;
    box.appendChild(row);
  });
  document.getElementById('cart-total').textContent = total.toFixed(2);
}

function checkout(){
  alert('Pedido confirmado. Te avisaremos cuando esté listo. (Demo)');
  localStorage.removeItem('cart');
  location.href = 'index.html';
}

function fakeLogin(e){
  e.preventDefault();
  alert('Sesión iniciada (demo).');
  location.href = 'index.html';
}
