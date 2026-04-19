import type { System } from "@engine/domain/systems/System.type";
import type { World } from "@engine/domain/World";

export class SystemRunner {
  private systems: System[];

  constructor() {
    this.systems = [];
  }

  public add(system: System) {
    this.systems.push(system);
  }

  public update(world: World, tick: number) {
    for (const system of this.systems) {
      system(world, tick);
    }
  }
}
