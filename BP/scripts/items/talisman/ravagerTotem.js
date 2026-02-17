import { TotemEffectRegistry } from "../../TotemEffects.js";
import { TotemRegistry } from "../../totemRegistry.js";
import { Player, EntityDamageSource, Entity, world } from "@minecraft/server";

import { Vec3 } from "../../utils/vec3.js";
const totemId = "totem_overhaul:ravager_totem";

/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register(totemId, {
  color: { red: 0.5, green: 0.6, blue: 1 },
  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });
    player.addEffect("fire_resistance", 900, { amplifier: 0 });
  },
});

/**
 * @typedef {Object} TotemEffectContext
 * @property {Player} player
 * @property {Entity} victim
 * @property {number} damage
 */

TotemEffectRegistry.register(totemId, {
  effects: {
    offhand: [{ id: "strength", amplifier: 1 }],
    mainhand: [{ id: "strength", amplifier: 0 }],
  },
  /**
   * @param {TotemEffectContext} ctx
   */
  onAttack(ctx) {
    const { player, victim, damage } = ctx;
    const direction = player.getViewDirection();
    const strength = 0.5;
    const impulse = Vec3.scale(Vec3.normalize(direction), strength);
    victim.applyImpulse({ x: impulse.x, y: 0.1, z: impulse.z });
  },
});
