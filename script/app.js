// Show and hide different tabs
document.getElementById("path-finder").addEventListener("click", pathFinderTab);
document.getElementById("min-tree").addEventListener("click", minTreeTab);
document.getElementById("top-sort").addEventListener("click", topSortTab);

// Clear path and disable the clear-path button
document.getElementById("clear-path").addEventListener("click", (e) => {
  clearGrid();
  e.target.disabled = true;
});
// Clear all and disable the clear-path and clear-all buttons
document.getElementById("clear-all").addEventListener("click", (e) => {
  clearGrid(0, false, true);
  e.target.disabled = true;
  document.getElementById("clear-path").disabled = true;
});

document
  .getElementById("maze-prim")
  .addEventListener("click", () => generateMaze("prim"));
document
  .getElementById("maze-recursive-backtracker")
  .addEventListener("click", () => generateMaze("backtracker"));
document
  .getElementById("maze-animation-recursive-backtracker")
  .addEventListener("click", () => generateMaze("backtracker-animated"));
document
  .getElementById("maze-prim-animation")
  .addEventListener("click", () => generateMaze("prim-animated"));
document.getElementById("visualize").addEventListener("click", visualize);
document
  .getElementById("dfs")
  .addEventListener("click", () => makeChoice("DFS"));
document
  .getElementById("bfs")
  .addEventListener("click", () => makeChoice("BFS"));
document
  .getElementById("dijkstra")
  .addEventListener("click", () => makeChoice("Dijkstra (UCS)"));
document
  .getElementById("astar")
  .addEventListener("click", () => makeChoice("A*"));
document
  .getElementById("greedybest")
  .addEventListener("click", () => makeChoice("Greedy Best First"));
document
  .getElementById("bidirectional-astar")
  .addEventListener("click", () => makeChoice("Bidirectional A*"));
document
  .getElementById("bidirectional-dijkstra")
  .addEventListener("click", () => makeChoice("Bidirectional Dijkstra (UCS)"));

let status = 0;
let running = "";
let runningMessage = "";
const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
const width =
  window.innerWdith ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

function generateMaze(choice) {
  document.getElementById("visualize").textContent = `Visualize`;
  document.getElementById("visualize").disabled = true;
  document.getElementById("clear-all").disabled = true;
  document.getElementById("clear-path").disabled = true;
  document.getElementById("size-slider").disabled = true;
  document.getElementById("path-finding-grp-btn").disabled = true;
  document.getElementById("maze-generation-grp-btn").disabled = true;
  document.getElementById("breakpoint-toggler").click();

  switch (choice) {
    case "prim":
      generateMazePrimRT(nodes);
      break;
    case "backtracker":
      recursiveBacktrackerRT(nodes);
      break;
    case "prim-animated":
      executePrimMazeGeneration();
      break;
    case "backtracker-animated":
      executeRecursiveBacktrackerMazeGeneration();
      break;
  }
}

// Show information toasts
function pathFinderTab() {
  clearToasts();
  let pathToast = new mdb.Toast(document.getElementById("path-toast"));
  pathToast.show();
  setTimeout(() => pathToast.hide(), 5000);
}
function minTreeTab() {
  clearToasts();
  let treeToast = new mdb.Toast(document.getElementById("tree-toast"));
  treeToast.show();
  setTimeout(() => treeToast.hide(), 5000);
}
function topSortTab() {
  clearToasts();
  let sortToast = new mdb.Toast(document.getElementById("sort-toast"));
  sortToast.show();
  setTimeout(() => sortToast.hide(), 5000);
}
//

function visualize() {
  running = runningMessage;
  document.getElementById("visualize").disabled = true;
  document.getElementById("breakpoint-toggler").click();

  document.getElementById("clear-all").disabled = true;
  document.getElementById("clear-path").disabled = true;
  document.getElementById("size-slider").disabled = true;
  document.getElementById("path-finding-grp-btn").disabled = true;
  document.getElementById("maze-generation-grp-btn").disabled = true;

  switch (running) {
    case "DFS":
      executeDFS();
      break;
    case "BFS":
      executeBFS();
      break;
    case "Dijkstra (UCS)":
      executeDijkstra();
      break;
    case "A*":
      executeAstar();
      break;
    case "Greedy Best First":
      executeGreedyBestFirst();
      break;
    case "Bidirectional Dijkstra (UCS)":
      executeBidrectionalDijkstra();
      break;
    case "Bidirectional A*":
      executeBidrectionalAStar();
      break;
  }
}

function visualizeRT() {
  switch (running) {
    case "DFS":
      dfsRT(nodes, startNode, endNode);
      break;
    case "BFS":
      bfsRT(nodes, startNode, endNode);
      break;
    case "Dijkstra (UCS)":
      dijkstraRT(nodes, startNode, endNode);
      break;
    case "A*":
      astarRT(nodes, startNode, endNode);
      break;
    case "Greedy Best First":
      greedyBestRT(nodes, startNode, endNode);
      break;
    case "Bidirectional Dijkstra (UCS)":
      bidirectionalDijkstraRT(nodes, startNode, endNode);
      break;
    case "Bidirectional A*":
      bidirectionalAStarRT(nodes, startNode, endNode);
      break;
  }
  document.getElementById("clear-all").disabled = false;
  document.getElementById("clear-path").disabled = false;
  document.getElementById("size-slider").disabled = false;
  document.getElementById("path-finding-grp-btn").disabled = false;
  document.getElementById("maze-generation-grp-btn").disabled = false;
}
function makeChoice(choice) {
  running = "";
  clearGrid(1);
  runningMessage = choice;
  let btn = document.getElementById("visualize");
  btn.disabled = false;
  btn.textContent = `Visualize ${choice}`;
}

function executePrimMazeGeneration() {
  clearGrid(0, false, false);
  document.getElementById("breakpoint-toggler").click();
  for (let i = 0; i < nodes.length; ++i) {
    for (let j = 0; j < nodes[i].length; ++j) {
      nodes[i][j].divReference.classList.add("node-wall");
      nodes[i][j].isWall = true;
    }
  }
  let choices = [
    [-2, 0],
    [0, 2],
    [2, 0],
    [0, -2],
  ];
  // picking random cell and making it a passage
  let cell =
    nodes[Math.floor(Math.random() * nodes.length)][
      Math.floor(Math.random() * nodes[0].length)
    ];
  cell.isWall = false;
  cell.divReference.classList.remove("node-wall");
  // compute frontier cells of picked random cell
  let frontierList = [];
  computeFrontierCells(nodes, cell, frontierList, choices);
  setTimeout(generateMazePrim, 0, nodes, frontierList, choices);
}

function executeRecursiveBacktrackerMazeGeneration() {
  clearGrid(0, false, false);
  document.getElementById("breakpoint-toggler").click();
  for (let i = 0; i < nodes.length; ++i) {
    for (let j = 0; j < nodes[i].length; ++j) {
      nodes[i][j].divReference.classList.add("node-wall");
      nodes[i][j].isWall = true;
    }
  }

  let cell =
    nodes[Math.floor(Math.random() * nodes.length)][
      Math.floor(Math.random() * nodes[0].length)
    ];
  let s = [];
  cell.isWall = false;
  cell.divReference.classList.remove("node-wall");
  let choices = [
    [-2, 0],
    [0, 2],
    [2, 0],
    [0, -2],
  ];
  let neighbours = computeFrontierCellsRBT(nodes, cell, choices);
  let rnd = Math.floor(Math.random() * neighbours.length);
  s.push(neighbours[rnd]);
  setTimeout(recursiveBacktracker, 0, nodes, s, choices);
}
function executeDFS() {
  if (!nodes || !startNode || !endNode) {
    return;
  }
  clearGrid();
  let s = [];
  let parentMap = new Map();
  s.push(startNode);
  let choices = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  setTimeout(dfs, 0, nodes, startNode, endNode, s, parentMap, choices);
}

function executeBFS() {
  if (!nodes || !startNode || !endNode) {
    return;
  }
  clearGrid();
  let curr = null;
  let q = [];
  q.push(startNode);
  let parentMap = new Map();
  parentMap.set(startNode, null);
  let choices = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  setTimeout(bfs, 0, nodes, startNode, endNode, q, parentMap, choices);
}

function executeAstar() {
  if (!nodes || !startNode || !endNode) {
    return;
  }
  clearGrid();
  let parentMap = new Map();
  let distanceMap = new Map();
  let hMap = new Map();
  let processed = new Set();
  let minHeap = [];
  let choices = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  let curr = startNode;
  minHeap.push(curr);
  let h = 0;
  for (let i = 0; i < nodes.length; ++i) {
    for (let j = 0; j < nodes[i].length; ++j) {
      distanceMap.set(nodes[i][j], Infinity);
      h =
        Math.abs(nodes[i][j].row - endNode.row) +
        Math.abs(nodes[i][j].col - endNode.col);
      hMap.set(nodes[i][j], h);
    }
  }
  distanceMap.set(curr, 0);
  parentMap.set(curr, null);
  setTimeout(
    astar,
    0,
    nodes,
    startNode,
    endNode,
    parentMap,
    distanceMap,
    hMap,
    processed,
    minHeap,
    choices
  );
}

function executeDijkstra() {
  if (!nodes || !startNode || !endNode) {
    return;
  }
  clearGrid();
  let curr = startNode;
  let distanceMap = new Map();
  let processed = new Set();
  let choices = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];
  let parentMap = new Map();
  parentMap.set(curr, null);
  for (let i = 0; i < nodes.length; ++i) {
    for (let j = 0; j < nodes[i].length; ++j) {
      distanceMap.set(nodes[i][j], Infinity);
    }
  }
  distanceMap.set(curr, 0);
  // let minHeap = new MinHeap();
  let minHeap = [];
  // minHeap.insert(curr);
  minHeap.push(curr);
  setTimeout(
    dijkstra,
    0,
    nodes,
    startNode,
    endNode,
    distanceMap,
    processed,
    choices,
    parentMap,
    minHeap
  );
}

function executeBidrectionalAStar() {
  // bidirectionalRT(nodes,startNode,endNode);
  // return;
  if (!nodes || !startNode || !endNode) {
    return;
  }
  clearGrid();
  let forwardDistanceMap = new Map();
  let backwardDistanceMap = new Map();
  let forwardProcessed = new Set();
  let backwardProcessed = new Set();
  let forwardHeuristic = new Map();
  let backwardHeuristic = new Map();
  let forwardParentMap = new Map();
  let backwardParentMap = new Map();
  let forwardMinHeap = [];
  let backwardMinHeap = [];
  let forwardCurr = startNode;
  let backwardCurr = endNode;
  let choices = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (let i = 0; i < nodes.length; ++i) {
    for (let j = 0; j < nodes[i].length; ++j) {
      forwardDistanceMap.set(nodes[i][j], Infinity);
      backwardDistanceMap.set(nodes[i][j], Infinity);
      forwardHeuristic.set(
        nodes[i][j],
        Math.abs(nodes[i][j].row - endNode.row) +
          Math.abs(nodes[i][j].col - endNode.col)
      );
      backwardHeuristic.set(
        nodes[i][j],
        Math.abs(nodes[i][j].row - startNode.row) +
          Math.abs(nodes[i][j].col - startNode.col)
      );
    }
  }
  forwardDistanceMap.set(forwardCurr, 0);
  backwardDistanceMap.set(backwardCurr, 0);
  forwardParentMap.set(forwardCurr, null);
  backwardParentMap.set(backwardCurr, null);
  forwardMinHeap.push(forwardCurr);
  backwardMinHeap.push(backwardCurr);

  setTimeout(
    bidirectionalAStar,
    0,
    nodes,
    startNode,
    endNode,
    forwardDistanceMap,
    backwardDistanceMap,
    forwardProcessed,
    backwardProcessed,
    forwardHeuristic,
    backwardHeuristic,
    forwardParentMap,
    backwardParentMap,
    forwardMinHeap,
    backwardMinHeap,
    forwardCurr,
    backwardCurr,
    choices
  );
}

function executeBidrectionalDijkstra() {
  if (!nodes || !startNode || !endNode) {
    return;
  }
  clearGrid();
  let forwardDistanceMap = new Map();
  let backwardDistanceMap = new Map();
  let forwardProcessed = new Set();
  let backwardProcessed = new Set();
  let forwardParentMap = new Map();
  let backwardParentMap = new Map();
  let forwardMinHeap = [];
  let backwardMinHeap = [];
  let forwardCurr = startNode;
  let backwardCurr = endNode;
  let choices = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  forwardDistanceMap.set(forwardCurr, 0);
  backwardDistanceMap.set(backwardCurr, 0);
  forwardParentMap.set(forwardCurr, null);
  backwardParentMap.set(backwardCurr, null);
  forwardMinHeap.push(forwardCurr);
  backwardMinHeap.push(backwardCurr);

  setTimeout(
    bidirectionalDijkstra,
    0,
    nodes,
    startNode,
    endNode,
    forwardDistanceMap,
    backwardDistanceMap,
    forwardProcessed,
    backwardProcessed,
    forwardParentMap,
    backwardParentMap,
    forwardMinHeap,
    backwardMinHeap,
    forwardCurr,
    backwardCurr,
    choices
  );
}
function executeBidrectionalBFS() {
  if (!nodes || !startNode || !endNode) {
    return;
  }
  clearGrid();

  let forwardParentMap = new Map();
  let backwardParentMap = new Map();
  let forwardQueue = [];
  let backwardQueue = [];
  let forwardCurr = startNode;
  let backwardCurr = endNode;
  let choices = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  forwardParentMap.set(forwardCurr, null);
  backwardParentMap.set(backwardCurr, null);
  forwardQueue.push(forwardCurr);
  backwardQueue.push(backwardCurr);

  setTimeout(
    bidirectionalBFS,
    0,
    nodes,
    startNode,
    endNode,
    forwardQueue,
    backwardQueue,
    forwardParentMap,
    backwardParentMap,
    forwardCurr,
    backwardCurr,
    choices
  );
}

function executeBidrectionalGreedyBFS() {
  if (!nodes || !startNode || !endNode) {
    return;
  }
  clearGrid();
  let forwardParentMap = new Map();
  let backwardParentMap = new Map();
  let forwardMinHeap = [];
  let backwardMinHeap = [];
  let forwardCurr = startNode;
  let backwardCurr = endNode;
  let forwardHeuristic = new Map();
  let backwardHeuristic = new Map();
  let choices = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (let i = 0; i < nodes.length; ++i) {
    for (let j = 0; j < nodes[i].length; ++j) {
      forwardHeuristic.set(
        nodes[i][j],
        Math.abs(nodes[i][j].row - endNode.row) +
          Math.abs(nodes[i][j].col - endNode.col)
      );
      backwardHeuristic.set(
        nodes[i][j],
        Math.abs(nodes[i][j].row - startNode.row) +
          Math.abs(nodes[i][j].col - startNode.col)
      );
    }
  }
  forwardParentMap.set(forwardCurr, null);
  backwardParentMap.set(backwardCurr, null);
  forwardMinHeap.push(forwardCurr);
  backwardMinHeap.push(backwardCurr);

  setTimeout(
    bidirectionalGreedyBFS,
    0,
    nodes,
    startNode,
    endNode,
    forwardMinHeap,
    backwardMinHeap,
    forwardParentMap,
    backwardParentMap,
    forwardHeuristic,
    backwardHeuristic,
    forwardCurr,
    backwardCurr,
    choices
  );
}
function executeGreedyBestFirst() {
  if (!nodes || !startNode || !endNode) {
    return;
  }
  clearGrid();
  let heuristicMap = new Map();
  let minHeap = [];
  let parentMap = new Map();
  let curr = startNode;
  let choices = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  for (let i = 0; i < nodes.length; ++i) {
    for (let j = 0; j < nodes[i].length; ++j) {
      heuristicMap.set(
        nodes[i][j],
        Math.abs(nodes[i][j].row - endNode.row) +
          Math.abs(nodes[i][j].col - endNode.col)
      );
    }
  }
  parentMap.set(curr, null);
  minHeap.push(curr);

  setTimeout(
    greedyBest,
    0,
    nodes,
    startNode,
    endNode,
    heuristicMap,
    minHeap,
    parentMap,
    choices
  );
}

function executeDrawPath(parentMap, endNode) {
  let path = getPath(parentMap, endNode);
  setTimeout(drawPath, 0, 0, path);
}

function chooseRndStartEnd() {
  let rows = nodes.length;
  let cols = nodes[0].length;
  let startRndRow = Math.floor(Math.random() * rows);
  let startRndCol = Math.floor(Math.random() * cols);
  while (nodes[startRndRow][startRndCol].isWall) {
    startRndRow = Math.floor(Math.random() * rows);
    startRndCol = Math.floor(Math.random() * cols);
  }
  let endRndRow = Math.floor(Math.random() * rows);
  let endRndCol = Math.floor(Math.random() * cols);
  while (endRndCol === startRndCol || nodes[endRndRow][endRndCol].isWall) {
    endRndRow = Math.floor(Math.random() * rows);
    endRndCol = Math.floor(Math.random() * cols);
  }

  nodes[startRndRow][startRndCol].divReference.classList.add("node-start");
  startNode = nodes[startRndRow][startRndCol];
  nodes[startRndRow][startRndCol].isStart = true;
  nodes[endRndRow][endRndCol].divReference.classList.add("node-end");
  endNode = nodes[endRndRow][endRndCol];
  nodes[endRndRow][endRndCol].isEnd = true;
}
