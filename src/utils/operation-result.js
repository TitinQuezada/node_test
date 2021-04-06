const ok = (entity = null) => ({ entity });
const fail = (errorMessage = "Ha ocurrido un error inesperado") => ({
  error: errorMessage,
});

module.exports = { ok, fail };
