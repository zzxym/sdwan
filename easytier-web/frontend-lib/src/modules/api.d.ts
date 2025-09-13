import { AxiosResponse } from 'axios';
import { UUID } from './utils';
import { NetworkConfig } from '../types/network';
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
    running_inst_ids: Array<UUID>;
    disabled_inst_ids: Array<UUID>;
}
export interface GenerateConfigRequest {
    config: NetworkConfig;
}
export interface GenerateConfigResponse {
    toml_config?: string;
    error?: string;
}
export interface ParseConfigRequest {
    toml_config: string;
}
export interface ParseConfigResponse {
    config?: NetworkConfig;
    error?: string;
}
export declare class ApiClient {
    private client;
    private authFailedCb;
    constructor(baseUrl: string, authFailedCb?: Function | undefined);
    register(data: RegisterData): Promise<RegisterResponse>;
    login(data: Credential): Promise<LoginResponse>;
    logout(): Promise<void>;
    change_password(new_password: string): Promise<void>;
    check_login_status(): Promise<boolean>;
    list_session(): Promise<AxiosResponse<any, any>>;
    list_machines(): Promise<Array<any>>;
    list_deivce_instance_ids(machine_id: string): Promise<ListNetworkInstanceIdResponse>;
    update_device_instance_state(machine_id: string, inst_id: string, disabled: boolean): Promise<undefined>;
    get_network_info(machine_id: string, inst_id: string): Promise<any>;
    get_network_config(machine_id: string, inst_id: string): Promise<any>;
    validate_config(machine_id: string, config: any): Promise<ValidateConfigResponse>;
    run_network(machine_id: string, config: any): Promise<undefined>;
    delete_network(machine_id: string, inst_id: string): Promise<undefined>;
    get_summary(): Promise<Summary>;
    captcha_url(): string;
    generate_config(config: GenerateConfigRequest): Promise<GenerateConfigResponse>;
    parse_config(config: ParseConfigRequest): Promise<ParseConfigResponse>;
}
export default ApiClient;
