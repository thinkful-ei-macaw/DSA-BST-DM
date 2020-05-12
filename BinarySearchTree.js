class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value = null) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}


// Drill 3.
const BST = new BinarySearchTree();

BST.insert('E');
BST.insert('A');
BST.insert('S');
BST.insert('Y');
BST.insert('Q');
BST.insert('U');
BST.insert('E');
BST.insert('S');
BST.insert('T');
BST.insert('I');
BST.insert('O');
BST.insert('N');

// console.log(BST)

// Drill 4.

// The function is returning the sum of the values of the entire tree. Run time is best case O(1) assuming only a root node. Average case and worst case are O(2^n)

//            3(3)    O(1)
//            /\
//     O(n) 2(2)  4(4) O(n)
//
// result would equal = 9

const BST2 = new BinarySearchTree();

BST2.insert(3, 3);
BST2.insert(4, 4);
BST2.insert(2, 2)
BST2.insert(5, 5);

function tree(t) {
  if (!t) {
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}

// console.log(tree(BST2));

//Drill 5.
// 
// 
function height(t, n = 0) {
  if (!t) {
    return n;
  }
  n++;
  return Math.max(height(t.left, n), height(t.right, n));
}

// if (!t) return n
// return Math.max(height(t.left, n), height(t.right, n))

// console.log(height(BST2));

// Drill 6.
// if (!t || !binary) return binary
// binary = (t.left && t.left.key < t.key) && (t.right && t.right.key > t.key)
// return isItBinary(t.left, binary) && isItBinary(t.right, binary)
function isItBinary(tree, binary = true) {
  if (!tree || !binary) return binary;
  let leftCheck = tree.left ? tree.left.key < tree.key : true;
  let rightCheck = tree.right ? tree.right.key > tree.key : true;
  binary = leftCheck && rightCheck;
  return isItBinary(tree.left, binary) && isItBinary(tree.right, binary);
}
// console.log(isItBinary(BST));

// console.log(isItBST(BST2))

// Drill 7.

// 3rd highest (?)
//       10
//   5        15
//  1 9     12     19
//        11 14   17
//               16
function thirdLargest(tree) {
  if (tree.right) return thirdLargest(tree.right);
  if (tree.left) return thirdLargest(tree.left);
  
  // we'll only get here when there's no left or right
  return tree.key;
}

// console.log(thirdLargest(BST))

// Drill 8.
// skip if tree parent is null
function checkBalanced(tree, balanced = true, left = true) {
  if (!tree || (!tree.left && !tree.right) || !balanced) return balanced;
  if (tree.parent !== null) {
    balanced = (tree.left || tree.right) && left ? !!tree.parent.right : !!tree.parent.left;
  }
  
  let leftCheck = checkBalanced(tree.left, balanced); // true
  let rightCheck = checkBalanced(tree.right, balanced, false); 

  return leftCheck && rightCheck;
}

console.log(checkBalanced(BST));
console.log(checkBalanced(BST2));
//we need to see if each node has a left.left.left then it needs a left.right if it has a right.right, it needs a right.left.  !right.right !left.left

//            20
//     15               25  
//  10  19          23      30
// 5              22   24     35
//              21              40
         

let arr1 = [3,5,4,6,1,0,2]
let arr2 = [3,1,5,2,4,6,0]

// [2,4,1,3]
// [2,1,4]

function exactBST(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  if (arr1[0] !== arr2[0]) return false;
}

exactBST(arr1, arr2);






















// arr1, arr2

// let leftArray1 = []; // => 1,0,2
// let rightArray1 = []; // => 5,4,6
// let leftArray2 = [];  // => 1,2,0
// let rightArray2 = []; // => 5,4,6

// let root = arr1[0];
// for (let i = 1; i < arr1.length; i++) {
//   if (arr1[i] < root) leftArray1.push(arr1[i]);
//   if (arr1[i] > root) rightArray1.push(arr1[i]);
// 
//   if (arr2[i] < root) leftArray2.push(arr2[i]);
//   if (arr2[i] > root) rightArray2.push(arr2[i]);
// }

// [3,5,4,6,1,0,2]
// 3, 4, 5, 1, 0, 2, 6
// [3,1,5,2,4,6,0]
// 3, 1, 5

