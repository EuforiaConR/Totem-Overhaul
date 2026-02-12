import { TotemRegistry } from "../totemRegistry.js";
import { Player, EntityDamageSource, world } from "@minecraft/server";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register("geo:recall_totem", {
    soundId: "null",
    color: { red: 0.6, green: 0.6, blue: 1 },
  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;



    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });
    player.addEffect("fire_resistance", 800, { amplifier: 0 });
    player.addEffect("slow_falling", 800, { amplifier: 0 });
    
    let playerSpawn = player.getSpawnPoint();
    let spawnLocation = { x: playerSpawn?.x ?? 0, y: playerSpawn?.y ?? 240, z: playerSpawn?.z ?? 0 };

    player.teleport(spawnLocation, {dimension: playerSpawn?.dimension ?? world.getDimension("minecraft:overworld") });
    player.playSound("random.orb", { volume: 100, pitch: 1 });
  },
});