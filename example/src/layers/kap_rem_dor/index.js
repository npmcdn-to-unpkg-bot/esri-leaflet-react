import _STORE from '../../_store.js';

const editor = (layerId) => {
  console.log('editor', layerId);
};
export default {
  title: 'Капремонт дорог 2015',
  url: 'https://chebtelekom.ru/arcgis/rest/services/dorogi/kap_rem_dor_2015/FeatureServer/0',
  propsField: {
    "исполнитель": "Исполнитель",
    "наименование": "Наименование",
    "объем_кв_м_": "объем (кв.м.)",
    "район": "Район"
  },
  popup: false,
  editable: true
};
