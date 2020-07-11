listItem = (content) => {
  //Any new string will be placed into a <li> html tag as its content
  let item = `<li class="list-group-item">${content}</li>`;
  return item;
  // TODO: return the proper <li> HTML tag with its content (as a string)
};

unorderedList = (items) => {
  //Declare a variable that will hold the array of values of 'items' (eg. ["Bread", Milk"])
  let code = [];
  // For loop to run on each value in the array. This must be an array
  for (let i = 0; i < items.length; i++) {
  // The code will now change to be the result after every iteration (eg. After i=0, <li...>Bread</li>).
  // The next iteration will be added to the previous iteration result (eg. <li...>Bread</li> + <li...>Milk</li>)
  // Note: this step now creates a string. Thus can't use the .push function as it is no longer an array
  code = `${code}
  ${listItem(items[i])}`;
 }
// Insert the string of code from above between the <ul> tags
  return `<ul class="list-group">
    ${code}
</ul>`;
}
