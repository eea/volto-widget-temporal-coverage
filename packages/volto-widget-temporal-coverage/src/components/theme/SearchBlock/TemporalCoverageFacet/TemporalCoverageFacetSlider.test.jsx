import React from 'react';
import { act, render } from '@testing-library/react';

import TemporalCoverageFacet from './TemporalCoverageFacet';

// Capture the props the facet passes to the slider, so the tests can drive
// its onChange without simulating pointer events.
const { slider } = vi.hoisted(() => ({ slider: {} }));

vi.mock('react-compound-slider', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Slider: (props) => {
      slider.props = props;
      return null;
    },
  };
});

const choices = [
  { value: '1890', label: '1890' },
  { value: '1900', label: '1900' },
  { value: '1915', label: '1915' },
];
const facet = { field: { value: 'temporal_coverage' } };

describe('TemporalCoverageFacet slider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debounces slider changes across re-renders', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <TemporalCoverageFacet
        facet={facet}
        choices={choices}
        onChange={onChange}
      />,
    );

    // A re-render between moves used to recreate the debounced handler and
    // reset its timer, so every move ended up calling onChange.
    slider.props.onChange([1891, 1915]);
    rerender(
      <TemporalCoverageFacet
        facet={facet}
        choices={choices}
        onChange={onChange}
      />,
    );
    slider.props.onChange([1892, 1915]);
    rerender(
      <TemporalCoverageFacet
        facet={facet}
        choices={choices}
        onChange={onChange}
      />,
    );
    slider.props.onChange([1895, 1910]);

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('temporal_coverage', [1895, 1910]);
  });

  it('uses the latest onChange passed to the facet', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = render(
      <TemporalCoverageFacet
        facet={facet}
        choices={choices}
        onChange={first}
      />,
    );

    slider.props.onChange([1895, 1910]);
    rerender(
      <TemporalCoverageFacet
        facet={facet}
        choices={choices}
        onChange={second}
      />,
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith('temporal_coverage', [1895, 1910]);
  });

  it('ignores a range outside the available years', () => {
    const onChange = vi.fn();
    render(
      <TemporalCoverageFacet
        facet={facet}
        choices={choices}
        onChange={onChange}
      />,
    );

    slider.props.onChange([1800, 1910]);
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('drops a pending slider change when the facet is removed', () => {
    const onChange = vi.fn();
    const { unmount } = render(
      <TemporalCoverageFacet
        facet={facet}
        choices={choices}
        onChange={onChange}
      />,
    );

    slider.props.onChange([1895, 1910]);
    unmount();
    vi.advanceTimersByTime(300);

    expect(onChange).not.toHaveBeenCalled();
  });
});
