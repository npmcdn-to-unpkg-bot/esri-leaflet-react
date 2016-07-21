import React, { Component } from 'react';
import _STORE from '../_store.js';
import {updateStatus} from '../common.js';

class EditProperties extends Component {
  cancelEdit () {
    if (_STORE.appStatus.data.feature) {
      const newStatus = {
        name: "edit",
        data: {
          layerId: _STORE.appStatus.data.layerId,
          feature: null
        }
      };
      updateStatus(newStatus);
      this.props.updateMapStatus();
    }
  }

  render () {
    let listHTML = [];
    if (_STORE.appStatus.data.feature) {
      const feature = _STORE.appStatus.data.feature.toGeoJSON();
      Object.keys(_STORE.layers[_STORE.appStatus.data.layerId].initData.propsField).forEach(function (field, iter) {
        const fieldName = _STORE.layers[_STORE.appStatus.data.layerId].initData.propsField[field];
        const fieldVal = feature.properties[field];
        listHTML.push((
          <div key={"field_" + iter}>
            <span>{fieldName}: </span>
            <span>{fieldVal}</span>
          </div>
        ));
      });
    }

    return (
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
        {
          !_STORE.appStatus.data.feature ?
            (
              <div>
                <div
                  className="btn"
                  onClick={
                    () => {

                    }
                  }
                >
                  New
                </div>
                <div
                  className="btn"
                  onClick={
                    () => {

                    }
                  }
                >
                  Delete
                </div>
              </div>
            ) :
            false
        }
        <br/>
        {listHTML}
        {
          _STORE.appStatus.data.feature ?
            (
              <div>
                <div
                  className="btn"
                  onClick={ this.cancelEdit.bind(this) }
                >
                  Cancel
                </div>
                  <div
                    className="btn"
                  >
                    Save
                  </div>
              </div>
            ) :
            false
        }
      </div>
    )
  }
};

export default EditProperties;
