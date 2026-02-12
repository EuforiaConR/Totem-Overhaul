import {
  world,
  system,
  EntityDamageCause,
  EntityComponentTypes,
  MolangVariableMap,
} from "@minecraft/server";
import { TotemRegistry } from "./totemRegistry.js";
import "./items/index.js";

function consumeItem(player, slot, amount = 1) {
  const equippableComp = player.getComponent("equippable");
  const item = equippableComp.getEquipment(slot);
  if (!item) return false;

  const itemAmount = item.amount - 1;
  if (itemAmount <= 0) equippableComp.setEquipment(slot, undefined);
  else {
    item.amount -= amount;
    equippableComp.setEquipment(slot, item);
  }
  return true;
}

const DEFAULT_IGNORED_CAUSES = ["void", "selfDestruct"];
const DEFAULT_SOUND_ID = "random.totem";
const DEFAULT_PARTICLE_ID = "geo:totem_pop";

world.beforeEvents.entityHurt.subscribe((ev) => {
  const { hurtEntity, damageSource, damage } = ev;

  if (hurtEntity.typeId !== "minecraft:player") return;

  const health = hurtEntity.getComponent("health");

  world.sendMessage("hola vida: " + health.currentValue);
  if (health.currentValue > 0) return;

  const equippableComp = hurtEntity.getComponent("equippable");
  const off = equippableComp.getEquipment("Offhand");
  const main = equippableComp.getEquipment("Mainhand");

  let slot = null;
  let stack = null;

  if (off && TotemRegistry.has(off.typeId)) {
    slot = "Offhand";
    stack = off;
  } else if (main && TotemRegistry.has(main.typeId)) {
    slot = "Mainhand";
    stack = main;
  } else return;

  const totem = TotemRegistry.get(stack.typeId);

  const ignoredCauses = totem.ignoredCauses ?? DEFAULT_IGNORED_CAUSES;
  if (ignoredCauses.includes(damageSource.cause)) {
    return;
  }

  ev.cancel = true;
  //ev.damage=0.1

  system.run(() => {
    consumeItem(hurtEntity, slot);

    //dummy damage para no perder los efectos vanilla de daño
    const attacker = damageSource.damagingEntity;
    if (attacker?.isValid) {
      hurtEntity.applyDamage(0.1, {
        cause: EntityDamageCause.entityAttack,
        damagingEntity: attacker,
      });
    }

    health.setCurrentValue(totem.reviveHealth ?? 4);
    const currentEffects = hurtEntity.getEffects();
    currentEffects.forEach((effect) => {
      hurtEntity.removeEffect(effect.typeId);
    });

    const ctx = {
      player: hurtEntity,
      damageSource,
      damage,
      slot,
    };
    if (totem.onActivate) {
      totem.onActivate(ctx);
    }
    system.run(() => {
      let ParticleVariableMap = new MolangVariableMap();
      ParticleVariableMap.setFloat("variable.red", totem.color?.red ?? 1);
      ParticleVariableMap.setFloat("variable.green", totem.color?.green ?? 1);
      ParticleVariableMap.setFloat("variable.blue", totem.color?.blue ?? 0);
      hurtEntity.playSound(totem.soundId ?? DEFAULT_SOUND_ID);
      hurtEntity.spawnParticle(
        totem.particleId ?? DEFAULT_PARTICLE_ID,
        hurtEntity.getHeadLocation(),
        totem.particleId ? undefined : ParticleVariableMap,
      );
    });
  });

  const ctx = {
    player: hurtEntity,
    damageSource,
    damage,
    slot,
  };
  if (totem.onActivate) {
    totem.onActivate(ctx);
  }
  system.run(() => {
    hurtEntity.playSound(totem.soundId ?? DEFAULT_SOUND_ID);
    hurtEntity.spawnParticle(totem.particleId ?? DEFAULT_PARTICLE_ID, hurtEntity.getHeadLocation());
  });
});

system.runInterval(() => {
  const players = world.getPlayers();

  players.forEach((player) => {
    const health = player.getComponent("health");
    //EntityComponentTypes.Healable
    player.onScreenDisplay.setActionBar("vida: " + health.currentValue);
  });
});
