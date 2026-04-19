import type { World } from "@engine/domain/World";
import type { System } from "@engine/domain/systems/System.type";
import { HealthComponent } from "../ComponentTypes";

export const DeathSystem: System = (world: World, tick: number) => {
  const healths = world.getStore(HealthComponent);
  for (const [entity, health] of healths) {
    if (health.health <= 0) {
      world.entity(entity).clearEntity();
    }
  }
};
