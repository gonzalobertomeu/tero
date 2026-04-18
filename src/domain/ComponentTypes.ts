import type { Attack } from "./components/Attack";
import type { AttackCooldown } from "./components/AttackCooldown";
import type { Health } from "./components/Health";

export type ComponentType<T> = {
  key: symbol;
  __type: T;
};

function createComponent<T>(name: string) {
  return {
    key: Symbol(name),
  } as ComponentType<T>;
}

export const HealthComponent = createComponent<Health>("health");
export const AttackComponent = createComponent<Attack>("attack");
export const AttackCooldownComponent =
  createComponent<AttackCooldown>("attack_cooldown");
