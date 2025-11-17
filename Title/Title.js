/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Title extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Title/costumes/costume1.svg", {
        x: 126.23754746944005,
        y: 53.18325,
      }),
    ];

    this.sounds = [new Sound("pop", "./Title/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Menu" },
        this.whenIReceiveStartMenu
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
  }

  *whenIReceiveStartGame() {
    this.visible = false;
  }

  *whenIReceiveStartMenu() {
    this.visible = true;
  }

  *whenIReceiveTeamMember() {
    this.visible = false;
  }
}
