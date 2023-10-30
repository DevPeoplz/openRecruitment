const seed = process.env.SEED || 'testing'

if (seed === 'testing') {
  require('./seeds/testing')
} else if (seed === 'initial') {
  require('./seeds/initial')
} else {
  console.error('Invalid Seed Mode')
}
