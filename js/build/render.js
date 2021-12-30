const canvas = document.getElementById("snake-game");
const ctx = canvas.getContext("2d");
const canvasDims = {
  width: 600,
  height: 600
};

const theatorFit = window.onresize = () => {
  let dims = {
    width: window.innerWidth,
    height: canvasDims.height / canvasDims.width * window.innerWidth
  };

  if (window.innerHeight > dims.height) {
    canvas.style.width = "100%";
    canvas.style.height = "initial";
    canvas.style.top = `calc(50% - ${dims.height + "px"}/2)`;
  } else {
    canvas.style.height = "100%";
    canvas.style.width = "initial";
    canvas.style.top = "initial";
  }
};

const GLOBALS = {};
const PROPS = [];
const CHARS = [];

function init() {
  setGridSize(15, 15);
  CHARS.push(new Snake());
  theatorFit();
}

function renderBackground() {
  Grid();
}

function renderProps() {}

function renderCharacters() {
  for (const c of CHARS) {
    c.render();
  }
}

function renderControls() {}

function startFrames() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderBackground();
  renderProps();
  renderCharacters();
  renderControls();
  window.requestAnimationFrame(startFrames);
}

init();
startFrames();