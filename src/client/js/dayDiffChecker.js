// Number of Days Between Two Dates

export function dayDiffCheck (d1, d2) {

    // Get Argument's Time
    let dTime1 = new Date(d1).getTime();
    let dTime2 = new Date(d2).getTime();

    // Total Milliseconds in A Day
    const dayInMs = 24*60*60*1000;

    // Return Day Difference Between Two Dates
    return parseInt((dTime2 - dTime1) / dayInMs);

}