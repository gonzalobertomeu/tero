import type { World } from "@engine/domain/World";

export type System = (world: World, tick: number) => void;
