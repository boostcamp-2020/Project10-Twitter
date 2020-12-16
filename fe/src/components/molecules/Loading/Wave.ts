import Point from './Point';

export default class Wave {
  centerX: number;

  centerY: number;

  totalPoints: number;

  points: Point[] = [];

  index: number;

  color: string;

  pointGap: number;

  width: number;

  height: number;

  constructor(index: number, totalPoints: number, color: string, width: number, height: number) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.width = width;
    this.height = height;

    this.centerX = 0;
    this.centerY = 0;
    this.pointGap = 0;

    this.init();
  }

  init() {
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    for (let i = 0; i < this.totalPoints; i += 1) {
      this.pointGap = this.width / (this.totalPoints - 1);

      const point = new Point(this.index + i, this.pointGap * i, this.centerY);
      this.points[i] = point;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 0; i < this.totalPoints; i += 1) {
      this.points[i].update();

      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.width, this.height); // 우하단 꼭지점
    ctx.lineTo(this.points[0].x, this.height); // 좌하단 꼭지점
    ctx.fill();
    ctx.closePath();
  }
}
