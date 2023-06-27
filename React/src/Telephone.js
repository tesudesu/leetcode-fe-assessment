import React from "react";

function Telephone() {
    let nums = "";

    const handleChange = (e) => {
        nums = e.target.value.replace(/[^0-9]/g, "");

        if (nums.length < 4) {
            e.target.value = nums;
        } else if (nums.length >= 7) {
            e.target.value = `(${nums[0] + nums[1] + nums[2]})` + nums[3] + nums[4] + nums[5] + '-' + nums.slice(6, 10);
        } else if (nums.length >= 4) {
            e.target.value = `(${nums[0] + nums[1] + nums[2]})` + nums.slice(3);
        }
    }

    return (
        <div className="App">
            <div>
                <input data-testid="tele" type="tel" id="phone" maxLength="16" placeholder="mobile number" autoComplete="off" onChange={handleChange} />
                <div><label htmlFor="phone">(123)456-7890</label></div>
            </div>
        </div>
    );
}

export default Telephone;