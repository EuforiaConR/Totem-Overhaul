import { TotemRegistry } from "../../totemRegistry.js";
import { Player, EntityDamageSource, world, system } from "@minecraft/server";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register("totem_overhaul:breeze_totem", {


  particleId: "minecraft:breeze_wind_explosion_emitter",
  /**
 * @param {TotemContext} ctx
 */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    const { location, dimension } = player;
    const radius = 5;
    const strength = 2;

    const entities = dimension.getEntities({
      location: location,
      maxDistance: radius,
      excludeTypes: ["minecraft:item", "minecraft:xp_orb"]
    });

    for (const entity of entities) {
      const targetLoc = entity.location;

      const dx = targetLoc.x - location.x;
      const dy = targetLoc.y - location.y;
      const dz = targetLoc.z - location.z;

      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance == 0) continue;

      const nx = dx / distance;
      const nz = dz / distance;

      entity.applyImpulse({ x: nx * strength, y: 0.75, z: nz * strength })
      //entity.applyKnockback({ x: nx * strength, z: nz * strength }, 0.5);
    }
    player.playSound("breeze_wind_charge.burst")

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });
    player.addEffect("jump_boost", 800, { amplifier: 0 });
  },
});
