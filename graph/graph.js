class Graph {
    // Graph is a Map of nodes, with keys as values of nodes and values as the nodes themselves
    constructor() {
        this.nodes = new Map();
    }
    
    // Add edge between source node and destination node
    addEdge(source, destination) {
        const sourceNode = this.addVertex(source);
        const destinationNode = this.addVertex(destination);
      
        sourceNode.addAdjacent(destinationNode);
        destinationNode.addAdjacent(sourceNode);
        
        return [sourceNode, destinationNode];
    }
    
    // Add node with value
    addVertex(value) {
        if(this.nodes.has(value)) {
            return this.nodes.get(value);
        } else {
            const vertex = new Node(value);
            this.nodes.set(value, vertex);
            return vertex;
        }
    }
    
    // Remove node with corresponding value
    removeVertex(value) {
        const current = this.nodes.get(value);
        if(current) {
          for (const node of this.nodes.values()) {
            node.removeAdjacent(current);
          }
        }
        return this.nodes.delete(value);
      }
    
    // Remove edge between source node and destination node
    removeEdge(source, destination) {
        const sourceNode = this.nodes.get(source);
        const destinationNode = this.nodes.get(destination);
        
        if(sourceNode && destinationNode) {
            sourceNode.removeAdjacent(destinationNode);
            destinationNode.removeAdjacent(sourceNode);
        }
        
        return [sourceNode, destinationNode];
    }
    
    // Breadth First Search
    *bfs(first) {
        const visited = new Map();
        const visitList = new Queue();
      
        visitList.add(first);
      
        while(!visitList.isEmpty()) {
          const node = visitList.remove();
          if(node && !visited.has(node)) {
            yield node;
            visited.set(node);
            node.getAdjacents().forEach(adj => visitList.add(adj));
          }
        }
      }
      
    // Depth First Search
    *dfs(first) {
        const visited = new Map();
        const visitList = new Stack();
        
        visitList.add(first);
        
        while(!visitList.isEmpty()) {
            const node = visitList.remove();
            if(node && !visited.has(node)) {
            yield node;
            visited.set(node);
            node.getAdjacents().forEach(adj => visitList.add(adj));
            }
        }
    }
      
  }
  
  const graph = new Graph();
  graph