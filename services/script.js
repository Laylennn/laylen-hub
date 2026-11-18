// ===== EDIT THESE TWO LINES =====
// WhatsApp number in international format, digits only, starting with 60 (Malaysia).
// Example: a phone number 012-345 6789 becomes '60123456789'.
const WHATSAPP_NUMBER = '';
const EMAIL = '';
// ================================

const WA = WHATSAPP_NUMBER.replace(/\D/g, '');
const WA_READY = /^60\d{8,10}$/.test(WA);
const MAIL_READY = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(EMAIL) && !/example\.com$/i.test(EMAIL);
const waLink = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
const notReady = () => alert('Contact details are not set up yet. Owner: add your WhatsApp number in services/script.js.');

// Show a banner to the owner until the contact details are filled in
if (!WA_READY) {
  const bar = document.createElement('div');
  bar.className = 'setup-warning';
  bar.textContent = 'Setup needed: add your WhatsApp number (and email) at the top of services/script.js before sharing this page.';
  document.body.prepend(bar);
}

document.getElementById('yr').textContent = new Date().getFullYear();

// Generic "WhatsApp me" buttons
document.querySelectorAll('[data-wa]').forEach(a => {
  if (!WA_READY) { a.addEventListener('click', e => { e.preventDefault(); notReady(); }); return; }
  a.href = waLink("Hi Laylen, I saw your services page and I'd like to ask about a website/dashboard.");
  a.target = '_blank';
  a.rel = 'noopener';
});

// Email link
document.querySelectorAll('[data-mail]').forEach(a => {
  if (!MAIL_READY) { a.closest('p').hidden = true; return; }
  a.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Website / dashboard enquiry')}`;
});

// Package buttons pre-select the package in the quote form
const form = document.getElementById('quoteForm');
// and the budget follows the package, so the two never contradict each other
const BUDGET_FOR = {
  'Starter Page (RM299)': 'Under RM300',
  'Business Website (RM699)': 'RM300 – RM700',
  'Data Dashboard (from RM199)': 'Under RM300',
  'Not sure, please advise': 'Flexible'
};
const syncBudget = () => { form.budget.value = BUDGET_FOR[form.pkg.value] || 'Flexible'; };
form.pkg.addEventListener('change', syncBudget);
document.querySelectorAll('[data-pkg]').forEach(btn => {
  btn.addEventListener('click', () => { form.pkg.value = btn.dataset.pkg; syncBudget(); });
});

// Quote form opens WhatsApp with a ready-made message
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!WA_READY) return notReady();
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
