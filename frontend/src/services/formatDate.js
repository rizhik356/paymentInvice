const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat('ru');
  return formatter.format(new Date(date));
};

export default formatDate;
