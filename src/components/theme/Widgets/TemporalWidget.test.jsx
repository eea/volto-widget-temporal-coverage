import React from 'react';
import renderer from 'react-test-renderer';
import TemporalWidget from './TemporalWidget';

describe('TemporalWidget view tests', () => {
  it('renders an empty temporal view widget component', () => {
    const component = renderer.create(<TemporalWidget value={[]} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an empty temporal view widget component when value is null', () => {
    const component = renderer.create(<TemporalWidget value={null} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a widget component with a single temporal value', () => {
    const component = renderer.create(
      <TemporalWidget value={[{ value: '1900', label: '1900' }]} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a widget component with multiple temporal values', () => {
    const component = renderer.create(
      <TemporalWidget
        value={[
          { value: '1900', label: '1900' },
          { value: '1902', label: '1902' },
        ]}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a widget component with temporal ranges', () => {
    const component = renderer.create(
      <TemporalWidget
        value={[
          { value: '1900', label: '1900' },
          { value: '1901', label: '1901' },
        ]}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a widget component with multiple temporal ranges', () => {
    const component = renderer.create(
      <TemporalWidget
        value={[
          { value: '1900', label: '1900' },
          { value: '1901', label: '1901' },
          { value: '1903', label: '1903' },
          { value: '1904', label: '1904' },
        ]}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a widget component with temporal ranges and single values', () => {
    const component = renderer.create(
      <TemporalWidget
        value={[
          { value: '1900', label: '1900' },
          { value: '1901', label: '1901' },
          { value: '1902', label: '1902' },
          { value: '1910', label: '1910' },
        ]}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a widget component with existing temporal ranges and single values', () => {
    const component = renderer.create(
      <TemporalWidget
        value={[
          { value: '1900-1904', label: '1900-1904' },
          { value: '1910', label: '1910' },
        ]}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a widget component with multiple single values and  multiple temporal ranges', () => {
    const component = renderer.create(
      <TemporalWidget
        value={[
          { value: '1890', label: '1890' },
          { value: '1900-1905', label: '1900-1905' },
          { value: '1915', label: '1915' },
          { value: '1920-1922', label: '1920-1922' },
        ]}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a widget component with a custom css class', () => {
    const component = renderer.create(
      <TemporalWidget
        className="custom-css-class"
        value={[{ value: '1900', label: '1900' }]}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a widget component where the values are wrapped by custom child tags', () => {
    const component = renderer.create(
      <TemporalWidget
        value={[
          { value: '1890', label: '1890' },
          { value: '1900-1905', label: '1900-1905' },
        ]}
      >
        {(child) => <strong>{child}</strong>}
      </TemporalWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
