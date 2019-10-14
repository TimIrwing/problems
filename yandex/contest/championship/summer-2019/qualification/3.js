/**
 * @typedef Data
 * @type {Number}
 */

class BinaryTreeNode {
  /**
   * @param  {...Data} items
   * @returns {BinaryTreeNode}
   */
  static create(...items) {
    // сортирую залупни
    // items = items.sort((a, b) => a - b);
    const root = new BinaryTreeNode(items[0]);

    // возвращаю ноду с залупнями проинсертенными как надо
    // тут скорее всего ошибок нет
    return items.slice(1).reduce((node, data) => node.insert(data), root);
  }

  /**
   * @param {Data} data
   */
  constructor(data) {
    /**
       * @type {Data}
       */
    this.data = data;
    this.left = null;
    this.right = null;
    this.root = null;
  }

  /**
   * Вставляет данные в ноду.
   * Проходит по всем детям, чтобы найти верное место для вставки.
   *
   * @param {Date} data
   * @returns {BinaryTreeNode}
   */
  insert(data) {
    if (data < this.data) {
      if (this.left === null) {
        this.left = new BinaryTreeNode(data);
        this.left.root = this;
      } else {
        this.left.insert(data);
      }
    } else if (data > this.data) {
      if (this.right === null) {
        this.right = new BinaryTreeNode(data);
        this.right.root = this;
      } else {
        this.right.insert(data);
      }
    }

    return this;
  }

  /**
   * Удаляет ноду по переданным данным.
   * Обходит всех детей, чтобы найти ноду.
   *
   * @param {Data} data
   * @returns {BinaryTreeNode | null}
   */
  remove(data) {
    if (!this.search(data)) {
      return this;
    }
    if (data < this.data) {
      this.left = this.left.remove(data);
    } else if (data > this.data) {
      this.right = this.right.remove(data);
    } else {
      if (this.left === null && this.right === null) {
        return null;
      } else if (this.left === null) {
        this.root.right = this.right;
        return this.right;
      } else if (this.right === null) {
        this.root.left = this.left;
        return this.left;
      } else {
        const aux = findMinNode(this.right);

        this.data = aux.data;
        this.right = this.right.remove(aux.data);
      }
    }
    return this;
  }

  /**
   * Ищет ноду по переданным данным.
   *
   * @param {Data} data
   * @returns {BinaryTreeNode | null}
   */
  search(data) {
    if (data < this.data) {
      if (this.left !== null) {
        return this.left.search(data);
      }
    }
    if (data > this.data) {
      if (this.right !== null) {
        return this.right.search(data);
      }
    } else if (data === this.data) {
      return this;
    }
    return null;
  }

  /**
   * Обход дерева по порядку, начиная рекурсивно с левой ветви через вершину и к правой ветви.
   * Данные получаются в отсортированном порядке.
   *
   * @param {Function} callback
   * @returns {BinaryTreeNode}
   */
  inorder(callback) {
    if (this.left !== null) {
      this.left.inorder(callback);
    }

    callback(this.data);

    if (this.right !== null) {
      this.right.inorder(callback);
    }

    return this;
  }

  /**
   * Прямой обход дерева, начиная с вершины и двигаясь рекурсивно от левой ветви к правой.
   *
   * @param {Function} callback
   * @returns {BinaryTreeNode}
   */
  preorder(callback) {
    callback(this.data);

    if (this.left !== null) {
      this.left.preorder(callback);
    }

    if (this.right !== null) {
      this.right.preorder(callback);
    }

    return this;
  }

  /**
   * Обратный обход дерева, начиная с левой ветви и двигаясь рекурсивно через правую ветвь к вершине.
   *
   * @param {Function} callback
   * @returns {BinaryTreeNode}
   */
  postorder(callback) {
    if (this.left !== null) {
      this.left.postorder(callback);
    }

    if (this.right !== null) {
      this.right.postorder(callback);
    }

    callback(this.data);

    return this;
  }
}

/**
* Находит минимальную ноду, начиная с переданной.
*
* @param {BinaryTreeNode} node
* @returns {BinaryTreeNode}
*/
function findMinNode(node) {
  if (node.left === null) {
    return node;
  }
  return findMinNode(node.left);
}

module.exports = BinaryTreeNode;
