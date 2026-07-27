// Konfigurasi Manajemen Risiko OPD - DPMD Provinsi Sulawesi Tengah
const SPREADSHEET_NAME = "Database_Manajemen_Risiko_OPD";

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('Sistem Manajemen Risiko OPD (Form 2 - Form 10)')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

// Fungsi Dinamis untuk Menarik Data Berdasarkan Form Aktif (Form2 - Form10)
function getData(formName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(formName);
  
  if (!sheet) {
    sheet = ss.insertSheet(formName);
    sheet.appendRow(["Timestamp", "Kode Risiko", "Uraian / Data Utama", "Keterangan / Nilai", "Status / PIC"]);
  }
  
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];
  
  const headers = rows.shift(); 
  
  return rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

// Fungsi Universal untuk Menyimpan Data Sesuai Form
function saveData(formName, data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(formName);
  
  if (!sheet) {
    sheet = ss.insertSheet(formName);
    sheet.appendRow(["Timestamp", "Kode Risiko", "Uraian / Data Utama", "Keterangan / Nilai", "Status / PIC"]);
  }
  
  const timestamp = new Date();
  sheet.appendRow([
    timestamp,
    data.kodeRisiko || "-",
    data.uraian || "-",
    data.keterangan || "-",
    data.status || "-"
  ]);
  
  return { status: "success", message: "Data " + formName + " berhasil disinkronkan ke Spreadsheet!" };
}
