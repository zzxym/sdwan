/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { onMounted, ref, watch } from 'vue';
import { Divider, Button, Dialog, Textarea } from 'primevue';
import { useI18n } from 'vue-i18n';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { t } = useI18n();
const props = defineProps({
    readonly: {
        type: Boolean,
        default: false,
    },
    generateConfig: {
        type: Object,
        required: true,
    },
    saveConfig: {
        type: Object,
        required: true,
    },
});
const curNetwork = defineModel('curNetwork', {
    type: Object,
    required: true,
});
const visible = defineModel('visible', {
    type: Boolean,
    default: false,
});
watch([visible, curNetwork], async ([newVisible, newCurNetwork]) => {
    if (!newVisible) {
        tomlConfig.value = '';
        return;
    }
    if (!newCurNetwork) {
        tomlConfig.value = '';
        return;
    }
    const config = newCurNetwork;
    try {
        errorMessage.value = '';
        tomlConfig.value = await props.generateConfig(config);
    }
    catch (e) {
        errorMessage.value = 'Failed to generate config: ' + (e instanceof Error ? e.message : String(e));
        tomlConfig.value = '';
    }
});
onMounted(async () => {
    if (!visible.value) {
        return;
    }
    if (!curNetwork.value) {
        tomlConfig.value = '';
        return;
    }
    const config = curNetwork.value;
    try {
        tomlConfig.value = await props.generateConfig(config);
        errorMessage.value = '';
    }
    catch (e) {
        errorMessage.value = 'Failed to generate config: ' + (e instanceof Error ? e.message : String(e));
        tomlConfig.value = '';
    }
});
const handleConfigSave = async () => {
    if (props.readonly)
        return;
    try {
        await props.saveConfig(tomlConfig.value);
        visible.value = false;
    }
    catch (e) {
        errorMessage.value = 'Failed to save config: ' + (e instanceof Error ? e.message : String(e));
    }
};
const tomlConfig = ref('');
const tomlConfigRows = ref(1);
const errorMessage = ref('');
watch(tomlConfig, (newValue) => {
    tomlConfigRows.value = newValue.split('\n').length;
    errorMessage.value = '';
});
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        readonly: {
            type: Boolean,
            default: false,
        },
        generateConfig: {
            type: Object,
            required: true,
        },
        saveConfig: {
            type: Object,
            required: true,
        },
    },
    __typeEmits: {},
});
;
let __VLS_functionalComponentProps;
const __VLS_defaults = {
    visible: false,
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Dialog;
    /** @type { [typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ visible: ((__VLS_ctx.visible)), modal: (true), header: ((__VLS_ctx.t('config_file'))), ...{ style: (({ width: '70%' })) }, }));
    const __VLS_2 = __VLS_1({ visible: ((__VLS_ctx.visible)), modal: (true), header: ((__VLS_ctx.t('config_file'))), ...{ style: (({ width: '70%' })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    if (__VLS_ctx.errorMessage) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({ ...{ class: ("mb-2 p-2 rounded text-sm overflow-auto bg-red-100 text-red-700 max-h-40") }, });
        (__VLS_ctx.errorMessage);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex w-full") }, ...{ style: ({}) }, });
    const __VLS_7 = __VLS_resolvedLocalAndGlobalComponents.Textarea;
    /** @type { [typeof __VLS_components.Textarea, typeof __VLS_components.Textarea, ] } */
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({ modelValue: ((__VLS_ctx.tomlConfig)), ...{ class: ("w-full h-full font-mono flex flex-col resize-none") }, rows: ((__VLS_ctx.tomlConfigRows)), spellcheck: ("false"), readonly: ((props.readonly)), }));
    const __VLS_9 = __VLS_8({ modelValue: ((__VLS_ctx.tomlConfig)), ...{ class: ("w-full h-full font-mono flex flex-col resize-none") }, rows: ((__VLS_ctx.tomlConfigRows)), spellcheck: ("false"), readonly: ((props.readonly)), }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const __VLS_13 = __VLS_resolvedLocalAndGlobalComponents.Divider;
    /** @type { [typeof __VLS_components.Divider, ] } */
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-2 justify-end") }, });
    if (!props.readonly) {
        const __VLS_19 = __VLS_resolvedLocalAndGlobalComponents.Button;
        /** @type { [typeof __VLS_components.Button, ] } */
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({ ...{ 'onClick': {} }, type: ("button"), label: ((__VLS_ctx.t('save'))), }));
        const __VLS_21 = __VLS_20({ ...{ 'onClick': {} }, type: ("button"), label: ((__VLS_ctx.t('save'))), }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        let __VLS_25;
        const __VLS_26 = {
            onClick: (__VLS_ctx.handleConfigSave)
        };
        let __VLS_22;
        let __VLS_23;
        var __VLS_24;
    }
    const __VLS_27 = __VLS_resolvedLocalAndGlobalComponents.Button;
    /** @type { [typeof __VLS_components.Button, ] } */
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({ ...{ 'onClick': {} }, type: ("button"), label: ((__VLS_ctx.t('close'))), }));
    const __VLS_29 = __VLS_28({ ...{ 'onClick': {} }, type: ("button"), label: ((__VLS_ctx.t('close'))), }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    let __VLS_33;
    const __VLS_34 = {
        onClick: (...[$event]) => {
            __VLS_ctx.visible = false;
        }
    };
    let __VLS_30;
    let __VLS_31;
    var __VLS_32;
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['overflow-auto'];
    __VLS_styleScopedClasses['bg-red-100'];
    __VLS_styleScopedClasses['text-red-700'];
    __VLS_styleScopedClasses['max-h-40'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['font-mono'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['resize-none'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['justify-end'];
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
            Divider: Divider,
            Button: Button,
            Dialog: Dialog,
            Textarea: Textarea,
            t: t,
            visible: visible,
            handleConfigSave: handleConfigSave,
            tomlConfig: tomlConfig,
            tomlConfigRows: tomlConfigRows,
            errorMessage: errorMessage,
        };
    },
    __typeEmits: {},
    props: {
        ...{},
        ...{
            readonly: {
                type: Boolean,
                default: false,
            },
            generateConfig: {
                type: Object,
                required: true,
            },
            saveConfig: {
                type: Object,
                required: true,
            },
        },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    props: {
        ...{},
        ...{
            readonly: {
                type: Boolean,
                default: false,
            },
            generateConfig: {
                type: Object,
                required: true,
            },
            saveConfig: {
                type: Object,
                required: true,
            },
        },
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
