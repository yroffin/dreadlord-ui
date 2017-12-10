import { Component, OnInit, Input } from '@angular/core';

import * as Phaser from 'phaser-ce';

@Component({
  selector: 'app-phaser',
  templateUrl: './phaser.component.html',
  styleUrls: ['./phaser.component.css']
})
export class PhaserComponent implements OnInit {

  @Input() public sprite: any = {};
  @Input() public pos: any = {x:0, y: 0};

  constructor() {
    this.sprite.x = 0;
    this.sprite.y = 0;
  }

  private game: Phaser.Game;
  private mummy: Phaser.Sprite;

  ngOnInit() {
    this.init();
  }

  setPos(x: number, y: number): void {
    this.game.add.tween(this.mummy).to({ x: x, y: y }, 3000, Phaser.Easing.Sinusoidal.InOut, true, 0, 100, true);
  }

  init(): void {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-example", {
      preload: () => {
        this.game.load.image("atari", "assets/demoscene/atari.png");
        this.game.load.image("raster", "assets/demoscene/pink-raster.png");
        this.game.load.image("floor", "assets/demoscene/checker-floor.png");
        this.game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
        this.game.load.spritesheet('coco', 'assets/sprites/volt_sprite_sheet_by_kwelfury-d5hx008.png', 180, 248, 18, 0, 0, 4);
      },

      create: () => {
        this.game.stage.backgroundColor = "#000042";

        var floor = this.game.add.image(0, this.game.height, "floor");
        floor.width = 800;
        floor.anchor.y = 1;

        this.mummy = this.game.add.sprite(100, 400, 'mummy');
        this.mummy.animations.add('walk');
        this.mummy.animations.play('walk', 20, true);
        return;
        //this.game.add.tween(this.mummy).to({ x: 700, y: 400 }, 3000, Phaser.Easing.Sinusoidal.InOut, true, 0, 100, true);
      },

      update: () => {
        this.sprite.x = this.mummy.x;
        this.sprite.y = this.mummy.y;
      }
    });
  }
}
