# Foobot Node SDK

[Foobot API documentation](https://api.foobot.io/apidoc/index.html)

This is a simple SDK that wraps the Foobot API. In order to
use it, get yourself a foobot and create a user with a
password and an API key (secret key).

## Usage
Create a Foobot with `new Foobot(user, password, key)`. You
can also pass in the version as a fourth argument.
*Currently, only `v2` is supported and is the default*.

Use either of:

    import Foobot from "foobotjs";
    const Foobot = require("foobotjs").default

The API is promise-based, so all methods return promises.

## `Foobot`
The Foobot object makes requests to the Foobot API on your
behalf based on the credentials you provide.

### `getDevices`
Returns a list of `Device`s associated with this user.

    const devices = await foobot.getDevices();
    devices.map(device => console.log(device.uuid));

### `getDataPoints`
Requests `getDataPoints` for the _first_ `Device` on your
account. Useful if you only have one device.

## `Device`
You shouldn't need to instantiate a device, but this object
is returned from `getDevices`.

### `getDataPoints`
This takes one to three arguments:

* period / start (default: 0, only `start` if `end`
 is provided)
* averageBy (default: 0)
* end (default: "last")

Gets data points over the requested period and provided
average time. If `end` (third argument) is not provided,
the `start` is considered the `period` and you will get
the latest data points automatically. Use no arguments
to get the last data point.

## Example
This will get all registered devices and print out the
last data point for each:

    const foobot = new Foobot(USER, PASS, KEY);
    (async () => {
        const devices = await foobot.getDevices();
        const dataPointResults = await Promise.all(devices.map(device => device.getDataPoints()));
        dataPointResults.map(dataPointResult => console.log(dataPointResult.datapoints[0]));
    })();
