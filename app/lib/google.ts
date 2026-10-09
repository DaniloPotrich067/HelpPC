
import { google } from 'googleapis';

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value?.trim()) {
    throw new Error(`Variável de ambiente ausente: ${name}`);
  }

  return value;
}

const clientEmail = requiredEnv('GOOGLE_CLIENT_EMAIL');
const privateKey = requiredEnv('GOOGLE_PRIVATE_KEY')
  .replace(/\\n/g, '\n');

export const spreadsheetId = requiredEnv('GOOGLE_SHEET_ID');
export const driveFolderId = requiredEnv('GOOGLE_DRIVE_FOLDER_ID');

const auth = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
  ],
});

export const sheets = google.sheets({
  version: 'v4',
  auth,
});

export const drive = google.drive({
  version: 'v3',
  auth,
});
