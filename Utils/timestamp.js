const addTime = (data) => {
  const date = new Date();
  data.timestamp = date;
  return data;
};

module.exports = { addTime };
