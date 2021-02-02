export const generatePaypalSDKScript = (clientId) => {
  const script = document.createElement('script')
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&disable-funding=paylater,card`
  script.type = 'text/javascript'
  script.async = true
  return script
}
