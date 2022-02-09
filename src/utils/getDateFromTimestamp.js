function getDateFromTimestamp(timestamp) {
  return new Date(parseInt(timestamp, 10) * 1000);
}

export default getDateFromTimestamp;
