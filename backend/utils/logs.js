import colors from 'colors'
const ignore = colors

export const logInfo = msg => {
  const prefix = msg.split('__')[0]
  const remaining = msg.split('__')[1]
  return console.log(`[${prefix}]`.brightCyan + ` ${remaining}`.cyan)
}

export const logError = msg => {
  return console.log(' ERROR '.red.inverse + ` ${msg}`.red)
}

export const logSuccess = msg => {
  const prefix = msg.split('__')[0]
  const remaining = msg.split('__')[1]
  return console.log(`[${prefix}]`.brightGreen + ` ${remaining}`.green)
}
