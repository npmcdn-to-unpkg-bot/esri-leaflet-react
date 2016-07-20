import _STORE from '../../_store.js';

const popup = (layerId) => {
  const layer = _STORE.layers[layerId].layerObj;
  if (_STORE.appStatus.name == "browse") {
    layer.bindPopup(function (evt) {
      // console.log(evt.feature);
      // var geometry = evt.feature.geometry.coordinates;
      // var multi = L.polygon([reverser(geometry)]).addTo(map);
      // multi.enableEdit();
      return L.Util.template(
        '<p><b>наименование: </b> ' + evt.feature.properties['наименование'] + '</p>' +
        '<p><b>объем_кв_м: </b> ' + evt.feature.properties['объем_кв_м_'] + '</p>' +
        '<p><b>протяженность_п_м: </b> ' + evt.feature.properties['протяженность_п_м'] + '</p>' +
        '<p><b>район: </b> ' + evt.feature.properties['район'] + '</p>' +
        '<p><b>исполнитель: </b> ' + evt.feature.properties['исполнитель'] + '</p>',
        evt.feature.properties
      );
    });
  } else {
    layer.unbindPopup();
  }
};
const editor = (layerId) => {
  console.log('editor', layerId);
};
export default {
  title: 'Капремонт дорог 2015',
  url: 'https://chebtelekom.ru/arcgis/rest/services/dorogi/kap_rem_dor_2015/FeatureServer/0',
  popup: popup,
  editor: editor
};
