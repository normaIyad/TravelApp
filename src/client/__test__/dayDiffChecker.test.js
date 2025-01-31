const { dayDiffCheck } = require('../js/dayDiffChecker');

test('check for day difference at client side', () => {

    expect(dayDiffCheck('2020-01-01', '2020-01-31')).toBe(30);
    expect(dayDiffCheck('2020-01-01', '2020-01-31')).not.toBe(31);

});