import React from 'react';
import cx from 'classnames';
import { createTemporalRangeOptions } from '@eeacms/volto-widget-temporal-coverage/helpers';

import './public.less';

const TemporalWidget = ({ value, children, className }) => {
  const temporal_ranges = createTemporalRangeOptions(value);
  return temporal_ranges.length ? (
    <div className={cx(className, 'temporal-coverage', 'widget')}>
      {temporal_ranges.map((item, index) => (
        <div key={index} className={'temporal-coverage-value'}>
          {children && children instanceof Function
            ? children(item?.label)
            : item?.label}
        </div>
      ))}
    </div>
  ) : null;
};
export default TemporalWidget;
