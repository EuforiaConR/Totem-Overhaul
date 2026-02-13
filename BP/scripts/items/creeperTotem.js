import { TotemRegistry } from "../totemRegistry.js";
import { Player, EntityDamageSource, world } from "@minecraft/server";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register("totem_overhaul:creeper_totem", {
  invulnerabilityTicks: 20,
  color: { red: 0, green: 1, blue: 0 },
  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    player.dimension.createExplosion(player.location, 5, { source: player });

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });
    player.addEffect("fire_resistance", 900, { amplifier: 0 });
  },
});
