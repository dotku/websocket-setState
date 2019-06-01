# WebSocket and React setState Throuble shooting

The websocket data would be ~10mb in size. WebSocket take ~200ms on transaction but setState would take around ~7s which would take too much time.

```
messageTimeCost 95
onmessage
["templates"]
parseTimeCost 1
messageTimeCost 344
onmessage
["project"]
parseTimeCost 269
messageTimeCost 6
onmessage
["uiState"]
parseTimeCost 0
messageTimeCost 0
onmessage
["connectionState"]
parseTimeCost 0
```

Test repo is used to test and find out the root cause of the time consume.

## Report

1. The jest testing is using node instead of simulate of webbrowser, the speed would be around 30% improvement (eg from ~300ms to ~200ms).
2. The WebSocket between node and javascript is slightly different.

```
ws.on('message', () => {}); // node.js with ws npm package
ws.onmessage = () => {}; // javascript
```

3. Server should control the websocket session number, it could slow down the transation speed from 300ms to 600ms once it reach to ~10 connections. The connections sessions will reset to 0 after ~20 connections and client won't able to receive the data anymore.
