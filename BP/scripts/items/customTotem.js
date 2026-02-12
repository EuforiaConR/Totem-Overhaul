import { TotemRegistry } from "../totemRegistry.js";
import { Player, EntityDamageSource, world } from "@minecraft/server";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register("eu:custom_totem", {
  color: { red: 1, green: 0, blue: 1 },
  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });

  },
});