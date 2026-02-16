import { TotemEffectRegistry } from "../../TotemEffects.js";
import { TotemRegistry } from "../../totemRegistry.js";
import { Player, EntityDamageSource, world } from "@minecraft/server";

let TotemId = "totem_overhaul:turtle_totem";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register(TotemId, {
  color: { red: 0.5, green: 1, blue: 0.5 },
  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });

    player.addEffect("resistance", 200, { amplifier: 3 });
    player.addEffect("slowness", 200, { amplifier: 3 });

  },
});

TotemEffectRegistry.register(TotemId, {
    effects: {
        offhand: [
            {id: "resistance", amplifier: 2},
            {id: "slowness", amplifier: 2},
        ],
        mainhand: [
            {id: "resistance", amplifier: 1},
            {id: "slowness", amplifier: 1},
        ]
    }
})