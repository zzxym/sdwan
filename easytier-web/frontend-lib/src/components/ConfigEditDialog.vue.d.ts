import { NetworkConfig } from '../types/network';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    generateConfig: {
        type: () => (config: NetworkConfig) => Promise<string>;
        required: true;
    };
    saveConfig: {
        type: () => (config: string) => Promise<void>;
        required: true;
    };
    curNetwork: {
        type: import("vue").PropType<NetworkConfig | undefined>;
        required: true;
    };
    visible: {
        type: import("vue").PropType<boolean>;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:curNetwork": (value: NetworkConfig | undefined) => any;
    "update:visible": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    generateConfig: {
        type: () => (config: NetworkConfig) => Promise<string>;
        required: true;
    };
    saveConfig: {
        type: () => (config: string) => Promise<void>;
        required: true;
    };
    curNetwork: {
        type: import("vue").PropType<NetworkConfig | undefined>;
        required: true;
    };
    visible: {
        type: import("vue").PropType<boolean>;
    };
}>> & Readonly<{
    "onUpdate:curNetwork"?: ((value: NetworkConfig | undefined) => any) | undefined;
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
}>, {
    readonly: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
