const { desktopCapturer, remote } = require("electron");
const { Menu, dialog } = remote;

// Global state
let mediaRecorder; // MediaRecorder instance to capture footage
const recordedChunks = [];

// Buttons
const videoElement = document.querySelector("video");

const videoSelectBtn = document.getElementById("videoSelectBtn");
videoSelectBtn.onclick = getVideoSources;

// Get the available video sources
async function getVideoSources() {
  const inputSources = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });

  const videoOptionsMenu = Menu.buildFromTemplate(
    inputSources.map(source => {
      return {
        label: source.name,
        click: () => selectSource(source),
      };
    })
  );

  videoOptionsMenu.popup();
}

// Change the videoSource window to record
async function selectSource(source) {
  videoSelectBtn.innerText = source.name;

  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: source.id,
      },
    },
  };

  // Create a Stream
  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  // Preview the source in a video element
  videoElement.srcObject = stream;
  videoElement.play();

  // Create the Media Recorder
  const options = { mimeType: "video/webm; codecs=vp9" };
  mediaRecorder = new MediaRecorder(stream, options);

  // Register Event Handlers
  mediaRecorder.ondataavailable = handleDataAvailable;

  // Updates the UI
}

// Captures all recorded chunks
function handleDataAvailable(e) {
  console.log("video data available");
  recordedChunks.push(e.data);
}

async function selectSavePath() {
  const { filePaths } = await dialog.showOpenDialog({
    buttonLabel: "select",
    properties: ["openFile", "openDirectory"],
  });

  let savePath = `${filePaths[0]}`;
  return savePath;
}
async function selectSaveFile() {
  const { filePaths } = await dialog.showOpenDialog({
    buttonLabel: "select",
    properties: ["openFile"],
  });

  let savePath = `${filePaths[0]}`;
  return savePath;
}
const selectPath = document.getElementById("select-path");
selectPath.addEventListener("click", async () => {
  let path = document.getElementById("path");
  path.value = await selectSavePath();
});

const modalPath = document.querySelector(".modal-path");
modalPath.addEventListener("click", async () => {
  let path = document.querySelector(".modal-path-save");
  path.value = await selectSavePath();
});

const modalFilePath = document.querySelector(".modal-file");
modalFilePath.addEventListener("click", async () => {
  let path = document.querySelector(".modal-file-save");
  path.value = await selectSaveFile();
});
