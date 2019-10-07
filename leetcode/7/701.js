/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
function insertIntoBST(root, val) {
    if (root.val > val) {
        if (root.left === null) {
            root.left = new TreeNode(val);
        } else {
            insertIntoBST(root.left, val);
        }
    } else {
        if (root.right === null) {
            root.right = new TreeNode(val);
        } else {
            insertIntoBST(root.right, val);
        }
    }

    return root;
}
