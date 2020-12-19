export default class Point {
  x: number;

  y: number;

  fixedY: number;

  speed: number = 0.04;

  cur: number;

  max: number;

  constructor(index: number, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.fixedY = y - 100;
    this.cur = index;
    this.max = Math.random() * 100 + 60;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
  }
}
