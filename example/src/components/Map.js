import React, { Component } from 'react';
import _STORE from '../_store.js';
import {updateStatus} from '../common.js';

class Map extends Component {
  constructor(props) {
    super(props);
  }

  onEachLayer (layerId) {
    const _this = this;
    _STORE.layers[layerId].layerObj.on('click', function (e) {
      if (_STORE.appStatus.name !== "edit") {
        updateStatus({
          name: 'showAsPopup',
          data: {
            layerId: layerId,
            featureJSON: e.layer.toGeoJSON()
            // propsField: _STORE.layers[layerId].initData.propsField
          }
        });
        _this.props.updateMapStatus();
      };
      if (_STORE.appStatus.name == "edit") {
        updateStatus({
          name: 'editFeature',
          data: {
            layerId: layerId,
            feature: e.layer
          }
        });
        _this.props.updateMapStatus();
      }
    });
  }

  initEdit (layerId, isInit) {
    console.log(isInit ? "init edit" : "disinit edit");
    Object.keys(_STORE.layers[layerId].layerObj._layers).forEach(function (featureId) {
      const feature = _STORE.layers[layerId].layerObj._layers[featureId];
      if (isInit) {
        feature.on('click', L.DomEvent.stop).on('click', feature.toggleEdit);
      } else {
        feature.off('click', L.DomEvent.stop).off('click', feature.toggleEdit);
      }
    });
  }


  componentDidMount () {
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

    _STORE.map.editTools.on('editable:enable', function (e) {
      const newStatus = {
        name: "edit",
        data: {
          layerId: _STORE.appStatus.data.layerId,
          feature: e.layer
        }
      };
      if (_STORE.appStatus.data.feature) _STORE.appStatus.data.feature.disableEdit();
      this.fire('editable:enabled');
      updateStatus(newStatus);
      _this.props.updateMapStatus();
    });

    _STORE.map.editTools.on('editable:disable', function (e) {
      if (_STORE.appStatus.data) {
        const newStatus = {
          name: "edit",
          data: {
            layerId: _STORE.appStatus.data.layerId,
            feature: null
          }
        };
        // if (_STORE.lastStatus.data.feature) {
        //   _STORE.lastStatus.data.feature.disableEdit();
        // }

        // updateStatus(newStatus);
        // _this.props.updateMapStatus();
      }
    });

    updateStatus({name: 'browse'});
    this.props.updateMapStatus();
  }

  render() {
    if (_STORE.appStatus.name == "edit" && _STORE.lastStatus.name == "browse") {
      this.initEdit(_STORE.appStatus.data.layerId, true);
    }
    if (_STORE.appStatus.name == "browse" && _STORE.lastStatus.name == "edit") {
      this.initEdit(_STORE.appStatus.data.layerId);
    }
    if (_STORE.appStatus.name == "browse" && _STORE.lastStatus.name == "editFeature") {
      this.initEdit(_STORE.lastStatus.data.layerId);
      _STORE.lastStatus.data.feature.disableEdit();
    }
    if (_STORE.lastStatus.name == "editFeature" && _STORE.appStatus.name == "edit") {
      if (_STORE.lastStatus.data.feature && !_STORE.appStatus.data.feature) {
        _STORE.lastStatus.data.feature.disableEdit();
      }
    }
    return (<div id="map"></div>);
  }

};
export default Map;
