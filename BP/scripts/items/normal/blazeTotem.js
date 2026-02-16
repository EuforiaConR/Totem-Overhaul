import { TotemRegistry } from "../../totemRegistry.js";
import { Player, EntityDamageSource, world, system } from "@minecraft/server";
import { ImpulseToLocation } from "../../utils/functions.js";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register("totem_overhaul:blaze_totem", {
  color: { red: 1, green: 0.5, blue: 0 },
  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });
    player.addEffect("fire_resistance", 900, { amplifier: 0 });

    let explosionRadius = 10;
    let monsters = player.dimension.getEntities({families: ["monster"], maxDistance: explosionRadius, location: player.location});

    for (const monster of monsters) {
      ImpulseToLocation(monster, player.location, -2);
      monster.applyImpulse({x: 0, y: 0.25, z: 0});
      monster.setOnFire(10);
    }
  },
});
