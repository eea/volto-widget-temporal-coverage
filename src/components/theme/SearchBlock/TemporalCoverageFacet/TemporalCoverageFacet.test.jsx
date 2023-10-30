import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';
import TemporalCoverageFacetFilterListEntry from './TemporalCoverageFacetFilterListEntry';
import { Tick } from './SliderComponents';
import { Ticks } from 'react-compound-slider';
const mockStore = configureStore([thunk]);

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
        facets={[]}
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
