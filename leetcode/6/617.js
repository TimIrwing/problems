/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
function mergeTrees(t1, t2) {
    const node = new TreeNode(0);

    if (t1 !== null) node.val += t1.val;
    if (t2 !== null) node.val += t2.val;

    if (t1 === null && t2 === null) {
        return null;
    } else if (t1 === null || t2 === null) {
        node.left = t1 === null ? t2.left : t1.left;
        node.right = t1 === null ? t2.right : t1.right;
    } else {
        node.left = mergeTrees(t1.left, t2.left);
        node.right = mergeTrees(t1.right, t2.right);
    }

    return node;
}

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}
