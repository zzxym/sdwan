import { IPv4, IPv6 } from 'ip-num/IPNumber';
export function ipv4ToString(ip) {
    return IPv4.fromNumber(ip.addr).toString();
}
export function ipv4InetToString(ip) {
    if (ip?.address === undefined) {
        return 'undefined';
    }
    return `${ipv4ToString(ip.address)}/${ip.network_length}`;
}
export function ipv6ToString(ip) {
    return IPv6.fromBigInt((BigInt(ip.part1) << BigInt(96))
        + (BigInt(ip.part2) << BigInt(64))
        + (BigInt(ip.part3) << BigInt(32))
        + BigInt(ip.part4));
}
function toHexString(uint64, padding = 9) {
    let hexString = uint64.toString(16);
    while (hexString.length < padding) {
        hexString = '0' + hexString;
    }
    return hexString;
}
function uint32ToUuid(part1, part2, part3, part4) {
    // 将两个 uint64 转换为 16 进制字符串
    const part1Hex = toHexString(BigInt(part1), 8);
    const part2Hex = toHexString(BigInt(part2), 8);
    const part3Hex = toHexString(BigInt(part3), 8);
    const part4Hex = toHexString(BigInt(part4), 8);
    // 构造 UUID 格式字符串
    const uuid = `${part1Hex.substring(0, 8)}-${part2Hex.substring(0, 4)}-${part2Hex.substring(4, 8)}-${part3Hex.substring(0, 4)}-${part3Hex.substring(4, 8)}${part4Hex.substring(0, 12)}`;
    return uuid;
}
export function UuidToStr(uuid) {
    return uint32ToUuid(uuid.part1, uuid.part2, uuid.part3, uuid.part4);
}
export function buildDeviceInfo(device) {
    let dev_info = {
        hostname: device.info?.hostname,
        public_ip: device.client_url,
        running_network_instances: device.info?.running_network_instances.map((instance) => UuidToStr(instance)),
        running_network_count: device.info?.running_network_instances.length,
        report_time: device.info?.report_time,
        easytier_version: device.info?.easytier_version,
        machine_id: UuidToStr(device.info?.machine_id),
        location: device.location,
    };
    return dev_info;
}
// write a class to run a function periodically and can be stopped by calling stop(), use setTimeout to trigger the function
export class PeriodicTask {
    constructor(task, interval) {
        Object.defineProperty(this, "interval", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "task", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.interval = interval;
        this.task = task;
    }
    _runTaskHelper(nextInterval) {
        this.timer = setTimeout(async () => {
            if (this.task) {
                await this.task();
                this._runTaskHelper(this.interval);
            }
        }, nextInterval);
    }
    start() {
        this._runTaskHelper(0);
    }
    stop() {
        this.task = undefined;
        clearTimeout(this.timer);
    }
}
