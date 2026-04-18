import {
  AttackComponent,
  AttackCooldownComponent,
  HealthComponent,
} from "../ComponentTypes";
import type { World } from "../World";
import type { System } from "./System.type";

export const AttackSystem: System = (world: World, tick: number) => {
  const attacks = world.getStore(AttackComponent);
  const cooldowns = world.getStore(AttackCooldownComponent);
  const healths = world.getStore(HealthComponent);

  for (const [entity, attack] of attacks) {
    const cd = cooldowns.get(entity);
    if (!cd) continue;

    if (cd.cooldown > 0) {
      cd.cooldown -= tick;
    }
    cd.cooldown = Math.ceil(attack.attackSpeed * world.tickRate);
  }
};
