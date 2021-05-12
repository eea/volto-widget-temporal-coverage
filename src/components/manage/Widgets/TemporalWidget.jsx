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
    data = {},
    onChange,
    intl,
    id = 'select-temporal-coverage',
    title = 'temporal coverage',
  } = props;

  return (
    <FormFieldWrapper {...props} id={id} title={title} columns={1}>
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
              defaultValue={data.temporal}
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
              onChange={(field, value) =>
                onChange(field, value === '' ? undefined : value)
              }
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </FormFieldWrapper>
  );
};

TemporalWidget.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
};

export default injectIntl(TemporalWidget);
