exports.reply = (req, res, info) => {
  const success = (info.success == undefined || info.sucess == true)
    ? true : false;
  const status = info.status || 200;
  const msg = info.msg || 'Ok';
  const body = info.body || null;

  res.status(status).json({
    success,
    msg,
    body
  });
}
