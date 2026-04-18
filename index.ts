import { GameLoop } from "./src/application/GameLoop";
import { HealthComponent } from "./src/domain/ComponentTypes";
import { World } from "./src/domain/World";
import { WorldSerializer } from "./src/infrastructure/WorldSerializer";
import { Main } from "./src/Main";

// Main.bootstrap().catch((err) => console.log(err));

const game = new GameLoop("standard", 30);
game.start((world: World) => {
  console.log(JSON.stringify(WorldSerializer(world)));
  console.log(
    "----------------------------------------------------------------------------------",
  );
});
