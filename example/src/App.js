import React, { Component } from 'react';

import layerList from './layerList.js';

import Map from './components/Map.js';
import MainPanel from './components/MainPanel.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    appStatus: {
      name: 'init',
      data: null
    },
  }

  updateMapStatus(status) {
    this.setState({appStatus: status});
  }

  render() {
    console.log('status', this.state.appStatus)
    return (
      <div>
        <Map
          baseMap="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layers={layerList.layers}
          updateMapStatus={this.updateMapStatus.bind(this)}
        />
        <div className="mainPanel">
          <div className="panelWr">
            {
              this.state.appStatus.name == "init" ? "Загрузка..." : <MainPanel appStatus={this.state.appStatus} updateMapStatus={this.updateMapStatus.bind(this)}/>
            }
          </div>
        </div>
      </div>
    );
  }
};

export default App;
