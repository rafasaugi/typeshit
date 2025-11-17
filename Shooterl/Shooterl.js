/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Shooterl extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Shooterl/costumes/costume1.svg", {
        x: 14.774259999999998,
        y: 14.465554924921662,
      }),
    ];

    this.sounds = [new Sound("pop", "./Shooterl/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShooterLSpawn" },
        this.whenIReceiveShooterlspawn
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShooterLDead" },
        this.whenIReceiveShooterldead
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stage 2.5" },
        this.whenIReceiveStage25
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenIReceiveShooterlspawn() {
    this.visible = true;
    if (this.toNumber(this.stage.vars.sidePicker3) === 1) {
      this.goto(240, this.random(-130, 130));
    } else {
      if (this.toNumber(this.stage.vars.sidePicker3) === 2) {
        this.goto(-240, this.random(-200, 130));
      } else {
        this.goto(this.random(-240, 240), -180);
      }
    }
    while (true) {
      this.direction = this.radToScratch(
        Math.atan2(
          this.sprites["Tank"].y - this.y,
          this.sprites["Tank"].x - this.x
        )
      );
      if (this.touching(this.sprites["Bullets"].andClones())) {
        yield* this.wait(0.1);
        this.broadcast("ShooterLDead");
        yield* this.wait(
          this.random(3, 5) * this.toNumber(this.stage.vars.shooterfreq)
        );
        this.broadcast("ShooterLSpawn");
      }
      if (this.toNumber(this.stage.vars.gameOn) === 0) {
        this.broadcast("ShooterLDead");
      }
      yield;
    }
  }

  *whenIReceiveShooterldead() {
    this.visible = false;
  }

  *whenIReceiveStage25() {
    this.broadcast("ShooterLSpawn");
  }

  *whenGreenFlagClicked() {
    this.goto(260, 200);
    this.visible = false;
  }
}
