function getTimeStampFromDate(date) {
  return parseInt(date.getTime() / 1000, 10);
}

export default getTimeStampFromDate;
