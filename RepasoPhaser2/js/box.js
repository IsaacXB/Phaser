class box extends mySprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'box');
        this.body.allowGravity = true;
        this.body.physicsType = 1;
    }
}