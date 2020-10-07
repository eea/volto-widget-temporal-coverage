import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Form } from 'semantic-ui-react';
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
  const { data, block, onChangeBlock, intl } = props;
  const [selectedOption, setOption] = useState(
    data.temporal ? [data.temporal] : null,
  );
  React.useEffect(() => {
    onChangeBlock(block, {
      ...data,
      temporal:
        selectedOption && selectedOption.length !== 0
          ? selectedOption[0]
          : null,
    });
  }, [selectedOption]);
  return (
    <FormFieldWrapper {...props} columns={1}>
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
              isMulti
              allowCreateWhileLoading={true}
              id="select-temporal-coverage"
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
              value={selectedOption || data.temporal}
              styles={customSelectStyles}
              theme={selectTheme}
              components={{ DropdownIndicator, Option }}
              onChange={(field, value) => {
                setOption((prevState) =>
                  field
                    ? field.map((item) => {
                        return { value: item.value, label: item.label };
                      })
                    : null,
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
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default injectIntl(TemporalWidget);
