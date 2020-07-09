sumOfNegative = (numbers) => {
  //create a variable called sum
  let sum = 0;
  // create a for loop for every value starting at index 0 until the final index in the array
  for (let i = 0; i < numbers.length; i++) {
    // if the array value is less than 0, add that value to the previous sum of all other neagtive values
    if (numbers[i]<0) {
      sum += numbers[i];
    }
  }
  return sum
  // TODO: You are getting a `numbers` array. Return the sum of **negative** numbers only.
}
