import { IPv6 } from 'ip-num/IPNumber';
import { Ipv4Addr, Ipv4Inet, Ipv6Addr } from '../types/network';
export declare function ipv4ToString(ip: Ipv4Addr): string;
export declare function ipv4InetToString(ip: Ipv4Inet | undefined): string;
export declare function ipv6ToString(ip: Ipv6Addr): IPv6;
export interface UUID {
    part1: number;
    part2: number;
    part3: number;
    part4: number;
}
export declare function UuidToStr(uuid: UUID): string;
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
export declare function buildDeviceInfo(device: any): DeviceInfo;
export declare class PeriodicTask {
    private interval;
    private task;
    private timer;
    constructor(task: () => Promise<void>, interval: number);
    _runTaskHelper(nextInterval: number): void;
    start(): void;
    stop(): void;
}
