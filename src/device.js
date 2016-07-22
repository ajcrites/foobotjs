export default class Device {
    constructor(deviceData, requestor) {
        this.deviceData = deviceData;
        this.uuid = deviceData.uuid;
        this.requestor = requestor;
    }

    async getDataPoints(period = 0, averageBy = 0, end = "last") {
        const response = await this.requestor.apiRequest("get", `/device/${this.uuid}/datapoint/${period}/${end}/${averageBy}/`);
        return response.data;
    }
}
