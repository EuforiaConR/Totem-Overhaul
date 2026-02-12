export class TotemRegistry {
    static totems = new Map();

    static register(typeId, behavior) {
        this.totems.set(typeId, behavior);
    }

    static get(typeId) {
        return this.totems.get(typeId);
    }

    static has(typeId) {
        return this.totems.has(typeId);
    }
}
