/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Shooterr extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Shooterr/costumes/costume1.svg", {
        x: 14.774259999999998,
        y: 14.465554924921662,
      }),
    ];

    this.sounds = [new Sound("pop", "./Shooterr/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShooterRSpawn" },
        this.whenIReceiveShooterrspawn
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShooterRDead" },
        this.whenIReceiveShooterrdead
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stage 2" },
        this.whenIReceiveStage2
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenIReceiveShooterrspawn() {
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
        this.broadcast("ShooterRDead");
        yield* this.wait(
          this.random(3, 5) * this.toNumber(this.stage.vars.shooterfreq)
        );
        this.broadcast("ShooterRSpawn");
      }
      if (this.toNumber(this.stage.vars.gameOn) === 0) {
        this.broadcast("ShooterRDead");
      }
      yield;
    }
  }

  *whenIReceiveShooterrdead() {
    this.visible = false;
  }

  *whenIReceiveStage2() {
    this.broadcast("ShooterRSpawn");
  }

  *whenGreenFlagClicked() {
    this.goto(260, 200);
    this.visible = false;
  }
}
