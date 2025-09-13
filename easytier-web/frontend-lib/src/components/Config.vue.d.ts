import { NetworkConfig } from '../types/network';
type __VLS_Props = {
    configInvalid?: boolean;
    hostname?: string;
};
declare const curNetwork: import("vue").ModelRef<NetworkConfig, string, NetworkConfig, NetworkConfig>;
type __VLS_PublicProps = {
    'curNetwork'?: typeof curNetwork['value'];
} & __VLS_Props;
declare const _default: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    runNetwork: (...args: any[]) => void;
    "update:curNetwork": (value: NetworkConfig) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onRunNetwork?: ((...args: any[]) => any) | undefined;
    "onUpdate:curNetwork"?: ((value: NetworkConfig) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
