/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Shooterbulletr extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Shooterbulletr/costumes/costume1.svg", {
        x: -8.866150000000005,
        y: 5.654705000000007,
      }),
    ];

    this.sounds = [new Sound("pop", "./Shooterbulletr/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShooterRSpawn" },
        this.whenIReceiveShooterrspawn
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShooterRDead" },
        this.whenIReceiveShooterrdead
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenIReceiveShooterrspawn() {
    this.stage.vars.shooterralive = 1;
    yield* this.wait(1);
    while (!(this.toNumber(this.stage.vars.shooterralive) === 0)) {
      this.createClone();
      yield* this.wait(2.5 * this.toNumber(this.stage.vars.firerateshooter));
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.goto(this.sprites["Shooterr"].x, this.sprites["Shooterr"].y);
    this.direction = this.radToScratch(
      Math.atan2(
        this.sprites["Tank"].y - this.y,
        this.sprites["Tank"].x - this.x
      )
    );
    while (true) {
      this.move(3);
      if (
        this.touching("edge") ||
        this.toNumber(this.stage.vars.gameOn) === 0
      ) {
        this.deleteThisClone();
      }
      if (
        this.touching(this.sprites["Bullets"].andClones()) ||
        this.touching(this.sprites["Tank"].andClones())
      ) {
        yield* this.wait(0.1);
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenIReceiveShooterrdead() {
    this.stage.vars.shooterralive = 0;
  }

  *whenGreenFlagClicked() {
    this.goto(260, 200);
    this.visible = false;
  }
}
