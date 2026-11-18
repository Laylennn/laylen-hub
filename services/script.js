// ===== EDIT THESE TWO LINES =====
// WhatsApp number in international format, digits only (60 = Malaysia). Example: '60123456789'
const WHATSAPP_NUMBER = '60123456789';
const EMAIL = 'your-email@example.com';
// ================================

const waLink = text => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

document.getElementById('yr').textContent = new Date().getFullYear();

// Generic "WhatsApp me" buttons
document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = waLink("Hi Laylen, I saw your services page and I'd like to ask about a website/dashboard.");
  a.target = '_blank';
  a.rel = 'noopener';
});

// Email link
document.querySelectorAll('[data-mail]').forEach(a => {
  a.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Website / dashboard enquiry')}`;
});

// Package buttons pre-select the package in the quote form
const form = document.getElementById('quoteForm');
document.querySelectorAll('[data-pkg]').forEach(btn => {
  btn.addEventListener('click', () => { form.pkg.value = btn.dataset.pkg; });
});

// Quote form opens WhatsApp with a ready-made message
form.addEventListener('submit', e => {
  e.preventDefault();
  const f = form.elements;
  const lines = [
    'Hi Laylen! I would like a quote.',
    `Name: ${f.name.value.trim()}`,
    f.biz.value.trim() && `Business: ${f.biz.value.trim()}`,
    `Need: ${f.pkg.value}`,
    `Budget: ${f.budget.value}`,
    f.msg.value.trim() && `Details: ${f.msg.value.trim()}`
  ].filter(Boolean);
  window.open(waLink(lines.join('\n')), '_blank', 'noopener');
});
