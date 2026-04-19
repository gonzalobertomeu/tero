import type { Attack } from "@engine/domain/components/Attack";
import type { AttackCooldown } from "@engine/domain/components/AttackCooldown";
import type { Health } from "@engine/domain/components/Health";
import type { Target } from "@engine/domain/components/Target";

export type ComponentType<T> = {
  key: symbol;
  name: string;
  __type: T;
};

function createComponent<T>(name: string) {
  return {
    key: Symbol(name),
    name,
  } as ComponentType<T>;
}

export const HealthComponent = createComponent<Health>("health");
export const AttackComponent = createComponent<Attack>("attack");
export const AttackCooldownComponent =
  createComponent<AttackCooldown>("attack_cooldown");
export const TargetComponent = createComponent<Target>("target");
