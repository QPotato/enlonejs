import * as request from 'request-promise'
import { isString } from 'util';

export interface EnlOneProxyInterface {
    get: (endpoint: string, params: object) => Promise<any>
    post: (endpoint: string, params: object) => Promise<any>
    delete: (endpoint: string, params: object) => Promise<any>
    put: (endpoint: string, params: object) => Promise<any>
}

export interface EnlOneAPIResult {
    status?: string,
    message?: string,
    data?: object,
}

const getData = (serverResponse: string | Object) => {
    const json: EnlOneAPIResult = isString(serverResponse) ? JSON.parse(serverResponse) : serverResponse;
    if (json.status === 'error')
        throw new Error("enl.one API validation error: " + json.message)
    return json.data;
};

export class ApikeyProxy implements EnlOneProxyInterface {
    constructor(base_url: string, apikey: string) {
        this.base_url = base_url;
        this.apikey = apikey;
    }
    async get(endpoint: string, params: object) {
        try {
            const response: string = await request.get(this.base_url + endpoint, {
                qs: Object.assign(params, {
                    apikey: this.apikey,
                })
            });
            return getData(response);
        } catch (error) {
            throw new Error("Error contacting enl.one API: " + error);
        }
    }
    async post(endpoint: string, params: object) {
        try {
            const response: string = await request.post(this.base_url + endpoint, {
                qs: {
                    apikey: this.apikey,
                },
                json: params
            });
            return getData(response);
        } catch (error) {
            throw new Error("Error contacting enl.one API: " + error);
        }
    }
    async delete(endpoint: string, params: object) {
        try {
            const response: string = await request.delete(this.base_url + endpoint, {
                qs: {
                    apikey: this.apikey,
                },
                json: params
            });
            return getData(response);
        } catch (error) {
            throw new Error("Error contacting enl.one API: " + error);
        }
    }
    async put(endpoint: string, params: object) {
        try {
            const response: string = await request.put(this.base_url + endpoint, {
                qs: {
                    apikey: this.apikey,
                },
                json: params
            });
            return getData(response);
        } catch (error) {
            throw new Error("Error contacting enl.one API: " + error);
        }
    }
    private base_url: string;
    private apikey: string;
}

export class OAuthProxy implements EnlOneProxyInterface {
    base_url: string;
    token: string;
    constructor(base_url: string, token: string) {
        this.base_url = base_url;
        this.token = token;
    }
    async get(endpoint: string, params: object) {
        try {
            const response = await request.get(this.base_url + endpoint, {
                qs: params,
                headers: {
                    Authorization: this.token
                }
            });
            return getData(response);
        } catch (error) {
            throw new Error("Error contacting enl.one API: " + error);
        }
    }
    async post(endpoint: string, params: object) {
        try {
            const response = await request.post(this.base_url + endpoint, {
                json: params,
                headers: {
                    Authorization: this.token
                }
            });
            return getData(response);
        } catch (error) {
            throw new Error("Error contacting enl.one API: " + error);
        }
    }
    async delete(endpoint: string, params: object) {
        try {
            const response = await request.delete(this.base_url + endpoint, {
                json: params,
                headers: {
                    Authorization: this.token
                }
            });
            return getData(response);
        } catch (error) {
            throw new Error("Error contacting enl.one API: " + error);
        }
    }
    async put(endpoint: string, params: object) {
        try {
            const response = await request.put(this.base_url + endpoint, {
                json: params,
                headers: {
                    Authorization: this.token
                }
            });
            return getData(response);
        } catch (error) {
            throw new Error("Error contacting enl.one API: " + error);
        }
    }
}