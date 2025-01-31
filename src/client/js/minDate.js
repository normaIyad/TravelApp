// Mininum Date Input

export function minDate(dateInput) {

    if (dateInput >= Client.currentDate()) {
        return true;
    } else {
        return false;
    }

}