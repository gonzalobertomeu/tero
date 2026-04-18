import type { ComponentType } from "./ComponentTypes";
import type { Entity } from "./entity/Entity";
export class World {
  private nextEntityId: number;
  private entities: number[];
  private stores: Map<symbol, Map<Entity, any>>;

  constructor(public tickRate: number) {
    this.nextEntityId = 1;
    this.entities = [];
    this.stores = new Map();
  }

  public getStore<T>(component: ComponentType<T>): Map<Entity, T> {
    if (!this.stores.has(component.key)) {
      this.stores.set(component.key, new Map());
    }
    return this.stores.get(component.key)!;
  }

  public createEntity() {
    const entity = +this.nextEntityId;
    this.entities.push(entity);
    return entity;
  }

  public entity(entity: Entity) {
    const self = this;
    return {
      add<T>(component: ComponentType<T>, data: T) {
        const store = self.getStore(component);
        store.set(entity, data);
        return this;
      },
      get<T>(component: ComponentType<T>) {
        return self.getStore(component).get(entity);
      },
      has<T>(component: ComponentType<T>) {
        return self.getStore(component).has(entity);
      },
      remove<T>(component: ComponentType<T>) {
        self.getStore(component).delete(entity);
      },
    };
  }
}
