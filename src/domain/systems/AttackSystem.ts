import type { Attack } from "../components/Attack";
import type { Health } from "../components/Health";
import {
  AttackComponent,
  AttackCooldownComponent,
  HealthComponent,
  TargetComponent,
} from "../ComponentTypes";
import type { World } from "../World";
import type { System } from "./System.type";

export const AttackSystem: System = (world: World, tick: number) => {
  const attacks = world.getStore(AttackComponent);
  const cooldowns = world.getStore(AttackCooldownComponent);
  const healths = world.getStore(HealthComponent);
  const targets = world.getStore(TargetComponent);

  for (const [entity, attack] of attacks) {
    const cd = cooldowns.get(entity);
    const target = targets.get(entity);
    if (!cd || !target) continue;

    if (cd.cooldown > 0) {
      cd.cooldown -= tick;
      continue;
    }
    cd.cooldown = Math.ceil(attack.attackSpeed * world.tickRate);

    const damage = calculateDamage(attack);

    const targetHealth = healths.get(target.entity);
    if (!targetHealth) continue;

    attackTarget(damage, targetHealth);
  }

  function calculateDamage(attack: Attack) {
    if (Math.random() < attack.critProbability) {
      return attack.baseDamage * 2;
    }
    return attack.baseDamage;
  }

  function attackTarget(damage: number, enemyHealth: Health) {
    enemyHealth.health -= damage;
    if (enemyHealth.health < 0) {
      enemyHealth.health = 0;
    }
  }
};
