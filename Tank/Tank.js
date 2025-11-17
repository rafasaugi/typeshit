/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Tank extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Tank", "./Tank/costumes/Tank.svg", {
        x: 15.70588235294116,
        y: 13,
      }),
    ];

    this.sounds = [new Sound("pop", "./Tank/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenIReceiveStartGame() {
    this.goto(0, 0);
    this.visible = true;
    while (true) {
      this.direction = this.radToScratch(
        Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
      );
      if (this.keyPressed("w")) {
        this.y += 3;
      }
      if (this.keyPressed("a")) {
        this.x -= 3;
      }
      if (this.keyPressed("s")) {
        this.y -= 3;
      }
      if (this.keyPressed("d")) {
        this.x += 3;
      }
      if (
        this.touching(this.sprites["Seeker"].andClones()) ||
        this.touching(this.sprites["Shooterbulletl"].andClones()) ||
        this.touching(this.sprites["Charger"].andClones())
      ) {
        yield* this.wait(0.1);
        this.broadcast("-HP");
      }
      yield;
    }
  }

  *whenIReceiveGameOver() {
    this.visible = false;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
