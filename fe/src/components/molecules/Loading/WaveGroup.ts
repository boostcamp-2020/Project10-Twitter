import Wave from './Wave';

const opacity = '0.7';
const DARK_BLUE = `rgba(51, 93, 159, ${opacity})`;
const BLUE = `rgba(126, 163, 213, ${opacity})`;
const LIGHT_BLUE = `rgba(179, 210, 247, ${opacity})`;

export default class WaveGroup {
  totalWaves: number = 3;

  totalPoints: number = 6;

  color: string[] = [DARK_BLUE, BLUE, LIGHT_BLUE];

  waves: Wave[] = [];

  constructor(width: number, height: number) {
    for (let i = 0; i < this.totalWaves; i += 1) {
      const wave = new Wave(i, this.totalPoints, this.color[i], width, height);
      this.waves[i] = wave;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.totalWaves; i += 1) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }
}
