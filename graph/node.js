class Node {
  // Node has a value and an adjacency list of connected nodes
  constructor(value) {
    this.value = value;
    this.adjacents = []; // Adjacency List
  }

  // Add a node to this node's adjacency list
  addAdjacent(node) {
    this.adjacents.push(node);
  }

  // Remove a node from this node's adjacency list
  removeAdjacent(node) {
    const index = this.adjacents.indexOf(node);
    if(index > -1) {
      this.adjacents.splice(index, 1);
      return node;
    }
  }

  // Return the adjacent nodes to this node
  getAdjacents() {
    return this.adjacents;
  }

  // Check if this node is adjacent to node
  isAdjacent(node) {
    console.log(this.adjacents.indexOf(node) > -1);
    return this.adjacents.indexOf(node) > -1;
  }
}

module.exports = function(msg) {
  console.log(msg);
};