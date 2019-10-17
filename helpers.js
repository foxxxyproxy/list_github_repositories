export const startLoader = element => {
  element.innerHTML = `<div class="loading-spinner"></div>`;
};

export const stopLoader = (element, value) => {
  element.textContent = value;
};

export const displayError = (element, value) => {
  element.textContent = value;
};

export const enableFields = (...fields) => {
  fields.forEach(field => {
    field.disabled = false;
  });
};

export const disableFields = (...fields) => {
  fields.forEach(field => {
    field.disabled = true;
  });
};
