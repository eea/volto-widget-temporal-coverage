import { TemporalWidgetEdit, TemporalWidgetView } from './components';
import TemporalCoverage from '@eeacms/volto-widget-temporal-coverage/components/theme/SearchBlock/TemporalCoverageFacet/TemporalCoverageFacet';
import TemporalCoverageFacetFilterListEntry from '@eeacms/volto-widget-temporal-coverage/components/theme/SearchBlock/TemporalCoverageFacet/TemporalCoverageFacetFilterListEntry';

const applyConfig = (config) => {
  config.widgets.widget.temporal = TemporalWidgetEdit;

  // volto-widgets-view
  if (config.widgets.views?.widget) {
    config.widgets.views.widget.temporal = TemporalWidgetView;
  }

  //Add Temporal Coverage Facet
  if (config?.blocks?.blocksConfig?.search) {
    config.blocks.blocksConfig.search.extensions.facetWidgets.types = [
      ...config.blocks.blocksConfig.search.extensions.facetWidgets.types,
      {
        id: 'time_covereage',
        title: 'Temporal Coverage',
        view: TemporalCoverage,
        isDefault: false,
        stateToValue: TemporalCoverage.stateToValue,
        valueToQuery: TemporalCoverage.valueToQuery,
        filterListComponent: TemporalCoverageFacetFilterListEntry,
      },
    ];
  }

  return config;
};

export default applyConfig;
