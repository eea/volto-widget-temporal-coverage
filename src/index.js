import { TemporalWidgetEdit } from './components';

const applyConfig = (config) => {
  config.widgets.widget = {
    ...config.widgets.widget,
    temporal: TemporalWidgetEdit,
  };
  return config;
};

export default applyConfig;
