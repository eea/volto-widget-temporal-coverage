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

const TemporalWidget = (props) => {
  const {
    value = { temporal: [] },
    onChange,
    intl,
    id = 'select-temporal-coverage',
    title = 'temporal coverage',
  } = props;

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
              //value={selectedOption || data.temporal}
              styles={customSelectStyles}
              theme={selectTheme}
              components={{ DropdownIndicator, Option }}
              onChange={(value, action) => {
                onChange(id, value === '' ? undefined : { temporal: value });
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
