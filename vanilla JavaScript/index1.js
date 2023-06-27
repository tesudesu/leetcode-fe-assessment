const input = document.getElementById('phone');

let nums = '';

input.addEventListener('input', () => {
    nums = input.value.replace(/[^0-9]/g, '');

    if (nums.length < 4) {
        input.value = nums;
    } else if (nums.length >= 7) {
        input.value = `(${nums[0] + nums[1] + nums[2]})` + nums[3] + nums[4] + nums[5] + '-' + nums.slice(6, 10);
    } else if (nums.length >= 4) {
        input.value = `(${nums[0] + nums[1] + nums[2]})` + nums.slice(3);
    }
});