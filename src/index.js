import { TemporalWidget } from './components';

const applyConfig = (config) => {
  config.widgets.widget = {
    ...config.widgets.widget,
    temporal: TemporalWidget,
  };
  return config;
};

export default applyConfig;
