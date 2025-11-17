import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import GameController from "./GameController/GameController.js";
import Tank from "./Tank/Tank.js";
import Seeker from "./Seeker/Seeker.js";
import Bullets from "./Bullets/Bullets.js";
import Title from "./Title/Title.js";
import MadeBy from "./MadeBy/MadeBy.js";
import StartButton from "./StartButton/StartButton.js";
import Shooterl from "./Shooterl/Shooterl.js";
import Shooterbulletl from "./Shooterbulletl/Shooterbulletl.js";
import Charger from "./Charger/Charger.js";
import Shooterr from "./Shooterr/Shooterr.js";
import Shooterbulletr from "./Shooterbulletr/Shooterbulletr.js";
import Gameover from "./Gameover/Gameover.js";
import Backtomenu from "./Backtomenu/Backtomenu.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  GameController: new GameController({
    x: 36,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 3,
  }),
  Tank: new Tank({
    x: 54,
    y: 6,
    direction: -71.21497948740458,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 14,
  }),
  Seeker: new Seeker({
    x: 241,
    y: 182,
    direction: 131.23856252298484,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2,
  }),
  Bullets: new Bullets({
    x: 257,
    y: 186,
    direction: -111.73348328283066,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1,
  }),
  Title: new Title({
    x: 0,
    y: 30,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 6,
  }),
  MadeBy: new MadeBy({
    x: 0,
    y: -160,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 4,
  }),
  StartButton: new StartButton({
    x: 0,
    y: -25,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 8,
  }),
  Shooterl: new Shooterl({
    x: -48,
    y: -180,
    direction: 25.58851314131641,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 10,
  }),
  Shooterbulletl: new Shooterbulletl({
    x: 228,
    y: 192,
    direction: 133.55240031314352,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 12,
  }),
  Charger: new Charger({
    x: 246,
    y: 186,
    direction: 131.98721249581584,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 13,
  }),
  Shooterr: new Shooterr({
    x: 254,
    y: 185,
    direction: -102.89875110416443,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 9,
  }),
  Shooterbulletr: new Shooterbulletr({
    x: 228,
    y: 192,
    direction: 133.55240031314352,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 11,
  }),
  Gameover: new Gameover({
    x: 0,
    y: 10,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 5,
  }),
  Backtomenu: new Backtomenu({
    x: 0,
    y: -40,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 7,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
