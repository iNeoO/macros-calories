module.exports = {
  callBackError: (res, status, error) => {
    const result = {
      status,
      error,
    };
    res.status(status).send(result);
  },
};
