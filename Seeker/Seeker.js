/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Seeker extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Seeker/costumes/costume1.svg", {
        x: 11.681041252098368,
        y: 10.925763182588469,
      }),
    ];

    this.sounds = [new Sound("pop", "./Seeker/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *startAsClone() {
    this.visible = true;
    if (this.toNumber(this.stage.vars.sidePicker1) === 1) {
      this.goto(this.random(-260, 260), 200);
    } else {
      if (this.toNumber(this.stage.vars.sidePicker1) === 2) {
        this.goto(this.random(-260, 260), -200);
      } else {
        if (this.toNumber(this.stage.vars.sidePicker1) === 3) {
          this.goto(260, this.random(-200, 200));
        } else {
          this.goto(-260, this.random(-200, 200));
        }
      }
    }
    while (true) {
      this.direction = this.radToScratch(
        Math.atan2(
          this.sprites["Tank"].y - this.y,
          this.sprites["Tank"].x - this.x
        )
      );
      this.move(2);
      if (
        this.touching(this.sprites["Bullets"].andClones()) ||
        this.touching(this.sprites["Tank"].andClones())
      ) {
        yield* this.wait(0.1);
        this.deleteThisClone();
      }
      if (this.toNumber(this.stage.vars.gameOn) === 0) {
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenIReceiveStartGame() {
    if (this.toNumber(this.stage.vars.gameOn) === 1) {
      while (!(this.toNumber(this.stage.vars.gameOn) === 0)) {
        this.createClone();
        yield* this.wait(this.toNumber(this.stage.vars.freq));
        yield;
      }
    }
  }

  *whenGreenFlagClicked() {
    this.goto(260, 200);
    this.visible = false;
  }
}
