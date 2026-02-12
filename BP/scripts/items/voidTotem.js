import { TotemRegistry } from "../totemRegistry.js";
import { Player, EntityDamageSource, world, system } from "@minecraft/server";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register("totem_overhaul:void_totem", {
  ignoredCauses: ["selfDestruct"],
  color: { red: 1, green: 0.1, blue: 1 },

  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    if (damageSource.cause === "void") {
      player.runCommand("spreadplayers ~ ~ 5 100 @s");
    }
    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });
    player.addEffect("levitation", 100, { amplifier: 1 });

  },
});
