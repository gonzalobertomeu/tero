import {
  AttackComponent,
  AttackCooldownComponent,
  HealthComponent,
  TargetComponent,
} from "@engine/domain/ComponentTypes";
import { AttackSystem } from "@engine/domain/systems/AttackSystem";
import { World } from "@engine/domain/World";
import { SystemRunner } from "@engine/application/SystemRunner";
import { DeathSystem } from "@engine/domain/systems/DeathSystem";

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
      critProbability: 0.2,
      attackSpeed: 1,
    })
    .add(AttackCooldownComponent, { cooldown: 0 })
    .add(TargetComponent, { entity: enemy });
  world
    .entity(enemy)
    .add(HealthComponent, { life: 100, health: 100 })
    .add(AttackComponent, {
      baseDamage: 5,
      critProbability: 0,
      attackSpeed: 1,
    })
    .add(AttackCooldownComponent, { cooldown: 0 })
    .add(TargetComponent, { entity: player });

  const runner = new SystemRunner();
  runner.add(AttackSystem);
  runner.add(DeathSystem);

  return { world, runner };
}
