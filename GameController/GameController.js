/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class GameController extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./GameController/costumes/costume1.svg", {
        x: 0,
        y: 0,
      }),
    ];

    this.sounds = [new Sound("pop", "./GameController/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Team Member" },
        this.whenIReceiveTeamMember
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Menu" },
        this.whenIReceiveStartMenu
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame3
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame4
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stage 3" },
        this.whenIReceiveStage3
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame5
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame6
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame7
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stage 2" },
        this.whenIReceiveStage2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stage 2.5" },
        this.whenIReceiveStage25
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stage 3" },
        this.whenIReceiveStage4
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Stage 3" },
        this.whenIReceiveStage5
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "space" },
        this.whenKeySpacePressed
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game over" },
        this.whenIReceiveGameOver2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame8
      ),
      new Trigger(Trigger.BROADCAST, { name: "-HP" }, this.whenIReceiveHp),
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.stage.vars.sidePicker1 = this.random(1, 4);
      this.stage.vars.sidePicker2 = this.random(1, 4);
      this.stage.vars.sidePicker3 = this.random(1, 3);
      this.stage.vars.sidePicker4 = this.random(1, 3);
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.broadcast("Start Menu");
  }

  *whenIReceiveStartGame() {
    this.stage.costume = "Game BG";
    this.stage.watchers.highscore.visible = true;
    this.stage.vars.highscore = 0;
    yield* this.wait(0.1);
    if (this.toNumber(this.stage.vars.gameOn) === 1) {
      while (!(this.toNumber(this.stage.vars.gameOn) === 0)) {
        this.stage.vars.highscore++;
        yield* this.wait(0.7);
        yield;
      }
    }
  }

  *whenIReceiveTeamMember() {
    this.stage.costume = "Team Page";
  }

  *whenIReceiveStartMenu() {
    this.stage.costume = "Start Menu BG";
    this.stage.watchers.highscore.visible = false;
    this.stage.watchers.hp.visible = false;
  }

  *whenIReceiveStartGame2() {
    if (this.compare(this.stage.vars.highscore, 50) < 0) {
      this.stage.vars.frequency1 = 1;
      for (let i = 0; i < 5; i++) {
        yield* this.wait(8);
        this.stage.vars.frequency1 -= 0.1;
        yield;
      }
    }
    if (
      this.compare(this.stage.vars.highscore, 100) < 0 &&
      this.compare(this.stage.vars.highscore, 50) > 0
    ) {
      this.stage.vars.frequency1 = 1;
      for (let i = 0; i < 5; i++) {
        yield* this.wait(8);
        this.stage.vars.frequency1 -= 0.1;
        yield;
      }
    }
    if (this.compare(this.stage.vars.highscore, 100) > 0) {
      this.stage.vars.frequency1 = 1;
      for (let i = 0; i < 8; i++) {
        yield* this.wait(10);
        this.stage.vars.frequency1 -= 0.1;
        yield;
      }
    }
  }

  *whenIReceiveStartGame3() {
    while (true) {
      this.stage.vars.freq =
        this.random(1, 3) * this.toNumber(this.stage.vars.frequency1);
      yield* this.wait(0.5);
      yield;
    }
  }

  *whenIReceiveStartGame4() {
    while (true) {
      this.stage.vars.freq2 =
        this.random(3, 5) * this.toNumber(this.stage.vars.frequency2);
      yield* this.wait(0.5);
      yield;
    }
  }

  *whenIReceiveStage3() {
    this.stage.vars.frequency2 = 1;
    for (let i = 0; i < 5; i++) {
      yield* this.wait(10);
      this.stage.vars.frequency2 -= 0.1;
      yield;
    }
    yield* this.wait(15);
    this.stage.vars.frequency2 -= 0.1;
  }

  *whenIReceiveStartGame5() {
    this.stage.vars.fireRate = 1;
    for (let i = 0; i < 6; i++) {
      yield* this.wait(12);
      this.stage.vars.fireRate -= 0.1;
      yield;
    }
  }

  *whenIReceiveStartGame6() {
    while (!(this.toNumber(this.stage.vars.highscore) === 50)) {
      yield;
    }
    this.broadcast("Stage 2");
    while (!(this.toNumber(this.stage.vars.highscore) === 75)) {
      yield;
    }
    this.broadcast("Stage 2.5");
    while (!(this.toNumber(this.stage.vars.highscore) === 100)) {
      yield;
    }
    this.broadcast("Stage 3");
  }

  *whenIReceiveStartGame7() {
    this.stage.vars.gameOn = 1;
  }

  *whenIReceiveGameOver() {
    this.stage.vars.gameOn = 0;
  }

  *whenIReceiveStage2() {
    this.stage.vars.shooterfreq = 1;
    this.stage.vars.firerateshooter = 1;
    for (let i = 0; i < 3; i++) {
      yield* this.wait(5);
      this.stage.vars.firerateshooter -= 0.1;
      yield;
    }
  }

  *whenIReceiveStage25() {
    this.stage.vars.firerateshooter = 1;
    for (let i = 0; i < 3; i++) {
      yield* this.wait(5);
      this.stage.vars.firerateshooter -= 0.1;
      yield;
    }
  }

  *whenIReceiveStage4() {
    this.stage.vars.firerateshooter = 1;
    for (let i = 0; i < 3; i++) {
      yield* this.wait(6);
      this.stage.vars.firerateshooter -= 0.1;
      yield;
    }
  }

  *whenIReceiveStage5() {
    this.stage.vars.shooterfreq = 1;
    for (let i = 0; i < 5; i++) {
      yield* this.wait(10);
      this.stage.vars.shooterfreq -= 0.1;
      yield;
    }
  }

  *whenKeySpacePressed() {
    this.broadcast("Start Game");
  }

  *whenIReceiveGameOver2() {
    this.stage.costume = "Gameover Screen";
    this.stage.watchers.hp.visible = false;
  }

  *whenIReceiveStartGame8() {
    this.stage.vars.hp = 5;
    this.stage.watchers.hp.visible = true;
  }

  *whenIReceiveHp() {
    yield* this.wait(0.15);
    this.stage.vars.hp--;
    if (this.toNumber(this.stage.vars.hp) === 0) {
      this.broadcast("Game over");
    }
  }
}
