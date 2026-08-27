# shree-institute-server

Lead capture + WhatsApp notification API for the landing page.

## Run it

```bash
cd shree-institute/server
npm install
cp .env.example .env   # then fill in your Twilio values
npm start
```

Without Twilio credentials the server starts in **dry-run** mode: leads are still
validated and saved, and the WhatsApp message is printed to the console instead of
being sent. That means the front-end is fully testable before you sign up for
anything.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Reports mode (`twilio` / `dry-run`), manager config, allowed origins |
| `POST` | `/api/book-demo` | Books a demo class |

### `POST /api/book-demo`

```json
{ "studentName": "Aarav Sharma", "studentClass": "Class 9", "parentPhone": "9876543210" }
```

`parentPhone` is required and normalised to `+91XXXXXXXXXX`. `studentName` and
`studentClass` are optional, because the hero form only collects a phone number —
they default to `Not provided` / `Not specified`. Pass `"source": "hero"` to label
the lead in the WhatsApp message.

Success:

```json
{ "success": true, "notified": true, "mode": "twilio" }
```

Failure is `{ "success": false, "error": "<message safe to show the parent>" }`
with status `400` (validation), `429` (rate limit) or `500` (could not save).

## Behaviour worth knowing

- **Leads are written to `leads.jsonl` before the WhatsApp attempt.** If Twilio is
  down the parent still gets a success response and the lead is on disk — the
  failure is logged and `notified` comes back `false`. A failed notification is
  not the parent's problem; a lost lead would be.
- **CORS is an allowlist**, not a blanket `cors()`. Add your production origin to
  `ALLOWED_ORIGINS` or the browser will block the POST.
- **Rate limit** is 5 requests per IP per 10 minutes, in memory. It resets on
  restart and does not work across multiple instances. Behind a reverse proxy set
  `TRUST_PROXY=true`, or every visitor shares one bucket.
- `leads.jsonl` holds parents' phone numbers. It is gitignored; back it up
  somewhere private, and don't put it in a public web root.

## Twilio WhatsApp Sandbox setup

1. Create a free Twilio account.
2. Messaging → Try it out → Send a WhatsApp message. Note the sandbox number
   (`+1 415 523 8886`) and the join code.
3. From the **manager's phone**, WhatsApp `join <sandbox-code>` to that number.
   Twilio will only deliver to numbers that have opted in this way, and the
   opt-in expires after 72 hours of inactivity.
4. Put the manager's number in `MANAGER_WHATSAPP_TO` and restart the server.

For production you need a WhatsApp Business sender and a pre-approved message
template — the free-form sandbox body above will not pass outside the 24-hour
customer service window.
