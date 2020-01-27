import * as pull from 'pull-stream'
import * as fs from 'fs'
import decode from '../src'

const file = fs
  .readFileSync(__filename, 'utf-8')
  .split(/(\n)/)
  .map(function(line) {
    return Buffer.from(line)
  })

// handle old node and new node
function A(buf: Buffer) {
  return [].slice.call(buf)
}

describe('pull-utf8-decoder', () => {
  it('lines', () => {
    pull(
      pull.values(file),
      decode('utf8'),
      pull.collect(function(err, ary) {
        if (err) {
          throw err
        }
        expect(file.map(String).join('')).toBe(ary.join(''))
      })
    )
  })

  it('utf-8', () => {
    const expected = 'cents:¢\neuros:€'

    // convert all of these into a byte(number) array
    const coinage = [
      A(Buffer.from('cents:')),
      [0xc2, 0xa2],
      A(Buffer.from('\n')),
      A(Buffer.from('euros:')),
      [0xe2, 0x82, 0xac]
    ].reduce(function(a, b) {
      return a.concat(b)
    })

    // return a Buffer[] that splits coinage randomly
    function rSplit() {
      const s = coinage.slice()
      const a = []
      while (s.length) {
        let n = ~~(Math.random() * s.length) + 1
        a.push(s.splice(0, n))
      }
      return a.map(function(e) {
        return Buffer.from(e)
      })
    }

    let N = 100
    while (N--) {
      pull(
        pull.values(rSplit()),
        decode(),
        pull.collect(function(_, ary) {
          expect(ary.join('')).toBe(expected)
        })
      )
    }
  })
})
