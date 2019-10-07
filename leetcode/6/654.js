/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
function constructMaximumBinaryTree(nums) {
    if (nums.length === 0) return null;

    const maxIndex = findMaxIndex(nums);

    const node = new TreeNode(nums[maxIndex]);
    node.left = constructMaximumBinaryTree(nums.slice(0, maxIndex));
    node.right = constructMaximumBinaryTree(nums.slice(maxIndex + 1));

    return node;
}

function findMaxIndex(arr) {
    let max = -Infinity;

    arr.forEach((val) => {
        if (val > max) max = val;
    });

    return arr.indexOf(max);
}
