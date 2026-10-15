# Form submissions

The site's forms (Contact, Book a demo and the AIR Audit request) record each submission as one row in a
Google Sheet. Nothing opens the visitor's email app. Framer's native forms can send to Google Sheets too,
so the same sheet keeps receiving submissions after the site moves to Framer.

## Set up the sheet (about five minutes)

1. Create a Google Sheet, for example "Intellient website submissions".
2. In the sheet, open **Extensions > Apps Script**, replace the editor's contents with
   [`google-sheet.gs`](google-sheet.gs) and save.
3. Click **Deploy > New deployment**, choose the type **Web app**, and set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, approve the permissions, and copy the **Web app URL** (it ends in `/exec`).
5. In Vercel, open the project's **Settings > Environment Variables** and add
   `VITE_FORM_ENDPOINT` with that URL for Production and Preview. Redeploy.
6. For local development, put the same line in a `.env.local` file at the project root
   (it is git-ignored): `VITE_FORM_ENDPOINT=https://script.google.com/macros/s/.../exec`

Until the variable is set, a submitted form shows an error with the contact email instead of a
confirmation, so nothing is silently lost.

## What a row contains

| Column | Example |
| --- | --- |
| Form | `Intellient enquiry`, `Demo request`, `AIR Audit request` |
| Page | `/contact` |
| Submitted at | `2026-10-15T09:30:00.000Z` |
| One column per field, named by its label | `Name`, `Organisation`, `Business email`, ... |
| Consent | `Yes` (forms with a consent box) |

A hidden field catches simple bots: when it is filled in, the visitor sees the confirmation and nothing
is recorded.

## Rebuilding the forms in Framer

Use Framer's **Form** component and keep the field names below, so Framer's rows land in the same
columns. In the form's submission settings, connect the same Google Sheet (or keep Framer's own
submissions inbox and add the sheet as a destination). Framer has no `Page` or `Submitted at` field;
Google Sheets adds its own timestamp, and a hidden input named `Form` can carry the form's name.

**Contact** (`/contact`, Form = `Intellient enquiry`)

| Field name | Type | Required |
| --- | --- | --- |
| Name | Text | Yes |
| Organisation | Text | Yes |
| Role | Text | No |
| Business email | Email | Yes |
| Which Operating Domain or outcome should we discuss? | Text area | Yes |
| Consent | Checkbox | Yes |

**AIR Audit request** (`/air-audit`, Form = `AIR Audit request`)

| Field name | Type | Required |
| --- | --- | --- |
| Name | Text | Yes |
| Organisation | Text | Yes |
| Role | Text | No |
| Business email | Email | Yes |
| Which Operating Domain should we examine? | Text area | Yes |
| What is visibly happening today? | Text area | No |
| What evidence is available? | Text area | No |
| Consent | Checkbox | Yes |

**Book a demo** (`/book-a-demo`, Form = `Demo request`)

| Field name | Type | Required |
| --- | --- | --- |
| Name | Text | Yes |
| Email | Email | Yes |
| Phone Number (with country code) | Phone | No |
| Tell us what you need | Text area | No |

The Operating Domain Assessment (`/operating-domain-assessment`) is different: it assembles a brief in
the page that the visitor can preview, copy, download and send. Framer's native forms cannot build that
preview, so in Framer it needs either a custom code component or a plain form with the same questions.
