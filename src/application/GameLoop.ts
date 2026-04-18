import { World } from "../domain/World";
import { StandardRecipe } from "./Recipes/Standard";
import { SystemRunner } from "./SystemRunner";

export class GameLoop {
  private systemRunner: SystemRunner;
  private world: World;

  constructor(
    gameType: string = "standard",
    private tickRate: number = 30,
  ) {
    const { world, runner } = StandardRecipe(tickRate);
    this.world = world;
    this.systemRunner = runner;
  }
}
