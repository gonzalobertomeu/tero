import { GameLoop } from "@engine/application/GameLoop";
// import { HealthComponent } from "@engine/domain/ComponentTypes";
import { World } from "@engine/domain/World";
import { WorldSerializer } from "@engine/infrastructure/WorldSerializer";
// import { Main } from "./src/Main";

// Main.bootstrap().catch((err) => console.log(err));

const game = new GameLoop("standard", 30);
game.start((world: World) => {
  console.clear();
  console.log(JSON.stringify(WorldSerializer(world)));
});
