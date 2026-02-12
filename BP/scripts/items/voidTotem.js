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
  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    if (damageSource.cause === "void") {
      player.runCommand("spreadplayers ~ ~ 5 100 @s");
    }

  },
});
