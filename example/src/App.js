import React, { Component } from 'react';
import _STORE from './_store.js';

import layerList from './layerList.js';

import Map from './components/Map.js';
import MainPanel from './components/MainPanel.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    appStatus: _STORE.appStatus,
  }

  updateMapStatus() {
    this.setState({appStatus: _STORE.appStatus});
  }

  render() {
    console.log('last status', _STORE.lastStatus);
    console.log('status', _STORE.appStatus);
    console.log('-------------------------');
    return (
      <div>
        <Map
          baseMap="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layers={layerList.layers}
          updateMapStatus={::this.updateMapStatus}
        />
        <div className="mainPanel">
          <div className="panelWr">
            {
              this.state.appStatus.name == "init" ? "Загрузка..." : <MainPanel updateMapStatus={::this.updateMapStatus}/>
            }
          </div>
        </div>
      </div>
    );
  }
};

export default App;
