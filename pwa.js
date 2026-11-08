// Installable-app support: service worker, install button, iOS hint, #tab deep links.
(function () {
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const btn = document.getElementById('installBtn');
  let deferredPrompt = null;

  if (isStandalone) document.documentElement.classList.add('standalone');

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    if (btn) btn.hidden = false;
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    if (btn) btn.hidden = true;
    if (typeof toast === 'function') toast('App installed ✓');
  });

  if (btn && isIOS && !isStandalone) btn.hidden = false;

  if (btn) btn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      btn.hidden = true;
    } else if (isIOS) {
      alert('To install on iPhone/iPad:\n\n1. Open this page in Safari\n2. Tap the Share button (□↑)\n3. Choose "Add to Home Screen"');
    }
  });

  // Open a tab from the URL hash, e.g. index.html#filecenter (used by app shortcuts).
  function openHashTab() {
    const tab = location.hash.slice(1);
    if (tab && document.getElementById(tab)?.classList.contains('panel') && typeof showTab === 'function') showTab(tab);
  }
  window.addEventListener('load', openHashTab);
  window.addEventListener('hashchange', openHashTab);
})();
