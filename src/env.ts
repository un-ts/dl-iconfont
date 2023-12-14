import { config } from 'dotenv'
import fetch, { Headers } from 'node-fetch'

if (typeof fetch !== 'function') {
  globalThis.fetch = fetch
}

if (typeof Headers !== 'function') {
  globalThis.Headers = Headers
}

config()
