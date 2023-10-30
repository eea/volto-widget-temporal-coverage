import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';
import TemporalCoverageFacetFilterListEntry from './TemporalCoverageFacetFilterListEntry';

const mockStore = configureStore([thunk]);

it('renders an temporal widget edit component with existing temporal ranges and single values', () => {
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
      <TemporalCoverageFacetFilterListEntry facets={[]} />
    </Provider>,
  );
  expect(component.container).toMatchSnapshot();
});
