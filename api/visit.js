// Vercel serverless function: emails the site owner when someone visits.
// Env vars (Vercel project settings): RESEND_API_KEY, NOTIFY_TO, NOTIFY_FROM

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

function parseUA(ua = '') {
  const browser =
    /Edg\//.test(ua) ? 'Edge' :
    /OPR\/|Opera/.test(ua) ? 'Opera' :
    /Firefox\//.test(ua) ? 'Firefox' :
    /Chrome\//.test(ua) ? 'Chrome' :
    /Safari\//.test(ua) ? 'Safari' : 'Unknown'
  const os =
    /Windows/.test(ua) ? 'Windows' :
    /Android/.test(ua) ? 'Android' :
    /iPhone|iPad|iPod/.test(ua) ? 'iOS' :
    /Mac OS X/.test(ua) ? 'macOS' :
    /Linux/.test(ua) ? 'Linux' : 'Unknown'
  const type = /Mobi|Android|iPhone/.test(ua) ? 'Mobile' : /iPad|Tablet/.test(ua) ? 'Tablet' : 'Desktop'
  return { browser, device: `${type} (${os})` }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { RESEND_API_KEY, NOTIFY_TO, NOTIFY_FROM } = process.env
  if (!RESEND_API_KEY || !NOTIFY_TO) return res.status(500).json({ error: 'Not configured' })

  const h = req.headers
  const ua = h['user-agent'] || ''
  if (/bot|crawl|spider|preview|headless/i.test(ua)) return res.status(204).end()

  const ip = (h['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'Unknown'
  const dec = (v) => { try { return decodeURIComponent(v) } catch { return v } }
  const location = [dec(h['x-vercel-ip-city'] || ''), h['x-vercel-ip-country-region'], h['x-vercel-ip-country']]
    .filter(Boolean).join(', ') || 'Unknown'
  const { browser, device } = parseUA(ua)
  const when = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'full', timeStyle: 'long' })

  const rows = [['IP Address', ip], ['Location', location], ['Device', device], ['Browser', browser], ['Date/Time', when]]
  const html = `<h2>New visitor on Deaton Veterinary Services</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join('')}</table>`

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: NOTIFY_FROM || 'Site Alerts <onboarding@resend.dev>',
      to: [NOTIFY_TO],
      subject: `New site visit: ${location}`,
      html,
    }),
  })
  return res.status(r.ok ? 200 : 502).json({ ok: r.ok })
}
