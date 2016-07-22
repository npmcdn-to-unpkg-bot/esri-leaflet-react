import React, { Component } from 'react';
import _STORE from '../_store.js';
import {updateStatus} from '../common.js';

import EditProperties from './EditProperties.js';

class MainPanel extends Component {
  // state = {
  //   appStatus: _STORE.appStatus
  // }

  switchToEdit (layerId) {
    let status;
    if (layerId) {
      status = {
        name: "edit",
        subname: "noFeaturSelect",
        data: {
          layerId: layerId,
          feature: null
        }
      };
    } else {
      status = {
        name: "browse",
        subname: "allLayers",
        data: null
      };
    }
    updateStatus(status);
    this.props.updateMapStatus();
  }

  componentDidMount() {

  }

  render () {
    const _this = this;
    let titleHTML;
    let dataHTML = [];
    let tmp;
    let tmp2;


      // ---------------------------------------
    if (_STORE.appStatus.name == "browse" && _STORE.appStatus.subname == "allLayers") {
      titleHTML = "Browser";
      Object.keys(_STORE.layers).forEach(function (layerId) {
        const layerInit = _STORE.layers[layerId].initData;
        dataHTML.push((
          <div key={ "lay_" + layerId }>
            <span>
              { layerInit.title }
            </span>
            {
              layerInit.editable ?
              (<span
                className="btn"
                onClick={
                   () => {
                     _this.switchToEdit(layerId);
                   }
                }
              >
                Edit
              </span>) :
              false
            }
          </div>
        ))
      });
    }
    // ---------------------------------------
    if (_STORE.appStatus.name == "browse" && _STORE.appStatus.subname == "featureDetail") {
      titleHTML = "Object from layer " + _STORE.layers[_STORE.appStatus.data.layerId].initData.title;
      tmp = [];
      tmp2 = _STORE.layers[_STORE.appStatus.data.layerId].initData;
      if (tmp2.propsField) {
        Object.keys(tmp2.propsField).forEach(function (field, iter) {
          const fieldName = tmp2.propsField[field];
          const fieldVal = _STORE.appStatus.data.featureJSON.properties[field];
          tmp.push((
            <div key={"field_" + iter}>
              <span>{fieldName}: </span>
              <span>{fieldVal}</span>
            </div>
          ));
        });
      } else {
        Object.keys(_STORE.appStatus.data.featureJSON.properties).forEach(function (field, iter) {
          tmp.push((
            <div key={"field_" + iter}>
              <span>{field}: </span>
              <span>{_STORE.appStatus.data.featureJSON.properties[field]}</span>
            </div>
          ));
        });
      }
      dataHTML = (
        <div>
          <div
            className="btn"
            onClick={
              () => {
                _this.switchToEdit();
              }
            }
          >
            Back to all layers
          </div>
          <div>{tmp}</div>
        </div>
      );
    }
    // ---------------------------------------
    if (_STORE.appStatus.name == "edit" && _STORE.appStatus.subname == "noFeaturSelect") {
      dataHTML = (
        <div>
          <div
            className="btn"
            onClick={
              () => {
                 _this.switchToEdit();
              }
            }
          >
            Close edit
          </div>
        </div>
      );
      titleHTML = "Edit layer: " + _STORE.layers[_STORE.appStatus.data.layerId].initData.title;
    }
    // ---------------------------------------
    if (_STORE.appStatus.name == "edit" && _STORE.appStatus.subname == "editFeature") {
      dataHTML = (
        <div>
          <div
            className="btn"
            onClick={
              () => {
                 _this.switchToEdit();
              }
            }
          >
            Close edit
          </div>
          <EditProperties updateMapStatus={this.props.updateMapStatus} appStatus={_STORE.appStatus}/>
        </div>
      );
      titleHTML = "Edit layer: " + _STORE.layers[_STORE.appStatus.data.layerId].initData.title;
    }


    return (
      <div>
        <h3>{ titleHTML }</h3>
        { dataHTML }
      </div>
    );
  }

};

export default MainPanel;
