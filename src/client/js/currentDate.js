// Custom Current Date Format

export function currentDate() {

    // Get Default Date Format
    let todayDefault = new Date();

    // Get Year
    let year = todayDefault.getFullYear();

    // Get + Customize Month
    let month = todayDefault.getMonth() + 1;
    let monthCustom = month < 10 ? '0' + month : month; 

    // Get + Customize Day
    let day = todayDefault.getDate();
    let dayCustom = day < 10 ? '0' + day : day;

    // Custom Date String
    let todayCustom = `${year}-${monthCustom}-${dayCustom}`;

    return todayCustom;

}