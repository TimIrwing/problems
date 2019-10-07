/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function bstToGst(root) {
    return copyAndModifyTree(root, root);
}

function copyAndModifyTree(root, tree) {
    if (tree === null) return null;

    const result = new TreeNode(greaterSum(root, tree.val));

    result.left = copyAndModifyTree(root, tree.left);
    result.right = copyAndModifyTree(root, tree.right);

    return result;
}

function greaterSum(root, val) {
    const queue = [root];
    let result = 0;

    while (queue.length > 0) {
        const node = queue.shift();

        if (node.val >= val) {
            result += node.val;
            if (node.left !== null) queue.push(node.left);
        }
        if (node.right !== null) queue.push(node.right);
    }

    return result;
}
