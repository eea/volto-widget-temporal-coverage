import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import TemporalWidget from './TemporalWidget';

const mockStore = configureStore();

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

test('renders an temporal widget edit component', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    temporal: [{ value: '1900', label: '1900' }],
  });
  const state = store.getState();
  const component = render(
    <Provider store={store}>
      <TemporalWidget
        value={state}
        id="temporal"
        title="My field"
        onChange={() => {}}
      />
    </Provider>,
  );
  expect(component.container).toMatchSnapshot();
});

test('renders an temporal widget edit component with ranges', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    temporal: [
      { value: '1900', label: '1900' },
      { value: '1901', label: '1901' },
    ],
  });
  const state = store.getState();
  const component = render(
    <Provider store={store}>
      <TemporalWidget
        value={state}
        id="temporal"
        title="My field"
        onChange={() => {}}
      />
    </Provider>,
  );
  expect(component.container).toMatchSnapshot();
});

test('renders an temporal widget edit component with ranges and single values', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    temporal: [
      { value: '1900', label: '1900' },
      { value: '1901', label: '1901' },
      { value: '1905', label: '1905' },
      { value: '1907', label: '1907' },
    ],
  });
  const state = store.getState();
  const component = render(
    <Provider store={store}>
      <TemporalWidget
        value={state}
        id="temporal"
        title="My field"
        onChange={() => {}}
      />
    </Provider>,
  );
  expect(component.container).toMatchSnapshot();
});

test('renders an temporal widget edit component with ranges and single values', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    temporal: [
      { value: '1900', label: '1900' },
      { value: '1901', label: '1901' },
      { value: '1905', label: '1905' },
      { value: '1907', label: '1907' },
    ],
  });
  const state = store.getState();
  const component = render(
    <Provider store={store}>
      <TemporalWidget
        value={state}
        id="temporal"
        title="My field"
        onChange={() => {}}
      />
    </Provider>,
  );
  expect(component.container).toMatchSnapshot();
});

test('renders an temporal widget edit component with multiple ranges and single values', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    temporal: [
      { value: '1900', label: '1900' },
      { value: '1901', label: '1901' },
      { value: '1905', label: '1905' },
      { value: '1907', label: '1907' },
      { value: '1908', label: '1908' },
    ],
  });
  const state = store.getState();
  const component = render(
    <Provider store={store}>
      <TemporalWidget
        value={state}
        id="temporal"
        title="My field"
        onChange={() => {}}
      />
    </Provider>,
  );
  expect(component.container).toMatchSnapshot();
});

test('renders an temporal widget edit component with existing temporal ranges and single values', async () => {
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
  const state = store.getState();
  const component = render(
    <Provider store={store}>
      <TemporalWidget
        value={state}
        id="temporal"
        title="My field"
        onChange={() => {}}
      />
    </Provider>,
  );
  expect(component.container).toMatchSnapshot();
});
