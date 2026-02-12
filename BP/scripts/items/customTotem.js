import { TotemRegistry } from "../totemRegistry.js";
import { Player, EntityDamageSource } from "@minecraft/server";

TotemRegistry.register("eu:custom_totem", {
  /**
   * @param {{
   *   player: Player,
   *   damageSource:EntityDamageSource
   * }} ctx
   */
  onActivate(ctx) {
    const { player, damageSource } = ctx;

    player.addEffect("regeneration", 900, { amplifier: 1 });
    player.addEffect("absorption", 100, { amplifier: 1 });
    player.addEffect("fire_resistance", 800, { amplifier: 0 });
  },
});

