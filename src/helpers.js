export const createOption = (label) => {
  const str_label = label.toString();
  return {
    label: str_label,
    value: str_label,
  };
};
export function createTemporalRangeOptions(temporal_values) {
  let temporal_intervals = [];
  if (!temporal_values || !temporal_values.length) {
    return temporal_intervals;
  }

  let current_temporal_interval = [
    temporal_values[0].value,
    temporal_values[0].value,
  ];

  for (let i = 1; i < temporal_values.length; i++) {
    let value = temporal_values[i].value;
    let year = parseInt(value);
    if (year === parseInt(current_temporal_interval[1]) + 1) {
      current_temporal_interval[1] = year;
    } else {
      temporal_intervals.push(current_temporal_interval);
      current_temporal_interval = [year, year];
    }
  }

  /* append last temporal_interval in case last value doesn't match
  the current interval value or we have no intervals */
  if (
    (temporal_intervals.length &&
      temporal_intervals[temporal_intervals.length - 1][1] !==
        current_temporal_interval[1]) ||
    !temporal_intervals.length
  ) {
    temporal_intervals.push(current_temporal_interval);
  }

  let temporal_range_options = [];
  for (let i = 0; i < temporal_intervals.length; i++) {
    let pair_years = temporal_intervals[i];
    let str_year_values = [pair_years[0].toString(), pair_years[1].toString()];
    let start_year = str_year_values[0];
    let end_year = str_year_values[1];
    if (start_year === end_year) {
      temporal_range_options.push({ label: start_year, value: start_year });
    } else {
      let range_year_values = start_year + '-' + end_year;
      temporal_range_options.push({
        label: range_year_values,
        value: range_year_values,
      });
    }
  }
  return temporal_range_options;
}

export function getIndividualValues(values) {
  let year_values = [];
  if (!values) {
    return year_values;
  }
  for (let i = 0; i < values.length; i++) {
    const val = values[i].value;
    if (val && val.includes?.('-')) {
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
      // check if val was a number as you can click on no selection
      // in which case you will get { 'label': 'no selection', value: ''}
      if (nr && year_values.indexOf(nr) === -1) {
        year_values.push(nr);
      }
    }
  }
  year_values.sort();
  return year_values.map((year) => createOption(year));
}
