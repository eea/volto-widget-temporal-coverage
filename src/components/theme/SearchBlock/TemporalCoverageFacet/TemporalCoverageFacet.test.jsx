import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';
import TemporalCoverageFacetFilterListEntry from './TemporalCoverageFacetFilterListEntry';
import { Tick } from './SliderComponents';
import { Ticks } from 'react-compound-slider';
import TemporalCoverageFacet from './TemporalCoverageFacet';
const mockStore = configureStore([thunk]);

it('renders TemporalCoverageFacet', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    temporal: [
      { value: '1890', label: '1890' },
      { value: '1900-1905', label: '1900-1905' },
      { value: '1915', label: '1915' },
    ],
  });

  const component = render(
    <Provider store={store}>
      <TemporalCoverageFacet
        choices={[
          { value: '1890', label: '1890' },
          { value: '1900-1905', label: '1900-1905' },
          { value: '1915', label: '1915' },
        ]}
      />
    </Provider>,
  );
  expect(component.container).toMatchSnapshot();
});
it('renders TemporalCoverageFacetFilterListEntry', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    temporal: [
      { value: '1890', label: '1890' },
      { value: '1900-1905', label: '1900-1905' },
      { value: '1915', label: '1915' },
    ],
  });

  const component = render(
    <Provider store={store}>
      <TemporalCoverageFacetFilterListEntry
        facets={{ temporal_coverage: [1890, 1915] }}
        facet={'temporal_coverage'}
        choices={[
          { value: '1890', label: '1890' },
          { value: '1900-1905', label: '1900-1905' },
          { value: '1915', label: '1915' },
        ]}
      />
    </Provider>,
  );
  expect(component.container).toMatchSnapshot();
});

it('test valueToQuery facet function', () => {
  return expect(
    TemporalCoverageFacet.valueToQuery({
      value: [2003, 2005],
      facet: { field: { value: 'temporal' } },
    }),
  ).toEqual({
    i: 'temporal',
    o: 'plone.app.querystring.operation.list.contains',
    v: ['2003', '2004', '2005'],
  });
});

it('renders Slider Ticks', () => {
  const component = render(
    <Ticks count={5}>
      {({ ticks }) => (
        <div className="slider-ticks">
          {ticks.map((tick) => (
            <Tick key={tick.id} tick={tick} count={ticks.length} />
          ))}
        </div>
      )}
    </Ticks>,
  );
  expect(component.container).toMatchSnapshot();
});
