class Sprite {
    constructor({
                    image,
                    position = {x: 0, y: 0, scale: 1},
                    frames = {max: 1, hold: 10},
                    animate = false,
                    rotation = 0,
                    flip = false
                }) {
        this.image = new Image()
        this.position = position
        this.frames = {...frames, index: 0, timePerFrame: 0}
        this.animate = animate
        this.opacity = 1
        this.rotation = rotation
        this.flip = flip
        this.image.onload = () => {
            this.width = this.image.width * 4 * this.position.scale / this.frames.max
            this.height = this.image.height * 4 * this.position.scale
        }
        this.image.src = image.src
    }

    draw() {
        c.save()
        c.imageSmoothingEnabled = false
        c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
        c.rotate(this.rotation)
        if (this.flip) c.scale(-1, 1)
        c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2)
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image,
            this.frames.index * this.image.width / this.frames.max,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        c.restore()

        if (!this.animate) {
            this.frames.index = 0
            return
        }

        if (this.frames.timePerFrame % this.frames.hold === 0) {
            if (this.frames.index < this.frames.max - 1) {
                this.frames.index++
            } else {
                this.frames.index = 0
            }
            this.frames.timePerFrame = 0
        }
        this.frames.timePerFrame++
    }

    flipImage(image, ctx, flipH) {
        let scaleH = flipH ? -1 : 1,
            posX = flipH ? width * -1 : 0;


        c.save();
        c.scale(scaleH, 1);
        c.drawImage(image, posX, 0, this.width, this.height);
        c.restore();
    };
}


function flipImage(image, ctx, flipH, flipV) {
    let scaleH = flipH ? -1 : 1,
        posX = flipH ? width * -1 : 0;


    c.save();
    c.scale(scaleH, 1);
    c.drawImage(image, posX, posY, width, height);
    c.restore();
};