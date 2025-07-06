let boxes = document.querySelectorAll(".box")
let reset = document.querySelector("#reset-btn")
let win = document.getElementsByClassName(".gamebox")
let msgcontainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")
let turn0 = true;
let winpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]



const resetgame = () => {
  turn0 = true;
  msgcontainer.classList.add("hide");
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
}

const hideboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}

const showwinner = (winner) => {
  msgcontainer.innerText = `Congratulations The Winner is ${winner}`
  msgcontainer.classList.remove("hide")
  hideboxes();
}
const drawsituation = () => {
  msgcontainer.innerText = `Game is draw`
  msgcontainer.classList.remove("hide")
  hideboxes();
}
const checkwinner = () => {
  let winnerfound = false;
  for (let pattern of winpattern) {
    let pos1val = boxes[pattern[0]].innerText
    let pos2val = boxes[pattern[1]].innerText
    let pos3val = boxes[pattern[2]].innerText

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val == pos2val && pos2val == pos3val) {
        console.log("Winner", pos1val)
        showwinner(pos1val);
        winnerfound = true;
        return;
      }
    }
    if (!winnerfound) {
      let allfilled = true;
      boxes.forEach((box) => {
        if (box.innerText === "") {
          allfilled = false;
        }
      });
      if (allfilled == true) {
        drawsituation();
      }
    }
  }
}


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log('boxwaslicked');
    if (box.innerText !== "") return;
    if (turn0 == true) {
      box.innerText = "o"
      turn0 = false;
    }
    else {
      box.innerText = "x"
      turn0 = true;
    }
    box.disabled = true;

    checkwinner();

  });
});

reset.addEventListener("click", resetgame)

