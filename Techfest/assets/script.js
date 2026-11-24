const form = document.querySelector('#registration-form');
if (form) {
  const choices = [...form.querySelectorAll('input[name="events"]')];
  const result = document.querySelector('#confirmation');
  function validateEvents() {
    choices[0].setCustomValidity(choices.some(input => input.checked) ? '' : 'Choose at least one event.');
  }
  choices.forEach(input => input.addEventListener('change', validateEvents));
  validateEvents();
  form.addEventListener('submit', event => {
    event.preventDefault();
    validateEvents();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    document.querySelector('#confirmation-text').textContent = `Thank you, ${data.get('name')}. Selected events: ${data.getAll('events').join(', ')}. Department: ${data.get('department')}; year: ${data.get('year')}.`;
    result.hidden = false;
    result.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  });
  form.addEventListener('reset', () => {
    result.hidden = true;
    document.querySelector('#confirmation-text').textContent = '';
    setTimeout(validateEvents, 0);
  });
}
