const app = document.getElementById("app");
const bgm = document.getElementById("bgm");
const toast = document.getElementById("toast");
const petalLayer = document.getElementById("petalLayer");

const screens = ["screen-1", "screen-2", "screen-3", "screen-4", "screen-5"];
const layerRoot = "./assets/layers/";
const screenRoot = "./assets/screens/";
const commonRoot = "./assets/common/";

const optionalTextLayers = new Set([
  "screen-1-title-text.png",
  "screen-2-main-text.png",
  "screen-3-main-text.png",
  "screen-4-title-text.png",
  "screen-5-main-text.png"
]);

const initialLayers = {
  "screen-1": [
    "screen-1-title-text.png",
    "screen-1-music-on.png",
    "screen-1-dog-normal.png",
    "screen-1-seal-normal.png",
    "screen-1-seal-glow.png",
    "screen-1-open-tip.png",
    "screen-1-petals.png",
    "screen-1-brushes.png",
    "screen-1-inkstone.png",
    "screen-1-scroll.png",
    "screen-1-calligraphy-paper.png"
  ],
  "screen-2": [
    "screen-2-music-on.png",
    "screen-2-girl.png",
    "screen-2-dog-normal.png",
    "screen-2-card-1-normal.png",
    "screen-2-card-1-active.png",
    "screen-2-card-2-normal.png",
    "screen-2-card-2-active.png",
    "screen-2-card-3-normal.png",
    "screen-2-card-3-active.png",
    "screen-2-main-text.png"
  ],
  "screen-3": [
    "screen-3-music-on.png",
    "screen-3-dog-normal.png",
    "screen-3-lamp-off.png",
    "screen-3-lamp-on.png",
    "screen-3-rice.png",
    "screen-3-dish-1-normal.png",
    "screen-3-dish-1-active.png",
    "screen-3-dish-2-normal.png",
    "screen-3-dish-2-active.png",
    "screen-3-food-bubble.png",
    "screen-3-surprise-tip.png",
    "screen-3-hand-icon.png",
    "screen-3-swipe-tip.png",
    "screen-3-main-text.png"
  ],
  "screen-4": [
    "screen-4-music-on.png",
    "screen-4-dog-normal.png",
    "screen-4-title-text.png",
    "screen-4-tag-1-normal.png",
    "screen-4-tag-1-open.png",
    "screen-4-tag-2-normal.png",
    "screen-4-tag-2-open.png",
    "screen-4-tag-3-normal.png",
    "screen-4-tag-3-open.png",
    "screen-4-tag-4-normal.png",
    "screen-4-tag-4-open.png",
    "screen-4-tag-5-normal.png",
    "screen-4-tag-5-open.png",
    "screen-4-result-panel.png",
    "screen-4-hand-tip.png"
  ],
  "screen-5": [
    "screen-5-music-on.png",
    "screen-5-dog-envelope-normal.png",
    "screen-5-dog-envelope-active.png",
    "screen-5-letter-paper.png",
    "screen-5-letter-paper-received.png",
    "screen-5-button-normal.png",
    "screen-5-button-active.png",
    "screen-5-final-note.png",
    "screen-5-main-text.png",
    "screen-5-inkstone-brush.png"
  ]
};

const hitTargets = {
  "screen-1": [
    { name: "music", file: "screen-1-music-on.png", action: "music", round: true },
    { name: "seal", file: "screen-1-seal-normal.png", action: "seal", round: true },
    { name: "open", file: "screen-1-open-tip.png", action: "next", round: true }
  ],
  "screen-2": [
    { name: "music", file: "screen-2-music-on.png", action: "music", round: true },
    { name: "card-1", file: "screen-2-card-1-normal.png", action: "card", index: 1 },
    { name: "card-2", file: "screen-2-card-2-normal.png", action: "card", index: 2 },
    { name: "card-3", file: "screen-2-card-3-normal.png", action: "card", index: 3 }
  ],
  "screen-3": [
    { name: "music", file: "screen-3-music-on.png", action: "music", round: true },
    { name: "lamp", file: "screen-3-lamp-off.png", action: "lamp" },
    { name: "dish-1", file: "screen-3-dish-1-normal.png", action: "meal" },
    { name: "dish-2", file: "screen-3-dish-2-normal.png", action: "meal" },
    { name: "rice", file: "screen-3-rice.png", action: "meal" },
    { name: "surprise", file: "screen-3-surprise-tip.png", action: "meal" }
  ],
  "screen-4": [
    { name: "music", file: "screen-4-music-on.png", action: "music", round: true },
    { name: "tag-1", file: "screen-4-tag-1-normal.png", action: "tag", index: 1 },
    { name: "tag-2", file: "screen-4-tag-2-normal.png", action: "tag", index: 2 },
    { name: "tag-3", file: "screen-4-tag-3-normal.png", action: "tag", index: 3 },
    { name: "tag-4", file: "screen-4-tag-4-normal.png", action: "tag", index: 4 },
    { name: "tag-5", file: "screen-4-tag-5-normal.png", action: "tag", index: 5 }
  ],
  "screen-5": [
    { name: "music", file: "screen-5-music-on.png", action: "music", round: true },
    { name: "receive", file: "screen-5-button-normal.png", action: "receive", round: true }
  ]
};

let layout;
let toastTimer;

function cssClassFromFile(file) {
  return file.replace(".png", "");
}

function setBox(element, box) {
  element.style.setProperty("--x", box.x);
  element.style.setProperty("--y", box.y);
  element.style.setProperty("--w", box.w);
  element.style.setProperty("--h", box.h);
}

function addImage(screenEl, file, box, src, z = 2) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  img.className = `asset state-layer ${cssClassFromFile(file)}`;
  img.style.setProperty("--z", z);
  setBox(img, box);
  screenEl.appendChild(img);
  return img;
}

function addHit(screenEl, box, target) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `hit ${target.round ? "round" : ""}`;
  button.setAttribute("aria-label", target.name);
  setBox(button, box);
  button.addEventListener("click", () => handleAction(screenEl, target));
  screenEl.appendChild(button);
  return button;
}

function showToast(text) {
  if (!text) return;
}

function burstPetals(amount = 12) {
  const petalFiles = ["petal-1.png", "petal-2.png", "petal-3.png"];
  for (let index = 0; index < amount; index += 1) {
    const petal = document.createElement("span");
    const file = petalFiles[index % petalFiles.length];
    petal.className = "petal";
    petal.style.backgroundImage = `url("${commonRoot}${file}")`;
    petal.style.left = `${18 + Math.random() * 64}%`;
    petal.style.animationDuration = `${3 + Math.random() * 2}s`;
    petal.style.animationDelay = "0s";
    petal.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);
    petalLayer.appendChild(petal);
    setTimeout(() => petal.remove(), 5200);
  }
}

function makePetals(count = 16) {
  const petalFiles = ["petal-1.png", "petal-2.png", "petal-3.png"];
  for (let index = 0; index < count; index += 1) {
    const petal = document.createElement("span");
    const file = petalFiles[index % petalFiles.length];
    petal.className = "petal";
    petal.style.backgroundImage = `url("${commonRoot}${file}")`;
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${8 + Math.random() * 8}s`;
    petal.style.animationDelay = `${Math.random() * -12}s`;
    petal.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
    petalLayer.appendChild(petal);
  }
}

async function toggleMusic() {
  if (bgm.paused) {
    try {
      await bgm.play();
      showToast("音乐已开启");
    } catch {
      showToast("放入 assets/bgm.mp3 后即可播放");
    }
  } else {
    bgm.pause();
    showToast("音乐已关闭");
  }
}

function clearCardStates(screenEl) {
  screenEl.classList.remove("card-open-1", "card-open-2", "card-open-3");
}

function clearTagStates(screenEl) {
  screenEl.classList.remove("tag-open-1", "tag-open-2", "tag-open-3", "tag-open-4", "tag-open-5");
}

function handleAction(screenEl, target) {
  const img = target.file ? screenEl.querySelector(`.${cssClassFromFile(target.file)}`) : null;

  if (target.action === "music") {
    toggleMusic();
    return;
  }

  if (target.action === "seal" || target.action === "next") {
    screenEl.classList.add("seal-on");
    burstPetals(18);
    setTimeout(() => document.getElementById("screen-2").scrollIntoView({ behavior: "smooth" }), 520);
    return;
  }

  if (target.action === "dog") {
    return;
  }

  if (target.action === "ripple") {
    screenEl.classList.add("ripple-on");
    burstPetals(7);
    return;
  }

  if (target.action === "card") {
    screenEl.classList.add(`card-open-${target.index}`);
    const card = screenEl.querySelector(`.screen2-card-${target.index}`);
    if (card) card.classList.add("is-open");
    burstPetals(7);
    return;
  }

  if (target.action === "lamp") {
    screenEl.classList.toggle("lamp-on");
    return;
  }

  if (target.action === "meal") {
    screenEl.classList.add("meal-on");
    burstPetals(8);
    return;
  }

  if (target.action === "tag") {
    screenEl.classList.add(`tag-open-${target.index}`, `wish-open-${target.index}`, "show-result");
    burstPetals(10);
    return;
  }

  if (target.action === "receive") {
    screenEl.classList.add("received");
    burstPetals(22);
  }
}

function renderScreen(screenName) {
  const screenEl = document.querySelector(`[data-screen="${screenName}"]`);
  const screenLayout = layout[screenName];

  if (screenName === "screen-2") {
    renderScreen2(screenEl);
    return;
  }

  if (screenName === "screen-4") {
    renderScreen4(screenEl);
    return;
  }

  const bgFile = `${screenName}-bg.png`;
  const bg = document.createElement("img");
  bg.src = `${screenRoot}${bgFile}`;
  bg.alt = screenEl.getAttribute("aria-label") || "";
  bg.className = "asset bg";
  screenEl.appendChild(bg);

  initialLayers[screenName].forEach((file, index) => {
    const box = screenLayout[file];
    if (!box) return;
    addImage(screenEl, file, box, `${layerRoot}${file}`, optionalTextLayers.has(file) ? 5 : 4 + index * 0.01);
  });

  hitTargets[screenName].forEach((target) => {
    const box = screenLayout[target.file];
    if (!box) return;
    addHit(screenEl, box, target);
  });
}

function addFullBg(screenEl, src, alt) {
  const bg = document.createElement("img");
  bg.src = src;
  bg.alt = alt;
  bg.className = "asset bg";
  screenEl.appendChild(bg);
  return bg;
}

function renderScreen2(screenEl) {
  screenEl.classList.add("compact");
  addFullBg(screenEl, `${screenRoot}screen-2-bg-new.png`, "江南与回忆");

  const cards = [
    {
      index: 1,
      x: 55,
      y: 1235,
      w: 260,
      h: 300,
      title: "长桥风起",
      text: "风过桥头，愿你前路都有温柔相送。"
    },
    {
      index: 2,
      x: 340,
      y: 1235,
      w: 260,
      h: 300,
      title: "柳下听风",
      text: "风拂柳枝，愿你心里的事，慢慢被吹轻。"
    },
    {
      index: 3,
      x: 625,
      y: 1235,
      w: 260,
      h: 300,
      title: "湖边小晴天",
      text: "寻常日子里，也总有一点点小晴朗。"
    }
  ];

  cards.forEach((card) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `screen2-card screen2-card-${card.index}`;
    button.innerHTML = `<b>${card.title}</b><em>点击查看</em><span>${card.text}</span>`;
    setBox(button, card);
    button.addEventListener("click", () => handleAction(screenEl, { action: "card", index: card.index }));
    screenEl.appendChild(button);
  });

  addHit(screenEl, { x: 720, y: 42, w: 190, h: 72 }, { name: "music", action: "music", round: true });
}

function renderScreen4(screenEl) {
  screenEl.classList.add("compact");
  addFullBg(screenEl, `${screenRoot}screen-4-back.png`, "愿望签");

  for (let index = 1; index <= 5; index += 1) {
    const img = document.createElement("img");
    img.src = `${screenRoot}screen-4-front.png`;
    img.alt = "";
    img.className = `wish-front wish-front-${index}`;
    screenEl.appendChild(img);
  }

  const tagBoxes = [
    { x: 25, y: 540, w: 150, h: 650 },
    { x: 205, y: 540, w: 150, h: 650 },
    { x: 385, y: 540, w: 150, h: 650 },
    { x: 565, y: 540, w: 150, h: 650 },
    { x: 745, y: 540, w: 150, h: 650 }
  ];

  tagBoxes.forEach((box, index) => {
    addHit(screenEl, box, { name: `tag-${index + 1}`, action: "tag", index: index + 1 });
  });

  addHit(screenEl, { x: 720, y: 42, w: 190, h: 72 }, { name: "music", action: "music", round: true });
}

async function init() {
  const response = await fetch("./assets/layout.json");
  layout = await response.json();
  screens.forEach(renderScreen);
  await Promise.all(
    [...document.images].map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    })
  );
  makePetals();
  document.body.classList.add("is-ready");
}

init().catch((error) => {
  console.error(error);
  showToast("素材加载失败，请检查 assets 目录");
});
