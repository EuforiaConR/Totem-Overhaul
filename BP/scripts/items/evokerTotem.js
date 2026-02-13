import { TotemRegistry } from "../totemRegistry.js";
import { Player, EntityDamageSource, world } from "@minecraft/server";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register("totem_overhaul:evoker_totem", {
  color: { red: 0.76, green: 0.63, blue: 0.1 },
  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    const origin = player.location;
    const radius = 3;
    const numPoints = 16;

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const x = origin.x + radius * Math.cos(angle);
      const z = origin.z + radius * Math.sin(angle);
      const y = player.dimension.getTopmostBlock({ x: x, z: z }, origin.y + 5).location.y + 1;

      //player.dimension.spawnEntity("minecraft:evocation_fang", { x, y, z });
      player.runCommand(`summon minecraft:evocation_fang ${x} ${y} ${z}`);
    }

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });
    player.addEffect("fire_resistance", 900, { amplifier: 0 });
  },
});
