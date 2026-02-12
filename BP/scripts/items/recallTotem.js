/**
 * @typedef {Object} TotemContext
 * @property {Player} player
 * @property {EntityDamageSource} damageSource
 * @property {number} damage
 * @property {string} slot
 */

TotemRegistry.register("eu:recall_totem", {

  /**
   * @param {TotemContext} ctx
   */
  onActivate(ctx) {
    const { player, damageSource, damage, slot } = ctx;

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });
    player.addEffect("fire_resistance", 800, { amplifier: 0 });

    world.sendMessage("Totem activated! Damage source: " + damageSource.cause + ", damage: " + damage + ", slot: " + slot);
  
  },
});