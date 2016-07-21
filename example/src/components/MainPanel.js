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
        data: {
          layerId: layerId,
          feature: null
        }
      };
    } else {
      status = {
        name: "browse",
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

    switch (_STORE.appStatus.name) {

      // ---------------------------------------
      case "browse":
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
        break;
      // ---------------------------------------
      case "showAsPopup":
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
        break;
      // ---------------------------------------
      case "edit":
        dataHTML = (<EditProperties updateMapStatus={this.props.updateMapStatus} />);
        titleHTML = "Edit layer: " + _STORE.layers[_STORE.appStatus.data.layerId].initData.title;
        break;
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
