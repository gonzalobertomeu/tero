import type { ComponentType } from "@engine/domain/ComponentTypes";
import type { Entity } from "@engine/domain/entity/Entity";
export class World {
  private nextEntityId: number;
  private entities: Set<number>;
  private stores: Map<symbol, Map<Entity, any>>;

  constructor(public tickRate: number) {
    this.nextEntityId = 1;
    this.entities = new Set();
    this.stores = new Map();
  }

  public getStore<T>(component: ComponentType<T>): Map<Entity, T> {
    if (!this.stores.has(component.key)) {
      this.stores.set(component.key, new Map());
    }
    return this.stores.get(component.key)!;
  }

  public removeEntity(entity: Entity) {
    if (!this.entities.has(entity)) {
      return;
    }
    for (const [_, store] of this.stores) {
      if (store.has(entity)) {
        store.delete(entity);
      }
    }
    this.entities.delete(entity);
  }

  public createEntity() {
    const entity = this.nextEntityId;
    this.nextEntityId++;
    this.entities.add(entity);
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
      clearEntity() {
        self.removeEntity(entity);
      },
    };
  }

  public allStores() {
    return this.stores;
  }

  public listEntities() {
    return this.entities;
  }
}
