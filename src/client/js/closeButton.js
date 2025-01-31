// Close Button

export function closeButton() {

    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera

    const outputOuter = document.querySelector('.print-area');
    const closeButton = document.querySelector('.buttons');

    outputOuter.style.display = 'none';
    closeButton.style.display = 'none';

}