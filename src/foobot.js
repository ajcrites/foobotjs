import Requestor from "./requestor";
import Device from "./device";

export default class Foobot {
    constructor(user, password, key, version = "v2") {
        this.user = user;
        this.cachedDevice = null;
        this.requestor = new Requestor(user, password, key, version);
    }

    async getDevices() {
        const deviceListResponse = await this.requestor.apiRequest("get", `/owner/${this.user}/device/`);
        return deviceListResponse.data.map(device => new Device(device, this.requestor));
    }

    async getDataPoints() {
        if (!this.cachedDevice) {
            const devices = await this.getDevices();
            this.cachedDevice = devices[0];
        }
        return this.cachedDevice.getDataPoints.apply(this.cachedDevice, arguments);
    }
}
