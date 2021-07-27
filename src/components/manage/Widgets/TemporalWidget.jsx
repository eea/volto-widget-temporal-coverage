import React from 'react';
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

function findIdx(linearized, val) {
  let start = 0;
  let end = linearized.length - 1;
  if (val < linearized[start]) {
    return start
  }
  if (val > linearized[end]) {
    return end + 1;
  }
  while (start < end) {
    let mid = Math.floor((start + end) / 2);
    if (linearized[mid] < val) {
      start = mid + 1;
    } else  if (linearized[mid] > val){
      end = mid - 1;
    } else {
      return mid;
    }
  }
  return start;
}

function addSorted(linearized, value) {
  if (value.includes("-")) {
    let start = parseInt(value.split("-")[0]);
    let end = parseInt(value.split("-")[1]);
    let idx = findIdx(linearized, start);
    for (let year = start; year <= end; year++) {
      if (year !== linearized[idx]) {
        linearized.splice(idx, 0, year);
      }
      idx++;
    }
  } else {
    const idx = findIdx(linearized, parseInt(value));
    if (linearized[idx] !== parseInt(value)) {
      linearized.splice(idx, 0, parseInt(value));
    }
  }
  return linearized;
}

function createIntervals(linearized) {
  let intervals = [];
  let current = [linearized[0], linearized[0]];
  for (let i = 1; i < linearized.length; i++) {
    if (linearized[i] === (current[1] + 1)) {
      current[1] = linearized[i];
    } else {
      intervals.push(current);
      current = [linearized[i], linearized[i]];
    }
  }
  if ((intervals.length > 0 && intervals[intervals.length - 1][0] !== current[0]) ||
      intervals.length == 0) {
    intervals.push(current);
  }
  linearized = [];
  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i][0] === intervals[i][1]) {
      linearized.push(intervals[i][0].toString());
      continue;
    }
    linearized.push(intervals[i][0].toString() + "-" + intervals[i][1].toString());
  }
  return linearized;
}

function getValues(value) {
  let values = [];
  let unique = {};
  for (let i = 0; i < value.length; i++) {
    const nr = value[i].value;
    if (nr.includes("-")) {
      let year = parseInt(nr.split('-')[0]);
      while (year <= parseInt(nr.split('-')[1])) {
        if (!unique[year]) {
          unique[year] = true;
          values.push(year);
          year++;
        }
      }
      continue;
    }

    if (!unique[parseInt(nr)]) {
      values.push(parseInt(nr));
      unique[parseInt(nr)] = true;
    }
  }
  values.sort();
  return values;
}

const TemporalWidget = (props) => {
  const {
    value = { temporal: [] },
    onChange,
    intl,
    id = 'select-temporal-coverage',
    title = 'temporal coverage',
  } = props;

  const createOption = (label) => ({
    label,
    value: label
  });
  const [valueSelect, setValueSelect] = React.useState(value.temporal);
  let linearized = getValues(valueSelect);

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
              defaultValue={value.temporal}
              isMulti
              allowCreateWhileLoading={true}
              id={id}
              name="select-temporal-coverage"
              className="react-select-container"
              classNamePrefix="react-select"
              // placeholder="Select criteria"
              options={[
                {
                  label: intl.formatMessage(messages.NoSelection),
                  value: '',
                },
              ]}
              isValidNewOption={(inputValue, selectValue, selectOptions) => {
                return /^\d+$/.test(parseInt(inputValue.split('-')[0]));
              }}
              onCreateOption={(newOption) => {
                // linearized keeps the years one by one
                linearized = addSorted(linearized, newOption);
                // then intervals are created from linearized
                let intervals = createIntervals(linearized).map(option => createOption(option));
                onChange(id, value === '' ? undefined : { temporal: intervals });
                // rendering
                setValueSelect(intervals);
              }}
              value={valueSelect}
              //value={selectedOption || data.temporal}
              styles={customSelectStyles}
              theme={selectTheme}
              components={{ DropdownIndicator, Option }}
              onChange={(value, action) => {
                onChange(id, value === '' ? undefined : { temporal: value });
                setValueSelect(value);
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
