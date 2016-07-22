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
      if (_STORE.appStatus.name == "browse") {
        updateStatus({
          name: 'browse',
          subname: 'featureDetail',
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
          name: 'edit',
          subname: 'editFeature',
          data: {
            layerId: layerId,
            feature: e.layer
          }
        });
        _this.props.updateMapStatus();
      }
    });
  }

  isInitEdit () {
    let isInit = false;
    let isDisinit = false;
    let layerId;
    if (_STORE.appStatus.name == "edit" && _STORE.lastStatus.name == "browse") {
      isInit = true;
      isDisinit = false;
      layerId = _STORE.appStatus.data.layerId;
    }
    if (
      _STORE.appStatus.name == "browse" &&
      _STORE.lastStatus.name == "edit" &&
      _STORE.lastStatus.subname == "noFeaturSelect"
    ) {
      isInit = false;
      isDisinit = true;
      layerId = _STORE.lastStatus.data.layerId;
    }
    if (
      _STORE.appStatus.name == "browse" &&
      _STORE.lastStatus.name == "edit" &&
      _STORE.lastStatus.subname == "editFeature"
    ) {
      isInit = false;
      isDisinit = true;
      layerId = _STORE.lastStatus.data.layerId;
      _STORE.lastStatus.data.feature.disableEdit();
    }
    if (
      _STORE.appStatus.name == "edit" &&
      _STORE.appStatus.subname == "noFeaturSelect" &&
      _STORE.lastStatus.name == "edit" &&
      _STORE.lastStatus.subname == "editFeature"
    ) {
      isInit = false;
      isDisinit = false;
      _STORE.lastStatus.data.feature.disableEdit();
    }
    if (
      _STORE.appStatus.name == "edit" &&
      _STORE.appStatus.subname == "editFeature" &&
      _STORE.lastStatus.name == "edit" &&
      _STORE.lastStatus.subname == "editFeature"
    ) {
      isInit = false;
      isDisinit = false;
      _STORE.lastStatus.data.feature.disableEdit();
      // _STORE.lastStatus.data.feature.toggleEdit;
    }


    if (isInit || isDisinit) {
      Object.keys(_STORE.layers[layerId].layerObj._layers).forEach(function (featureId) {
        const feature = _STORE.layers[layerId].layerObj._layers[featureId];
        if (isInit) {
          feature.on('click', L.DomEvent.stop).on('click', feature.toggleEdit);
        } else if (isDisinit) {
          feature.off('click', L.DomEvent.stop).off('click', feature.toggleEdit);
        }
      });
    }
    console.log(isInit ? "init edit" : isDisinit ? "disinit edit" : "nothing");
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
      console.log('1');
      // const newStatus = {
      //   name: "edit",
      //   data: {
      //     layerId: _STORE.appStatus.data.layerId,
      //     feature: e.layer
      //   }
      // };
      // if (_STORE.appStatus.data.feature) _STORE.appStatus.data.feature.disableEdit();
      // this.fire('editable:enabled');
      // updateStatus(newStatus);
      // _this.props.updateMapStatus();
    });

    _STORE.map.editTools.on('editable:disable', function (e) {
      console.log('2');
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

    updateStatus({
      name: 'browse',
      subname: 'allLayers',
      data: null
    });
    this.props.updateMapStatus();
  }

  render() {
    this.isInitEdit();
    return (<div id="map"></div>);
  }

};
export default Map;
