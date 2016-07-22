import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _STORE from '../_store.js';
import {updateStatus} from '../common.js';

class EditProperties extends Component {
  constructor(props) {
    super(props);
    const _this = this;
    // _this.state.fields = {};
    const feature = _STORE.appStatus.data.feature.toGeoJSON();
    Object.keys(_STORE.layers[_STORE.appStatus.data.layerId].initData.propsField).forEach(function (field, iter) {
      // const fieldName = _STORE.layers[_STORE.appStatus.data.layerId].initData.propsField[field];
      const fieldVal = feature.properties[field];
      _this.state[field] = fieldVal;
    });
  }

  state = {
    // appStatus: _STORE.appStatus,
  }

  componentWillReceiveProps () {
    const _this = this;
    // _this.state.fields = {};
    const data = {};
    const feature = _STORE.appStatus.data.feature.toGeoJSON();
    Object.keys(_STORE.layers[_STORE.appStatus.data.layerId].initData.propsField).forEach(function (field, iter) {
      // const fieldName = _STORE.layers[_STORE.appStatus.data.layerId].initData.propsField[field];
      const fieldVal = feature.properties[field];
      data[field] = fieldVal;
    });
    _this.setState(data);
  }

  cancelEdit () {
    if (_STORE.appStatus.data.feature) {
      const newStatus = {
        name: "edit",
        subname: "noFeaturSelect",
        data: {
          layerId: _STORE.appStatus.data.layerId,
          feature: null
        }
      };
      updateStatus(newStatus);
      this.props.updateMapStatus();
    }
  }

  saveFeature () {
    console.log(this.state);
    // TODO: post-request for saving data
    updateStatus({
      name: 'edit',
      subname: 'noFeaturSelect',
      data: {
        layerId: _STORE.appStatus.data.layerId,
        feature: null
      }
    });
    this.props.updateMapStatus();
  }

  render () {
    const _this = this;
    let listHTML = [];
    // const feature = _STORE.appStatus.data.feature.toGeoJSON();
    const feature = _this.state;
    Object.keys(_STORE.layers[_STORE.appStatus.data.layerId].initData.propsField).forEach(function (field, iter) {
      const fieldName = _STORE.layers[_STORE.appStatus.data.layerId].initData.propsField[field];
      const fieldVal = feature[field];
      listHTML.push((
        <div key={"field_" + iter}>
          <span>{fieldName}: </span>
          <input
            type="text"
            value={fieldVal}
            onChange={
              (evnt) => {
                const tmp = {};
                tmp[field] = evnt.target.value;
                _this.setState(tmp);
              }
            }
          />
        </div>
      ));
    });

    return (
      <div>
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
                    onClick={ this.saveFeature.bind(this) }
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
