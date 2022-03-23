const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 576,
  heigth: 324,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: true
    },
  }
};
  
const game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'assets/images/background.png');
  this.load.image('tiles', 'assets/tilesets/swamp_tileset.png');
  this.load.atlas('pal', 'assets/images/updated_sprites_phaser3.png', 'assets/images/updated_sprites_phaser3.json')
  // Load the export Tiled JSON
  this.load.tilemapTiledJSON('map', 'assets/tilemaps/swamp_level.json');
}

function create() {
  const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
  backgroundImage.setScale(1.5, 1.5);
  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('swamp_level_tileset', 'tiles');
  const platforms = map.createStaticLayer('Platforms', tileset, 0, 0);
  platforms.setCollisionByExclusion(-1, true);
  this.pal = this.physics.add.sprite(50, 200, 'pal');
  this.pal.setBounce(0.1);
  this.pal.setCollideWorldBounds(true);
  this.physics.add.collider(this.pal, platforms);
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNames('pal', { start: 0, end: 28 }),
    frameRate: 5,
    repeat: -1
  });
  this.anims.create({
    key: 'stand', 
    frames: this.anims.generateFrameNames('pal', { start: 29, end: 34 }),
    frameRate: 5,
    repeat: 0
  })

  this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (this.cursors.right.isDown)
    {
        this.pal.setVelocityX(140);

        this.pal.anims.play('stand', true);
    }
    else if (this.cursors.left.isDown)
    {
        this.pal.setVelocityX(-140);

        this.pal.anims.play('stand', true);
    }
    else if (this.cursors.up.isDown)
    {
        this.pal.setVelocityY(-160);
    }
    else
    {
        this.pal.setVelocityX(0);

        // this.pal.anims.play('idle');
    }
}
