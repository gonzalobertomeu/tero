import { World } from "@engine/domain/World";
// import { WorldSerializer } from "@engine/infrastructure/WorldSerializer";
import { StandardRecipe } from "@engine/application/Recipes/Standard";
import { SystemRunner } from "@engine/application/SystemRunner";

export class GameLoop {
  private systemRunner: SystemRunner;
  private world: World;
  private running?: NodeJS.Timeout;

  constructor(
    gameType: string = "standard",
    private tickRate: number = 30,
  ) {
    const { world, runner } = StandardRecipe(tickRate);
    this.world = world;
    this.systemRunner = runner;
    this.running = undefined;
  }

  public start(callback: (data: any) => void) {
    this.running = setInterval(() => {
      this.systemRunner.update(this.world, 1);
      callback(this.getWorld());
    }, 1000 / this.tickRate);
  }
  public stop() {
    if (this.running) {
      clearInterval(this.running);
    }
  }

  public getWorld() {
    return this.world;
  }
}
