import './style/header.scss';
import './style/footer.scss';
import './style/form.scss';
import './style/base.scss';
import './style/resets.scss';

import { handleSubmit } from './js/formHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('urlForm');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('Service Worker Registered!', reg))
      .catch((err) => console.log('Service Worker Registration Failed!', err));
  });
}

export { handleSubmit };
