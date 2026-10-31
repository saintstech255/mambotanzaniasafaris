(function () {
  'use strict';
  var WA = '255685645498';
  var wa = function (m) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(m); };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };

  // [id, group, name, destination, duration, description, highlights, image, featured]
  var P = [
    ['serengeti','n','Serengeti Safari','Serengeti National Park','3-5 days','Vast open plains famous for big cats and large herds.',['Big cat sightings','Seasonal wildebeest migration','Endless savannah views'],'serengeti',1],
    ['ngorongoro','n','Ngorongoro Crater Safari','Ngorongoro Conservation Area','1-2 days','Game drives inside a volcanic caldera with dense wildlife.',['Crater floor game drives','Varied wildlife in one place','Maasai heritage in the highlands'],'ngorongoro',0],
    ['tarangire','n','Tarangire Safari','Tarangire National Park','1-2 days','Baobab-dotted landscapes known for elephants.',['Elephant herds','Ancient baobab trees','Rich birdlife'],'tarangire',0],
    ['manyara','n','Lake Manyara Safari','Lake Manyara National Park','1 day','A compact park of lakeshore, forest and escarpment views.',['Lake and groundwater forest','Hippos and birdlife','Rift Valley scenery'],'lake-manyara',0],
    ['mkomazi','n','Mkomazi Safari','Mkomazi National Park','Flexible','A quieter dry-bush park in north-eastern Tanzania.',['Rhino sanctuary area','African wild dog conservation','Off-the-beaten-track feel'],'mkomazi',0],
    ['highlights','n','Northern Tanzania Highlights','Tarangire, Serengeti, Ngorongoro, Lake Manyara','5 days / 4 nights','The best-known northern parks combined in one journey.',['Four iconic destinations','Varied landscapes','Ideal first safari'],'safari-vehicle',1],
    ['mikumi','s','Mikumi Safari','Mikumi National Park','Flexible','Wildlife on the Mkata Plains, easy to reach.',['Elephants and giraffes','Zebras and lions','Mkata Plains'],'mikumi',0],
    ['nyerere','s','Nyerere (Selous) Safari','Nyerere National Park','Flexible','Wilderness safaris along the Rufiji River.',['Game drives','Boat safaris on the Rufiji','Diverse wildlife'],'nyerere',0],
    ['udzungwa','s','Udzungwa Hiking and Waterfalls','Udzungwa Mountains National Park','Flexible','Tropical forest trails and waterfalls for nature lovers.',['Sanje Waterfalls','Forest hiking trails','Mountain scenery'],'udzungwa',0],
    ['ruaha','s','Ruaha Safari','Ruaha National Park','Flexible','Rugged wilderness with large elephant populations and baobabs.',['Elephant herds','Ancient baobabs','Exceptional wildlife viewing'],'ruaha',0],
    ['machame','k','Machame Route','Mount Kilimanjaro','6-7 days','Scenic route through rainforest and varied zones.',['Rainforest trails','Mountain views','Popular route'],'kilimanjaro',1],
    ['marangu','k','Marangu Route','Mount Kilimanjaro','5-6 days','A gradual trail with hut accommodation.',['Hut accommodation','Changing vegetation zones','Gradual ascent'],'kilimanjaro',0],
    ['lemosho','k','Lemosho Route','Mount Kilimanjaro','7-8 days','A scenic, quieter approach with good acclimatisation.',['Wilderness start','Panoramic views','Extra acclimatisation'],'kilimanjaro',0],
    ['rongai','k','Rongai Route','Mount Kilimanjaro','6-7 days','Approach from the north on quieter trails.',['Remote landscapes','Quieter trails','Northern approach'],'kilimanjaro',0],
    ['kcircuit','k','Northern Circuit Route','Mount Kilimanjaro','8-9 days','One of the longest routes, with wide views.',['Extended acclimatisation','Wide-ranging views','Fewer crowds'],'kilimanjaro',0],
    ['umbwe','k','Umbwe Route','Mount Kilimanjaro','5-6 days','A steep, demanding route for experienced trekkers.',['Challenging ascent','Direct route','For experienced trekkers'],'kilimanjaro',0],
    ['nungwi','z','Nungwi Beach Escape','Nungwi, Zanzibar','Flexible','White sand, turquoise water and sunsets.',['White-sand beaches','Ocean activities','Sunsets'],'zanzibar',1],
    ['kendwa','z','Kendwa Beach Retreat','Kendwa, Zanzibar','Flexible','Relaxed coastline with clear water.',['Clear ocean water','Beach atmosphere','Sunset views'],'zanzibar',0],
    ['paje','z','Paje Beach and Water Adventures','Paje, Zanzibar','Flexible','Lively beach known for kite surfing.',['Kite surfing','Water activities','Beach life'],'zanzibar',0],
    ['stonetown','z','Stone Town Cultural Experience','Stone Town, Zanzibar','Flexible','History, architecture, markets and Swahili culture.',['Historic streets','Local markets','Swahili heritage'],'zanzibar',0],
    ['prison','z','Prison Island and Nakupenda Excursion','Prison Island and Nakupenda Sandbank','Flexible','Boat trip with giant tortoises and a sandbank.',['Giant Aldabra tortoises','Boat ride','Nakupenda Sandbank'],'zanzibar',0],
    ['maasai','c','Maasai Cultural Experience','Maasai community, Northern Tanzania','Flexible','Traditions, homes and storytelling of the Maasai.',['Traditional homes','Cultural practices','Storytelling'],'culture',1],
    ['materuni','c','Materuni Waterfalls and Coffee Tour','Materuni Village, Kilimanjaro','Flexible','A nature walk to waterfalls and Chagga coffee preparation.',['Waterfall walk','Chagga coffee tasting','Village life'],'culture',0],
    ['chala','c','Lake Chala Day Trip','Lake Chala, Kilimanjaro region','Flexible','A volcanic crater lake with scenic walks.',['Crater lake views','Nature walks','Photography'],'culture',0],
    ['chemka','c','Chemka Hot Springs','Kikuletwa (Chemka), Kilimanjaro region','Flexible','Clear turquoise spring waters for a relaxing swim.',['Natural spring pool','Swimming','Scenic oasis'],'culture',0],
    ['arusha','c','Arusha City Tour','Arusha, Tanzania','Flexible','Markets, heritage and everyday city life with a local guide.',['Local markets','Cultural heritage','Guided walk'],'culture',0]
  ];

  var CH = {
    n: 'Northern Circuit', s: 'Southern Circuit', k: 'Kilimanjaro', z: 'Zanzibar', c: 'Cultural and Adventure'
  };

  function media(src, alt, cls) {
    return '<div class="media ' + (cls || '') + '" data-alt="' + esc(alt) + '"><img src="images/' + src + '.jpg" alt="' + esc(alt) + '" loading="lazy" onerror="this.parentNode.classList.add(\'noimg\');this.remove()"></div>';
  }

  function card(p) {
    var msg = 'Hello Mambo Tanzania Safaris, I am interested in the ' + p[2] + '. Please share the itinerary, confirmed price, availability and package inclusions.';
    var lis = p[6].map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('');
    return '<article class="card">' + media(p[7], p[2] + ' - ' + p[3]) +
      '<div class="body"><h3>' + esc(p[2]) + '</h3><div class="meta">' + esc(p[3]) + ' &middot; ' + esc(p[4]) + '</div><p>' + esc(p[5]) + '</p>' +
      '<div class="det"><strong>Highlights</strong><ul>' + lis + '</ul><p>Alternative durations available. Ask us on WhatsApp.</p></div>' +
      '<div class="price">Price on Request</div><div class="acts"><button type="button" class="btn alt" data-more aria-expanded="false">View Details</button>' +
      '<a class="btn" target="_blank" rel="noopener" href="' + wa(msg) + '">Book This Safari</a></div></div></article>';
  }

  function render() {
    var f = document.getElementById('featured');
    f.innerHTML = P.filter(function (p) { return p[8]; }).map(card).join('');
    Object.keys(CH).forEach(function (g) {
      var el = document.getElementById('g-' + g);
      if (el) el.innerHTML = P.filter(function (p) { return p[1] === g; }).map(card).join('');
    });
    var secs = { n: 'northern', s: 'southern', k: 'kilimanjaro', z: 'zanzibar', c: 'culture' };
    document.getElementById('chips').innerHTML = Object.keys(CH).map(function (g) {
      return '<div><h3>' + CH[g] + '</h3>' + P.filter(function (p) { return p[1] === g; }).map(function (p) {
        return '<a href="#' + secs[g] + '">' + esc(p[2]) + '</a>';
      }).join('') + '</div>';
    }).join('');
    var gal = [['hero-safari','Safari vehicle at sunrise'],['serengeti','Serengeti plains'],['ngorongoro','Ngorongoro Crater'],['tarangire','Tarangire baobabs'],['lake-manyara','Lake Manyara'],['mikumi','Mikumi'],['nyerere','Nyerere'],['udzungwa','Udzungwa waterfalls'],['ruaha','Ruaha'],['kilimanjaro','Mount Kilimanjaro'],['zanzibar','Zanzibar beach'],['culture','Tanzanian culture'],['wildlife','Wildlife']];
    document.getElementById('gal').innerHTML = gal.map(function (g) { return media(g[0], g[1]); }).join('');
  }

  function wire() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-more]');
      if (b) {
        var d = b.closest('.body').querySelector('.det');
        var open = d.classList.toggle('open');
        b.setAttribute('aria-expanded', open);
        b.textContent = open ? 'Hide Details' : 'View Details';
      }
      var w = e.target.closest('[data-wa]');
      if (w) { e.preventDefault(); window.open(wa(w.getAttribute('data-wa')), '_blank', 'noopener'); }
      if (e.target.closest('#menu a')) closeMenu();
    });
    var btn = document.getElementById('menuBtn'), menu = document.getElementById('menu');
    window.closeMenu = function () { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', function () { var o = menu.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  // Sun Journey: one rAF-throttled scroll handler drives sky, sun, moon and stars.
  var STOPS = [
    [0, '#4a9be0', '#cfeaf9'],   // morning
    [.2, '#2f86dc', '#b5dcf6'],  // midday
    [.42, '#e8a04a', '#ffe2a6'], // golden hour
    [.6, '#7a4a8a', '#e0763a'],  // sunset
    [.78, '#1f2a5c', '#6a4a86'], // twilight
    [.92, '#070d24', '#16234a'], // night
    [1, '#050a1c', '#101a3c']
  ];
  function hex(h) { return [1, 3, 5].map(function (i) { return parseInt(h.substr(i, 2), 16); }); }
  function mix(a, b, t) { var x = hex(a), y = hex(b); return 'rgb(' + x.map(function (v, i) { return Math.round(v + (y[i] - v) * t); }).join(',') + ')'; }
  function clamp(v) { return Math.max(0, Math.min(1, v)); }

  function sky() {
    var sk = document.getElementById('sky'), sun = document.getElementById('sun'), moon = document.getElementById('moon'), stars = document.getElementById('stars');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var n = window.innerWidth < 700 ? 35 : 80, s = '';
    for (var i = 0; i < n; i++) {
      s += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' + (Math.random() * 70).toFixed(1) + '%;animation-delay:' + (Math.random() * 3).toFixed(1) + 's"></i>';
    }
    stars.innerHTML = s;
    var ticking = false;
    function update() {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? clamp(window.scrollY / max) : 0, k = 0;
      while (k < STOPS.length - 2 && p > STOPS[k + 1][0]) k++;
      var a = STOPS[k], b = STOPS[k + 1], t = clamp((p - a[0]) / (b[0] - a[0]));
      sk.style.background = 'linear-gradient(' + mix(a[1], b[1], t) + ',' + mix(a[2], b[2], t) + ')';
      var st = clamp(p / 0.72), u = 0.06 + 0.94 * st;
      var w = window.innerWidth, h = window.innerHeight;
      var x = (0.06 + 0.88 * st) * w - 42, y = (0.74 - 0.6 * Math.sin(Math.PI * u)) * h - 42;
      sun.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      sun.style.opacity = 1 - clamp((p - 0.7) / 0.1);
      sun.style.background = mix('#fff4c2', '#ff6a1f', clamp((p - 0.3) / 0.4));
      moon.style.opacity = clamp((p - 0.74) / 0.14);
      stars.style.opacity = clamp((p - 0.6) / 0.25);
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  render(); wire(); sky();
})();
