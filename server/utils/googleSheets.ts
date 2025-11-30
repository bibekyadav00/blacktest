import { google } from 'googleapis';

export async function getUncachableGoogleSheetClient() {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  
  if (!serviceAccountJson) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable not set');
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountJson);
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return google.sheets({ version: 'v4', auth });
  } catch (parseError) {
    throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT_JSON format');
  }
}

export async function appendFeedbackToSheet(feedback: {
  contact: string | null;
  rating: number;
  message: string;
  createdAt: Date;
}) {
  try {
    const sheets = await getUncachableGoogleSheetClient();
    const spreadsheetId = '10YSv-MjxIG-WLCYaPD_qf-sjRcJLb8Jqjkzo8FvzYV0';
    
    const values = [
      [
        new Date(feedback.createdAt).toLocaleString('en-IN'),
        feedback.contact || '',
        feedback.rating,
        feedback.message,
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return { success: true };
  } catch (error) {
    // Silently fail if Google Sheets is unavailable (e.g., no internet or network blocked)
    // Feedback is still saved locally in the database
    return { success: false };
  }
}
