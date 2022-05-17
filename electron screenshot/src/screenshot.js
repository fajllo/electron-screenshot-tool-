const saveBtn = document.getElementById("saveBtn");
const fs = require("fs");

const Toastify = require("toastify-js");
console.table(screen);
const date = new Date();

function screenS() {
  let canvas = document.createElement("canvas");
  let path = document.getElementById("path").value;
  let name = document.getElementById("name").value;
  let dateDiv = document.createElement("div");
  dateDiv.classList.add("w-full", "bg-black", "text-yellow-700", "text-2xl");
  dateDiv.innerText = date.toUTCString();
  let video = document.getElementById("video");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight + 30;

  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 1920, 30);
  ctx.font = "24pt Menlo";
  ctx.textAlign = "top";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#f5d547";

  const text = date.toUTCString();
  ctx.fillText(text, 0, 0, canvas.width, 30);

  ctx.drawImage(video, 0, 30, canvas.width, canvas.height - 30);
  let image = canvas.toDataURL("image/png");
  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const saveAs = `${path}\\${name}.png`;
  fs.writeFile(saveAs, base64Data, "base64", function (err) {
    console.log(err);
  });
  Toastify({
    text: "Screen saved successfully",
    close: true,
    duration: 1500,
    style: {
      background: "linear-gradient(to right, #3fa34d, #137547)",
      margin: "10px",
      padding: "5px",
      position: "absolute",
      top: "25px",
      left: "45%",
      width: "50%",
      border: "2px green solid",
      color: "white",
    },
  }).showToast();
  document.getElementById("name").value = "";
}

saveBtn.addEventListener("click", screenS);
document.getElementById("name").addEventListener("keypress", e => {
  if (e.code == "Enter") {
    screenS();
  }
});

function repeat(imgPath, softList) {
  const savePath = document.getElementById("save-path");
  fs.readFile(imgPath, function (err, data) {
    if (err) throw err;
    for (let name of softList) {
      let saveAs = `${savePath.value}\\${name}.png`;
      fs.writeFile(saveAs, data, "base64", function (err) {
        console.log(err);
      });
    }
    Toastify({
      text: "repeating completed successfully",
      close: true,
      duration: 1500,
      style: {
        background: "linear-gradient(to right, #5bba6f, #5bba6f)",
        margin: "10px",
        padding: "5px",

        width: "50%",
        border: "25px solid yellow",
        color: "white",
        zIndex: "10",
      },
    }).showToast();
  });
}

const rep = document.getElementById("repeat");
rep.addEventListener("click", () => {
  const path = document.getElementById("exising-path");
  const names = document.getElementById("softlist");
  const softList = names.value.split("\n");
  repeat(path.value, softList);
});
