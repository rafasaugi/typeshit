/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MadeBy extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./MadeBy/costumes/costume1.svg", {
        x: 77.01785664292194,
        y: 13.476199466095295,
      }),
    ];

    this.sounds = [new Sound("pop", "./MadeBy/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Menu" },
        this.whenIReceiveStartMenu
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
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
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      this.effects.color += 3;
      yield;
    }
  }

  *whenIReceiveStartMenu() {
    this.visible = true;
    while (true) {
      this.effects.brightness = 0;
      if (this.touching("mouse")) {
        this.effects.brightness = 5;
      }
      yield;
    }
  }

  *whenthisspriteclicked() {
    this.broadcast("Team Member");
  }

  *whenIReceiveStartGame() {
    this.visible = false;
  }

  *whenIReceiveTeamMember() {
    this.visible = false;
  }
}
