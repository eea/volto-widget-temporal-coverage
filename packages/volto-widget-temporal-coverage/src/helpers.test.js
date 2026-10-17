import {
  createOption,
  createTemporalRangeOptions,
  getIndividualValues,
} from './helpers';

describe('createOption', () => {
  it('should return an object with label and value equal to input string', () => {
    const result = createOption('1900');
    expect(result).toEqual({
      label: '1900',
      value: '1900',
    });
  });
});

describe('createTemporalRangeOptions', () => {
  it('should return an empty array when input is null or empty', () => {
    expect(createTemporalRangeOptions(null)).toEqual([]);
    expect(createTemporalRangeOptions([])).toEqual([]);
  });

  it('should create ranges properly', () => {
    const temporal_values = [
      { value: '1900' },
      { value: '1901' },
      { value: '1903' },
      { value: '1905' },
      { value: '1906' },
    ];
    expect(createTemporalRangeOptions(temporal_values)).toEqual([
      { label: '1900-1901', value: '1900-1901' },
      { label: '1903', value: '1903' },
      { label: '1905-1906', value: '1905-1906' },
    ]);
  });
});

describe('getIndividualValues', () => {
  it('should return an empty array when input is null', () => {
    expect(getIndividualValues(null)).toEqual([]);
  });

  it('should return the correct options', () => {
    const values = [
      { value: '1900-1902' },
      { value: '1904' },
      { value: '1906-1907' },
    ];
    expect(getIndividualValues(values)).toEqual([
      { label: '1900', value: '1900' },
      { label: '1901', value: '1901' },
      { label: '1902', value: '1902' },
      { label: '1904', value: '1904' },
      { label: '1906', value: '1906' },
      { label: '1907', value: '1907' },
    ]);
  });
});
