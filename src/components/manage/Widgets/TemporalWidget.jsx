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

import { createTemporalRangeOptions } from '@eeacms/volto-widget-temporal-coverage/helpers';

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

const createOption = (label) => {
  const str_label = label.toString();
  return {
    label: str_label,
    value: str_label,
  };
};

function addTemporalValues(current_temporal_values, new_values) {
  let year_values = current_temporal_values.map((item) => item.value);
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

function getIndividualValues(value) {
  let year_values = [];
  for (let i = 0; i < value.length; i++) {
    const val = value[i].value;
    if (val && val.includes('-')) {
      let split_values = val.split('-');
      let year = parseInt(split_values[0]);
      let end_year = parseInt(split_values[1]);
      while (year <= end_year) {
        if (year_values.indexOf(year) === -1) {
          year_values.push(year);
        }
        year++;
      }
    } else {
      let nr = parseInt(val);
      if (year_values.indexOf(nr) === -1) {
        year_values.push(nr);
      }
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
    title = 'temporal coverage',
  } = props;
  let temporal_value = value.temporal || [];

  const [currentInputValue, setCurrentInputValue] = React.useState('');
  const [temporalRangeOptions, setTemporalRangeOptions] = React.useState([]);

  useEffect(() => {
    setTemporalRangeOptions(createTemporalRangeOptions(temporal_value));
  }, [value.temporal]);

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
                  (['-', '0'].indexOf(last_char) === -1 && !parseInt(last_char))
                ) {
                  return currentInputValue;
                }

                if (
                  new_input_length === 5 &&
                  new_input_length > currentInputValue.length &&
                  newInputValue[4] !== '-'
                ) {
                  newInputValue =
                    newInputValue.slice(0, 4) + '-' + newInputValue.slice(4, 5);
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
                  value.temporal,
                  newOption,
                );
                onChange(
                  id,
                  newOption === '' ? undefined : { temporal: temporal_values },
                );
              }}
              value={temporalRangeOptions}
              styles={customSelectStyles}
              theme={selectTheme}
              components={{ DropdownIndicator, Option }}
              onChange={(value) => {
                let temporal_values =
                  (value.length && getIndividualValues(value)) || value;
                onChange(
                  id,
                  value === '' ? undefined : { temporal: temporal_values },
                );
              }}
            />
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
