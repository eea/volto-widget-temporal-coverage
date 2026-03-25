import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import TemporalWidget from './TemporalWidget';

const mockStore = configureStore([thunk]);

describe('TemporalWidget', () => {
  it('renders an empty temporal widget edit component when temporal is missing', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const state = store.getState();
    render(
      <Provider store={store}>
        <TemporalWidget
          value={state}
          id="temporal"
          title="My field"
          onChange={() => {}}
        />
      </Provider>,
    );
    expect(await screen.findByText('Temporal coverage')).toBeInTheDocument();
    expect(await screen.findByText('Select...')).toBeInTheDocument();
  });

  it('renders an temporal widget edit component when temporal is null', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      temporal: null,
    });
    const state = store.getState();
    render(
      <Provider store={store}>
        <TemporalWidget
          value={state}
          id="temporal"
          title="My field"
          onChange={() => {}}
        />
      </Provider>,
    );
  });

  it('renders an temporal widget edit component when temporal is an empty list', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      temporal: [],
    });
    const state = store.getState();
    render(
      <Provider store={store}>
        <TemporalWidget
          value={state}
          id="temporal"
          title="My field"
          onChange={() => {}}
        />
      </Provider>,
    );
  });

  it('renders an temporal widget edit component', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      temporal: [{ value: '1900', label: '1900' }],
    });
    const state = store.getState();
    render(
      <Provider store={store}>
        <TemporalWidget
          value={state}
          id="temporal"
          title="My field"
          onChange={() => {}}
        />
      </Provider>,
    );
    expect(await screen.findByText('1900')).toBeInTheDocument();
  });

  it('renders an temporal widget edit component with ranges', async () => {
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
    render(
      <Provider store={store}>
        <TemporalWidget
          value={state}
          id="temporal"
          title="My field"
          onChange={() => {}}
        />
      </Provider>,
    );
    expect(await screen.findByText('1900-1901')).toBeInTheDocument();
  });

  it('renders an temporal widget edit component with ranges and single values', async () => {
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
    render(
      <Provider store={store}>
        <TemporalWidget
          value={state}
          id="temporal"
          title="My field"
          onChange={() => {}}
        />
      </Provider>,
    );
    expect(await screen.findByText('1900-1901')).toBeInTheDocument();
    expect(await screen.findByText('1905')).toBeInTheDocument();
    expect(await screen.findByText('1907')).toBeInTheDocument();
  });

  it('renders an temporal widget edit component with ranges and single values', async () => {
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
    render(
      <Provider store={store}>
        <TemporalWidget
          value={state}
          id="temporal"
          title="My field"
          onChange={() => {}}
        />
      </Provider>,
    );
    expect(await screen.findByText('1900-1901')).toBeInTheDocument();
    expect(await screen.findByText('1905')).toBeInTheDocument();
    expect(await screen.findByText('1907')).toBeInTheDocument();
  });

  it('renders an temporal widget edit component with multiple ranges and single values', async () => {
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
    render(
      <Provider store={store}>
        <TemporalWidget
          value={state}
          id="temporal"
          title="My field"
          onChange={() => {}}
        />
      </Provider>,
    );
    expect(await screen.findByText('1900-1901')).toBeInTheDocument();
    expect(await screen.findByText('1905')).toBeInTheDocument();
    expect(await screen.findByText('1907-1908')).toBeInTheDocument();
  });

  it('renders an temporal widget edit component with joined temporal ranges from existing temporal ranges and new temporal ranges', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      temporal: [
        { value: '1898-1901', label: '1898-1901' },
        { value: '1900-1905', label: '1900-1905' },
      ],
    });
    const state = store.getState();
    render(
      <Provider store={store}>
        <TemporalWidget
          value={state}
          id="temporal"
          title="My field"
          onChange={() => {}}
        />
      </Provider>,
    );
    expect(await screen.findByText('1898-1905')).toBeInTheDocument();
  });

  it('renders an temporal widget edit component with existing temporal ranges and single values', async () => {
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
    render(
      <Provider store={store}>
        <TemporalWidget
          value={state}
          id="temporal"
          title="My field"
          onChange={() => {}}
        />
      </Provider>,
    );
    expect(await screen.findByText('1890')).toBeInTheDocument();
    expect(await screen.findByText('1900-1905')).toBeInTheDocument();
    expect(await screen.findByText('1915')).toBeInTheDocument();
  });

  it('renders an temporal widget edit component with existing temporal ranges ignoring value already present', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      temporal: [
        { value: '1900-1905', label: '1900-1905' },
        { value: '1904', label: '1904' },
      ],
    });
    const state = store.getState();
    render(
      <Provider store={store}>
        <TemporalWidget
          value={state}
          id="temporal"
          title="My field"
          onChange={() => {}}
        />
      </Provider>,
    );
    expect(await screen.findByText('1900-1905')).toBeInTheDocument();
  });
});
