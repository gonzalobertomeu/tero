export class Unit {
  public constructor(
    private life: number,
    private health: number,
  ) {}

  public get hp() {
    return Math.ceil((this.health / this.life) * 100);
  }

  public get maxLife() {
    return this.life;
  }
}
