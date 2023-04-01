// Make all the buttons enabled after the rendering is done for no paths founds
function setDisabledBtns() {
  document.getElementById("clear-all").disabled = false;
  document.getElementById("clear-path").disabled = false;
  document.getElementById("size-slider").disabled = false;
  document.getElementById("path-finding-grp-btn").disabled = false;
  document.getElementById("maze-generation-grp-btn").disabled = false;
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
    let toastTriggerEl = document.getElementById("info-toast");
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
