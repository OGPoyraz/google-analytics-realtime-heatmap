import APP_KEYS from './APPKEYS';
import Header from './commons/header';
import React from 'react';
import {render} from 'react-dom';
import './styles.scss';


class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // Google Map init
        var initMap = function () {
            var mapCenter = new google.maps.LatLng(25, 0);
            var mapOptions = {
                zoom: 3,
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                draggable: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: mapCenter,
                styles: [{
                    "featureType": "administrative",
                    "elementType": "all",
                    "stylers": [{"visibility": "on"}, {"lightness": 33}]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#a30000"}, {"lightness": 20}, {"visibility": "off"}]
                }, {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{"color": "#f2e5d4"}]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{"color": "#c5dac6"}]
                }, {
                    "featureType": "poi.park",
                    "elementType": "labels",
                    "stylers": [{"visibility": "on"}, {"lightness": 20}]
                }, {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [{"lightness": 20}]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{"color": "#c5c6c6"}]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{"color": "#e4d7c6"}]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{"color": "#fbfaf7"}]
                }, {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{"visibility": "on"}, {"color": "#acbcc9"}]
                }]
            };
            window.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            window.heatmap = new google.maps.visualization.HeatmapLayer({
                data: [],
                map: map,
                opacity: 0
            });
        }();


        // GAPI Ready function
        gapi.analytics.ready(function () {


            // Creating ActiveUsersOnMap component
            gapi.analytics.createComponent('activeUsersOnMap', {

                initialize: function () {
                    this.activeUsersOnMap = [];
                },
                execute: function () {
                    // Stop any polling currently going on.
                    if (this.polling_) {
                        this.stop();
                    }
                    // Wait until the user is authorized.
                    if (gapi.analytics.auth.isAuthorized()) {
                        this.pollactiveUsersOnMap_();
                    }
                },
                stop: function () {
                    clearTimeout(this.timeout_);
                    this.polling_ = false;
                    this.emit('stop', {activeUsersOnMap: this.activeUsersOnMap});
                },
                pollactiveUsersOnMap_: function () {
                    let options = this.get();
                    let pollingInterval = (options.pollingInterval || 5) * 1000;
                    if (isNaN(pollingInterval) || pollingInterval < 5000) {
                        throw new Error('Frequency must be 5 seconds or more.');
                    }
                    this.polling_ = true;
                    gapi.client.analytics.data.realtime
                        .get({
                            ids: options.ids,
                            metrics: 'rt:activeUsers',
                            dimensions: 'rt:latitude,rt:longitude,rt:city'
                        })
                        .then(function (response) {
                            let newValue = response.result.rows;
                            this.emit('success', {activeUsersOnMap: this.activeUsersOnMap});
                            this.onChange_(newValue);
                            if (this.polling_ == true)
                                this.timeout_ = setTimeout(this.pollactiveUsersOnMap_.bind(this), pollingInterval);
                        }.bind(this));
                },
                onChange_: function (newValue) {

                    var newHeatMapData = [];

                    if (newValue)
                        for (var node of newValue) {
                            newHeatMapData.push(new google.maps.LatLng(node[0], node[1]));
                        }

                    heatmap.setData(newHeatMapData);
                    heatmap.set('radius', 10);
                    heatmap.set('gradient', [
                        'rgba(0, 255, 255, 0)',
                        'rgba(0, 255, 255, 1)',
                        'rgba(0, 191, 255, 1)',
                        'rgba(0, 127, 255, 1)',
                        'rgba(0, 63, 255, 1)',
                        'rgba(0, 0, 255, 1)',
                        'rgba(0, 0, 223, 1)',
                        'rgba(0, 0, 191, 1)',
                        'rgba(0, 0, 159, 1)',
                        'rgba(0, 0, 127, 1)',
                        'rgba(63, 0, 91, 1)',
                        'rgba(127, 0, 63, 1)',
                        'rgba(191, 0, 31, 1)',
                        'rgba(255, 0, 0, 1)'
                    ]);
                    window.opacityChanging = "increasing";

                    clearInterval(window.opacityTimer);

                    window.opacityTimer = setInterval(function changeOpacity() {

                        var o = heatmap.get('opacity');

                        window.opacityChanging == "increasing" ?
                            heatmap.set('opacity', o + 0.005) :
                            heatmap.set('opacity', o - 0.005);

                        heatmap.get('opacity') > 0.9 ?
                            window.opacityChanging = "decreasing" :
                            heatmap.get('opacity') < 0.2 ?
                                window.opacityChanging = "increasing" : "";

                    }, 10);

                }
            });

            window.activeUsersOnMap = new gapi.analytics.ext.activeUsersOnMap({
                pollingInterval: 5
            });

            // Google auth button init
            gapi.analytics.auth.authorize({
                container: 'auth-button',
                clientid: APP_KEYS.googleClientId,
            });

            // Google view selector init
            var viewSelector = new gapi.analytics.ViewSelector({
                container: 'view-selector'
            });

            viewSelector.on('change', function (ids) {
                document.getElementById('auth-button').style.display = 'none';
                document.getElementById('logout').style.display = 'block';
                var data = {
                    ids: ids
                };
                window.activeUsersOnMap.set(data).execute();
            });
            viewSelector.execute();

        });

    }

    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div id="map">
                </div>
            </div>

        );
    }
}

render(<Index />, document.getElementById('app'));