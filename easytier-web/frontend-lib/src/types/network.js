import { v4 as uuidv4 } from 'uuid';
export var NetworkingMethod;
(function (NetworkingMethod) {
    NetworkingMethod[NetworkingMethod["PublicServer"] = 0] = "PublicServer";
    NetworkingMethod[NetworkingMethod["Manual"] = 1] = "Manual";
    NetworkingMethod[NetworkingMethod["Standalone"] = 2] = "Standalone";
})(NetworkingMethod || (NetworkingMethod = {}));
export function DEFAULT_NETWORK_CONFIG() {
    return {
        instance_id: uuidv4(),
        dhcp: true,
        virtual_ipv4: '',
        network_length: 24,
        network_name: 'xlxx',
        network_secret: 'Aa123456',
        networking_method: NetworkingMethod.Manual,
        public_server_url: 'tcp://sdwan.xiaolin.cc:10010',
        peer_urls: [
            'tcp://sdwan.xiaolin.cc:10010',
            'tcp://oa.xiaolin.cc:10010',
            'udp://oa.xiaolin.cc:10010',
            'udp://sdwan.xiaolin.cc:10010',
            'wg://sdwan.xiaolin.cc:10011',
            'wg://oa.xiaolin.cc:10011',
        ],
        proxy_cidrs: [],
        enable_vpn_portal: false,
        vpn_portal_listen_port: 22022,
        vpn_portal_client_network_addr: '',
        vpn_portal_client_network_len: 24,
        advanced_settings: false,
        listener_urls: [
            'tcp://0.0.0.0:10010',
            'udp://0.0.0.0:10010',
            'wg://0.0.0.0:10011',
        ],
        rpc_port: 0,
        latency_first: true,
        dev_name: '',
        use_smoltcp: true,
        disable_ipv6: false,
        enable_kcp_proxy: true,
        disable_kcp_input: false,
        enable_quic_proxy: true,
        disable_quic_input: false,
        disable_p2p: false,
        bind_device: false,
        no_tun: false,
        enable_exit_node: true,
        relay_all_peer_rpc: false,
        multi_thread: true,
        proxy_forward_by_system: false,
        disable_encryption: false,
        disable_udp_hole_punching: false,
        disable_sym_hole_punching: false,
        enable_relay_network_whitelist: false,
        relay_network_whitelist: [],
        enable_manual_routes: false,
        routes: [],
        exit_nodes: [],
        enable_socks5: false,
        socks5_port: 1080,
        mtu: null,
        mapped_listeners: [],
        enable_magic_dns: true,
        enable_private_mode: false,
        rpc_portal_whitelists: [],
        port_forwards: [],
    };
}
// 添加新行
export const addRow = (rows) => {
    rows.push({
        proto: 'tcp',
        bind_ip: '',
        bind_port: 65535,
        dst_ip: '',
        dst_port: 65535,
    });
};
// 删除行
export const removeRow = (index, rows) => {
    rows.splice(index, 1);
};
export var EventType;
(function (EventType) {
    EventType["TunDeviceReady"] = "TunDeviceReady";
    EventType["TunDeviceError"] = "TunDeviceError";
    EventType["PeerAdded"] = "PeerAdded";
    EventType["PeerRemoved"] = "PeerRemoved";
    EventType["PeerConnAdded"] = "PeerConnAdded";
    EventType["PeerConnRemoved"] = "PeerConnRemoved";
    EventType["ListenerAdded"] = "ListenerAdded";
    EventType["ListenerAddFailed"] = "ListenerAddFailed";
    EventType["ListenerAcceptFailed"] = "ListenerAcceptFailed";
    EventType["ConnectionAccepted"] = "ConnectionAccepted";
    EventType["ConnectionError"] = "ConnectionError";
    EventType["Connecting"] = "Connecting";
    EventType["ConnectError"] = "ConnectError";
    EventType["VpnPortalClientConnected"] = "VpnPortalClientConnected";
    EventType["VpnPortalClientDisconnected"] = "VpnPortalClientDisconnected";
    EventType["DhcpIpv4Changed"] = "DhcpIpv4Changed";
    EventType["DhcpIpv4Conflicted"] = "DhcpIpv4Conflicted";
    EventType["PortForwardAdded"] = "PortForwardAdded";
})(EventType || (EventType = {}));
