import colors from 'colors'

export const logInfo = (label, msg) => {
  return console.log(`[${label}] `.brightCyan + `${msg}`.cyan)
}

export const logError = (msg) => {
  return console.log('[error] '.red.bold + `${msg}`.red)
}

export const logSuccess = (msg) => {
  return console.log('[success] '.brightGreen + `${msg}`.green)
}
