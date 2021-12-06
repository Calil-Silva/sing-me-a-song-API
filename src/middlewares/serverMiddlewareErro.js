/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
export default async function serverMiddlewareErro(err, req, res, next) {
  return res.status(500).send(err.message);
}
