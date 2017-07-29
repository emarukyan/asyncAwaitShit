var fs = require('fs');

const badAsyncWithReject = async () => {
  return fs.writeFile('/NonExistingDir/NonExistingFile', '', (err, data) => {
    if (err) return Promise.reject(err)
    console.log(err, data)
  })  
}

const badAsyncWithThrow = async () => {
  return fs.writeFile('/NonExistingDir/NonExistingFile', '', (err, data) => {
    if (err) throw Error(err)
    console.log(err, data)
  })  
}

const justBadPromise = () => new Promise((resolve, reject) => {
  fs.writeFile('/pipecTrindec/#D412.ads', '', (err, data) => {
    if (err) return reject(err)
    resolve(data)
  })  
})



const testBadAsyncWithReject = async () => {
  return await badAsyncWithReject()
}

const testBadAsyncWithThrow = async () => {
  return await badAsyncWithThrow()
}


const testBadAsyncWithThrowTryCatch = async () => {
  try {
    return await badAsyncWithThrow()
  } catch (err) {
    console.log('catched error')
  }
}

const testJustBadPromise = () => justBadPromise()

////////////////////////////////////////////////////////////////////////////
///////////////////////////// ACTUAL TESTERS ///////////////////////////////
////////////////////////////////////////////////////////////////////////////

const testers = {
  1: () => testBadAsyncWithReject().then(() => {
      console.log('testBadAsyncWithReject')
    }).catch(err => {
      console.log('testBadAsyncWithReject -> err')
    }),
  2: () => testBadAsyncWithThrow().then(() => {
      console.log('testBadAsyncWithThrow')
    }).catch(err => {
      console.log('testBadAsyncWithThrow -> err')
    }),
  3: () => testBadAsyncWithThrowTryCatch().then(() => {
      console.log('testBadAsyncWithThrowTryCatch')
    }).catch(err => {
      console.log('testBadAsyncWithThrowTryCatch -> err')
    }),
  4: () => testJustBadPromise().then(() => {
    console.log('testJustBadPromise')
  }).catch(err => {
    console.log('testJustBadPromise -> err')
  })
}

////////////////////////////////////////////////////////////////////////////
// Usage  node asyncFailTest [1-4]
const showUsage = () => console.log('Usage $ node asyncFailTest [1-4]')

if (process.argv.length !== 3) return showUsage()

const type = process.argv[2]

if (!testers[type]) return console.log('No test defined.'), showUsage()

console.log('Running Test\n', ''.padEnd(40,'-'), '\n', testers[type], '\n', ''.padEnd(40,'-'), '\n\n')
testers[type]()