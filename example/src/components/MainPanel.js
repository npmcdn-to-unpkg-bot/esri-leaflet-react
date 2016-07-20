import React, { Component } from 'react';
import _STORE from '../_store.js';

class MainPanel extends Component {
  state = {
    appStatus: _STORE.appStatus
  }

  switchToEdit (layerId) {
    let status;
    if (layerId) {
      status = {
        name: "edit",
        data: {
          layerId: layerId
        }
      };
    } else {
      status = {
        name: "browse",
        data: null
      };
    }
    // _STORE.appStatus = status;
    // this.setState({
    //   appStatus: status
    // });
    this.props.updateMapStatus(status);
  }

  componentDidMount() {

  }

  render () {
    const _this = this;
    let titleHTML;
    let dataHTML = [];

    switch (this.props.appStatus.name) {

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
              <span
                className="btn"
                onClick={
                   () => {
                     _this.switchToEdit(layerId);
                   }
                }
              >
                Edit
              </span>
            </div>
          ))
        });
        break;
      // ---------------------------------------
      case "showAsPopup":
        console.log(_this.props.appStatus.data.featureJSON);
        titleHTML = "Object from layer " + _STORE.layers[_this.props.appStatus.data.layerId].initData.title;
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
            <div>{_this.props.appStatus.data.featureJSON.id}</div>
          </div>
        );
        break;
      // ---------------------------------------
      case "edit":
        titleHTML = "Edit layer: " + _STORE.layers[_this.props.appStatus.data.layerId].initData.title;
        dataHTML = (
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
        )

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
