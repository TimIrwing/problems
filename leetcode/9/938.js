/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
const rangeSumBST = function(root, L, R) {
    if (root === null) return 0;

    let sum = 0;

    if (root.val <= R && root.val >= L) sum += root.val;

    sum += rangeSumBST(root.left, L, R);
    sum += rangeSumBST(root.right, L, R);

    return sum;
};
