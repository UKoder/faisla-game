/**
 * Generates simple PNG icons for the PWA manifest.
 * Uses pure Node.js — no external dependencies.
 * Run: node generate-icons.mjs
 */
import { createWriteStream } from 'fs'
import { createDeflate } from 'zlib'
import { Buffer } from 'buffer'

function crc32(buf) {
  let crc = 0xffffffff
  const table = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[i] = c
  }
  for (const byte of buf) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii')
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const crcBuf = Buffer.concat([typeBytes, data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(crcBuf))
  return Buffer.concat([len, typeBytes, data, crc])
}

function makePNG(size, bgR, bgG, bgB, fgR, fgG, fgB) {
  // IHDR
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8   // bit depth
  ihdr[9] = 2   // color type RGB
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0

  // Build raw image data — draw a simple tractor emoji-like shape
  // Simple: amber circle on dark background
  const cx = size / 2, cy = size / 2, r = size * 0.38
  const rows = []
  for (let y = 0; y < size; y++) {
    const row = [0] // filter byte
    for (let x = 0; x < size; x++) {
      const dx = x - cx, dy = y - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist <= r) {
        row.push(fgR, fgG, fgB)
      } else {
        row.push(bgR, bgG, bgB)
      }
    }
    rows.push(Buffer.from(row))
  }
  const raw = Buffer.concat(rows)

  return new Promise((resolve, reject) => {
    const chunks = []
    const deflate = createDeflate({ level: 6 })
    deflate.on('data', d => chunks.push(d))
    deflate.on('end', () => {
      const idat = Buffer.concat(chunks)
      const png = Buffer.concat([
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
        chunk('IHDR', ihdr),
        chunk('IDAT', idat),
        chunk('IEND', Buffer.alloc(0)),
      ])
      resolve(png)
    })
    deflate.on('error', reject)
    deflate.end(raw)
  })
}

// Dark bg (#0b0f1a) with amber circle (#f59e0b)
const bg = [11, 15, 26]
const fg = [245, 158, 11]

const [png192, png512] = await Promise.all([
  makePNG(192, ...bg, ...fg),
  makePNG(512, ...bg, ...fg),
])

import { writeFileSync } from 'fs'
writeFileSync('public/icons/icon-192.png', png192)
writeFileSync('public/icons/icon-512.png', png512)
console.log('✓ Generated public/icons/icon-192.png (192×192)')
console.log('✓ Generated public/icons/icon-512.png (512×512)')
