import { StringDecoder as Decode } from 'string_decoder'
import { Through, EndOrError, Abort, SourceCallback } from 'pull-stream'

type InType = Buffer
type OutType = String
export default function(enc: string = 'utf8'): Through<InType, OutType> {
  const decoder = new Decode(enc)
  let ended: EndOrError

  // make a through
  return function(read) {
    return function(abort: Abort, cb: SourceCallback<string>) {
      if (ended) {
        return cb(ended)
      }
      read(abort, function(end, data) {
        ended = end
        if (true === end) {
          const decoded = decoder.end()
          if (decoded) {
            cb(null, decoded)
          } else {
            cb(true)
          }
        } else if (end) {
          cb(end)
        } else {
          cb(null, decoder.write(data!))
        }
      })
    }
  }
}
