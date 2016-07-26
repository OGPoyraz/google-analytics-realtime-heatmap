# Google-Analytics-Realtime-Heatmap

This repo uses Google Analytics Realtime API & Google Maps API to demonstrate a realtime heatmap.

I used Webpack-Babel-React but you dont need them actually.

[🦄 Working Demo](http://ogpoyraz.com/google-analytics-realtime-heatmap)

### Building

After you clone repo. You should

```javascript
npm install webpack -g
npm install
npm start
```
Browse http://localhost:3001

### Google API's I used

If you want to build your own project you should use your own API keys. For keeping it simply I'm using the following Google API's
-Analytics API
-Google Maps JavaScript API
-Google Maps Embed API
-Google Realtime API
You can check their own website for more information.

### About ActiveUsersOnMap Custom Component

More information about [Google Analytics Custom Components](https://developers.google.com/analytics/devguides/reporting/embed/v1/custom-components) from here. 

The key component is highly inspired from [here](https://github.com/googleanalytics/ga-dev-tools/blob/master/src/javascript/embed-api/components/active-users.js).
