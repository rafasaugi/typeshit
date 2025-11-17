/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class StartButton extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./StartButton/costumes/costume1.svg", {
        x: 64.76433738812204,
        y: 20.200774999999965,
      }),
    ];

    this.sounds = [new Sound("pop", "./StartButton/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Menu" },
        this.whenIReceiveStartMenu
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
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

  *whenIReceiveStartMenu() {
    this.visible = true;
    while (true) {
      this.effects.brightness = 0;
      if (this.touching("mouse")) {
        this.effects.brightness = 10;
      }
      yield;
    }
  }

  *whenIReceiveStartGame() {
    this.visible = false;
  }

  *whenthisspriteclicked() {
    this.broadcast("Start Game");
  }

  *whenIReceiveTeamMember() {
    this.visible = false;
  }
}
