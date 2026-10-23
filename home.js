(function () {
  'use strict';
  var T = {
    es: { nav_home:'Inicio', nav_about:'Nosotros', nav_spec:'Especialidades', nav_menu:'Menú',
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
    en: { nav_home:'Home', nav_about:'About', nav_spec:'Specialties', nav_menu:'Menu',
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
