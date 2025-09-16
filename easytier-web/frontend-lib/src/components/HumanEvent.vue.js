/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { useI18n } from 'vue-i18n';
import { EventType } from '../types/network';
import { computed } from 'vue';
import { Fieldset } from 'primevue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps();
const { t } = useI18n();
const eventKey = computed(() => {
    const key = Object.keys(props.event)[0];
    return Object.keys(EventType).includes(key) ? key : 'Unknown';
});
const eventValue = computed(() => {
    const value = props.event[eventKey.value];
    return typeof value === 'object' ? value : value;
}); /* PartiallyEnd: #3632/scriptSetup.vue */
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
    let __VLS_resolvedLocalAndGlobalComponents;
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Fieldset;
    /** @type { [typeof __VLS_components.Fieldset, typeof __VLS_components.Fieldset, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ legend: ((__VLS_ctx.t(`event.${__VLS_ctx.eventKey}`))), }));
    const __VLS_2 = __VLS_1({ legend: ((__VLS_ctx.t(`event.${__VLS_ctx.eventKey}`))), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    if (__VLS_ctx.eventKey !== 'Unknown') {
        if (__VLS_ctx.event.DhcpIpv4Changed) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            (`${__VLS_ctx.eventValue[0]} -> ${__VLS_ctx.eventValue[1]}`);
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
            (__VLS_ctx.eventValue);
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
        (__VLS_ctx.eventValue);
    }
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
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
            Fieldset: Fieldset,
            t: t,
            eventKey: eventKey,
            eventValue: eventValue,
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
