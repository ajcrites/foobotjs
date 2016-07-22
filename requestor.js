/**
 * Make API requests on behalf of the Foobot and associated devices
 */
import axios from "axios";

export default class Requestor {
    constructor(user, password, key, version = "v2") {
        this.user = user;
        this.password = password;
        this.key = key;
        this.version = version;
        // Created upon requests
        this.authKey = null;

        this.http = axios.create({
            baseURL: `https://api.foobot.io/${this.version}/`,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json;charset=UTF-8",
                "X-API-KEY-TOKEN": this.key,
            },
        });
    }

    async apiRequest(method, url, data) {
        try {
            return await this.http({
                method,
                url,
                headers: {
                    "X-AUTH-TOKEN": this.authKey,
                },
            });
        }
        catch (err) {
            // If we are not logged in, attempt to authenticate and retry
            if (401 === err.response.status) {
                await this.authorize();

                return this.apiRequest.call(this, method, url, data);
            }

            // Propogate any other errors
            throw err;
        }
    }

    async authorize() {
        const response = await this.http({
            method: "post",
            url: `/user/${this.user}/login/`,
            data: {
                userName: this.user,
                password: this.password,
            },
        });

        // Foobot responds with a 200 but `false` body if it can't provide
        // an auth token, possibly due to incorrect password
        if (!response.data) {
            throw new Error(`Unable to authorize with Foobot.
Username or Password may be incorrect, but the key seems to be correct`);
        }
        this.authKey = response.headers["x-auth-token"];
    }
}
