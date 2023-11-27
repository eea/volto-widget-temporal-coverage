import React from 'react';
import { Header, Input } from 'semantic-ui-react';

import './styles.less';

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { SliderRail, Handle, Track, Tick } from './SliderComponents';
import debounce from 'lodash.debounce';

const getRangeStartEnd = (range) => {
  return {
    min: Math.min.apply(
      Math,
      range
        ?.filter((year) => parseInt(year.value) > 0)
        ?.map((year) => parseInt(year.value)),
    ),
    max: Math.max.apply(
      Math,
      range
        ?.filter((year) => parseInt(year.value) > 0)
        ?.map((year) => parseInt(year.value)),
    ),
  };
};

const sliderStyle = {
  position: 'relative',
  width: '100%',
};

const useDebouncedInput = (initialValue) => {
  const [storedValue, setValue] = React.useState(initialValue);
  React.useEffect(() => {
    if (initialValue !== storedValue && storedValue === undefined) {
      // console.log('should update internal state', {
      //   initialValue,
      //   storedValue,
      // });
      setValue(initialValue);
    }
  }, [storedValue, initialValue]);

  const timerRef = React.useRef();

  const changeHandler = React.useCallback((newValue, callback) => {
    setValue(newValue);
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // console.log('calling callback');
      callback();
    }, 1000);
  }, []);

  return [storedValue, changeHandler];
};

const TemporalCoverageFacet = (props) => {
  const { facet, onChange, choices, value } = props;
  const { min, max } = getRangeStartEnd(choices);

  const [start, end] =
    value?.length > 0
      ? [
          parseInt(value[0] ? value[0] : min),
          parseInt(value[value?.length - 1] ? value[value?.length - 1] : max),
        ]
      : [min, max];

  const [startValue, handleChangeStartValue] = useDebouncedInput(start);

  const [endValue, handleChangeEndValue] = useDebouncedInput(end);

  const debouncedSliderChangeHandler = debounce((sliderRange) => {
    if (
      !(
        sliderRange?.[0] >= min &&
        sliderRange?.[1] <= max &&
        sliderRange?.[0] <= max &&
        sliderRange?.[1] >= min
      )
    ) {
      return;
    }
    onChange(facet?.field?.value, [sliderRange[0], sliderRange[1]]);
    if (sliderRange[0] !== startValue)
      handleChangeStartValue(parseInt(sliderRange[0]), () => {});
    if (sliderRange[0] !== endValue)
      handleChangeEndValue(parseInt(sliderRange[1]), () => {});
  }, 300);

  return (
    <div className="temporal-facet">
      <Header as="h4">{facet?.title ?? facet?.field?.label}</Header>
      <div className="ui form years-input">
        <Input
          type="number"
          value={startValue}
          onChange={(e, { value }) => {
            handleChangeStartValue(parseInt(value), () => {
              if (parseInt(value) >= min && parseInt(value) <= max) {
                onChange(facet?.field?.value, [parseInt(value), endValue]);
              }
            });
          }}
          min={min}
          max={max}
        />
        <Input
          type="number"
          className="right"
          value={endValue}
          onChange={(e, { value }) => {
            handleChangeEndValue(parseInt(value), () => {
              if (parseInt(value) >= min && parseInt(value) <= max) {
                onChange(facet?.field?.value, [startValue, parseInt(value)]);
              }
            });
          }}
          min={min}
          max={max}
        />
      </div>
      <Slider
        step={1}
        domain={[min, max]}
        rootStyle={sliderStyle}
        onChange={(e) => {
          debouncedSliderChangeHandler(e);
        }}
        values={[start, end]}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, activeHandleID, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={[min, max]}
                  isActive={handle.id === activeHandleID}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  trackColor={'#00548a'}
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks count={5}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick) => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  );
};

TemporalCoverageFacet.stateToValue = ({
  facetSettings,
  index,
  selectedValue,
}) => {
  return selectedValue || [null, null];
};

TemporalCoverageFacet.valueToQuery = ({ value, facet }) => {
  const years = [parseInt(value?.[0]), parseInt(value?.[value.length - 1])];
  let allYears = Array.from(
    { length: years?.[1] - years?.[0] + 1 },
    (_, index) => (years?.[0] + index).toString(),
  );
  return value
    ? {
        i: facet?.field?.value,
        o: 'plone.app.querystring.operation.list.contains',
        v: allYears,
      }
    : null;
};

export default TemporalCoverageFacet;
