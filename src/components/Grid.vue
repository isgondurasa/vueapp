<template>
  <div>
    <b-container fluid> 
      <b-row>
        <b-col >
          <b-button-toolbar class='subtoolbar'>
            <div>
            <b-form-select
              text="Select Algorithm"
              v-model="selectedAlg"
              :options="algorithms"
              class="mx-1"
              right
            >
            </b-form-select>
            </div>
            
            <b-button 
              @click="onStart(selectedAlg, nodes, startNode, targetNode)"
              class="mx-1"
            >
              <b-icon icon="caret-right-fill"></b-icon>
            </b-button>

            <b-button
              :pressed.sync="isBorderPressed"
              class="mx-1"
            >
              <b-icon icon="stop-fill"></b-icon>
            </b-button>


            <b-button
              @click="onReset()"
              class="mx-1"
            >
              <b-icon icon="arrow-counterclockwise"></b-icon>
            </b-button>


          </b-button-toolbar>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
    <div>
      <div
        v-for="(row, index) in nodes"
        :key="index"
        class="row"
      >
        <div 
          v-for="col in row" 
          :key="col.row-col.col" 
          class="el" 
          :class="[col.visited?'visited':'!visited', col.target?'target':'!target', col.prepare?'prepare':'!prepare', col.path?'path':'!path', col.isBorder?'border':'!border']"   
          @click="elClicked(col)"
          @mousedown="elMouseDown(col)"
          @mouseup="elMouseUp(col)"
          @mousemove="elMouseMove(col)"
        >
          {{ col.value }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import PriorityQueue from 'js-priority-queue';
export default {
  name: 'Grid',
  props: {
    rows: {
      type: Number,
      default: 50,
      coerce: (n) => parseInt(n, 10),
    },
    cols: {
      type: Number,
      default: 50,
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      selectedAlg: null,
      algorithms: [
        {"value": null, "text": 'Please select an algorithm' },
        {"value": "bfs", "text": "bfs"},
        {"value": "dejkstra","text": "dejkstra"},
        {"value": "dfs", "text": "dfs"},
        {"value": "a*", "text": "A*"}
      ],
      isBorderPressed: false,
      mouseGridDown: false,
      nodes: null,
      startNode: null,
      targetNode: null,
    }
  },
  mounted () {
    
    const nodes = [];

    for (let row = 0; row < this.rows; row += 1) {
      const line = [];
      for (let col = 0; col < this.cols; col += 1) {
        const node = {
          row, col, 
          value: null, 
          visited: false, 
          target: false, 
          source: false, 
          prepare: false, 
          path: false,
          isBorder: false,
        }
        line.push(node);
      }
      nodes.push(line);
    }
    this.nodes = nodes;
  },
  methods: {

    onReset () {

       const nodes = [];

        for (let row = 0; row < this.rows; row += 1) {
          const line = [];
          for (let col = 0; col < this.cols; col += 1) {
            const node = {
              row, col, 
              value: null, 
              visited: false, 
              target: false, 
              source: false, 
              prepare: false, 
              path: false,
              isBorder: false,
            }
            line.push(node);
          }
          nodes.push(line);
        }
        this.nodes = nodes;
        this.startNode = null
        this.targetNode = null
    },

    elClicked (element) {

      if (this.isBorderPressed) {
        element.isBorder = !element.isBorder;
        return;
      }      

      if (!this.startNode) {
        this.startNode = element;
        element.value = 'S';
        element.target = true;
      }
      else if (!this.targetNode) {
        this.targetNode = element;
        element.value = 'E';
        element.target = true;
      }
    },

    elMouseDown(element) {
      this.mouseGridDown = true;
    },

    elMouseUp(element) {
      this.mouseGridDown = false;
    },

    elMouseMove(element) {
      if (this.mouseGridDown && this.isBorderPressed) {
        element.isBorder = !element.isBorder;
      }
    },

    onStart(selectedAlg, nodes, startNode, targetNode) {
      switch (selectedAlg) {
        case "bfs": return this.bfs(nodes, startNode, targetNode); break;
        case "dejkstra": return this.dejkstra(nodes, startNode, targetNode); break;
      }
    },

    getNeighbours: (node) => {
      /**
       * 000      10      00
       * 010  OR  00  OR  10 .... 
       * 000              00
       */
      const i = node.row;
      const j = node.col;

      const neighbours = [];

      // if (i > 0 && j < nodes[i].length - 1) {
      //   neighbours.push(nodes[i-1][j+1]);
      // }

      if (j < nodes[i].length - 1) {
        neighbours.push(nodes[i][j+1]);
      }

      if (i > 0) {
        neighbours.push(nodes[i-1][j]);
      }

      // if (j < nodes[i].length - 1 && i < nodes.length - 1) {
      //   neighbours.push(nodes[i+1][j+1]);
      // }

      if (i < nodes.length - 1) {
          neighbours.push(nodes[i+1][j]);
      }

      // if (i < nodes.length - 1 && j > 0) {
      //   neighbours.push(nodes[i+1][j-1]);
      // }

      if (j > 0 ) {
        neighbours.push(nodes[i][j-1]);
      }

      // if (i > 0 && j > 0) {
      //   neighbours.push(nodes[i-1][j-1]);
      // }

      return neighbours;
    },

    isTarget: (node, targetNode) => {
      if (node.row === targetNode.row && node.col === targetNode.col) {
        return true;
      }
      return false
    },

    dejkstra: (nodes, startNode, targetNode) => {
      /**
       * 1) Mark all nodes unvisited. Create a set of all the unvisited nodes called the unvisited set.
       * 2) Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes. Set the initial node as current.[16]
       * 3) For the current node, consider all of its unvisited neighbours and calculate their tentative distances through the current node. Compare the newly calculated tentative distance to the current assigned value and assign the smaller one. For example, if the current node A is marked with a distance of 6, and the edge connecting it with a neighbour B has length 2, then the distance to B through A will be 6 + 2 = 8. If B was previously marked with a distance greater than 8 then change it to 8. Otherwise, the current value will be kept.
       * 4) When we are done considering all of the unvisited neighbours of the current node, mark the current node as visited and remove it from the unvisited set. A visited node will never be checked again.
       * 5) If the destination node has been marked visited (when planning a route between two specific nodes) or if the smallest tentative distance among the nodes in the unvisited set is infinity (when planning a complete traversal; occurs when there is no connection between the initial node and remaining unvisited nodes), then stop. The algorithm has finished.
       * 6) Otherwise, select the unvisited node that is marked with the smallest tentative distance, set it as the new "current node", and go back to step 3.
       */
      if (isTarget(startNode, targetNode)) {
        return;
      }

      let distances = [];
      let visited = [];
      
      for (let i = 0; i < nodes.length; i += 1) {
        let row = [];
        for (let j = 0; j < nodes[0].length; j += 1) {
          row[j] = Number.MAX_VALUE;
        }
        distances.push(row);
      }

      distances[startNode.row][startNode.col] = 0;

      let queue = new PriorityQueue({ 
        comparator: (a, b) => { return distances[a.row][a.col] - distances[b.row][b.col]; }
        });

      queue.queue(startNode);

      while (queue.length !== 0) {
        let elem = queue.dequeue();
        
        console.log(elem)

        let neighbours = getNeighbours(elem)
        for (let i = 0; i < neighbours.length; i+=1) {

          let n = neighbours[i];

          if (isTarget(n, targetNode)) {
            break
          }

          if (n.visited) {
            continue
          }

          if (distances[n.row][n.col] > distances[elem.row][elem.col] + 1) {
            n.visited = true;
            distances[n.row][n.col] = distances[elem.row][elem.col] + 1
            queue.queue(n);
            n.path = True
          }
        } 
      }
      return;
    },

    bfs: (nodes, startNode, targetNode) => {

      /**
       * [1,0,0,0,0,0],
       * [0,0,0,0,0,1]
       */
      
      /**
       * 1) Mark all nodes unvisited. Create a set of all the unvisited nodes called the unvisited set.
       * 2) Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes. Set the initial node as current
       * 3) For the current node, consider all of its unvisited neighbours and calculate their tentative distances through the current node. Compare the newly calculated tentative distance to the current assigned value and assign the smaller one. For example, if the current node A is marked with a distance of 6, and the edge connecting it with a neighbour B has length 2, then the distance to B through A will be 6 + 2 = 8. If B was previously marked with a distance greater than 8 then change it to 8. Otherwise, the current value will be kept.
       * 4) When we are done considering all of the unvisited neighbours of the current node, mark the current node as visited and remove it from the unvisited set. A visited node will never be checked again.
       * 5) If the destination node has been marked visited (when planning a route between two specific nodes) or if the smallest tentative distance among the nodes in the unvisited set is infinity (when planning a complete traversal; occurs when there is no connection between the initial node and remaining unvisited nodes), then stop. The algorithm has finished.
       * 6) Otherwise, select the unvisited node that is marked with the smallest tentative distance, set it as the new "current node", and go back to step 3.
       */


      function setPredecessor(predecessor, key, value) {
        predecessor[key.row + '-' + key.col] = value;
      }

      function getPredecessor(predecessor, key, nodes) {
        return predecessor[key.row + '-' + key.col];
      }

      function shortestPath(source, target) {

        if (source == target) {
          return [source];
        }
        
        const q = [source];
        const predecessor = {};

        while (q.length !== 0) {

          const el = q.shift(),
                neighbours = self.getNeighbours(el);

          for (let i = 0; i < neighbours.length; i+=1) {
            
            const item = neighbours[i];

            if (item.visited || item.isBorder) {
              continue;
            }

            item.visited = true;

            if (item === target) {
              
              const path = [item];
              
              while (el !== source) {
                path.push(el);
                el.path = true;
                el = getPredecessor(predecessor, el, nodes);
              }

              path.push(el);
              path.reverse();
              
              return path;
            }
            setPredecessor(predecessor, item, el);
            q.push(item);
          }
        }
      }
      const path = shortestPath(startNode, targetNode);
      return;
    }
  },
};
</script>

<style scoped>
.subtoolbar{
  float: left;
  padding: 5px;
}
.row{
  line-height: 20px;
}
.el{
  border: 1px solid black;
  width: 20px;
  height: 20px;
}
.el:hover{
  background: moccasin;
}
.selected{
  background: lightskyblue;
}
.visited {
  background: mediumslateblue;
}
.target {
  background: goldenrod;
}
.prepare {
  background: lightyellow;
}
.path {
  background: yellowgreen;
}
.border {
  background: black;
}
</style>