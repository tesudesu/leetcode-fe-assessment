_This is a sample editorial/problem explanation, focusing on the vanilla JavaScript aspect of the question._


In this problem, we are asked to write JavaScript to dynamically change user input into the (123)456-7890 telephone format. Provided to us are the HTML and CSS codes. In the HTML, we notice the `input` tag, which creates an input element on the document for users to type in. The id of the input element is `phone`. The id is how we will reference this input element in the JavaScript.

**Accessing the DOM**

When we want to manipulate an element on the document, we first need to access it. For this problem, there are a couple of ways we can access the input element.

One is using the querySelector() method:

```
const input = document.querySelector('#phone');
```
The querySelector() method is a general method that can be used to find any element with a valid CSS selector. If there are multiple elements with the same selector name (e.g. multiple elements with the same class name), this method retrieves the first element in the HTML code. (Note that you can use querySelectorAll() to select all instances with the same selector name.) For this problem, I assigned the input element to a variable called `input`, to do something with it later. You can learn more about the querySelector() method [here](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).

Another way to access an element is by using the getElementById() method:

```
const input = document.getElementById('phone');
```
Unlike the querySelector() method, the getElementById() method only matches elements with an id. Remember that ids are supposed to be unique in the HTML, so if the id name is valid, the element with that id name will be matched. Since this method accesses only ids, do not include a `#`, indicating the id CSS selector, in front of the id name. You can learn more about the getElementById() method [here](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById).

A third way to access an element in the DOM is by using the getElementsByClassName() method:

```
const input = document.getElementsByClassName('phone');
```
This method matches all elements with the given class name. Again, since this method matches only classes, do not include a `.`, indicating the class CSS selector, in front of the class name. Note that this method will not work for this problem, as we are given an id for the input element. You can learn more about the getElementsByClassName() method [here](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName). 

**Event Listeners**

After we have access to an element on the document, we want to do something with it. Specifically, in this problem, we want to change the input value (format it) depending on what is entered. To do this, we add an event listener to the element we just selected. An event listener performs an action if the stated event occurs.

There are various events that can be attached to an HTML element, such as click, change, keypress, etc. We can use the `input` event here. We run a callback function (also called an event handler) when a user inputs something in the input box.

**Solving the Problem**

A tricky part about this problem is that we are listening for inputs but we are also changing the input. One way to deal with this is to create another variable that stores the user input. Depending on the content (length) of that variable, we dynamically change the displayed input in the event handler.

```
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
```

**Caret Position**

In the follow-up question, we are asked to address the issue of the caret jumping to the end when a user deletes some digits in the middle of the formatted number. The reason that the caret jumps to the end is that each time we change the display, the program refreshes. The input does not remember its previous state. To resolve this issue, we can manually set the position of the caret. 

The basic idea is that for each user input event, we store the current caret position in an external variable. Then when we set the display, we determine the new caret position based on the saved value and the format appearance. We can find the current caret position by using the selectionStart() method on the input element. We set the caret position by using the setSelectionRange() method on the input element, sending the same saved value for the start and end parameters so that the caret is at a point rather than a range.

In my solution, I dealt with deleting and adding digits in the middle. I made it so that when a user adds digits in the middle, the caret wouldn't jump to the end either. I considered not just the caret position before changing the display, but also the previous caret position, to know whether the user just added or deleted a digit.

**Full Solution**

```
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
```