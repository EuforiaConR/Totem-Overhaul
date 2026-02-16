import { system, world } from "@minecraft/server";
import { getMainhandItem, getOffhandItem, hasItemInOffhand } from "./utils/functions";

export class TotemEffectRegistry {
    static totems = new Map();

    static register(typeId, effects) {
        this.totems.set(typeId, effects);
    }

    static get(typeId) {
        return this.totems.get(typeId);
    }

    static has(typeId) {
        return this.totems.has(typeId);
    }
}

system.runInterval(() => {
    for (const player of world.getPlayers()) {

        let offHandItemId = getOffhandItem(player)?.typeId;
        let mainHandItemId = getMainhandItem(player)?.typeId;

        TotemEffectRegistry.get(offHandItemId)?.effects?.offhand.forEach(effect => {
            player.addEffect(effect.id, 200, { amplifier: effect.amplifier });
        })

        if (offHandItemId === mainHandItemId) return;

        TotemEffectRegistry.get(mainHandItemId)?.effects?.mainhand.forEach(effect => {
            player.addEffect(effect.id, 200, { amplifier: effect.amplifier });
        })
    }
}, 100);
