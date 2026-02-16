import { TotemRegistry } from "../../totemRegistry.js";
import { Player, EntityDamageSource, world, system, EntityDamageCause } from "@minecraft/server";
import { ImpulseToLocation } from "../../utils/functions.js";
import { Random } from "../../utils/random.js";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register("totem_overhaul:frost_totem", {
  color: { red: 0.2, green: 0.2, blue: 1 },
  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });

    let explosionRadius = 10;
    let monsters = player.dimension.getEntities({families: ["monster"], maxDistance: explosionRadius, location: player.location});

    for (const [index, monster] of monsters.entries()) {
      system.runTimeout(() => {
        monster.dimension.playSound("random.glass", monster.location, {volume: 5, pitch: Random.number(0.75, 1.5)});  
        ImpulseToLocation(monster, player.location, -1.5);
        monster.applyImpulse({x: 0, y: 0.25, z: 0});
        monster.applyDamage(10, {cause: EntityDamageCause.freezing, damagingEntity: player});
        monster.addEffect("slowness", 400, { amplifier: 5 });
      }, index);
    }
  },
});
