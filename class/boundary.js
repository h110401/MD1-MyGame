class Boundary {
    static width = 48
    static height = 48

    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'rgb(255,0,0,0.2)'
        c.fillRect(this.position.x, this.position.y, Boundary.height, Boundary.width)
    }
}
