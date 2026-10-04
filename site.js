/* ============================================================
   site.js — 全站公共组件（唯一需要维护的地方）

   包含：AdSense 广告加载 + GoatCounter 流量统计
   改这里 = 全站生效（前提：页面都引用了 /site.js）

   新增页面只需两行：
     <link rel="stylesheet" href="/style.css">
     <script src="/site.js" defer></script>
   ============================================================ */
(function () {
  'use strict';

  var ADSENSE_CLIENT = 'ca-pub-3400007454963889';
  var GOATCOUNTER    = 'https://xg704863664.goatcounter.com/count';

  /* ---------- AdSense ---------- */
  function loadAdSense() {
    if (document.querySelector('script[data-adsense]')) return;
    var s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-adsense', '1');
    s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT;
    document.head.appendChild(s);
  }

  /* ---------- GoatCounter（流量统计） ---------- */
  function loadGoatCounter() {
    if (document.querySelector('script[data-goatcounter]')) return;
    var s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-goatcounter', GOATCOUNTER);
    s.src = 'https://gc.zgo.at/count.js';
    document.head.appendChild(s);
  }

  /* ---------- 广告位（审核通过后自动填充） ---------- */
  function fillAdSlots() {
    var slots = document.querySelectorAll('.ad-slot[data-ad]');
    if (!slots.length) return;
    var push = function () {
      for (var i = 0; i < slots.length; i++) {
        if (slots[i].getAttribute('data-filled')) continue;
        slots[i].setAttribute('data-filled', '1');
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
      }
    };
    if (window.adsbygoogle) push(); else setTimeout(push, 1200);
  }

  function init() {
    loadAdSense();
    loadGoatCounter();
    fillAdSlots();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
