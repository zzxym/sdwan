import axios, { AxiosError } from 'axios';
import { Md5 } from 'ts-md5';
export class ApiClient {
    constructor(baseUrl, authFailedCb = undefined) {
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "authFailedCb", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = axios.create({
            baseURL: baseUrl + '/api/v1',
            withCredentials: true, // 如果需要支持跨域携带cookie
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.authFailedCb = authFailedCb;
        // 添加请求拦截器
        this.client.interceptors.request.use((config) => {
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        // 添加响应拦截器
        this.client.interceptors.response.use((response) => {
            console.debug('Axios Response:', response);
            return response.data; // 假设服务器返回的数据都在data属性中
        }, (error) => {
            if (error.response) {
                let response = error.response;
                if (response.status == 401 && this.authFailedCb) {
                    console.error('Unauthorized:', response.data);
                    this.authFailedCb();
                }
                else {
                    // 请求已发出，但是服务器响应的状态码不在2xx范围
                    console.error('Response Error:', error.response.data);
                }
            }
            else if (error.request) {
                // 请求已发出，但是没有收到响应
                console.error('Request Error:', error.request);
            }
            else {
                // 发生了一些问题导致请求未发出
                console.error('Error:', error.message);
            }
            return Promise.reject(error);
        });
    }
    // 注册
    async register(data) {
        try {
            data.credentials.password = Md5.hashStr(data.credentials.password);
            const response = await this.client.post('/auth/register', data);
            console.log("register response:", response);
            return { success: true, message: 'Register success', };
        }
        catch (error) {
            if (error instanceof AxiosError) {
                return { success: false, message: 'Failed to register, error: ' + JSON.stringify(error.response?.data), };
            }
            return { success: false, message: 'Unknown error, error: ' + error, };
        }
    }
    // 登录
    async login(data) {
        try {
            data.password = Md5.hashStr(data.password);
            const response = await this.client.post('/auth/login', data);
            console.log("login response:", response);
            return { success: true, message: 'Login success', };
        }
        catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    return { success: false, message: 'Invalid username or password', };
                }
                else {
                    return { success: false, message: 'Unknown error, status code: ' + error.response?.status, };
                }
            }
            return { success: false, message: 'Unknown error, error: ' + error, };
        }
    }
    async logout() {
        await this.client.get('/auth/logout');
        if (this.authFailedCb) {
            this.authFailedCb();
        }
    }
    async change_password(new_password) {
        await this.client.put('/auth/password', { new_password: Md5.hashStr(new_password) });
    }
    async check_login_status() {
        try {
            await this.client.get('/auth/check_login_status');
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async list_session() {
        const response = await this.client.get('/sessions');
        return response;
    }
    async list_machines() {
        const response = await this.client.get('/machines');
        return response.machines;
    }
    async list_deivce_instance_ids(machine_id) {
        const response = await this.client.get('/machines/' + machine_id + '/networks');
        return response;
    }
    async update_device_instance_state(machine_id, inst_id, disabled) {
        await this.client.put('/machines/' + machine_id + '/networks/' + inst_id, {
            disabled: disabled,
        });
    }
    async get_network_info(machine_id, inst_id) {
        const response = await this.client.get('/machines/' + machine_id + '/networks/info/' + inst_id);
        return response.info.map;
    }
    async get_network_config(machine_id, inst_id) {
        const response = await this.client.get('/machines/' + machine_id + '/networks/config/' + inst_id);
        return response;
    }
    async validate_config(machine_id, config) {
        const response = await this.client.post(`/machines/${machine_id}/validate-config`, {
            config: config,
        });
        return response;
    }
    async run_network(machine_id, config) {
        await this.client.post(`/machines/${machine_id}/networks`, {
            config: config,
        });
    }
    async delete_network(machine_id, inst_id) {
        await this.client.delete(`/machines/${machine_id}/networks/${inst_id}`);
    }
    async get_summary() {
        const response = await this.client.get('/summary');
        return response;
    }
    captcha_url() {
        return this.client.defaults.baseURL + '/auth/captcha';
    }
    async generate_config(config) {
        try {
            const response = await this.client.post('/generate-config', config);
            return response;
        }
        catch (error) {
            if (error instanceof AxiosError) {
                return { error: error.response?.data };
            }
            return { error: 'Unknown error: ' + error };
        }
    }
    async parse_config(config) {
        try {
            const response = await this.client.post('/parse-config', config);
            return response;
        }
        catch (error) {
            if (error instanceof AxiosError) {
                return { error: error.response?.data };
            }
            return { error: 'Unknown error: ' + error };
        }
    }
}
export default ApiClient;
