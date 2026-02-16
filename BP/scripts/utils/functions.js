import { Entity, EntityComponentTypes, EntityEquippableComponent, EquipmentSlot, ItemComponentTypes, Player, world } from "@minecraft/server";

/**
 * 
 * @param {Player} player 
 * @param {String} itemId 
 */

export function hasItemInMainhand(player, itemId) {
    let equippableComp = player.getComponent(EntityComponentTypes.Equippable)
    let main = equippableComp.getEquipment(EquipmentSlot.Mainhand);
    return main && main.typeId === itemId;
}

/**
 * 
 * @param {Player} player 
 * @param {String} itemId 
 */

export function hasItemInOffhand(player, itemId) {
    let equippableComp = player.getComponent(EntityComponentTypes.Equippable)
    let off = equippableComp.getEquipment(EquipmentSlot.Offhand);
    return off && off.typeId === itemId;
}

/**
 * 
 * @param {Player} player 
 * @param {String} itemId 
 */

export function hasItem(player, itemId) {
    let inv = player.getComponent(EntityComponentTypes.Inventory).container
    for (let i = 0; i < inv.size; i++) {
        let item = inv.getItem(i);
        if (item && item.typeId === itemId) return true;
    }
}

export function getOffhandItem(player) {
    let equippableComp = player.getComponent(EntityComponentTypes.Equippable)
    return equippableComp.getEquipment(EquipmentSlot.Offhand);
}

export function getMainhandItem(player) {
    let equippableComp = player.getComponent(EntityComponentTypes.Equippable)
    return equippableComp.getEquipment(EquipmentSlot.Mainhand);
}

/**
 * 
 * @param {Entity} entity 
 * @param {import("@minecraft/server").Vector3} location 
 * @param {number} strength 
 */

export function ImpulseToLocation(entity, location, strength) {
    let direction = {
        x: location.x - entity.location.x,
        y: location.y - entity.location.y,  
        z: location.z - entity.location.z
    }
    let length = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2);
    if (length === 0) return;
    direction.x /= length;
    direction.y /= length;
    direction.z /= length;
    entity.applyImpulse({x: direction.x * strength, y: direction.y * strength, z: direction.z * strength});
}