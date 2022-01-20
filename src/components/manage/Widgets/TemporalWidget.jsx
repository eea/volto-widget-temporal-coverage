import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import CreatableSelect from 'react-select/creatable';
import { FormFieldWrapper } from '@plone/volto/components';
import {
  Option,
  DropdownIndicator,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

import {
  createTemporalRangeOptions,
  getIndividualValues,
  createOption,
} from '@eeacms/volto-widget-temporal-coverage/helpers';

import { TemporalWidgetView } from '@eeacms/volto-widget-temporal-coverage/components';

import './public.less';

const messages = defineMessages({
  temporalCoverage: {
    id: 'Temporal coverage',
    defaultMessage: 'Temporal coverage',
  },
  NoSelection: {
    id: 'No selection',
    defaultMessage: 'No selection',
  },
});

function addTemporalValues(current_temporal_values, new_values) {
  let year_values = current_temporal_values
    ? current_temporal_values.map((item) => item.value)
    : [];
  if (new_values.includes('-')) {
    let split_values = new_values.split('-');
    let start_year = parseInt(split_values[0]);
    let end_year = parseInt(split_values[1]);
    for (let year = start_year; year <= end_year; year++) {
      if (year_values.indexOf(year) === -1) {
        year_values.push(year);
      }
    }
  } else {
    const year = parseInt(new_values);
    if (year_values.indexOf(year) === -1) {
      year_values.push(year);
    }
  }
  year_values.sort();
  return year_values.map((year) => createOption(year));
}

const TemporalWidget = (props) => {
  const {
    onChange,
    value,
    intl,
    id = 'select-temporal-coverage',
    title = 'Temporal coverage',
  } = props;

  const [currentInputValue, setCurrentInputValue] = React.useState('');
  const [temporalRangeOptions, setTemporalRangeOptions] = React.useState([]);

  useEffect(() => {
    setTemporalRangeOptions(
      createTemporalRangeOptions(getIndividualValues(value?.temporal)),
    );
  }, [value]);

  return (
    <FormFieldWrapper
      {...props}
      id={id}
      className="temporal-field-wrapper"
      title={title}
      columns={1}
    >
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor="select-listingblock-template">
                {intl.formatMessage(messages.temporalCoverage)}
              </label>
            </div>
          </Grid.Column>
          <Grid.Column width="8" style={{ flexDirection: 'unset' }}>
            {value?.readOnly ? (
              <TemporalWidgetView value={value} className="read-only" />
            ) : (
              <CreatableSelect
                defaultValue={temporalRangeOptions}
                isMulti
                allowCreateWhileLoading={true}
                id={id}
                inputValue={currentInputValue}
                name="select-temporal-coverage"
                className="react-select-container"
                classNamePrefix="react-select"
                options={[
                  {
                    label: intl.formatMessage(messages.NoSelection),
                    value: '',
                  },
                ]}
                onInputChange={(newInputValue) => {
                  if (!newInputValue) {
                    return setCurrentInputValue(newInputValue);
                  }
                  let new_input_length = newInputValue.length;
                  let last_char = newInputValue[new_input_length - 1];
                  // dissallow non numeric values and allow - only as 5th char
                  if (
                    (last_char === '-' && new_input_length !== 5) ||
                    (['-', '0'].indexOf(last_char) === -1 &&
                      !parseInt(last_char))
                  ) {
                    return currentInputValue;
                  }

                  if (
                    new_input_length === 5 &&
                    new_input_length > currentInputValue.length &&
                    newInputValue[4] !== '-'
                  ) {
                    newInputValue =
                      newInputValue.slice(0, 4) +
                      '-' +
                      newInputValue.slice(4, 5);
                  }
                  if (new_input_length <= 9) {
                    return setCurrentInputValue(newInputValue);
                  }

                  return setCurrentInputValue(newInputValue);
                }}
                isValidNewOption={(inputValue) => {
                  let new_option = inputValue.split('-');
                  // allow only ranges when second value is higher
                  if (new_option.length === 2) {
                    let first_value = parseInt(new_option[0]);
                    let second_value = parseInt(new_option[1]);
                    return first_value < second_value;
                  }
                  return /^\d+$/.test(parseInt(inputValue.split('-')[0]));
                }}
                onCreateOption={(newOption) => {
                  let temporal_values = addTemporalValues(
                    getIndividualValues(value?.temporal),
                    newOption,
                  );
                  onChange(
                    id,
                    newOption === ''
                      ? undefined
                      : { temporal: temporal_values },
                  );
                }}
                value={temporalRangeOptions}
                styles={customSelectStyles}
                theme={selectTheme}
                components={{ DropdownIndicator, Option }}
                onChange={(values) => {
                  let temporal_values =
                    (value.length && getIndividualValues(values)) || values;
                  onChange(
                    id,
                    value === '' ? undefined : { temporal: temporal_values },
                  );
                }}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </FormFieldWrapper>
  );
};

TemporalWidget.propTypes = {
  value: PropTypes.objectOf(PropTypes.any),
  block: PropTypes.string,
};

export default injectIntl(TemporalWidget);
