import currencyFormatProperties from './currencyFormatProperties';

const formatTocurrency = (number) => new Intl.NumberFormat('ru', currencyFormatProperties).format(number);

export default formatTocurrency;
