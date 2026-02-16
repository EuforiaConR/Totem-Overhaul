import { TotemRegistry } from "../../totemRegistry.js";
import { Player, EntityDamageSource, world } from "@minecraft/server";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register("geo:golem_totem", {
  soundId: "random.anvil_land",
  color: { red: 1, green: 1, blue: 1 },
  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });
    player.addEffect("resistance", 80, { amplifier: 3 });
    player.addEffect("slowness", 80, { amplifier: 4 });

    player.dimension.spawnEntity("minecraft:iron_golem", player.location, {
      spawnEvent: "minecraft:from_player",
    });
    //golem.triggerEvent("minecraft:from_player");
  },
});
