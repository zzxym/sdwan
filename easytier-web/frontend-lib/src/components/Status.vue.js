/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { useTimeAgo } from '@vueuse/core';
import { IPv4 } from 'ip-num/IPNumber';
import { useI18n } from 'vue-i18n';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { ipv4InetToString, ipv4ToString, ipv6ToString } from '../modules/utils';
import { DataTable, Column, Tag, Chip, Button, Dialog, ScrollPanel, Timeline, Divider, Card, } from 'primevue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps();
const { t } = useI18n();
const peerRouteInfos = computed(() => {
    if (props.curNetworkInst) {
        const my_node_info = props.curNetworkInst.detail?.my_node_info;
        return [{
                route: {
                    ipv4_addr: my_node_info?.virtual_ipv4,
                    hostname: my_node_info?.hostname,
                    version: my_node_info?.version,
                },
            }, ...(props.curNetworkInst.detail?.peer_route_pairs || [])];
    }
    return [];
});
function routeCost(info) {
    if (info.route) {
        const cost = info.route.cost;
        return cost ? cost === 1 ? 'p2p' : `relay(${cost})` : t('status.local');
    }
    return '?';
}
function resolveObjPath(path, obj = globalThis, separator = '.') {
    const properties = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce((prev, curr) => prev?.[curr], obj);
}
function statsCommon(info, field) {
    if (!info.peer)
        return undefined;
    const conns = info.peer.conns;
    return conns.reduce((acc, conn) => {
        return acc + resolveObjPath(field, conn);
    }, 0);
}
function humanFileSize(bytes, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh)
        return `${bytes} B`;
    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
    return `${bytes.toFixed(dp)} ${units[u]}`;
}
function latencyMs(info) {
    let lat_us_sum = statsCommon(info, 'stats.latency_us');
    if (lat_us_sum === undefined)
        return '';
    lat_us_sum = lat_us_sum / 1000 / info.peer.conns.length;
    return `${lat_us_sum % 1 > 0 ? Math.round(lat_us_sum) + 1 : Math.round(lat_us_sum)}ms`;
}
function txBytes(info) {
    const tx = statsCommon(info, 'stats.tx_bytes');
    return tx ? humanFileSize(tx) : '';
}
function rxBytes(info) {
    const rx = statsCommon(info, 'stats.rx_bytes');
    return rx ? humanFileSize(rx) : '';
}
function lossRate(info) {
    const lossRate = statsCommon(info, 'loss_rate');
    return lossRate !== undefined ? `${Math.round(lossRate * 100)}%` : '';
}
function version(info) {
    return info.route.version === '' ? 'unknown' : info.route.version;
}
function ipFormat(info) {
    const ip = info.route.ipv4_addr;
    if (typeof ip === 'string')
        return ip;
    return ip ? `${IPv4.fromNumber(ip.address.addr)}/${ip.network_length}` : '';
}
function tunnelProto(info) {
    return [...new Set(info.peer?.conns.map(c => c.tunnel?.tunnel_type))].join(',');
}
const myNodeInfo = computed(() => {
    if (!props.curNetworkInst)
        return {};
    return props.curNetworkInst.detail?.my_node_info;
});
const myNodeInfoChips = computed(() => {
    if (!props.curNetworkInst)
        return [];
    const chips = [];
    const my_node_info = props.curNetworkInst.detail?.my_node_info;
    if (!my_node_info)
        return chips;
    // TUN Device Name
    const dev_name = props.curNetworkInst.detail?.dev_name;
    if (dev_name) {
        chips.push({
            label: `TUN Device Name: ${dev_name}`,
            icon: '',
        });
    }
    // virtual ipv4
    chips.push({
        label: `Virtual IPv4: ${ipv4InetToString(my_node_info.virtual_ipv4)}`,
        icon: '',
    });
    // local ipv4s
    const local_ipv4s = my_node_info.ips?.interface_ipv4s;
    for (const [idx, ip] of local_ipv4s?.entries()) {
        chips.push({
            label: `Local IPv4 ${idx}: ${ipv4ToString(ip)}`,
            icon: '',
        });
    }
    // local ipv6s
    const local_ipv6s = my_node_info.ips?.interface_ipv6s;
    for (const [idx, ip] of local_ipv6s?.entries()) {
        chips.push({
            label: `Local IPv6 ${idx}: ${ipv6ToString(ip)}`,
            icon: '',
        });
    }
    // public ip
    const public_ip = my_node_info.ips?.public_ipv4;
    if (public_ip) {
        chips.push({
            label: `Public IP: ${IPv4.fromNumber(public_ip.addr)}`,
            icon: '',
        });
    }
    const public_ipv6 = my_node_info.ips?.public_ipv6;
    if (public_ipv6) {
        chips.push({
            label: `Public IPv6: ${ipv6ToString(public_ipv6)}`,
            icon: '',
        });
    }
    // listeners:
    const listeners = my_node_info.listeners;
    for (const [idx, listener] of listeners?.entries()) {
        chips.push({
            label: `Listener ${idx}: ${listener.url}`,
            icon: '',
        });
    }
    // udp nat type
    let NatType;
    (function (NatType) {
        // has NAT; but own a single public IP, port is not changed
        NatType[NatType["Unknown"] = 0] = "Unknown";
        NatType[NatType["OpenInternet"] = 1] = "OpenInternet";
        NatType[NatType["NoPAT"] = 2] = "NoPAT";
        NatType[NatType["FullCone"] = 3] = "FullCone";
        NatType[NatType["Restricted"] = 4] = "Restricted";
        NatType[NatType["PortRestricted"] = 5] = "PortRestricted";
        NatType[NatType["Symmetric"] = 6] = "Symmetric";
        NatType[NatType["SymUdpFirewall"] = 7] = "SymUdpFirewall";
        NatType[NatType["SymmetricEasyInc"] = 8] = "SymmetricEasyInc";
        NatType[NatType["SymmetricEasyDec"] = 9] = "SymmetricEasyDec";
    })(NatType || (NatType = {}));
    ;
    const udpNatType = my_node_info.stun_info?.udp_nat_type;
    if (udpNatType !== undefined) {
        const udpNatTypeStrMap = {
            [NatType.Unknown]: 'Unknown',
            [NatType.OpenInternet]: 'Open Internet',
            [NatType.NoPAT]: 'No PAT',
            [NatType.FullCone]: 'Full Cone',
            [NatType.Restricted]: 'Restricted',
            [NatType.PortRestricted]: 'Port Restricted',
            [NatType.Symmetric]: 'Symmetric',
            [NatType.SymUdpFirewall]: 'Symmetric UDP Firewall',
            [NatType.SymmetricEasyInc]: 'Symmetric Easy Inc',
            [NatType.SymmetricEasyDec]: 'Symmetric Easy Dec',
        };
        chips.push({
            label: `UDP NAT Type: ${udpNatTypeStrMap[udpNatType]}`,
            icon: '',
        });
    }
    return chips;
});
function globalSumCommon(field) {
    let sum = 0;
    if (!peerRouteInfos.value)
        return sum;
    for (const info of peerRouteInfos.value) {
        const tx = statsCommon(info, field);
        if (tx)
            sum += tx;
    }
    return sum;
}
function txGlobalSum() {
    return globalSumCommon('stats.tx_bytes');
}
function rxGlobalSum() {
    return globalSumCommon('stats.rx_bytes');
}
const peerCount = computed(() => {
    if (!peerRouteInfos.value)
        return 0;
    return peerRouteInfos.value.length;
});
// calculate tx/rx rate every 2 seconds
let rateIntervalId = 0;
const rateInterval = 2000;
let prevTxSum = 0;
let prevRxSum = 0;
const txRate = ref('0');
const rxRate = ref('0');
onMounted(() => {
    rateIntervalId = window.setInterval(() => {
        const curTxSum = txGlobalSum();
        txRate.value = humanFileSize((curTxSum - prevTxSum) / (rateInterval / 1000));
        prevTxSum = curTxSum;
        const curRxSum = rxGlobalSum();
        rxRate.value = humanFileSize((curRxSum - prevRxSum) / (rateInterval / 1000));
        prevRxSum = curRxSum;
    }, rateInterval);
});
onUnmounted(() => {
    clearInterval(rateIntervalId);
});
const dialogVisible = ref(false);
const dialogContent = ref('');
const dialogHeader = ref('event_log');
function showVpnPortalConfig() {
    const my_node_info = myNodeInfo.value;
    if (!my_node_info)
        return;
    const url = 'https://www.wireguardconfig.com/qrcode';
    dialogContent.value = `${my_node_info.vpn_portal_cfg}\n\n # can generate QR code: ${url}`;
    dialogHeader.value = 'vpn_portal_config';
    dialogVisible.value = true;
}
function showEventLogs() {
    const detail = props.curNetworkInst?.detail;
    if (!detail)
        return;
    dialogContent.value = detail.events.map((event) => JSON.parse(event));
    dialogHeader.value = 'event_log';
    dialogVisible.value = true;
}
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("frontend-lib") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Dialog;
    /** @type { [typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ visible: ((__VLS_ctx.dialogVisible)), modal: (true), header: ((__VLS_ctx.t(__VLS_ctx.dialogHeader))), ...{ class: ("w-full h-auto max-h-full") }, baseZIndex: ((2000)), }));
    const __VLS_2 = __VLS_1({ visible: ((__VLS_ctx.dialogVisible)), modal: (true), header: ((__VLS_ctx.t(__VLS_ctx.dialogHeader))), ...{ class: ("w-full h-auto max-h-full") }, baseZIndex: ((2000)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    if (__VLS_ctx.dialogHeader === 'vpn_portal_config') {
        const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.ScrollPanel;
        /** @type { [typeof __VLS_components.ScrollPanel, typeof __VLS_components.ScrollPanel, ] } */
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
        const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
        __VLS_elementAsFunction(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
        (__VLS_ctx.dialogContent);
        __VLS_nonNullable(__VLS_11.slots).default;
        var __VLS_11;
    }
    else {
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.Timeline;
        /** @type { [typeof __VLS_components.Timeline, typeof __VLS_components.Timeline, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ value: ((__VLS_ctx.dialogContent)), }));
        const __VLS_14 = __VLS_13({ value: ((__VLS_ctx.dialogContent)), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            const { opposite: __VLS_thisSlot } = __VLS_nonNullable(__VLS_17.slots);
            const [slotProps] = __VLS_getSlotParams(__VLS_thisSlot);
            __VLS_elementAsFunction(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({ ...{ class: ("text-surface-500 dark:text-surface-400") }, });
            (__VLS_ctx.useTimeAgo(Date.parse(slotProps.item.time)));
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            const { content: __VLS_thisSlot } = __VLS_nonNullable(__VLS_17.slots);
            const [slotProps] = __VLS_getSlotParams(__VLS_thisSlot);
            const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.HumanEvent;
            /** @type { [typeof __VLS_components.HumanEvent, ] } */
            // @ts-ignore
            const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ event: ((slotProps.item.event)), }));
            const __VLS_20 = __VLS_19({ event: ((slotProps.item.event)), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        }
        var __VLS_17;
    }
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    if (__VLS_ctx.curNetworkInst?.error_msg) {
        const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.Card;
        /** @type { [typeof __VLS_components.Card, typeof __VLS_components.Card, ] } */
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
        const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            const { title: __VLS_thisSlot } = __VLS_nonNullable(__VLS_29.slots);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            const { content: __VLS_thisSlot } = __VLS_nonNullable(__VLS_29.slots);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-y-5") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-red-500") }, });
            (__VLS_ctx.curNetworkInst.error_msg);
        }
        var __VLS_29;
    }
    else {
        const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.Card;
        /** @type { [typeof __VLS_components.Card, typeof __VLS_components.Card, ] } */
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
        const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            const { title: __VLS_thisSlot } = __VLS_nonNullable(__VLS_35.slots);
            (__VLS_ctx.t('my_node_info'));
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            const { content: __VLS_thisSlot } = __VLS_nonNullable(__VLS_35.slots);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex w-full flex-col gap-y-5") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("m-0 flex flex-row justify-center gap-x-5") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("rounded-full w-32 h-32 flex flex-col items-center pt-6") }, ...{ style: ({}) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("font-bold") }, });
            (__VLS_ctx.t('peer_count'));
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-5xl mt-1") }, });
            (__VLS_ctx.peerCount);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("rounded-full w-32 h-32 flex flex-col items-center pt-6") }, ...{ style: ({}) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("font-bold") }, });
            (__VLS_ctx.t('upload'));
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-xl mt-2") }, });
            (__VLS_ctx.txRate);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("rounded-full w-32 h-32 flex flex-col items-center pt-6") }, ...{ style: ({}) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("font-bold") }, });
            (__VLS_ctx.t('download'));
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-xl mt-2") }, });
            (__VLS_ctx.rxRate);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row items-center flex-wrap w-full max-h-40 overflow-scroll") }, });
            for (const [chip, i] of __VLS_getVForSourceType((__VLS_ctx.myNodeInfoChips))) {
                const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.Chip;
                /** @type { [typeof __VLS_components.Chip, ] } */
                // @ts-ignore
                const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ key: ((i)), label: ((chip.label)), icon: ((chip.icon)), ...{ class: ("mr-2 mt-2 text-sm") }, }));
                const __VLS_38 = __VLS_37({ key: ((i)), label: ((chip.label)), icon: ((chip.icon)), ...{ class: ("mr-2 mt-2 text-sm") }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
            }
            if (__VLS_ctx.myNodeInfo) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("m-0 flex flex-row justify-center gap-x-5 text-sm") }, });
                const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.Button;
                /** @type { [typeof __VLS_components.Button, ] } */
                // @ts-ignore
                const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ ...{ 'onClick': {} }, severity: ("info"), label: ((__VLS_ctx.t('show_vpn_portal_config'))), }));
                const __VLS_44 = __VLS_43({ ...{ 'onClick': {} }, severity: ("info"), label: ((__VLS_ctx.t('show_vpn_portal_config'))), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
                let __VLS_48;
                const __VLS_49 = {
                    onClick: (__VLS_ctx.showVpnPortalConfig)
                };
                let __VLS_45;
                let __VLS_46;
                var __VLS_47;
                const __VLS_50 = __VLS_resolvedLocalAndGlobalComponents.Button;
                /** @type { [typeof __VLS_components.Button, ] } */
                // @ts-ignore
                const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({ ...{ 'onClick': {} }, severity: ("info"), label: ((__VLS_ctx.t('show_event_log'))), }));
                const __VLS_52 = __VLS_51({ ...{ 'onClick': {} }, severity: ("info"), label: ((__VLS_ctx.t('show_event_log'))), }, ...__VLS_functionalComponentArgsRest(__VLS_51));
                let __VLS_56;
                const __VLS_57 = {
                    onClick: (__VLS_ctx.showEventLogs)
                };
                let __VLS_53;
                let __VLS_54;
                var __VLS_55;
            }
        }
        var __VLS_35;
        const __VLS_58 = __VLS_resolvedLocalAndGlobalComponents.Divider;
        /** @type { [typeof __VLS_components.Divider, ] } */
        // @ts-ignore
        const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({}));
        const __VLS_60 = __VLS_59({}, ...__VLS_functionalComponentArgsRest(__VLS_59));
        const __VLS_64 = __VLS_resolvedLocalAndGlobalComponents.Card;
        /** @type { [typeof __VLS_components.Card, typeof __VLS_components.Card, ] } */
        // @ts-ignore
        const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({}));
        const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            const { title: __VLS_thisSlot } = __VLS_nonNullable(__VLS_69.slots);
            (__VLS_ctx.t('peer_info'));
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            const { content: __VLS_thisSlot } = __VLS_nonNullable(__VLS_69.slots);
            const __VLS_70 = __VLS_resolvedLocalAndGlobalComponents.DataTable;
            /** @type { [typeof __VLS_components.DataTable, typeof __VLS_components.DataTable, ] } */
            // @ts-ignore
            const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({ value: ((__VLS_ctx.peerRouteInfos)), columnResizeMode: ("fit"), tableClass: ("w-full"), }));
            const __VLS_72 = __VLS_71({ value: ((__VLS_ctx.peerRouteInfos)), columnResizeMode: ("fit"), tableClass: ("w-full"), }, ...__VLS_functionalComponentArgsRest(__VLS_71));
            const __VLS_76 = __VLS_resolvedLocalAndGlobalComponents.Column;
            /** @type { [typeof __VLS_components.Column, ] } */
            // @ts-ignore
            const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({ field: ((__VLS_ctx.ipFormat)), header: ((__VLS_ctx.t('virtual_ipv4'))), }));
            const __VLS_78 = __VLS_77({ field: ((__VLS_ctx.ipFormat)), header: ((__VLS_ctx.t('virtual_ipv4'))), }, ...__VLS_functionalComponentArgsRest(__VLS_77));
            const __VLS_82 = __VLS_resolvedLocalAndGlobalComponents.Column;
            /** @type { [typeof __VLS_components.Column, typeof __VLS_components.Column, ] } */
            // @ts-ignore
            const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({ header: ((__VLS_ctx.t('hostname'))), }));
            const __VLS_84 = __VLS_83({ header: ((__VLS_ctx.t('hostname'))), }, ...__VLS_functionalComponentArgsRest(__VLS_83));
            __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
            {
                const { body: __VLS_thisSlot } = __VLS_nonNullable(__VLS_87.slots);
                const [slotProps] = __VLS_getSlotParams(__VLS_thisSlot);
                if (!slotProps.data.route.cost || !slotProps.data.route.feature_flag.is_public_server) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                    __VLS_asFunctionalDirective(__VLS_directives.vTooltip)(null, { ...__VLS_directiveBindingRestFields, modifiers: {}, value: (slotProps.data.route.hostname) }, null, null);
                    (slotProps.data.route.hostname);
                }
                else {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("space-x-1") }, });
                    __VLS_asFunctionalDirective(__VLS_directives.vTooltip)(null, { ...__VLS_directiveBindingRestFields, modifiers: {}, value: (slotProps.data.route.hostname) }, null, null);
                    if (slotProps.data.route.feature_flag.is_public_server) {
                        const __VLS_88 = __VLS_resolvedLocalAndGlobalComponents.Tag;
                        /** @type { [typeof __VLS_components.Tag, typeof __VLS_components.Tag, ] } */
                        // @ts-ignore
                        const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({ severity: ("info"), value: ("Info"), }));
                        const __VLS_90 = __VLS_89({ severity: ("info"), value: ("Info"), }, ...__VLS_functionalComponentArgsRest(__VLS_89));
                        (__VLS_ctx.t('status.server'));
                        __VLS_nonNullable(__VLS_93.slots).default;
                        var __VLS_93;
                    }
                    if (slotProps.data.route.feature_flag.avoid_relay_data) {
                        const __VLS_94 = __VLS_resolvedLocalAndGlobalComponents.Tag;
                        /** @type { [typeof __VLS_components.Tag, typeof __VLS_components.Tag, ] } */
                        // @ts-ignore
                        const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({ severity: ("warn"), value: ("Warn"), }));
                        const __VLS_96 = __VLS_95({ severity: ("warn"), value: ("Warn"), }, ...__VLS_functionalComponentArgsRest(__VLS_95));
                        (__VLS_ctx.t('status.relay'));
                        __VLS_nonNullable(__VLS_99.slots).default;
                        var __VLS_99;
                    }
                }
            }
            var __VLS_87;
            const __VLS_100 = __VLS_resolvedLocalAndGlobalComponents.Column;
            /** @type { [typeof __VLS_components.Column, ] } */
            // @ts-ignore
            const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({ field: ((__VLS_ctx.routeCost)), header: ((__VLS_ctx.t('route_cost'))), }));
            const __VLS_102 = __VLS_101({ field: ((__VLS_ctx.routeCost)), header: ((__VLS_ctx.t('route_cost'))), }, ...__VLS_functionalComponentArgsRest(__VLS_101));
            const __VLS_106 = __VLS_resolvedLocalAndGlobalComponents.Column;
            /** @type { [typeof __VLS_components.Column, ] } */
            // @ts-ignore
            const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({ field: ((__VLS_ctx.tunnelProto)), header: ((__VLS_ctx.t('tunnel_proto'))), }));
            const __VLS_108 = __VLS_107({ field: ((__VLS_ctx.tunnelProto)), header: ((__VLS_ctx.t('tunnel_proto'))), }, ...__VLS_functionalComponentArgsRest(__VLS_107));
            const __VLS_112 = __VLS_resolvedLocalAndGlobalComponents.Column;
            /** @type { [typeof __VLS_components.Column, ] } */
            // @ts-ignore
            const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({ field: ((__VLS_ctx.latencyMs)), header: ((__VLS_ctx.t('latency'))), }));
            const __VLS_114 = __VLS_113({ field: ((__VLS_ctx.latencyMs)), header: ((__VLS_ctx.t('latency'))), }, ...__VLS_functionalComponentArgsRest(__VLS_113));
            const __VLS_118 = __VLS_resolvedLocalAndGlobalComponents.Column;
            /** @type { [typeof __VLS_components.Column, ] } */
            // @ts-ignore
            const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({ field: ((__VLS_ctx.txBytes)), header: ((__VLS_ctx.t('upload_bytes'))), }));
            const __VLS_120 = __VLS_119({ field: ((__VLS_ctx.txBytes)), header: ((__VLS_ctx.t('upload_bytes'))), }, ...__VLS_functionalComponentArgsRest(__VLS_119));
            const __VLS_124 = __VLS_resolvedLocalAndGlobalComponents.Column;
            /** @type { [typeof __VLS_components.Column, ] } */
            // @ts-ignore
            const __VLS_125 = __VLS_asFunctionalComponent(__VLS_124, new __VLS_124({ field: ((__VLS_ctx.rxBytes)), header: ((__VLS_ctx.t('download_bytes'))), }));
            const __VLS_126 = __VLS_125({ field: ((__VLS_ctx.rxBytes)), header: ((__VLS_ctx.t('download_bytes'))), }, ...__VLS_functionalComponentArgsRest(__VLS_125));
            const __VLS_130 = __VLS_resolvedLocalAndGlobalComponents.Column;
            /** @type { [typeof __VLS_components.Column, ] } */
            // @ts-ignore
            const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({ field: ((__VLS_ctx.lossRate)), header: ((__VLS_ctx.t('loss_rate'))), }));
            const __VLS_132 = __VLS_131({ field: ((__VLS_ctx.lossRate)), header: ((__VLS_ctx.t('loss_rate'))), }, ...__VLS_functionalComponentArgsRest(__VLS_131));
            const __VLS_136 = __VLS_resolvedLocalAndGlobalComponents.Column;
            /** @type { [typeof __VLS_components.Column, typeof __VLS_components.Column, ] } */
            // @ts-ignore
            const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({ header: ((__VLS_ctx.t('status.version'))), }));
            const __VLS_138 = __VLS_137({ header: ((__VLS_ctx.t('status.version'))), }, ...__VLS_functionalComponentArgsRest(__VLS_137));
            __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
            {
                const { body: __VLS_thisSlot } = __VLS_nonNullable(__VLS_141.slots);
                const [slotProps] = __VLS_getSlotParams(__VLS_thisSlot);
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                (__VLS_ctx.version(slotProps.data));
            }
            var __VLS_141;
            __VLS_nonNullable(__VLS_75.slots).default;
            var __VLS_75;
        }
        var __VLS_69;
    }
    __VLS_styleScopedClasses['frontend-lib'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-auto'];
    __VLS_styleScopedClasses['max-h-full'];
    __VLS_styleScopedClasses['text-surface-500'];
    __VLS_styleScopedClasses['dark:text-surface-400'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-y-5'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-y-5'];
    __VLS_styleScopedClasses['m-0'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['gap-x-5'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['w-32'];
    __VLS_styleScopedClasses['h-32'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['pt-6'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-5xl'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['w-32'];
    __VLS_styleScopedClasses['h-32'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['pt-6'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['w-32'];
    __VLS_styleScopedClasses['h-32'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['pt-6'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['max-h-40'];
    __VLS_styleScopedClasses['overflow-scroll'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['m-0'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['gap-x-5'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['space-x-1'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            useTimeAgo: useTimeAgo,
            DataTable: DataTable,
            Column: Column,
            Tag: Tag,
            Chip: Chip,
            Button: Button,
            Dialog: Dialog,
            ScrollPanel: ScrollPanel,
            Timeline: Timeline,
            Divider: Divider,
            Card: Card,
            t: t,
            peerRouteInfos: peerRouteInfos,
            routeCost: routeCost,
            latencyMs: latencyMs,
            txBytes: txBytes,
            rxBytes: rxBytes,
            lossRate: lossRate,
            version: version,
            ipFormat: ipFormat,
            tunnelProto: tunnelProto,
            myNodeInfo: myNodeInfo,
            myNodeInfoChips: myNodeInfoChips,
            peerCount: peerCount,
            txRate: txRate,
            rxRate: rxRate,
            dialogVisible: dialogVisible,
            dialogContent: dialogContent,
            dialogHeader: dialogHeader,
            showVpnPortalConfig: showVpnPortalConfig,
            showEventLogs: showEventLogs,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
