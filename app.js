(function () {
  'use strict';
  var DATA = window.MENU_DATA || [];
  var UI = {
    es: { nav: 'Categorías', tax: 'TODOS LOS IMPUESTOS INCLUÍDOS', veg: 'VEGETARIANO', spicy: 'PICANTE',
          vegLabel: 'Vegetariano', spicyLabel: 'Picante', title: 'BETICO Grill Garden · Menú', or: 'o' },
    en: { nav: 'Categories', tax: 'ALL TAXES INCLUDED', veg: 'VEGETARIAN', spicy: 'SPICY',
          vegLabel: 'Vegetarian', spicyLabel: 'Spicy', title: 'BETICO Grill Garden · Menu', or: 'or' }
  };
  var lang = 'es';
  try { var s = localStorage.getItem('betico-lang'); if (s === 'en' || s === 'es') lang = s; } catch (e) {}

  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function slug(i) { return 'cat-' + i; }

  function tagsEl(tags) {
    if (!tags || !tags.length) return null;
    var w = el('span', 'tags');
    tags.forEach(function (t) {
      var s = el('span', 'tag ' + t, t === 'veg' ? '🌱' : '🌶️');
      s.setAttribute('role', 'img');
      s.setAttribute('data-tag', t);
      s.setAttribute('aria-label', UI[lang][t === 'veg' ? 'vegLabel' : 'spicyLabel']);
      w.appendChild(s);
    });
    return w;
  }
  function price(p) { return el('span', 'price', '₡' + p); }

  function itemEl(it, isVariant) {
    var li = el('li', 'item' + (isVariant ? ' variant' : ''));
    var row = el('div', 'row');
    var name = el('span', 'name');
    name.appendChild(document.createTextNode(it.name[lang]));
    var tg = tagsEl(it.tags);
    if (tg) { name.appendChild(document.createTextNode(' ')); name.appendChild(tg); }
    row.appendChild(name);
    if (it.price) { row.appendChild(el('span', 'dots')); row.appendChild(price(it.price)); }
    li.appendChild(row);
    if (it.desc && it.desc[lang]) li.appendChild(el('p', 'desc', it.desc[lang]));
    if (it.variants) it.variants.forEach(function (v) {
      var r = el('div', 'row vrow');
      var n = el('span', 'name');
      n.appendChild(document.createTextNode('+ ' + v.name[lang]));
      var t2 = tagsEl(v.tags); if (t2) { n.appendChild(document.createTextNode(' ')); n.appendChild(t2); }
      r.appendChild(n);
      if (v.price) { r.appendChild(el('span', 'dots')); r.appendChild(price(v.price)); }
      li.appendChild(r);
    });
    return li;
  }

  function renderItems(items) {
    var ul = el('ul', 'items');
    items.forEach(function (it) { ul.appendChild(itemEl(it)); });
    return ul;
  }

  function renderBlocks(blocks, parent) {
    var run = null;
    function flush() { run = null; }
    blocks.forEach(function (b) {
      if (b.type === 'item') {
        if (!run) { run = el('ul', 'items'); parent.appendChild(run); }
        run.appendChild(itemEl(b));
        return;
      }
      flush();
      if (b.type === 'text') parent.appendChild(el('p', 'note', b[lang]));
      else if (b.type === 'list') {
        var ul = el('ul', 'sides');
        b.items.forEach(function (x) { ul.appendChild(el('li', null, x[lang])); });
        parent.appendChild(ul);
      } else if (b.type === 'group') {
        var g = el('div', 'group');
        var h = el('h3', 'group-title');
        h.appendChild(el('span', null, b.title[lang]));
        if (b.price) { h.appendChild(el('span', 'dots')); h.appendChild(price(b.price)); }
        g.appendChild(h);
        var ul2 = el('ul', 'items');
        b.items.forEach(function (it) {
          // group variants without price (e.g. shrimp styles)
          ul2.appendChild(itemEl(it));
        });
        g.appendChild(ul2);
        parent.appendChild(g);
      }
    });
  }

  function render() {
    var menu = $('menu'), list = $('catList');
    menu.textContent = ''; list.textContent = '';
    DATA.forEach(function (sec, i) {
      var id = slug(i);
      var s = el('section', 'cat'); s.id = id; s.setAttribute('aria-labelledby', id + '-h');
      var h = el('h2', null, sec.title[lang]); h.id = id + '-h';
      s.appendChild(h);
      renderBlocks(sec.blocks, s);
      menu.appendChild(s);
      var li = el('li'); var a = el('a', null, sec.title[lang]);
      a.href = '#' + id; a.setAttribute('data-target', id);
      li.appendChild(a); list.appendChild(li);
    });
    var u = UI[lang];
    $('cats').setAttribute('aria-label', u.nav);
    $('taxNote').textContent = u.tax;
    $('legVeg').textContent = u.veg;
    $('legSpicy').textContent = u.spicy;
    document.documentElement.lang = lang;
    document.title = u.title;
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    spy();
  }

  function setLang(l) {
    if (l === lang) return;
    lang = l;
    try { localStorage.setItem('betico-lang', l); } catch (e) {}
    render();
  }

  // Scroll-spy for category chips
  function headerH() { return document.querySelector('.top').offsetHeight; }
  function spy() {
    var secs = document.querySelectorAll('.cat');
    var y = window.scrollY + headerH() + 24, current = null;
    secs.forEach(function (s) { if (s.offsetTop <= y) current = s.id; });
    var active = null;
    document.querySelectorAll('#catList a').forEach(function (a) {
      var on = a.getAttribute('data-target') === current;
      a.classList.toggle('on', on);
      if (on) { a.setAttribute('aria-current', 'true'); active = a; } else a.removeAttribute('aria-current');
    });
    if (active) {
      var nav = $('cats'), l = active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2;
      if (Math.abs(nav.scrollLeft - l) > 4) nav.scrollTo({ left: l, behavior: 'smooth' });
    }
  }
  var tick = false;
  window.addEventListener('scroll', function () {
    if (tick) return; tick = true;
    requestAnimationFrame(function () { tick = false; spy(); });
  }, { passive: true });

  $('catList').addEventListener('click', function (e) {
    var a = e.target.closest('a'); if (!a) return;
    e.preventDefault();
    var t = $(a.getAttribute('data-target'));
    window.scrollTo({ top: t.offsetTop - headerH() + 2, behavior: 'smooth' });
  });
  document.querySelector('.lang').addEventListener('click', function (e) {
    var b = e.target.closest('.lang-btn'); if (b) setLang(b.getAttribute('data-lang'));
  });

  render();
})();
