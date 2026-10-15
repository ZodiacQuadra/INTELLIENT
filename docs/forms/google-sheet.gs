/**
 * Intellient form submissions -> Google Sheet.
 *
 * Paste this into Extensions > Apps Script of the Google Sheet that should record submissions, then
 * deploy it as a web app (see README.md in this folder). Every submission becomes one row on the
 * "Submissions" tab. A field the sheet has not seen before gets a new column automatically.
 */
const SHEET_NAME = 'Submissions';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const record = JSON.parse(e.postData.contents);
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);

    let headers = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    const added = Object.keys(record).filter((key) => headers.indexOf(key) === -1);
    if (added.length) {
      headers = headers.concat(added);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    sheet.appendRow(headers.map((key) => (key in record ? record[key] : '')));

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
