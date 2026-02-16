import { TotemEffectRegistry } from "../../TotemEffects.js";
import { TotemRegistry } from "../../totemRegistry.js";
import { Player, EntityDamageSource, world } from "@minecraft/server";

let TotemId = "totem_overhaul:swiftness_totem";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register(TotemId, {
  color: { red: 0.5, green: 0.6, blue: 1 },
  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });

    player.addEffect("speed", 500, { amplifier: 3 });

  },
});

TotemEffectRegistry.register(TotemId, {
    effects: {
        offhand: [
            {id: "speed", amplifier: 2},
        ],
        mainhand: [
            {id: "speed", amplifier: 1},
        ]
    }
})