/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Backtomenu extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Backtomenu/costumes/costume1.svg", {
        x: 53.17888564851691,
        y: 15.50183027686063,
      }),
      new Costume("costume2", "./Backtomenu/costumes/costume2.svg", {
        x: 53.178855,
        y: 15.501829999999927,
      }),
    ];

    this.sounds = [new Sound("pop", "./Backtomenu/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Menu" },
        this.whenIReceiveStartMenu
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Team Member" },
        this.whenIReceiveTeamMember
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveGameOver() {
    this.goto(0, -40);
    this.costume = "costume1";
    this.visible = true;
    while (true) {
      this.effects.brightness = 0;
      if (this.touching("mouse")) {
        this.effects.brightness = 10;
      }
      yield;
    }
  }

  *whenIReceiveStartMenu() {
    this.visible = false;
  }

  *whenthisspriteclicked() {
    this.broadcast("Start Menu");
  }

  *whenIReceiveTeamMember() {
    this.goto(0, -130);
    this.costume = "costume2";
    this.visible = true;
    while (true) {
      this.effects.brightness = 0;
      if (this.touching("mouse")) {
        this.effects.brightness = 10;
      }
      yield;
    }
  }
}
