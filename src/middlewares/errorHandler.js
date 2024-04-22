// src/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.response.status == 404) {
    res.status(404).json({ error: 'Not found' })
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
module.exports = errorHandler;
  