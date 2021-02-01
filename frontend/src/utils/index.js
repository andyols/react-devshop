export const formatPrice = (price) => (Math.round(price * 100) / 100).toFixed(2)

export const generatePaypalSDKScript = (clientId) => {
  const script = document.createElement('script')
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&disable-funding=paylater`
  script.type = 'text/javascript'
  script.async = true
  return script
}
