exports.reply = (req, res, info) => {
  let success = info.success ? true : false;
  let status = info.status || 200;
  let msg = info.msg || 'Ok';
  let body = info.body || null;

  res.status(status).json({
    success,
    msg,
    body
  });
}
