const input = document.getElementById('phone');

let nums = '';
let lastPosition = 0;

input.addEventListener('input', () => {
    const temp = lastPosition;
    lastPosition = input.selectionStart;
    nums = input.value.replace(/[^0-9]/g, '');

    if (nums.length === 3) {
        input.value = nums;
        if (temp > lastPosition) {
            lastPosition--; // When descending (i.e. deleting digits), do this to account for the removal of the bracket.
        }
    } else if (nums.length < 4) {
        input.value = nums;
    } else if (nums.length === 7) {
        input.value = `(${nums[0] + nums[1] + nums[2]})` + nums[3] + nums[4] + nums[5] + '-' + nums.slice(6, 10);
        if (temp < lastPosition && lastPosition === 9) { // Ascending (i.e. adding digits) and at the end
            lastPosition = input.selectionStart; // Reset lastPosition to the end to account for the addition of the '-'
        }
    } else if (nums.length > 7) {
        input.value = `(${nums[0] + nums[1] + nums[2]})` + nums[3] + nums[4] + nums[5] + '-' + nums.slice(6, 10);
        if (temp < lastPosition && lastPosition === 9) {
            lastPosition = 10;
        }
        if (temp < lastPosition && lastPosition === 4) {
            lastPosition = 5;
        }
    } else if (nums.length === 4) {
        input.value = `(${nums[0] + nums[1] + nums[2]})` + nums.slice(3);
        if (temp < lastPosition) { // Ascending
            lastPosition = input.selectionStart;
        }
    } else if (nums.length > 4) {
        input.value = `(${nums[0] + nums[1] + nums[2]})` + nums.slice(3);
        if (temp < lastPosition && lastPosition === 4) { // Ascending 
            lastPosition = 5;
        }
    }

    input.setSelectionRange(lastPosition, lastPosition);
});
