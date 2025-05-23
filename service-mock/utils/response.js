export const formatResponse = (data, code = 'SUCCESS', message = 'success') => {
  return {
    code,
    message,
    data,
  };
};

const wrapResponse = (handler) => {
  return async (req, res) => {
    try {
      const result = await handler(req, res);
      res.json(formatResponse(result));
    } catch (err) {
      res.status(500).json(formatResponse(null, 500, err.message || 'Server Error'));
    }
  };
};

export default wrapResponse;
