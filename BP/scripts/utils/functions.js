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