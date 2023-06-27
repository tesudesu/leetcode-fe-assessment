const toPhoneNumber = (input) => {
    let nums = '';

    nums = input.replace(/[^0-9]/g, '');

    if (nums.length < 4) {
        return nums;
    } else if (nums.length >= 7) {
        return `(${nums[0] + nums[1] + nums[2]})` + nums[3] + nums[4] + nums[5] + '-' + nums.slice(6, 10);
    } else if (nums.length >= 4) {
        return `(${nums[0] + nums[1] + nums[2]})` + nums.slice(3);
    }
}

// Testing using Jest

// 1
test('Contains non-numeric characters', () => {
    expect(toPhoneNumber('12g3fw,-')).toBe('123'); // passed
});

// 2
test('Contains non-numeric characters, longer string', () => {
    expect(toPhoneNumber('12g3fw,-45p6')).toBe('(123)456'); // passed
});

// 3
test('Fewer than 3 numeric characters', () => {
    expect(toPhoneNumber('12')).toBe('12'); // passed
});

// 4
test('3 numeric characters', () => {
    expect(toPhoneNumber('123')).toBe('123'); // passed
});

// 5
test('6 numeric characters', () => {
    expect(toPhoneNumber('123456')).toBe('(123)456'); // passed
});

// 6
test('7 numeric characters', () => {
    expect(toPhoneNumber('1234567')).toBe('(123)456-7'); // passed
});

// 7
test('10 numeric characters', () => {
    expect(toPhoneNumber('1234567890')).toBe('(123)456-7890'); // passed
});

// 8
test('More than 10 numeric characters', () => {
    expect(toPhoneNumber('12345678901234')).toBe('(123)456-7890'); // passed
});

// 8 out of 8 tests passed