import type { World } from "../World";

export type System = (world: World, tick: number) => void;
