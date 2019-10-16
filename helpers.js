export const startLoader = element => {
    element.innerHTML = `<div class="loading-spinner"></div>`;
}

export const stopLoader = (element, value) => {
    element.textContent = value;
}