/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import { SelectButton, Checkbox, InputText, InputNumber, AutoComplete, Panel, Divider, ToggleButton, Button, Password } from 'primevue';
import { addRow, DEFAULT_NETWORK_CONFIG, NetworkingMethod, removeRow } from '../types/network';
import { defineProps, defineEmits, ref, } from 'vue';
import { useI18n } from 'vue-i18n';
const { defineSlots, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps();
const __VLS_emit = defineEmits(['runNetwork']);
const curNetwork = defineModel('curNetwork', {
    type: Object,
    default: DEFAULT_NETWORK_CONFIG,
});
const { t } = useI18n();
const networking_methods = ref([
    { value: NetworkingMethod.PublicServer, label: () => t('public_server') },
    { value: NetworkingMethod.Manual, label: () => t('manual') },
    { value: NetworkingMethod.Standalone, label: () => t('standalone') },
]);
const protos = { tcp: 10010, udp: 10010, wg: 10011, ws: 10011, wss: 10012 };
function searchUrlSuggestions(e) {
    const query = e.query;
    const ret = [];
    // if query match "^\w+:.*", then no proto prefix
    if (query.match(/^\w+:.*/)) {
        // if query is a valid url, then add to suggestions
        try {
            // eslint-disable-next-line no-new
            new URL(query);
            ret.push(query);
        }
        catch { }
    }
    else {
        for (const proto in protos) {
            let item = `${proto}://${query}`;
            // if query match ":\d+$", then no port suffix
            if (!query.match(/:\d+$/)) {
                item += `:${protos[proto]}`;
            }
            ret.push(item);
        }
    }
    return ret;
}
const publicServerSuggestions = ref(['']);
function searchPresetPublicServers(e) {
    const presetPublicServers = [
        'tcp://sdwan.xiaolin.cc:10010',
    ];
    const query = e.query;
    // if query is sub string of presetPublicServers, add to suggestions
    let ret = presetPublicServers.filter(item => item.includes(query));
    // add additional suggestions
    if (query.length > 0) {
        ret = ret.concat(searchUrlSuggestions(e));
    }
    publicServerSuggestions.value = ret;
}
const peerSuggestions = ref(['']);
function searchPeerSuggestions(e) {
    peerSuggestions.value = searchUrlSuggestions(e);
}
const inetSuggestions = ref(['']);
function searchInetSuggestions(e) {
    if (e.query.search('/') >= 0) {
        inetSuggestions.value = [e.query];
    }
    else {
        const ret = [];
        for (let i = 0; i < 32; i++) {
            ret.push(`${e.query}/${i}`);
        }
        inetSuggestions.value = ret;
    }
}
const listenerSuggestions = ref(['']);
function searchListenerSuggestions(e) {
    const ret = [];
    for (const proto in protos) {
        let item = `${proto}://0.0.0.0:`;
        // if query is a number, use it as port
        if (e.query.match(/^\d+$/)) {
            item += e.query;
        }
        else {
            item += protos[proto];
        }
        if (item.includes(e.query)) {
            ret.push(item);
        }
    }
    if (ret.length === 0) {
        ret.push(e.query);
    }
    listenerSuggestions.value = ret;
}
const exitNodesSuggestions = ref(['']);
function searchExitNodesSuggestions(e) {
    const ret = [];
    ret.push(e.query);
    exitNodesSuggestions.value = ret;
}
const whitelistSuggestions = ref(['']);
function searchWhitelistSuggestions(e) {
    const ret = [];
    ret.push(e.query);
    whitelistSuggestions.value = ret;
}
const bool_flags = [
    { field: 'latency_first', help: 'latency_first_help' },
    { field: 'use_smoltcp', help: 'use_smoltcp_help' },
    { field: 'disable_ipv6', help: 'disable_ipv6_help' },
    { field: 'enable_kcp_proxy', help: 'enable_kcp_proxy_help' },
    { field: 'disable_kcp_input', help: 'disable_kcp_input_help' },
    { field: 'enable_quic_proxy', help: 'enable_quic_proxy_help' },
    { field: 'disable_quic_input', help: 'disable_quic_input_help' },
    { field: 'disable_p2p', help: 'disable_p2p_help' },
    { field: 'bind_device', help: 'bind_device_help' },
    { field: 'no_tun', help: 'no_tun_help' },
    { field: 'enable_exit_node', help: 'enable_exit_node_help' },
    { field: 'relay_all_peer_rpc', help: 'relay_all_peer_rpc_help' },
    { field: 'multi_thread', help: 'multi_thread_help' },
    { field: 'proxy_forward_by_system', help: 'proxy_forward_by_system_help' },
    { field: 'disable_encryption', help: 'disable_encryption_help' },
    { field: 'disable_udp_hole_punching', help: 'disable_udp_hole_punching_help' },
    { field: 'disable_sym_hole_punching', help: 'disable_sym_hole_punching_help' },
    { field: 'enable_magic_dns', help: 'enable_magic_dns_help' },
    { field: 'enable_private_mode', help: 'enable_private_mode_help' },
];
const portForwardProtocolOptions = ref(["tcp", "udp"]);
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({
    emits: {
        ...{},
        ...{},
    },
});
;
let __VLS_functionalComponentProps;
const __VLS_defaults = {
    curNetwork: DEFAULT_NETWORK_CONFIG,
};
const __VLS_modelEmit = defineEmits();
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
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("frontend-lib") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col h-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-11/12 self-center ") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Panel;
    /** @type { [typeof __VLS_components.Panel, typeof __VLS_components.Panel, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ header: ((__VLS_ctx.t('basic_settings'))), }));
    const __VLS_2 = __VLS_1({ header: ((__VLS_ctx.t('basic_settings'))), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-y-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 basis-5/12 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center") }, for: ("virtual_ip"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("mr-2") }, });
    (__VLS_ctx.t('virtual_ipv4'));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.Checkbox;
    /** @type { [typeof __VLS_components.Checkbox, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ modelValue: ((__VLS_ctx.curNetwork.dhcp)), inputId: ("virtual_ip_auto"), binary: ((true)), }));
    const __VLS_8 = __VLS_7({ modelValue: ((__VLS_ctx.curNetwork.dhcp)), inputId: ("virtual_ip_auto"), binary: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("virtual_ip_auto"), ...{ class: ("ml-2") }, });
    (__VLS_ctx.t('virtual_ipv4_dhcp'));
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.InputGroup;
    /** @type { [typeof __VLS_components.InputGroup, typeof __VLS_components.InputGroup, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.InputText;
    /** @type { [typeof __VLS_components.InputText, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ id: ("virtual_ip"), modelValue: ((__VLS_ctx.curNetwork.virtual_ipv4)), disabled: ((__VLS_ctx.curNetwork.dhcp)), "aria-describedby": ("virtual_ipv4-help"), }));
    const __VLS_20 = __VLS_19({ id: ("virtual_ip"), modelValue: ((__VLS_ctx.curNetwork.virtual_ipv4)), disabled: ((__VLS_ctx.curNetwork.dhcp)), "aria-describedby": ("virtual_ipv4-help"), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.InputGroupAddon;
    /** @type { [typeof __VLS_components.InputGroupAddon, typeof __VLS_components.InputGroupAddon, ] } */
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_nonNullable(__VLS_29.slots).default;
    var __VLS_29;
    const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.InputNumber;
    /** @type { [typeof __VLS_components.InputNumber, ] } */
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ modelValue: ((__VLS_ctx.curNetwork.network_length)), disabled: ((__VLS_ctx.curNetwork.dhcp)), inputId: ("horizontal-buttons"), showButtons: (true), step: ((1)), mode: ("decimal"), min: ((1)), max: ((32)), fluid: (true), ...{ class: ("max-w-20") }, }));
    const __VLS_32 = __VLS_31({ modelValue: ((__VLS_ctx.curNetwork.network_length)), disabled: ((__VLS_ctx.curNetwork.dhcp)), inputId: ("horizontal-buttons"), showButtons: (true), step: ((1)), mode: ("decimal"), min: ((1)), max: ((32)), fluid: (true), ...{ class: ("max-w-20") }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    __VLS_nonNullable(__VLS_17.slots).default;
    var __VLS_17;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 basis-5/12 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("network_name"), });
    (__VLS_ctx.t('network_name'));
    const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.InputText;
    /** @type { [typeof __VLS_components.InputText, ] } */
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ id: ("network_name"), modelValue: ((__VLS_ctx.curNetwork.network_name)), "aria-describedby": ("network_name-help"), }));
    const __VLS_38 = __VLS_37({ id: ("network_name"), modelValue: ((__VLS_ctx.curNetwork.network_name)), "aria-describedby": ("network_name-help"), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 basis-5/12 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("network_secret"), });
    (__VLS_ctx.t('network_secret'));
    const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.Password;
    /** @type { [typeof __VLS_components.Password, ] } */
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ id: ("network_secret"), modelValue: ((__VLS_ctx.curNetwork.network_secret)), "aria-describedby": ("network_secret-help"), toggleMask: (true), feedback: ((false)), }));
    const __VLS_44 = __VLS_43({ id: ("network_secret"), modelValue: ((__VLS_ctx.curNetwork.network_secret)), "aria-describedby": ("network_secret-help"), toggleMask: (true), feedback: ((false)), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 basis-5/12 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("nm"), });
    (__VLS_ctx.t('networking_method'));
    const __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.SelectButton;
    /** @type { [typeof __VLS_components.SelectButton, ] } */
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ modelValue: ((__VLS_ctx.curNetwork.networking_method)), options: ((__VLS_ctx.networking_methods)), optionLabel: (((v) => v.label())), optionValue: ("value"), }));
    const __VLS_50 = __VLS_49({ modelValue: ((__VLS_ctx.curNetwork.networking_method)), options: ((__VLS_ctx.networking_methods)), optionLabel: (((v) => v.label())), optionValue: ("value"), }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("items-center flex flex-row p-fluid gap-x-1") }, });
    if (__VLS_ctx.curNetwork.networking_method === __VLS_ctx.NetworkingMethod.Manual) {
        const __VLS_54 = __VLS_resolvedLocalAndGlobalComponents.AutoComplete;
        /** @type { [typeof __VLS_components.AutoComplete, ] } */
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ ...{ 'onComplete': {} }, id: ("chips"), modelValue: ((__VLS_ctx.curNetwork.peer_urls)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['tcp://8.8.8.8:10010']))), ...{ class: ("grow") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.peerSuggestions)), }));
        const __VLS_56 = __VLS_55({ ...{ 'onComplete': {} }, id: ("chips"), modelValue: ((__VLS_ctx.curNetwork.peer_urls)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['tcp://8.8.8.8:10010']))), ...{ class: ("grow") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.peerSuggestions)), }, ...__VLS_functionalComponentArgsRest(__VLS_55));
        let __VLS_60;
        const __VLS_61 = {
            onComplete: (__VLS_ctx.searchPeerSuggestions)
        };
        let __VLS_57;
        let __VLS_58;
        var __VLS_59;
    }
    if (__VLS_ctx.curNetwork.networking_method === __VLS_ctx.NetworkingMethod.PublicServer) {
        const __VLS_62 = __VLS_resolvedLocalAndGlobalComponents.AutoComplete;
        /** @type { [typeof __VLS_components.AutoComplete, ] } */
        // @ts-ignore
        const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({ ...{ 'onComplete': {} }, modelValue: ((__VLS_ctx.curNetwork.public_server_url)), suggestions: ((__VLS_ctx.publicServerSuggestions)), ...{ class: ("grow") }, dropdown: (true), completeOnFocus: ((false)), }));
        const __VLS_64 = __VLS_63({ ...{ 'onComplete': {} }, modelValue: ((__VLS_ctx.curNetwork.public_server_url)), suggestions: ((__VLS_ctx.publicServerSuggestions)), ...{ class: ("grow") }, dropdown: (true), completeOnFocus: ((false)), }, ...__VLS_functionalComponentArgsRest(__VLS_63));
        let __VLS_68;
        const __VLS_69 = {
            onComplete: (__VLS_ctx.searchPresetPublicServers)
        };
        let __VLS_65;
        let __VLS_66;
        var __VLS_67;
    }
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    const __VLS_70 = __VLS_resolvedLocalAndGlobalComponents.Divider;
    /** @type { [typeof __VLS_components.Divider, ] } */
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({}));
    const __VLS_72 = __VLS_71({}, ...__VLS_functionalComponentArgsRest(__VLS_71));
    const __VLS_76 = __VLS_resolvedLocalAndGlobalComponents.Panel;
    /** @type { [typeof __VLS_components.Panel, typeof __VLS_components.Panel, ] } */
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({ header: ((__VLS_ctx.t('advanced_settings'))), toggleable: (true), collapsed: (true), }));
    const __VLS_78 = __VLS_77({ header: ((__VLS_ctx.t('advanced_settings'))), toggleable: (true), collapsed: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-y-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 basis-5/12 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    (__VLS_ctx.t('flags_switch'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row flex-wrap") }, });
    for (const [flag] of __VLS_getVForSourceType((__VLS_ctx.bool_flags))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("basis-[20rem] flex items-center") }, });
        const __VLS_82 = __VLS_resolvedLocalAndGlobalComponents.Checkbox;
        /** @type { [typeof __VLS_components.Checkbox, ] } */
        // @ts-ignore
        const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({ modelValue: ((__VLS_ctx.curNetwork[flag.field])), inputId: ((flag.field)), binary: ((true)), }));
        const __VLS_84 = __VLS_83({ modelValue: ((__VLS_ctx.curNetwork[flag.field])), inputId: ((flag.field)), binary: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_83));
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ((flag.field)), ...{ class: ("ml-2") }, });
        (__VLS_ctx.t(flag.field));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("pi pi-question-circle ml-2 self-center") }, });
        __VLS_asFunctionalDirective(__VLS_directives.vTooltip)(null, { ...__VLS_directiveBindingRestFields, modifiers: {}, value: (__VLS_ctx.t(flag.help)) }, null, null);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 basis-5/12 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("hostname"), });
    (__VLS_ctx.t('hostname'));
    const __VLS_88 = __VLS_resolvedLocalAndGlobalComponents.InputText;
    /** @type { [typeof __VLS_components.InputText, ] } */
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({ id: ("hostname"), modelValue: ((__VLS_ctx.curNetwork.hostname)), "aria-describedby": ("hostname-help"), format: ((true)), placeholder: ((__VLS_ctx.t('hostname_placeholder', [props.hostname]))), }));
    const __VLS_90 = __VLS_89({ id: ("hostname"), modelValue: ((__VLS_ctx.curNetwork.hostname)), "aria-describedby": ("hostname-help"), format: ((true)), placeholder: ((__VLS_ctx.t('hostname_placeholder', [props.hostname]))), }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap w-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 grow p-fluid") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("username"), });
    (__VLS_ctx.t('proxy_cidrs'));
    const __VLS_94 = __VLS_resolvedLocalAndGlobalComponents.AutoComplete;
    /** @type { [typeof __VLS_components.AutoComplete, ] } */
    // @ts-ignore
    const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({ ...{ 'onComplete': {} }, id: ("subnet-proxy"), modelValue: ((__VLS_ctx.curNetwork.proxy_cidrs)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['10.0.0.0/24']))), ...{ class: ("w-full") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.inetSuggestions)), }));
    const __VLS_96 = __VLS_95({ ...{ 'onComplete': {} }, id: ("subnet-proxy"), modelValue: ((__VLS_ctx.curNetwork.proxy_cidrs)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['10.0.0.0/24']))), ...{ class: ("w-full") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.inetSuggestions)), }, ...__VLS_functionalComponentArgsRest(__VLS_95));
    let __VLS_100;
    const __VLS_101 = {
        onComplete: (__VLS_ctx.searchInetSuggestions)
    };
    let __VLS_97;
    let __VLS_98;
    var __VLS_99;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap ") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("username"), });
    const __VLS_102 = __VLS_resolvedLocalAndGlobalComponents.ToggleButton;
    /** @type { [typeof __VLS_components.ToggleButton, ] } */
    // @ts-ignore
    const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({ modelValue: ((__VLS_ctx.curNetwork.enable_vpn_portal)), onIcon: ("pi pi-check"), offIcon: ("pi pi-times"), onLabel: ((__VLS_ctx.t('off_text'))), offLabel: ((__VLS_ctx.t('on_text'))), ...{ class: ("w-48") }, }));
    const __VLS_104 = __VLS_103({ modelValue: ((__VLS_ctx.curNetwork.enable_vpn_portal)), onIcon: ("pi pi-check"), offIcon: ("pi pi-times"), onLabel: ((__VLS_ctx.t('off_text'))), offLabel: ((__VLS_ctx.t('on_text'))), ...{ class: ("w-48") }, }, ...__VLS_functionalComponentArgsRest(__VLS_103));
    if (__VLS_ctx.curNetwork.enable_vpn_portal) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("items-center flex flex-row gap-x-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap w-full") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 basis-8/12 grow") }, });
        const __VLS_108 = __VLS_resolvedLocalAndGlobalComponents.InputGroup;
        /** @type { [typeof __VLS_components.InputGroup, typeof __VLS_components.InputGroup, ] } */
        // @ts-ignore
        const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({}));
        const __VLS_110 = __VLS_109({}, ...__VLS_functionalComponentArgsRest(__VLS_109));
        const __VLS_114 = __VLS_resolvedLocalAndGlobalComponents.InputText;
        /** @type { [typeof __VLS_components.InputText, ] } */
        // @ts-ignore
        const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({ modelValue: ((__VLS_ctx.curNetwork.vpn_portal_client_network_addr)), placeholder: ((__VLS_ctx.t('vpn_portal_client_network'))), }));
        const __VLS_116 = __VLS_115({ modelValue: ((__VLS_ctx.curNetwork.vpn_portal_client_network_addr)), placeholder: ((__VLS_ctx.t('vpn_portal_client_network'))), }, ...__VLS_functionalComponentArgsRest(__VLS_115));
        const __VLS_120 = __VLS_resolvedLocalAndGlobalComponents.InputGroupAddon;
        /** @type { [typeof __VLS_components.InputGroupAddon, typeof __VLS_components.InputGroupAddon, ] } */
        // @ts-ignore
        const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({}));
        const __VLS_122 = __VLS_121({}, ...__VLS_functionalComponentArgsRest(__VLS_121));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.curNetwork.vpn_portal_client_network_len);
        __VLS_nonNullable(__VLS_125.slots).default;
        var __VLS_125;
        __VLS_nonNullable(__VLS_113.slots).default;
        var __VLS_113;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 basis-3/12 grow") }, });
        const __VLS_126 = __VLS_resolvedLocalAndGlobalComponents.InputNumber;
        /** @type { [typeof __VLS_components.InputNumber, ] } */
        // @ts-ignore
        const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({ modelValue: ((__VLS_ctx.curNetwork.vpn_portal_listen_port)), allowEmpty: ((false)), format: ((false)), min: ((0)), max: ((65535)), fluid: (true), }));
        const __VLS_128 = __VLS_127({ modelValue: ((__VLS_ctx.curNetwork.vpn_portal_listen_port)), allowEmpty: ((false)), format: ((false)), min: ((0)), max: ((65535)), fluid: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_127));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 grow p-fluid") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("listener_urls"), });
    (__VLS_ctx.t('listener_urls'));
    const __VLS_132 = __VLS_resolvedLocalAndGlobalComponents.AutoComplete;
    /** @type { [typeof __VLS_components.AutoComplete, ] } */
    // @ts-ignore
    const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({ ...{ 'onComplete': {} }, id: ("listener_urls"), modelValue: ((__VLS_ctx.curNetwork.listener_urls)), suggestions: ((__VLS_ctx.listenerSuggestions)), ...{ class: ("w-full") }, dropdown: (true), completeOnFocus: ((true)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['tcp://1.1.1.1:10010']))), multiple: (true), }));
    const __VLS_134 = __VLS_133({ ...{ 'onComplete': {} }, id: ("listener_urls"), modelValue: ((__VLS_ctx.curNetwork.listener_urls)), suggestions: ((__VLS_ctx.listenerSuggestions)), ...{ class: ("w-full") }, dropdown: (true), completeOnFocus: ((true)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['tcp://1.1.1.1:10010']))), multiple: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_133));
    let __VLS_138;
    const __VLS_139 = {
        onComplete: (__VLS_ctx.searchListenerSuggestions)
    };
    let __VLS_135;
    let __VLS_136;
    var __VLS_137;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 basis-5/12 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("rpc_port"), });
    (__VLS_ctx.t('rpc_port'));
    const __VLS_140 = __VLS_resolvedLocalAndGlobalComponents.InputNumber;
    /** @type { [typeof __VLS_components.InputNumber, ] } */
    // @ts-ignore
    const __VLS_141 = __VLS_asFunctionalComponent(__VLS_140, new __VLS_140({ id: ("rpc_port"), modelValue: ((__VLS_ctx.curNetwork.rpc_port)), "aria-describedby": ("rpc_port-help"), format: ((false)), min: ((0)), max: ((65535)), }));
    const __VLS_142 = __VLS_141({ id: ("rpc_port"), modelValue: ((__VLS_ctx.curNetwork.rpc_port)), "aria-describedby": ("rpc_port-help"), format: ((false)), min: ((0)), max: ((65535)), }, ...__VLS_functionalComponentArgsRest(__VLS_141));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap w-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 grow p-fluid") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: (""), });
    (__VLS_ctx.t('rpc_portal_whitelists'));
    const __VLS_146 = __VLS_resolvedLocalAndGlobalComponents.AutoComplete;
    /** @type { [typeof __VLS_components.AutoComplete, ] } */
    // @ts-ignore
    const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({ ...{ 'onComplete': {} }, id: ("rpc_portal_whitelists"), modelValue: ((__VLS_ctx.curNetwork.rpc_portal_whitelists)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['127.0.0.0/8']))), ...{ class: ("w-full") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.inetSuggestions)), }));
    const __VLS_148 = __VLS_147({ ...{ 'onComplete': {} }, id: ("rpc_portal_whitelists"), modelValue: ((__VLS_ctx.curNetwork.rpc_portal_whitelists)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['127.0.0.0/8']))), ...{ class: ("w-full") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.inetSuggestions)), }, ...__VLS_functionalComponentArgsRest(__VLS_147));
    let __VLS_152;
    const __VLS_153 = {
        onComplete: (__VLS_ctx.searchInetSuggestions)
    };
    let __VLS_149;
    let __VLS_150;
    var __VLS_151;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 basis-5/12 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("dev_name"), });
    (__VLS_ctx.t('dev_name'));
    const __VLS_154 = __VLS_resolvedLocalAndGlobalComponents.InputText;
    /** @type { [typeof __VLS_components.InputText, ] } */
    // @ts-ignore
    const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({ id: ("dev_name"), modelValue: ((__VLS_ctx.curNetwork.dev_name)), "aria-describedby": ("dev_name-help"), format: ((true)), placeholder: ((__VLS_ctx.t('dev_name_placeholder'))), }));
    const __VLS_156 = __VLS_155({ id: ("dev_name"), modelValue: ((__VLS_ctx.curNetwork.dev_name)), "aria-describedby": ("dev_name-help"), format: ((true)), placeholder: ((__VLS_ctx.t('dev_name_placeholder'))), }, ...__VLS_functionalComponentArgsRest(__VLS_155));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 basis-5/12 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("mtu"), });
    (__VLS_ctx.t('mtu'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("pi pi-question-circle ml-2 self-center") }, });
    __VLS_asFunctionalDirective(__VLS_directives.vTooltip)(null, { ...__VLS_directiveBindingRestFields, modifiers: {}, value: (__VLS_ctx.t('mtu_help')) }, null, null);
    const __VLS_160 = __VLS_resolvedLocalAndGlobalComponents.InputNumber;
    /** @type { [typeof __VLS_components.InputNumber, ] } */
    // @ts-ignore
    const __VLS_161 = __VLS_asFunctionalComponent(__VLS_160, new __VLS_160({ id: ("mtu"), modelValue: ((__VLS_ctx.curNetwork.mtu)), "aria-describedby": ("mtu-help"), format: ((false)), placeholder: ((__VLS_ctx.t('mtu_placeholder'))), min: ((400)), max: ((1380)), fluid: (true), }));
    const __VLS_162 = __VLS_161({ id: ("mtu"), modelValue: ((__VLS_ctx.curNetwork.mtu)), "aria-describedby": ("mtu-help"), format: ((false)), placeholder: ((__VLS_ctx.t('mtu_placeholder'))), min: ((400)), max: ((1380)), fluid: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_161));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 basis-5/12 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("relay_network_whitelist"), });
    (__VLS_ctx.t('relay_network_whitelist'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("pi pi-question-circle ml-2 self-center") }, });
    __VLS_asFunctionalDirective(__VLS_directives.vTooltip)(null, { ...__VLS_directiveBindingRestFields, modifiers: {}, value: (__VLS_ctx.t('relay_network_whitelist_help')) }, null, null);
    const __VLS_166 = __VLS_resolvedLocalAndGlobalComponents.ToggleButton;
    /** @type { [typeof __VLS_components.ToggleButton, ] } */
    // @ts-ignore
    const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({ modelValue: ((__VLS_ctx.curNetwork.enable_relay_network_whitelist)), onIcon: ("pi pi-check"), offIcon: ("pi pi-times"), onLabel: ((__VLS_ctx.t('off_text'))), offLabel: ((__VLS_ctx.t('on_text'))), ...{ class: ("w-48") }, }));
    const __VLS_168 = __VLS_167({ modelValue: ((__VLS_ctx.curNetwork.enable_relay_network_whitelist)), onIcon: ("pi pi-check"), offIcon: ("pi pi-times"), onLabel: ((__VLS_ctx.t('off_text'))), offLabel: ((__VLS_ctx.t('on_text'))), ...{ class: ("w-48") }, }, ...__VLS_functionalComponentArgsRest(__VLS_167));
    if (__VLS_ctx.curNetwork.enable_relay_network_whitelist) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("items-center flex flex-row gap-x-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("min-w-64 w-full") }, });
        const __VLS_172 = __VLS_resolvedLocalAndGlobalComponents.AutoComplete;
        /** @type { [typeof __VLS_components.AutoComplete, ] } */
        // @ts-ignore
        const __VLS_173 = __VLS_asFunctionalComponent(__VLS_172, new __VLS_172({ ...{ 'onComplete': {} }, id: ("relay_network_whitelist"), modelValue: ((__VLS_ctx.curNetwork.relay_network_whitelist)), placeholder: ((__VLS_ctx.t('relay_network_whitelist'))), ...{ class: ("w-full") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.whitelistSuggestions)), }));
        const __VLS_174 = __VLS_173({ ...{ 'onComplete': {} }, id: ("relay_network_whitelist"), modelValue: ((__VLS_ctx.curNetwork.relay_network_whitelist)), placeholder: ((__VLS_ctx.t('relay_network_whitelist'))), ...{ class: ("w-full") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.whitelistSuggestions)), }, ...__VLS_functionalComponentArgsRest(__VLS_173));
        let __VLS_178;
        const __VLS_179 = {
            onComplete: (__VLS_ctx.searchWhitelistSuggestions)
        };
        let __VLS_175;
        let __VLS_176;
        var __VLS_177;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap ") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("routes"), });
    (__VLS_ctx.t('manual_routes'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("pi pi-question-circle ml-2 self-center") }, });
    __VLS_asFunctionalDirective(__VLS_directives.vTooltip)(null, { ...__VLS_directiveBindingRestFields, modifiers: {}, value: (__VLS_ctx.t('manual_routes_help')) }, null, null);
    const __VLS_180 = __VLS_resolvedLocalAndGlobalComponents.ToggleButton;
    /** @type { [typeof __VLS_components.ToggleButton, ] } */
    // @ts-ignore
    const __VLS_181 = __VLS_asFunctionalComponent(__VLS_180, new __VLS_180({ modelValue: ((__VLS_ctx.curNetwork.enable_manual_routes)), onIcon: ("pi pi-check"), offIcon: ("pi pi-times"), onLabel: ((__VLS_ctx.t('off_text'))), offLabel: ((__VLS_ctx.t('on_text'))), ...{ class: ("w-48") }, }));
    const __VLS_182 = __VLS_181({ modelValue: ((__VLS_ctx.curNetwork.enable_manual_routes)), onIcon: ("pi pi-check"), offIcon: ("pi pi-times"), onLabel: ((__VLS_ctx.t('off_text'))), offLabel: ((__VLS_ctx.t('on_text'))), ...{ class: ("w-48") }, }, ...__VLS_functionalComponentArgsRest(__VLS_181));
    if (__VLS_ctx.curNetwork.enable_manual_routes) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("items-center flex flex-row gap-x-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("min-w-64 w-full") }, });
        const __VLS_186 = __VLS_resolvedLocalAndGlobalComponents.AutoComplete;
        /** @type { [typeof __VLS_components.AutoComplete, ] } */
        // @ts-ignore
        const __VLS_187 = __VLS_asFunctionalComponent(__VLS_186, new __VLS_186({ ...{ 'onComplete': {} }, id: ("routes"), modelValue: ((__VLS_ctx.curNetwork.routes)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['192.168.0.0/16']))), ...{ class: ("w-full") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.inetSuggestions)), }));
        const __VLS_188 = __VLS_187({ ...{ 'onComplete': {} }, id: ("routes"), modelValue: ((__VLS_ctx.curNetwork.routes)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['192.168.0.0/16']))), ...{ class: ("w-full") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.inetSuggestions)), }, ...__VLS_functionalComponentArgsRest(__VLS_187));
        let __VLS_192;
        const __VLS_193 = {
            onComplete: (__VLS_ctx.searchInetSuggestions)
        };
        let __VLS_189;
        let __VLS_190;
        var __VLS_191;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap ") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("socks5_port"), });
    (__VLS_ctx.t('socks5'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("pi pi-question-circle ml-2 self-center") }, });
    __VLS_asFunctionalDirective(__VLS_directives.vTooltip)(null, { ...__VLS_directiveBindingRestFields, modifiers: {}, value: (__VLS_ctx.t('socks5_help')) }, null, null);
    const __VLS_194 = __VLS_resolvedLocalAndGlobalComponents.ToggleButton;
    /** @type { [typeof __VLS_components.ToggleButton, ] } */
    // @ts-ignore
    const __VLS_195 = __VLS_asFunctionalComponent(__VLS_194, new __VLS_194({ modelValue: ((__VLS_ctx.curNetwork.enable_socks5)), onIcon: ("pi pi-check"), offIcon: ("pi pi-times"), onLabel: ((__VLS_ctx.t('off_text'))), offLabel: ((__VLS_ctx.t('on_text'))), ...{ class: ("w-48") }, }));
    const __VLS_196 = __VLS_195({ modelValue: ((__VLS_ctx.curNetwork.enable_socks5)), onIcon: ("pi pi-check"), offIcon: ("pi pi-times"), onLabel: ((__VLS_ctx.t('off_text'))), offLabel: ((__VLS_ctx.t('on_text'))), ...{ class: ("w-48") }, }, ...__VLS_functionalComponentArgsRest(__VLS_195));
    if (__VLS_ctx.curNetwork.enable_socks5) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("items-center flex flex-row gap-x-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("min-w-64 w-full") }, });
        const __VLS_200 = __VLS_resolvedLocalAndGlobalComponents.InputNumber;
        /** @type { [typeof __VLS_components.InputNumber, ] } */
        // @ts-ignore
        const __VLS_201 = __VLS_asFunctionalComponent(__VLS_200, new __VLS_200({ id: ("socks5_port"), modelValue: ((__VLS_ctx.curNetwork.socks5_port)), "aria-describedby": ("rpc_port-help"), format: ((false)), allowEmpty: ((false)), min: ((0)), max: ((65535)), ...{ class: ("w-full") }, }));
        const __VLS_202 = __VLS_201({ id: ("socks5_port"), modelValue: ((__VLS_ctx.curNetwork.socks5_port)), "aria-describedby": ("rpc_port-help"), format: ((false)), allowEmpty: ((false)), min: ((0)), max: ((65535)), ...{ class: ("w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_201));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap w-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 grow p-fluid") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("exit_nodes"), });
    (__VLS_ctx.t('exit_nodes'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("pi pi-question-circle ml-2 self-center") }, });
    __VLS_asFunctionalDirective(__VLS_directives.vTooltip)(null, { ...__VLS_directiveBindingRestFields, modifiers: {}, value: (__VLS_ctx.t('exit_nodes_help')) }, null, null);
    const __VLS_206 = __VLS_resolvedLocalAndGlobalComponents.AutoComplete;
    /** @type { [typeof __VLS_components.AutoComplete, ] } */
    // @ts-ignore
    const __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({ ...{ 'onComplete': {} }, id: ("exit_nodes"), modelValue: ((__VLS_ctx.curNetwork.exit_nodes)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['192.168.8.8']))), ...{ class: ("w-full") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.exitNodesSuggestions)), }));
    const __VLS_208 = __VLS_207({ ...{ 'onComplete': {} }, id: ("exit_nodes"), modelValue: ((__VLS_ctx.curNetwork.exit_nodes)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['192.168.8.8']))), ...{ class: ("w-full") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.exitNodesSuggestions)), }, ...__VLS_functionalComponentArgsRest(__VLS_207));
    let __VLS_212;
    const __VLS_213 = {
        onComplete: (__VLS_ctx.searchExitNodesSuggestions)
    };
    let __VLS_209;
    let __VLS_210;
    var __VLS_211;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap w-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 grow p-fluid") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("mapped_listeners"), });
    (__VLS_ctx.t('mapped_listeners'));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("pi pi-question-circle ml-2 self-center") }, });
    __VLS_asFunctionalDirective(__VLS_directives.vTooltip)(null, { ...__VLS_directiveBindingRestFields, modifiers: {}, value: (__VLS_ctx.t('mapped_listeners_help')) }, null, null);
    const __VLS_214 = __VLS_resolvedLocalAndGlobalComponents.AutoComplete;
    /** @type { [typeof __VLS_components.AutoComplete, ] } */
    // @ts-ignore
    const __VLS_215 = __VLS_asFunctionalComponent(__VLS_214, new __VLS_214({ ...{ 'onComplete': {} }, id: ("mapped_listeners"), modelValue: ((__VLS_ctx.curNetwork.mapped_listeners)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['tcp://123.123.123.123:11223']))), ...{ class: ("w-full") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.peerSuggestions)), }));
    const __VLS_216 = __VLS_215({ ...{ 'onComplete': {} }, id: ("mapped_listeners"), modelValue: ((__VLS_ctx.curNetwork.mapped_listeners)), placeholder: ((__VLS_ctx.t('chips_placeholder', ['tcp://123.123.123.123:11223']))), ...{ class: ("w-full") }, multiple: (true), fluid: (true), suggestions: ((__VLS_ctx.peerSuggestions)), }, ...__VLS_functionalComponentArgsRest(__VLS_215));
    let __VLS_220;
    const __VLS_221 = {
        onComplete: (__VLS_ctx.searchPeerSuggestions)
    };
    let __VLS_217;
    let __VLS_218;
    var __VLS_219;
    __VLS_nonNullable(__VLS_81.slots).default;
    var __VLS_81;
    const __VLS_222 = __VLS_resolvedLocalAndGlobalComponents.Divider;
    /** @type { [typeof __VLS_components.Divider, ] } */
    // @ts-ignore
    const __VLS_223 = __VLS_asFunctionalComponent(__VLS_222, new __VLS_222({}));
    const __VLS_224 = __VLS_223({}, ...__VLS_functionalComponentArgsRest(__VLS_223));
    const __VLS_228 = __VLS_resolvedLocalAndGlobalComponents.Panel;
    /** @type { [typeof __VLS_components.Panel, typeof __VLS_components.Panel, ] } */
    // @ts-ignore
    const __VLS_229 = __VLS_asFunctionalComponent(__VLS_228, new __VLS_228({ header: ((__VLS_ctx.t('port_forwards'))), toggleable: (true), collapsed: (true), }));
    const __VLS_230 = __VLS_229({ header: ((__VLS_ctx.t('port_forwards'))), toggleable: (true), collapsed: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_229));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-y-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-x-9 flex-wrap w-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 grow p-fluid") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("port_forwards"), });
    (__VLS_ctx.t('port_forwards_help'));
    for (const [row, index] of __VLS_getVForSourceType((__VLS_ctx.curNetwork.port_forwards))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("form-row") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
        const __VLS_234 = __VLS_resolvedLocalAndGlobalComponents.SelectButton;
        /** @type { [typeof __VLS_components.SelectButton, ] } */
        // @ts-ignore
        const __VLS_235 = __VLS_asFunctionalComponent(__VLS_234, new __VLS_234({ modelValue: ((row.proto)), options: ((__VLS_ctx.portForwardProtocolOptions)), allowEmpty: ((false)), }));
        const __VLS_236 = __VLS_235({ modelValue: ((row.proto)), options: ((__VLS_ctx.portForwardProtocolOptions)), allowEmpty: ((false)), }, ...__VLS_functionalComponentArgsRest(__VLS_235));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
        const __VLS_240 = __VLS_resolvedLocalAndGlobalComponents.InputGroup;
        /** @type { [typeof __VLS_components.InputGroup, typeof __VLS_components.InputGroup, ] } */
        // @ts-ignore
        const __VLS_241 = __VLS_asFunctionalComponent(__VLS_240, new __VLS_240({}));
        const __VLS_242 = __VLS_241({}, ...__VLS_functionalComponentArgsRest(__VLS_241));
        const __VLS_246 = __VLS_resolvedLocalAndGlobalComponents.InputText;
        /** @type { [typeof __VLS_components.InputText, ] } */
        // @ts-ignore
        const __VLS_247 = __VLS_asFunctionalComponent(__VLS_246, new __VLS_246({ modelValue: ((row.bind_ip)), placeholder: ((__VLS_ctx.t('port_forwards_bind_addr'))), }));
        const __VLS_248 = __VLS_247({ modelValue: ((row.bind_ip)), placeholder: ((__VLS_ctx.t('port_forwards_bind_addr'))), }, ...__VLS_functionalComponentArgsRest(__VLS_247));
        const __VLS_252 = __VLS_resolvedLocalAndGlobalComponents.InputGroupAddon;
        /** @type { [typeof __VLS_components.InputGroupAddon, typeof __VLS_components.InputGroupAddon, ] } */
        // @ts-ignore
        const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({}));
        const __VLS_254 = __VLS_253({}, ...__VLS_functionalComponentArgsRest(__VLS_253));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ style: ({}) }, });
        __VLS_nonNullable(__VLS_257.slots).default;
        var __VLS_257;
        const __VLS_258 = __VLS_resolvedLocalAndGlobalComponents.InputNumber;
        /** @type { [typeof __VLS_components.InputNumber, ] } */
        // @ts-ignore
        const __VLS_259 = __VLS_asFunctionalComponent(__VLS_258, new __VLS_258({ modelValue: ((row.bind_port)), format: ((false)), inputId: ("horizontal-buttons"), step: ((1)), mode: ("decimal"), min: ((1)), max: ((65535)), fluid: (true), ...{ class: ("max-w-20") }, }));
        const __VLS_260 = __VLS_259({ modelValue: ((row.bind_port)), format: ((false)), inputId: ("horizontal-buttons"), step: ((1)), mode: ("decimal"), min: ((1)), max: ((65535)), fluid: (true), ...{ class: ("max-w-20") }, }, ...__VLS_functionalComponentArgsRest(__VLS_259));
        __VLS_nonNullable(__VLS_245.slots).default;
        var __VLS_245;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
        const __VLS_264 = __VLS_resolvedLocalAndGlobalComponents.InputGroup;
        /** @type { [typeof __VLS_components.InputGroup, typeof __VLS_components.InputGroup, ] } */
        // @ts-ignore
        const __VLS_265 = __VLS_asFunctionalComponent(__VLS_264, new __VLS_264({}));
        const __VLS_266 = __VLS_265({}, ...__VLS_functionalComponentArgsRest(__VLS_265));
        const __VLS_270 = __VLS_resolvedLocalAndGlobalComponents.InputText;
        /** @type { [typeof __VLS_components.InputText, ] } */
        // @ts-ignore
        const __VLS_271 = __VLS_asFunctionalComponent(__VLS_270, new __VLS_270({ modelValue: ((row.dst_ip)), placeholder: ((__VLS_ctx.t('port_forwards_dst_addr'))), }));
        const __VLS_272 = __VLS_271({ modelValue: ((row.dst_ip)), placeholder: ((__VLS_ctx.t('port_forwards_dst_addr'))), }, ...__VLS_functionalComponentArgsRest(__VLS_271));
        const __VLS_276 = __VLS_resolvedLocalAndGlobalComponents.InputGroupAddon;
        /** @type { [typeof __VLS_components.InputGroupAddon, typeof __VLS_components.InputGroupAddon, ] } */
        // @ts-ignore
        const __VLS_277 = __VLS_asFunctionalComponent(__VLS_276, new __VLS_276({}));
        const __VLS_278 = __VLS_277({}, ...__VLS_functionalComponentArgsRest(__VLS_277));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ style: ({}) }, });
        __VLS_nonNullable(__VLS_281.slots).default;
        var __VLS_281;
        const __VLS_282 = __VLS_resolvedLocalAndGlobalComponents.InputNumber;
        /** @type { [typeof __VLS_components.InputNumber, ] } */
        // @ts-ignore
        const __VLS_283 = __VLS_asFunctionalComponent(__VLS_282, new __VLS_282({ modelValue: ((row.dst_port)), format: ((false)), inputId: ("horizontal-buttons"), step: ((1)), mode: ("decimal"), min: ((1)), max: ((65535)), fluid: (true), ...{ class: ("max-w-20") }, }));
        const __VLS_284 = __VLS_283({ modelValue: ((row.dst_port)), format: ((false)), inputId: ("horizontal-buttons"), step: ((1)), mode: ("decimal"), min: ((1)), max: ((65535)), fluid: (true), ...{ class: ("max-w-20") }, }, ...__VLS_functionalComponentArgsRest(__VLS_283));
        __VLS_nonNullable(__VLS_269.slots).default;
        var __VLS_269;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
        if (__VLS_ctx.curNetwork.port_forwards.length > 0) {
            const __VLS_288 = __VLS_resolvedLocalAndGlobalComponents.Button;
            /** @type { [typeof __VLS_components.Button, ] } */
            // @ts-ignore
            const __VLS_289 = __VLS_asFunctionalComponent(__VLS_288, new __VLS_288({ ...{ 'onClick': {} }, icon: ("pi pi-trash"), severity: ("danger"), text: (true), rounded: (true), }));
            const __VLS_290 = __VLS_289({ ...{ 'onClick': {} }, icon: ("pi pi-trash"), severity: ("danger"), text: (true), rounded: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_289));
            let __VLS_294;
            const __VLS_295 = {
                onClick: (...[$event]) => {
                    if (!((__VLS_ctx.curNetwork.port_forwards.length > 0)))
                        return;
                    __VLS_ctx.removeRow(index, __VLS_ctx.curNetwork.port_forwards);
                }
            };
            let __VLS_291;
            let __VLS_292;
            var __VLS_293;
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-content-end mt-4") }, });
    const __VLS_296 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_297 = __VLS_asFunctionalComponent(__VLS_296, new __VLS_296({ ...{ 'onClick': {} }, icon: ("pi pi-plus"), label: ((__VLS_ctx.t('port_forwards_add_btn'))), severity: ("success"), }));
    const __VLS_298 = __VLS_297({ ...{ 'onClick': {} }, icon: ("pi pi-plus"), label: ((__VLS_ctx.t('port_forwards_add_btn'))), severity: ("success"), }, ...__VLS_functionalComponentArgsRest(__VLS_297));
    let __VLS_302;
    const __VLS_303 = {
        onClick: (...[$event]) => {
            __VLS_ctx.addRow(__VLS_ctx.curNetwork.port_forwards);
        }
    };
    let __VLS_299;
    let __VLS_300;
    var __VLS_301;
    __VLS_nonNullable(__VLS_233.slots).default;
    var __VLS_233;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex pt-6 justify-center") }, });
    const __VLS_304 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_305 = __VLS_asFunctionalComponent(__VLS_304, new __VLS_304({ ...{ 'onClick': {} }, label: ((__VLS_ctx.t('run_network'))), icon: ("pi pi-arrow-right"), iconPos: ("right"), disabled: ((__VLS_ctx.configInvalid)), }));
    const __VLS_306 = __VLS_305({ ...{ 'onClick': {} }, label: ((__VLS_ctx.t('run_network'))), icon: ("pi pi-arrow-right"), iconPos: ("right"), disabled: ((__VLS_ctx.configInvalid)), }, ...__VLS_functionalComponentArgsRest(__VLS_305));
    let __VLS_310;
    const __VLS_311 = {
        onClick: (...[$event]) => {
            __VLS_ctx.$emit('runNetwork', __VLS_ctx.curNetwork);
        }
    };
    let __VLS_307;
    let __VLS_308;
    var __VLS_309;
    __VLS_styleScopedClasses['frontend-lib'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['w-11/12'];
    __VLS_styleScopedClasses['self-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-y-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['basis-5/12'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['ml-2'];
    __VLS_styleScopedClasses['max-w-20'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['basis-5/12'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['basis-5/12'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['basis-5/12'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['p-fluid'];
    __VLS_styleScopedClasses['gap-x-1'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-y-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['basis-5/12'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['basis-[20rem]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['ml-2'];
    __VLS_styleScopedClasses['pi'];
    __VLS_styleScopedClasses['pi-question-circle'];
    __VLS_styleScopedClasses['ml-2'];
    __VLS_styleScopedClasses['self-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['basis-5/12'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['p-fluid'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['w-48'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['basis-8/12'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['basis-3/12'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['p-fluid'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['basis-5/12'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['p-fluid'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['basis-5/12'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['basis-5/12'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['pi'];
    __VLS_styleScopedClasses['pi-question-circle'];
    __VLS_styleScopedClasses['ml-2'];
    __VLS_styleScopedClasses['self-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['basis-5/12'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['pi'];
    __VLS_styleScopedClasses['pi-question-circle'];
    __VLS_styleScopedClasses['ml-2'];
    __VLS_styleScopedClasses['self-center'];
    __VLS_styleScopedClasses['w-48'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-4'];
    __VLS_styleScopedClasses['min-w-64'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['pi'];
    __VLS_styleScopedClasses['pi-question-circle'];
    __VLS_styleScopedClasses['ml-2'];
    __VLS_styleScopedClasses['self-center'];
    __VLS_styleScopedClasses['w-48'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-4'];
    __VLS_styleScopedClasses['min-w-64'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['pi'];
    __VLS_styleScopedClasses['pi-question-circle'];
    __VLS_styleScopedClasses['ml-2'];
    __VLS_styleScopedClasses['self-center'];
    __VLS_styleScopedClasses['w-48'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-4'];
    __VLS_styleScopedClasses['min-w-64'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['p-fluid'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['pi'];
    __VLS_styleScopedClasses['pi-question-circle'];
    __VLS_styleScopedClasses['ml-2'];
    __VLS_styleScopedClasses['self-center'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['p-fluid'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['pi'];
    __VLS_styleScopedClasses['pi-question-circle'];
    __VLS_styleScopedClasses['ml-2'];
    __VLS_styleScopedClasses['self-center'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-y-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-x-9'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['grow'];
    __VLS_styleScopedClasses['p-fluid'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['form-row'];
    __VLS_styleScopedClasses['max-w-20'];
    __VLS_styleScopedClasses['max-w-20'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-content-end'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['pt-6'];
    __VLS_styleScopedClasses['justify-center'];
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
            InputGroup: InputGroup,
            InputGroupAddon: InputGroupAddon,
            SelectButton: SelectButton,
            Checkbox: Checkbox,
            InputText: InputText,
            InputNumber: InputNumber,
            AutoComplete: AutoComplete,
            Panel: Panel,
            Divider: Divider,
            ToggleButton: ToggleButton,
            Button: Button,
            Password: Password,
            addRow: addRow,
            NetworkingMethod: NetworkingMethod,
            removeRow: removeRow,
            curNetwork: curNetwork,
            t: t,
            networking_methods: networking_methods,
            publicServerSuggestions: publicServerSuggestions,
            searchPresetPublicServers: searchPresetPublicServers,
            peerSuggestions: peerSuggestions,
            searchPeerSuggestions: searchPeerSuggestions,
            inetSuggestions: inetSuggestions,
            searchInetSuggestions: searchInetSuggestions,
            listenerSuggestions: listenerSuggestions,
            searchListenerSuggestions: searchListenerSuggestions,
            exitNodesSuggestions: exitNodesSuggestions,
            searchExitNodesSuggestions: searchExitNodesSuggestions,
            whitelistSuggestions: whitelistSuggestions,
            searchWhitelistSuggestions: searchWhitelistSuggestions,
            bool_flags: bool_flags,
            portForwardProtocolOptions: portForwardProtocolOptions,
        };
    },
    emits: {
        ...{},
        ...{},
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {
        ...{},
        ...{},
    },
    __typeProps: {},
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
