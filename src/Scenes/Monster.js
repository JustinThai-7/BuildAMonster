class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        this.moveSpeed = 2;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenF.png");
        
        //arms
        my.sprite.yellowArm = this.add.sprite(this.bodyX - 100, this.bodyY + 50, "monsterParts", "arm_yellowC.png");
        my.sprite.redArm = this.add.sprite(this.bodyX + 100, this.bodyY + 50, "monsterParts", "arm_redC.png");
        my.sprite.yellowArm.flipX = true;
        
        //legs
        my.sprite.blueLeg = this.add.sprite(this.bodyX - 50, this.bodyY + 150, "monsterParts", "leg_blueC.png");
        my.sprite.greenLeg = this.add.sprite(this.bodyX + 50, this.bodyY + 150, "monsterParts", "leg_greenC.png");
        my.sprite.blueLeg.flipX = true;

        //face
        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY - 25, "monsterParts", "eye_human.png");
        my.sprite.mouth = this.add.sprite(this.bodyX, this.bodyY + 25, "monsterParts", "mouthE.png");
        my.sprite.redHorn = this.add.sprite(this.bodyX - 50, this.bodyY - 85, "monsterParts", "detail_red_horn_large.png");
        my.sprite.yellowHorn = this.add.sprite(this.bodyX + 50, this.bodyY - 85, "monsterParts", "detail_yellow_horn_large.png");
        my.sprite.redHorn.flipX = true;
        

        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY + 40, "monsterParts", "mouthF.png");
        my.sprite.fangs.visible = false; // hide fangs

        // Create key objects to store keyboard inputs
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        // Event input: smile
        if (Phaser.Input.Keyboard.JustDown(this.sKey)) {
            my.sprite.mouth.visible = true;
            my.sprite.fangs.visible = false;
        }

        // Event input: show fangs
        if (Phaser.Input.Keyboard.JustDown(this.fKey)) {
            my.sprite.mouth.visible = false;
            my.sprite.fangs.visible = true;
        }

        // Handle movement
        if (this.aKey.isDown) {  // Move left
            for (let spriteName in my.sprite) {
                my.sprite[spriteName].x -= this.moveSpeed;
            }
        }
        
        if (this.dKey.isDown) {  // Move right
            for (let spriteName in my.sprite) {
                my.sprite[spriteName].x += this.moveSpeed;
            }
        }
    }

}