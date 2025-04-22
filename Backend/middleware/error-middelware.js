const errormiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "BAKEND ERROR";
    const extraDetail = err.extraDetail || "ERROR FOMR BAKEND";
  
    return res.status(status).json({ message, extraDetail });
  };
  
  module.exports = errormiddleware;
  