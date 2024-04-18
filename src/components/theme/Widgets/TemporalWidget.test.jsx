import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TemporalWidget from './TemporalWidget';

describe('TemporalWidget view tests', () => {
  it('renders an empty widget when value is an empty list', () => {
    const { container } = render(<TemporalWidget value={{}} />);
    expect(
      container.querySelector('.temporal-coverage.widget'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('.temporal-coverage-value'),
    ).not.toBeInTheDocument();
  });

  it('renders an empty widget when value is null', () => {
    const { container } = render(<TemporalWidget value={null} />);
    expect(
      container.querySelector('.temporal-coverage.widget'),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('.temporal-coverage-value'),
    ).not.toBeInTheDocument();
  });

  it('renders a widget when passing a single temporal value', () => {
    const { container } = render(
      <TemporalWidget
        value={{ temporal: [{ value: '1900', label: '1900' }] }}
      />,
    );
    expect(
      container.querySelector('.temporal-coverage.widget'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('.temporal-coverage-value'),
    ).toHaveTextContent('1900');
  });

  it('renders a widget with multiple temporal values', () => {
    const { container } = render(
      <TemporalWidget
        value={{
          temporal: [
            { value: '1900', label: '1900' },
            { value: '1902', label: '1902' },
          ],
        }}
      />,
    );
    expect(
      container.querySelector('.temporal-coverage.widget'),
    ).toBeInTheDocument();

    expect(screen.getByText('1900')).toHaveClass('temporal-coverage-value');
    expect(screen.getByText('1902')).toHaveClass('temporal-coverage-value');
  });

  it('renders a widget with temporal ranges', () => {
    const { container } = render(
      <TemporalWidget
        value={{
          temporal: [
            { value: '1900', label: '1900' },
            { value: '1901', label: '1901' },
          ],
        }}
      />,
    );
    expect(
      container.querySelector('.temporal-coverage.widget'),
    ).toBeInTheDocument();
    expect(screen.getByText('1900-1901')).toHaveClass(
      'temporal-coverage-value',
    );
  });

  it('renders a widget with multiple temporal ranges', () => {
    const { container } = render(
      <TemporalWidget
        value={{
          temporal: [
            { value: '1900', label: '1900' },
            { value: '1901', label: '1901' },
            { value: '1903', label: '1903' },
            { value: '1904', label: '1904' },
          ],
        }}
      />,
    );
    expect(
      container.querySelector('.temporal-coverage.widget'),
    ).toBeInTheDocument();

    expect(screen.getByText('1900-1901')).toHaveClass(
      'temporal-coverage-value',
    );
    expect(screen.getByText('1903-1904')).toHaveClass(
      'temporal-coverage-value',
    );
  });

  it('renders a widget with temporal ranges and single values', () => {
    render(
      <TemporalWidget
        value={{
          temporal: [
            { value: '1900', label: '1900' },
            { value: '1901', label: '1901' },
            { value: '1902', label: '1902' },
            { value: '1910', label: '1910' },
          ],
        }}
      />,
    );
  });

  it('renders a widget with existing temporal ranges and single values', () => {
    const { container } = render(
      <TemporalWidget
        value={{
          temporal: [
            { value: '1900-1904', label: '1900-1904' },
            { value: '1910', label: '1910' },
          ],
        }}
      />,
    );
    expect(
      container.querySelector('.temporal-coverage.widget'),
    ).toBeInTheDocument();

    expect(screen.getByText('1910')).toHaveClass('temporal-coverage-value');
    expect(screen.getByText('1900-1904')).toHaveClass(
      'temporal-coverage-value',
    );
  });

  it('renders a widget with multiple single values and multiple temporal ranges', () => {
    const { container } = render(
      <TemporalWidget
        value={{
          temporal: [
            { value: '1890', label: '1890' },
            { value: '1900-1905', label: '1900-1905' },
            { value: '1915', label: '1915' },
            { value: '1920-1922', label: '1920-1922' },
          ],
        }}
      />,
    );
    expect(
      container.querySelector('.temporal-coverage.widget'),
    ).toBeInTheDocument();

    expect(screen.getByText('1890')).toHaveClass('temporal-coverage-value');
    expect(screen.getByText('1900-1905')).toHaveClass(
      'temporal-coverage-value',
    );
    expect(screen.getByText('1890')).toHaveClass('temporal-coverage-value');
    expect(screen.getByText('1920-1922')).toHaveClass(
      'temporal-coverage-value',
    );
  });

  it('renders a widget with multiple single values and temporal ranges where one single value is removed due to the previous range value', () => {
    const { container } = render(
      <TemporalWidget
        value={{
          temporal: [
            { value: '1900-1905', label: '1900-1905' },
            { value: '1904', label: '1904' },
            { value: '1907', label: '1907' },
          ],
        }}
      />,
    );
    expect(
      container.querySelector('.temporal-coverage.widget'),
    ).toBeInTheDocument();

    expect(screen.getByText('1900-1905')).toHaveClass(
      'temporal-coverage-value',
    );
    expect(screen.queryByText('1904')).not.toBeInTheDocument();
    expect(screen.queryByText('1907')).toBeInTheDocument();
  });

  it('renders a widget with a custom css class', () => {
    const { container } = render(
      <TemporalWidget
        className="custom-css-class"
        value={{ temporal: [{ value: '1900', label: '1900' }] }}
      />,
    );
    expect(
      container.querySelector('.temporal-coverage.widget.custom-css-class'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('.temporal-coverage-value'),
    ).toHaveTextContent('1900');
  });

  it('renders a widget where the values are wrapped by custom child tags', () => {
    const { container } = render(
      <TemporalWidget
        value={{
          temporal: [
            { value: '1890', label: '1890' },
            { value: '1900-1905', label: '1900-1905' },
          ],
        }}
      >
        {(child) => <strong>{child}</strong>}
      </TemporalWidget>,
    );
    expect(container.querySelector('strong')).toBeInTheDocument();
    expect(screen.queryByText(1890)).toBeInTheDocument();
    expect(screen.queryByText('1900-1905')).toBeInTheDocument();
  });
});
