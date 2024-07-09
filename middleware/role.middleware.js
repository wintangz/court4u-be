"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accesscontrol_1 = require("accesscontrol");
let grantList = [
    { role: 'owner', resource: 'role', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'bill', action: 'read:any', attributes: '*' },
    { role: 'member', resource: 'bookSlot', action: 'read:own', attributes: '*' },
    {
        role: 'member',
        resource: 'bookSlot',
        action: 'create:own',
        attributes: '*',
    },
    {
        role: 'staff',
        resource: 'checkIn',
        action: 'create:own',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'checkIn',
        action: 'create:own',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'club',
        action: 'create:own',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'club',
        action: 'update:own',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'club',
        action: 'delete:own',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'clubImg',
        action: 'create:own',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'clubImg',
        action: 'update:own',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'clubImg',
        action: 'delete:own',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'buyClubSubscription',
        action: 'create:own',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'buyClubSubscription',
        action: 'read:own',
        attributes: '*',
    },
    {
        role: 'admin',
        resource: 'buyClubSubscription',
        action: 'read:any',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'court',
        action: 'read:own',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'court',
        action: 'create:own',
        attributes: '*',
    },
    {
        role: 'member',
        resource: 'buyMemberSubscription',
        action: 'create:own',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'buyMemberSubscription',
        action: 'read:own',
        attributes: '*',
    },
    {
        role: 'member',
        resource: 'review',
        action: 'create:own',
        attributes: '*',
    },
    {
        role: 'member',
        resource: 'review',
        action: 'delete:own',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'slot',
        action: 'create:any',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'staffProfile',
        action: 'create:any',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'staffProfile',
        action: 'read:any',
        attributes: '*',
    },
    {
        role: 'member',
        resource: 'staffProfile',
        action: 'read:any',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'subscriptionOption',
        action: 'create:own',
        attributes: '*',
    },
    {
        role: 'admin',
        resource: 'subscriptionForClub',
        action: 'create:any',
        attributes: '*',
    },
    {
        role: 'admin',
        resource: 'subscriptionForClub',
        action: 'read:any',
        attributes: '*',
    },
    {
        role: 'owner',
        resource: 'subscriptionForClub',
        action: 'read:any',
        attributes: '*',
    },
    {
        role: 'admin',
        resource: 'user',
        action: 'read:any',
        attributes: '*',
    },
];
const ac = new accesscontrol_1.AccessControl(grantList);
exports.default = ac;
