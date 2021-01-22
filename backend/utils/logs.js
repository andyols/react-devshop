import colors from 'colors'

export const logInfo = (prefix, label, msg) => {
  return console.log(`${prefix}\t` + `[${label}] `.brightCyan + `${msg}`.cyan)
}

export const logError = (msg) => {
  return console.log('❌\t' + '[Error] '.brightRed + `${msg}`.red)
}

export const logSuccess = (prefix, msg) => {
  return console.log(`${prefix}\t` + `${msg}`.green.bold)
}
