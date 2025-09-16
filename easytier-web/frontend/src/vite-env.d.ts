/// <reference types="vite/client" />

// 完整的sdwan-frontend-lib类型声明
declare module 'sdwan-frontend-lib' {
  // Config组件类型
  export const Config: any;
  export const ConfigEditDialog: any;
  export const Status: any;
  
  // I18n工具类型
  export namespace I18nUtils {
    export function loadLanguageAsync(lang: string): Promise<void>;
    export const i18n: any;
    export const availableLocales: string[];
    export function getCurrentLanguage(): string;
    export function toggleLanguage(): void;
  }
  
  // 网络类型定义
  export namespace NetworkTypes {
    export enum NetworkingMethod {
      PublicServer = 0,
      Manual = 1,
      Standalone = 2,
    }
    
    export interface NetworkConfig {
      instance_id: string
      dhcp: boolean
      virtual_ipv4: string
      network_length: number
      hostname?: string
      network_name: string
      network_secret: string
      networking_method: NetworkingMethod
      public_server_url: string
      peer_urls: string[]
      proxy_cidrs: string[]
      enable_vpn_portal: boolean
      vpn_portal_listen_port: number
      vpn_portal_client_network_addr: string
      vpn_portal_client_network_len: number
      advanced_settings: boolean
      listener_urls: string[]
      rpc_port: number
      latency_first: boolean
      dev_name: string
      use_smoltcp?: boolean
      disable_ipv6?: boolean
      enable_kcp_proxy?: boolean
      disable_kcp_input?: boolean
      enable_quic_proxy?: boolean
      disable_quic_input?: boolean
      disable_p2p?: boolean
      bind_device?: boolean
      no_tun?: boolean
      enable_exit_node?: boolean
      relay_all_peer_rpc?: boolean
      multi_thread?: boolean
      proxy_forward_by_system?: boolean
      disable_encryption?: boolean
      disable_udp_hole_punching?: boolean
      disable_sym_hole_punching?: boolean
      enable_relay_network_whitelist?: boolean
      relay_network_whitelist: string[]
      enable_manual_routes: boolean
      routes: string[]
      exit_nodes: string[]
      enable_socks5?: boolean
      socks5_port: number
      mtu: number | null
      mapped_listeners: string[]
      enable_magic_dns?: boolean
      enable_private_mode?: boolean
      rpc_portal_whitelists: string[]
      port_forwards: any[]
    }
    
    export interface NetworkInstance {
      instance_id: string
      running: boolean
      error_msg: string
      detail?: any
    }
    
    export function DEFAULT_NETWORK_CONFIG(): NetworkConfig;
  }
  
  // API相关类型
  export namespace Api {
    export interface ValidateConfigResponse {
      toml_config: string;
    }
    
    export interface LoginResponse {
      success: boolean;
      message: string;
    }
    
    export interface RegisterResponse {
      success: boolean;
      message: string;
    }
    
    export interface Credential {
      username: string;
      password: string;
    }
    
    export interface RegisterData {
      credentials: Credential;
      captcha: string;
    }
    
    export interface Summary {
      device_count: number;
    }
    
    export interface ListNetworkInstanceIdResponse {
      running_inst_ids: string[];
      disabled_inst_ids: string[];
    }
    
    export interface GenerateConfigRequest {
      config: NetworkTypes.NetworkConfig;
    }
    
    export interface GenerateConfigResponse {
      toml_config?: string;
      error?: string;
    }
    
    export interface ParseConfigRequest {
      toml_config: string;
    }
    
    export interface ParseConfigResponse {
      config?: NetworkTypes.NetworkConfig;
      error?: string;
    }
    
    export class ApiClient {
      constructor(baseUrl: string, authFailedCb?: Function);
      
      // 认证相关方法
      register(data: RegisterData): Promise<RegisterResponse>;
      login(data: Credential): Promise<LoginResponse>;
      logout(): Promise<void>;
      change_password(new_password: string): Promise<void>;
      check_login_status(): Promise<boolean>;
      
      // 会话管理
      list_session(): Promise<any>;
      
      // 设备管理
      list_machines(): Promise<any[]>;
      list_deivce_instance_ids(machine_id: string): Promise<ListNetworkInstanceIdResponse>;
      update_device_instance_state(machine_id: string, inst_id: string, disabled: boolean): Promise<void>;
      get_network_info(machine_id: string, inst_id: string): Promise<any>;
      get_network_config(machine_id: string, inst_id: string): Promise<any>;
      validate_config(machine_id: string, config: any): Promise<ValidateConfigResponse>;
      run_network(machine_id: string, config: any): Promise<void>;
      delete_network(machine_id: string, inst_id: string): Promise<void>;
      
      // 其他功能
      get_summary(): Promise<Summary>;
      captcha_url(): string;
      generate_config(config: GenerateConfigRequest): Promise<GenerateConfigResponse>;
      parse_config(config: ParseConfigRequest): Promise<ParseConfigResponse>;
    }
  }
  
  // 工具类
  export namespace Utils {
    export function ipv4ToString(ip: any): string;
    export function ipv4InetToString(ip: any | undefined): string;
    export function ipv6ToString(ip: any): string;
    export function UuidToStr(uuid: any): string;
    
    export interface UUID {
      part1: number;
      part2: number;
      part3: number;
      part4: number;
    }
    
    export interface Location {
      country: string | undefined;
      city: string | undefined;
      region: string | undefined;
    }
    
    export interface DeviceInfo {
      hostname: string;
      public_ip: string;
      running_network_count: number;
      report_time: string;
      easytier_version: string;
      running_network_instances?: Array<string>;
      machine_id: string;
      location: Location | undefined;
    }
    
    export function buildDeviceInfo(device: any): DeviceInfo;
    
    export class PeriodicTask {
      constructor(task: () => Promise<void>, interval: number);
      start(): void;
      stop(): void;
    }
  }
  
  // 默认导出的插件类型
  interface SdwanFrontendLib {
    install(app: any): void;
  }
  
  const plugin: SdwanFrontendLib;
  export default plugin;
}