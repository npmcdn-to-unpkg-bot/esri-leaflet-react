import React, { Component } from 'react';
import _STORE from '../_store.js';

class Map extends Component {
  constructor(props) {
    super(props);
  }

  onEachLayer (layerId) {
    const _this = this;
    _STORE.layers[layerId].layerObj.on('click', function (e) {
      var feature = e.layer.toGeoJSON();
      console.log(feature);
      _this.props.updateMapStatus({
        name: 'showAsPopup',
        data: {
          layerId: layerId,
          featureJSON: e.layer.toGeoJSON()
        }
      });
    });
  }

  componentDidMount() {
    const _this = this;
    _STORE.map = L.map('map', {editable: true}).setView([56.140763, 47.237491], 13);
    if (this.props.baseMap) {
      L.tileLayer(this.props.baseMap).addTo(_STORE.map);
    }

    if (this.props.layers) {
      this.props.layers.forEach(function (layer, iter) {
        _STORE.layers[iter] = {};
        _STORE.layers[iter].initData = layer;
        !_STORE.layers[iter].initData.title ? _STORE.layers[iter].initData.title = "Безымянный слой" : false;
        _STORE.layers[iter].layerObj = L.esri.featureLayer({
          url: layer.url,
        }).addTo(_STORE.map);

        _this.onEachLayer(iter);
      });
    }
    this.props.updateMapStatus({name: 'browse'});
  }

  render() {
    return (<div id="map"></div>);
  }

};
export default Map;
