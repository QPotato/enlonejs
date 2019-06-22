import { ApikeyProxy, OAuthProxy, EnlOneProxyInterface } from './proxy';

export interface LoginCredentials {
    apikey?: string;
    oAuthToken?: string;
}

export interface BulkOptions {
    telegramId?: Boolean;
    googleId?: Boolean;
}

export interface Agent {
    enlid: string;
    vlevel: number;
    vpoints: number;
    agent: string;
    level: number;
    quarantine: boolean;
    active: boolean;
    blacklisted: boolean;
    verified: boolean;
    flagged: boolean;
    banned_by_nia: boolean;
    cellid: string;
}

export interface AgentDetail extends Agent {
    gid?: string;
    telegramid?: string;
    telegram?: number;
    email?: string;
    lat?: number;
    lon?: number;
    distance?: number;
}


export interface AgentLocation {
    lat: number;
    lon: number;
    distance?: number;
}

export interface AgentDistance {
    fromEnlid: string;
    targetEnlid: string;
    hops: Agent[];
}

export interface Role {
    id: number;
    name: string;
}

export interface TeamMember extends AgentDetail {
    roles: Role[];
    admin: boolean;
}

export interface Team {
    teamid: number;
    team: string;
    roles: Role[];
    admin: boolean;
}

export class VEnlOne {
    proxy: EnlOneProxyInterface;
    constructor(credentials: LoginCredentials) {
        if (credentials.apikey !== undefined)
            this.proxy = new ApikeyProxy('https://v.enl.one', credentials.apikey);
        else if (credentials.oAuthToken)
            this.proxy = new OAuthProxy('https://v.enl.one/oauth', credentials.oAuthToken);
        else
            throw new Error('You need to either provide an Apikey or an OAuth session token');
    }

    async trust(enlid: string): Promise<Agent> {
        return await this.proxy.get(`/api/v1/agent/${enlid}/trust`, {});
    }

    async search(query: object): Promise<Array<Agent>> {
        return await this.proxy.get('/api/v1/search', query);
    }

    async distance(enlid1: string, enlid2: string): Promise<AgentDistance> {
        return await this.proxy.get(`/api/v1/agent/${enlid1}/${enlid2}`, {});
    }

    async bulkInfo(ids: Array<string>, options?: BulkOptions): Promise<object> {
        const telegram: string = options && options.telegramId ? '/telegramid' : '';
        const google: string = options && options.googleId ? '/gid' : '';
        const uri = '/api/v1/bulk/agent/info' + telegram + google;
        return await this.proxy.post(uri, ids);
    }

    async bulkInfoArray(ids: Array<string>, options?: BulkOptions): Promise<object | AgentDetail[]> {
        const telegram: string = options && options.telegramId ? '/telegramid' : '';
        const google: string = options && options.googleId ? '/gid' : '';
        const uri = '/api/v1/bulk/agent/info' + telegram + google + '/array';
        return await this.proxy.post(uri, ids);
    }

    async location(enlid: string): Promise<AgentLocation> {
        return await this.proxy.get(`/api/v1/agent/${enlid}/location`, {});
    }

    async whoami(): Promise<AgentDetail> {
        return await this.proxy.get('/api/v1/whoami', {});
    }

    async listTeams(): Promise<Team[]> {
        return await this.proxy.get('/api/v2/teams', {});
    }

    async teamDetails(teamid: number): Promise<TeamMember[]> {
        return await this.proxy.get(`/api/v2/teams/${teamid}`, {});
    }
}