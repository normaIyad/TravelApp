// Print Button

export function printButton() {

    // Print Area
    const formOutput = document.querySelector('.print-area').innerHTML;

    // Original Window Body
    const originalWindowBody = document.body.innerHTML;

    // Execute Original Window Body = Print Area
    document.body.innerHTML = formOutput;

    // Print Function
    window.print();

    // Return to Original Window Body
    document.body.innerHTML = originalWindowBody;

}