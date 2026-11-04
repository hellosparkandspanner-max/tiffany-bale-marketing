const menuButton = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();
const form = document.getElementById('enquiry-form');
const status = document.getElementById('form-status');
// Add your unique Formspree endpoint here once created, e.g. https://formspree.io/f/abcdefgh
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzeeyjzg';
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  if (!FORMSPREE_ENDPOINT) {
    status.textContent = 'Form not connected yet. Add your Formspree endpoint before publishing.';
    return;
  }
  const button = document.getElementById('submit-button');
  button.disabled = true;
  status.textContent = 'Sending...';
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST', body: new FormData(form), headers: {'Accept': 'application/json'}
    });
    if (response.ok) {
      form.reset();
      status.textContent = 'Thank you. Your enquiry has been sent successfully.';
    } else {
      status.textContent = 'Sorry, the message could not be sent. Please try again.';
    }
  } catch (error) {
    status.textContent = 'Sorry, there was a connection issue. Please try again.';
  } finally { button.disabled = false; }
});
