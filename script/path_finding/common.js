// Make all the buttons enabled after the rendering is done for no paths founds
function setDisabledBtns() {
  document.getElementById("clear-all").disabled = false;
  document.getElementById("clear-path").disabled = false;
  document.getElementById("size-slider").disabled = false;
  document.getElementById("path-finding-grp-btn").disabled = false;
  document.getElementById("maze-generation-grp-btn").disabled = false;
}

function clearGrid(statusVal = 0, keep = true, initials = true) {
  clearToasts();
  if (!keep) {
    grid.addEventListener("click", divClicked);
  }
  for (let i = 0; i < nodes.length; ++i) {
    for (let j = 0; j < nodes[i].length; ++j) {
      nodes[i][j].divReference.className = "node";
      if (nodes[i][j].isStart) {
        if (keep || initials) {
          nodes[i][j].divReference.classList.add("node-start");
        } else {
          startNode = null;
          nodes[i][j].isStart = false;
        }
      }
      if (nodes[i][j].isEnd) {
        if (keep || initials) {
          nodes[i][j].divReference.classList.add("node-end");
        } else {
          endNode = null;
          nodes[i][j].isEnd = false;
        }
      }
      if (nodes[i][j].isWall) {
        if (keep) {
          nodes[i][j].divReference.classList.add("node-wall");
        } else {
          nodes[i][j].isWall = false;
        }
      }
      if (nodes[i][j].weight) {
        if (keep) {
          nodes[i][j].divReference.classList.add(
            `node-strong-${nodes[i][j].weight}`
          );
        } else {
          nodes[i][j].weight = 0;
        }
      }
    }
  }
  status = statusVal;
}

function getPath(parentMap, curr) {
  let path = [];
  while (curr !== null) {
    path.unshift(curr);
    curr = parentMap.get(curr);
  }
  return path;
}

function drawPath(counter, path) {
  if (counter !== path.length) {
    const curr = path[counter];
    curr.divReference.classList.add("node-path");
    setTimeout(drawPath, 45, ++counter, path);
  } else {
    document.getElementById("clear-all").disabled = false;
    document.getElementById("clear-path").disabled = false;
    document.getElementById("size-slider").disabled = false;

    document.querySelector("#path-finding-grp-btn").disabled = false;
    document.querySelector("#maze-generation-grp-btn").disabled = false;
    let toastTriggerEl = document.getElementById("path-success-toast");
    let toast = new mdb.Toast(toastTriggerEl);
    toast.show();
  }
}

function drawPathRT(path) {
  let counter = 0;
  while (counter !== path.length) {
    const curr = path[counter];
    curr.divReference.classList.add("node-path-rt");
    ++counter;
  }
}

function clearToasts() {
  let pathToast = new mdb.Toast(document.getElementById("path-toast"));
  let pathFailToast = new mdb.Toast(document.getElementById("path-fail-toast"));
  let pathSuccessToast = new mdb.Toast(
    document.getElementById("path-success-toast")
  );

  let treeToast = new mdb.Toast(document.getElementById("tree-toast"));

  let sortToast = new mdb.Toast(document.getElementById("sort-toast"));
  let sortFailToast = new mdb.Toast(document.getElementById("sort-fail-toast"));

  pathToast.hide();
  pathFailToast.hide();
  pathSuccessToast.hide();
  treeToast.hide();
  sortToast.hide();
  sortFailToast.hide();
}
