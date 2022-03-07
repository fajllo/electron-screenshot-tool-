const saveBtn = document.getElementById("saveBtn");
const fs = require("fs");
const Toastify = require("toastify-js");

const date = new Date();

function screenS() {
  let canvas = document.createElement("canvas");
  let path = document.getElementById("path").value;
  let name = document.getElementById("name").value;
  let dateDiv = document.createElement("div");
  dateDiv.classList.add("w-full", "bg-black", "text-yellow-700", "text-2xl");
  dateDiv.innerText = date.toUTCString();
  let video = document.getElementById("video");

  canvas.width = 1920;
  canvas.height = 1110;

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
  const saveAs = `${path}${name}.png`;
  fs.writeFile(saveAs, base64Data, "base64", function (err) {
    console.log(err);
  });
  Toastify({
    text: "Screen saved successfully",
    close: true,
    duration: 1500,
    style: {
      background: "linear-gradient(to right, #52b788, #40916c)",
      margin: "10px",
      padding: "5px",
    },
  }).showToast();
}

saveBtn.addEventListener("click", screenS);
