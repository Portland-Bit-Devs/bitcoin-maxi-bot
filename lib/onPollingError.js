/**
 * Polling error handler
 *
 * @param {Error} error Error to handle
 */
function onPollingError(error) {
  console.log(error);
}

exports.onPollingError = onPollingError;
