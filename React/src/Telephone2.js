import React from "react";

function Telephone2() {
    let nums = "";
    let lastPosition = 0;

    const handleChange = (e) => {
        const temp = lastPosition;
        lastPosition = e.target.selectionStart;
        nums = e.target.value.replace(/[^0-9]/g, '');

        if (nums.length === 3) {
            e.target.value = nums;
            if (temp > lastPosition) {
                lastPosition--; // When descending (i.e. deleting digits), do this to account for the removal of the bracket.
            }
        } else if (nums.length < 4) {
            e.target.value = nums;
        } else if (nums.length === 7) {
            e.target.value = `(${nums[0] + nums[1] + nums[2]})` + nums[3] + nums[4] + nums[5] + '-' + nums.slice(6, 10);
            if (temp < lastPosition && lastPosition === 9) { // Ascending (i.e. adding digits) and at the end
                lastPosition = e.target.selectionStart; // Reset lastPosition to the end to account for the addition of the '-'
            }
        } else if (nums.length > 7) {
            e.target.value = `(${nums[0] + nums[1] + nums[2]})` + nums[3] + nums[4] + nums[5] + '-' + nums.slice(6, 10);
            if (temp < lastPosition && lastPosition === 9) {
                lastPosition = 10;
            }
            if (temp < lastPosition && lastPosition === 4) {
                lastPosition = 5;
            }
        } else if (nums.length === 4) {
            e.target.value = `(${nums[0] + nums[1] + nums[2]})` + nums.slice(3);
            if (temp < lastPosition) { // Ascending
                lastPosition = e.target.selectionStart;
            }
        } else if (nums.length > 4) {
            e.target.value = `(${nums[0] + nums[1] + nums[2]})` + nums.slice(3);
            if (temp < lastPosition && lastPosition === 4) { // Ascending 
                lastPosition = 5;
            }
        }

        e.target.setSelectionRange(lastPosition, lastPosition);
    }

    return (
        <div className="App">
            <div>
                <input type="tel" id="phone" maxLength="16" placeholder="mobile number" autoComplete="off" onChange={handleChange} />
                <div><label htmlFor="phone">(123)456-7890</label></div>
            </div>
        </div>
    );
}

export default Telephone2;