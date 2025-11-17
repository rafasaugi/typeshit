/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Bullets extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Bullets/costumes/costume1.svg", {
        x: -8.866148037671707,
        y: 5.654705981164113,
      }),
    ];

    this.sounds = [new Sound("pop", "./Bullets/sounds/pop.wav")];

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
    this.goto(this.sprites["Tank"].x, this.sprites["Tank"].y);
    this.direction = this.radToScratch(
      Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
    );
    while (true) {
      this.move(5);
      if (
        this.touching("edge") ||
        this.touching(this.sprites["Seeker"].andClones()) ||
        this.touching(this.sprites["Charger"].andClones()) ||
        this.touching(this.sprites["Shooterl"].andClones()) ||
        this.touching(this.sprites["Shooterbulletl"].andClones()) ||
        this.touching(this.sprites["Shooterr"].andClones()) ||
        this.touching(this.sprites["Shooterbulletr"].andClones())
      ) {
        yield* this.wait(0.1);
        this.deleteThisClone();
      }
      if (
        this.touching("edge") ||
        this.toNumber(this.stage.vars.gameOn) === 0
      ) {
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenIReceiveStartGame() {
    while (true) {
      if (this.mouse.down) {
        this.createClone();
        yield* this.wait(this.toNumber(this.stage.vars.fireRate));
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.goto(260, 200);
    this.visible = false;
  }
}
