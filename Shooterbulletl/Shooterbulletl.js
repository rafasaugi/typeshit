/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Shooterbulletl extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Shooterbulletl/costumes/costume1.svg", {
        x: -8.866150000000005,
        y: 5.654705000000007,
      }),
    ];

    this.sounds = [new Sound("pop", "./Shooterbulletl/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShooterLSpawn" },
        this.whenIReceiveShooterlspawn
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ShooterLDead" },
        this.whenIReceiveShooterldead
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenIReceiveShooterlspawn() {
    this.stage.vars.shooterlalive = 1;
    yield* this.wait(1);
    while (!(this.toNumber(this.stage.vars.shooterlalive) === 0)) {
      this.createClone();
      yield* this.wait(2.5 * this.toNumber(this.stage.vars.firerateshooter));
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.goto(this.sprites["Shooterl"].x, this.sprites["Shooterl"].y);
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

  *whenIReceiveShooterldead() {
    this.stage.vars.shooterlalive = 0;
  }

  *whenGreenFlagClicked() {
    this.goto(260, 200);
    this.visible = false;
  }
}
