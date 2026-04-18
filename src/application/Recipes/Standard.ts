import {
  AttackComponent,
  AttackCooldownComponent,
  HealthComponent,
} from "../../domain/ComponentTypes";
import { AttackSystem } from "../../domain/systems/AttackSystem";
import { World } from "../../domain/World";
import { SystemRunner } from "../SystemRunner";

export function StandardRecipe(tickRate: number): {
  world: World;
  runner: SystemRunner;
} {
  const world = new World(tickRate);
  const player = world.createEntity();
  const enemy = world.createEntity();

  world
    .entity(player)
    .add(HealthComponent, { life: 100, health: 100 })
    .add(AttackComponent, {
      baseDamage: 5,
      critProbability: 0.1,
      attackSpeed: 1,
    })
    .add(AttackCooldownComponent, { cooldown: 0 });
  world
    .entity(enemy)
    .add(HealthComponent, { life: 100, health: 100 })
    .add(AttackComponent, {
      baseDamage: 5,
      critProbability: 0,
      attackSpeed: 1,
    })
    .add(AttackCooldownComponent, { cooldown: 0 });

  const runner = new SystemRunner();
  runner.add(AttackSystem);

  return { world, runner };
}
