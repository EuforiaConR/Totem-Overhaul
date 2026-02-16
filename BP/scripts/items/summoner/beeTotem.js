import { TotemRegistry } from "../../totemRegistry.js";
import { Player, EntityDamageSource, world } from "@minecraft/server";
import { Random } from "utils/random.js";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register("totem_overhaul:bee_totem", {
  color: { red: 0, green: 1, blue: 0 },
  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    for (let i = 0; i < 4; i++) {
      const spawnLoc = player.getHeadLocation();
      spawnLoc.x += Random.int(-2, 2);
      spawnLoc.z += Random.int(-2, 2);

      const bee = player.dimension.spawnEntity("totem_overhaul:summoned_bee", spawnLoc);
      const tameableComp = bee.getComponent("tameable");
      tameableComp.tame(player);
    }

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });
    player.addEffect("fire_resistance", 900, { amplifier: 0 });
  },
});
