(function () {
  'use strict';
  var T = {
    es: { nav_top:'Top 5', top_eb:'Lo favorito de nuestros clientes', top_h:'Top 5 más vendidos', more:'Ver en el menú →', tacos_pr:'3 por ₡1500 · 5 por ₡2400',
      t1_t:'Gallo de lomo de aguja', t1_p:'Suave lomito de aguja en la salsa especial de la casa.',
      t2_t:'Hamburguesa Betico', t2_p:'Pan artesanal, 200g de 100% carne de res, queso mozzarella, vegetales y lomito de aguja en salsa especial de la casa.',
      t3_t:'Tacos', t3_p:'Taco costarricense relleno de lomo de aguja. Pídalo arreglado.',
      t4_t:'Cortes a la parrilla', t4_p:'Entraña, rib eye y lomito a la parrilla con dos guarniciones a escoger.',
      t5_t:'Arroces', t5_p:'Arroz achiotado y “olores” con los mejores sabores de Costa Rica, con papas fritas y ensalada de la huerta.',
      nav_home:'Inicio', nav_about:'Nosotros', nav_spec:'Especialidades', nav_menu:'Menú', nav_contact:'Contacto', visit_h:'Visítanos', phone_h:'Llámanos', phone_p:'Reservaciones y consultas:', loc_h:'Ubicación', loc_p:'Encuéntranos fácilmente con Google Maps.', loc_btn:'Cómo llegar',
      hero_eyebrow:'Grill Garden', hero_tag:'Sabor tico a la parrilla, en un ambiente de jardín.',
      btn_menu:'Ir a mi menú', btn_menu2:'Ver el menú completo', btn_menu3:'Explorar el menú',
      about_h:'Cocina tica con fuego y frescura',
      about_p1:'En BETICO Grill Garden mezclamos lo mejor de la cocina costarricense con el sabor de la parrilla: casados, gallos, tacos, arroces, pastas y platos a la plancha preparados con ingredientes frescos.',
      about_p2:'Un lugar para compartir con familia y amigos, desde algo para pasar el rato hasta un buen casado del día.',
      spec_h:'Nuestras especialidades',
      c1_t:'Maduro con queso', c1_p:'Canoa de plátano maduro con queso gratinado.',
      c2_t:'Casados', c2_p:'Arroz, frijoles frescos, picadillo del día, ensalada del huerto, huevo frito y plátanos maduros.', from:'desde',
      c3_t:'Casado con pescado', c3_p:'Pescado a la plancha con arroz, frijoles, picadillo y ensalada.',
      quote:'“Hecho con sabor tico, servido con cariño.”', cta_h:'¿Qué se te antoja hoy?', title:'BETICO Grill Garden' },
    en: { nav_top:'Top 5', top_eb:'Our customers\' favorites', top_h:'Top 5 best sellers', more:'See on the menu →', tacos_pr:'3 for ₡1500 · 5 for ₡2400',
      t1_t:'Beef loin gallo', t1_p:'Tender beef loin in the house special sauce.',
      t2_t:'Betico Burger', t2_p:'Handmade bread, 200g of 100% beef, mozzarella cheese, vegetables and beef loin in the house special sauce.',
      t3_t:'Tacos', t3_p:'Costa Rican taco filled with beef loin. Ask for it with dressing.',
      t4_t:'Grilled cuts', t4_p:'Skirt, rib eye and tenderloin from the grill, with two sides of your choice.',
      t5_t:'Rice dishes', t5_p:'Annatto rice with creole herbs and the best flavors of Costa Rica, with French fries and garden salad.',
      nav_home:'Home', nav_about:'About', nav_spec:'Specialties', nav_menu:'Menu', nav_contact:'Contact', visit_h:'Visit us', phone_h:'Call us', phone_p:'Reservations and inquiries:', loc_h:'Location', loc_p:'Find us easily with Google Maps.', loc_btn:'Get directions',
      hero_eyebrow:'Grill Garden', hero_tag:'Costa Rican flavor from the grill, in a garden setting.',
      btn_menu:'Go to my menu', btn_menu2:'See the full menu', btn_menu3:'Explore the menu',
      about_h:'Costa Rican cooking, fire and freshness',
      about_p1:'At BETICO Grill Garden we bring together the best of Costa Rican cuisine and the taste of the grill: casados, gallos, tacos, rice dishes, pastas and griddle plates made with fresh ingredients.',
      about_p2:'A place to share with family and friends, from something to snack on to a good casado of the day.',
      spec_h:'Our specialties',
      c1_t:'Sweet plantain with cheese', c1_p:'Ripe plantain boat with gratinated cheese.',
      c2_t:'Casados', c2_p:'Rice, fresh beans, picadillo of the day, garden salad, fried egg and sweet plantains.', from:'from',
      c3_t:'Fish casado', c3_p:'Griddled fish with rice, beans, picadillo and salad.',
      quote:'“Made with Tico flavor, served with love.”', cta_h:'What are you craving today?', title:'BETICO Grill Garden' }
  };
  var lang = 'es';
  try { var s = localStorage.getItem('betico-lang'); if (s === 'en' || s === 'es') lang = s; } catch (e) {}
  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i]').forEach(function (n) { var v = T[lang][n.getAttribute('data-i')]; if (v != null) n.textContent = v; });
    document.querySelectorAll('.lang-btn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
  }
  document.querySelector('.lang').addEventListener('click', function (e) {
    var b = e.target.closest('.lang-btn'); if (!b) return;
    lang = b.getAttribute('data-lang');
    try { localStorage.setItem('betico-lang', lang); } catch (x) {}
    apply();
  });
  apply();
})();
