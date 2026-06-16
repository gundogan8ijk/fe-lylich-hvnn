import * as XLSX from 'xlsx';

interface SheetData {
  sheetName: string;
  data: any[];
}

export function exportToExcel(sheetsData: SheetData[], fileName: string) {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  sheetsData.forEach(({ sheetName, data }) => {
    // Convert JSON data to worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });
  
  // Write workbook to file
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}
