/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Gameover extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Gameover/costumes/costume1.svg", {
        x: 157.34897741449527,
        y: 52.54374,
      }),
    ];

    this.sounds = [new Sound("pop", "./Gameover/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Menu" },
        this.whenIReceiveStartMenu
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenIReceiveStartMenu() {
    this.visible = false;
  }

  *whenIReceiveGameOver() {
    this.visible = true;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
