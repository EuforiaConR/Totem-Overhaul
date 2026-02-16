import { TotemRegistry } from "../../totemRegistry.js";
import { Player, EntityDamageSource, world, system } from "@minecraft/server";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register("totem_overhaul:ender_totem", {
  color: { red: 0, green: 0.9, blue: 0.1 },

  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    player.runCommand("spreadplayers ~ ~ 5 25 @s");

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });
  },
});
