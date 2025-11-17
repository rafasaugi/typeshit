/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Charger extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Charger/costumes/costume1.svg", {
        x: 18.496993200466676,
        y: 11.372950989059632,
      }),
    ];

    this.sounds = [new Sound("pop", "./Charger/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stage 3" },
        this.whenIReceiveStage3
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *startAsClone() {
    this.visible = true;
    if (this.toNumber(this.stage.vars.sidePicker2) === 1) {
      this.goto(this.random(-260, 260), 200);
    } else {
      if (this.toNumber(this.stage.vars.sidePicker2) === 2) {
        this.goto(this.random(-260, 260), -200);
      } else {
        if (this.toNumber(this.stage.vars.sidePicker2) === 3) {
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
      if (
        this.compare(
          Math.hypot(
            this.sprites["Tank"].x - this.x,
            this.sprites["Tank"].y - this.y
          ),
          130
        ) > 0
      ) {
        this.move(1.6);
      }
      if (
        this.compare(
          Math.hypot(
            this.sprites["Tank"].x - this.x,
            this.sprites["Tank"].y - this.y
          ),
          131
        ) < 0
      ) {
        this.move(2.5);
      }
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

  *whenIReceiveStage3() {
    if (this.toNumber(this.stage.vars.gameOn) === 1) {
      while (!(this.toNumber(this.stage.vars.gameOn) === 0)) {
        this.createClone();
        yield* this.wait(this.toNumber(this.stage.vars.freq2));
        yield;
      }
    }
  }

  *whenGreenFlagClicked() {
    this.goto(260, 200);
    this.visible = false;
  }
}
