/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Start Menu BG", "./Stage/costumes/Start Menu BG.svg", {
        x: 243.24508,
        y: 183.320815,
      }),
      new Costume("Game BG", "./Stage/costumes/Game BG.svg", {
        x: 208.33333334326744,
        y: 181.25624999999997,
      }),
      new Costume("Gameover Screen", "./Stage/costumes/Gameover Screen.svg", {
        x: 243.24508,
        y: 183.320815,
      }),
      new Costume("Team Page", "./Stage/costumes/Team Page.svg", {
        x: 243.24508,
        y: 183.32079500000003,
      }),
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.freq = 1.5000000000000004;
    this.vars.sidePicker1 = 3;
    this.vars.sidePicker2 = 4;
    this.vars.sidePicker3 = 2;
    this.vars.highscore = 17;
    this.vars.frequency1 = 0.5000000000000001;
    this.vars.frequency2 = 0.9;
    this.vars.freq2 = 4.5;
    this.vars.gameOn = 0;
    this.vars.fireRate = 0.40000000000000013;
    this.vars.shooterlalive = 0;
    this.vars.shooterralive = 0;
    this.vars.firerateshooter = 1;
    this.vars.shooterfreq = 1;
    this.vars.hp = 0;
    this.vars.sidePicker4 = 1;

    this.watchers.highscore = new Watcher({
      label: "Highscore",
      style: "normal",
      visible: false,
      value: () => this.vars.highscore,
      x: 416,
      y: 174,
    });
    this.watchers.hp = new Watcher({
      label: "HP",
      style: "normal",
      visible: false,
      value: () => this.vars.hp,
      x: 248,
      y: 174,
    });
  }
}
