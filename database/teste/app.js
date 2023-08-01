var twoSum = function (nums, target) {
  let output = []

  for (i = 0; i < nums.length - 1; i++) {
    for (j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        console.log(1, nums[i], nums[j])
        output = [i, j]
        console.log(2, output)
      }
    }
  }
  console.log(3, output)

  return output
};

console.log(twoSum([2, 5, 5, 11], 10))
