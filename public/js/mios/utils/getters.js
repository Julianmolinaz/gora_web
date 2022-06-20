
function tipoDispositivo() {
  let details = navigator.userAgent;
  let regexp = /android|iphone|kindle|ipad/i;

  let isMobileDevice = regexp.test(details);

  if (isMobileDevice) return 'mobile';
  else return 'desktop';
}
