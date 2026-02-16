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

        for (const [typeId, data] of TotemEffectRegistry.totems.entries()) {

            if (data.effects.offhand && offHandItemId === typeId) {
                for (const effect of data.effects.offhand) {
                    player.addEffect(effect.id, 200, { amplifier: effect.amplifier });
                }
            }

            if (offHandItemId === mainHandItemId) return;

            if (data.effects.mainhand && mainHandItemId === typeId) {
                for (const effect of data.effects.mainhand) {
                    player.addEffect(effect.id, 200, { amplifier: effect.amplifier });
                }
            }

        }
    }
}, 100);
