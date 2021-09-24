import { TemporalWidgetEdit, TemporalWidgetView } from './components';

const applyConfig = (config) => {
  config.widgets.widget = {
    ...config.widgets.widget,
    temporal: TemporalWidgetEdit,
  };

  // volto-widgets-view
  if (config.widgets.views?.widget) {
    config.widgets.views.widget.temporal = TemporalWidgetView;
  }

  return config;
};

export default applyConfig;
