import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom/extend-expect';

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

  const { container } = render(
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
  expect(
    container.querySelector('.temporal-facet .ui.form.years-input .ui.input'),
  ).toBeInTheDocument();
  expect(
    container.querySelector(
      '.temporal-facet .ui.form.years-input .ui.input.right',
    ),
  ).toBeInTheDocument();

  expect(
    container.querySelector('input[max="1915"][min="1890"]'),
  ).toBeInTheDocument();
  expect(
    container.querySelector('.ui.input input[max="1915"][min="1890"]'),
  ).toHaveValue(1890);
  expect(
    container.querySelector('.ui.input.right input[max="1915"][min="1890"]'),
  ).toHaveValue(1915);

  expect(container.querySelector('.slider-handles')).toBeInTheDocument();
  expect(
    container.querySelector(
      '.slider-handles div[aria-valuemax="1915"][aria-valuemin="1890"][aria-valuenow="1890"][role="slider"]',
    ),
  ).toBeInTheDocument();
  expect(
    container.querySelector(
      '.slider-handles div[aria-valuemax="1915"][aria-valuemin="1890"][aria-valuenow="1915"][role="slider"]',
    ),
  ).toBeInTheDocument();

  expect(container.querySelector('.slider-ticks')).toBeInTheDocument();
  expect(screen.getByText(1890)).toHaveStyle('left: 0%');
  expect(screen.getByText(1895)).toHaveStyle('left: 20%');
  expect(screen.getByText(1900)).toHaveStyle('left: 40%');
  expect(screen.getByText(1905)).toHaveStyle('left: 60%');
  expect(screen.getByText(1910)).toHaveStyle('left: 80%');
  expect(screen.getByText(1915)).toHaveStyle('left: 100%');
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

  const { container } = render(
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
  expect(container.querySelector('.ui.small.label > i')).toBeInTheDocument();
  expect(screen.getByText('Yes')).toBeInTheDocument();
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
  const { container } = render(
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

  expect(container.querySelector('.slider-ticks')).toBeInTheDocument();
  expect(screen.getByText(0)).toHaveStyle('left: 0%');
  expect(screen.getByText(0.2)).toHaveStyle('left: 0.2%');
  expect(screen.getByText(0.4)).toHaveStyle('left: 0.4%');
  expect(screen.getByText(0.6)).toHaveStyle('left: 0.6%');
  expect(screen.getByText(0.8)).toHaveStyle('left: 0.8%');
  expect(screen.getByText(1)).toHaveStyle('left: 1%');
});
