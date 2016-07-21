import kap_rem_dor from './layers/kap_rem_dor'

let layerList = {
  layers: [
    {
      url: 'http://gisweb.chebtelekom.ru:8080/arcgis/rest/services/OKS/oks_culture/FeatureServer/0',
      popup: false,
      editable: false
    },
    kap_rem_dor
  ]
};
export default layerList;
