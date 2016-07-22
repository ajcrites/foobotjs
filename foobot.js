import Requestor from "./requestor";

export default class Foobot {
    constructor(user, password, key, version = "v2") {
        this.user = user;
        this.requestor = new Requestor(user, password, key, version);
    }

    getDevices() {
        return this.requestor.apiRequest("get", `/owner/${this.user}/device/`);
    }
}
