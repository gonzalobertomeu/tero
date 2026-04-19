import type { World } from "@engine/domain/World";

export function WorldSerializer(world: World) {
  const result: Record<string, any> = {
    entities: {},
  };
  for (const [componentType, store] of world.allStores()) {
    for (const [entity, data] of store) {
      if (!result.entities[entity]) {
        result.entities[entity] = {};
      }
      result.entities[entity][componentType.description!] = data;
    }
  }
  return result;
}
