import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from "../images/PU_Logo.jpg" // Replace with the actual path to your logo image

const generatePDF = (transferData) => {
  const doc = new jsPDF();

  // Set font
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);


  // Add University Logo at the top
  const logoWidth = 30; // Adjust the logo width as needed
  const logoHeight = 30; // You can adjust this value as well
  doc.addImage(logo, 'JPG', 10, 10, logoWidth, logoHeight);

  // Add Title
  doc.setFontSize(16);
  doc.setTextColor(0, 51, 102); // Use official color
  doc.text('Transfer Application Details', 70, 20);
  doc.text('Pokhara University', 80, 30)

   // Add Current Date at the top right corner
   const currentDate = new Date().toLocaleDateString();
   doc.setTextColor(0); // Black color
   doc.setFontSize(10);
   doc.text(`Date: ${currentDate}`, doc.internal.pageSize.width - 30, 10, null, null, 'right');
 

  // Define table columns and data
  const tableColumns = ['Field', 'Value'];
  const tableData = Object.entries(transferData).map(([key, value]) => [key, value]);

  // Set table styling
  const startY = 50; // Adjust the vertical position of the table
  doc.autoTable({
    head: [tableColumns],
    body: tableData,
    startY,
    theme: 'striped', // Add grid lines to the table grid
    styles: {
      font: 'helvetica',
      fontSize: 12,
      cellPadding: 5,
    },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: [0, 51, 102] }, // Make the field column bold
    },
  });


  // Draw a line to separate the footer
  const lineHeight = doc.internal.pageSize.height - 30;
  doc.setLineWidth(0.5);
  doc.setDrawColor(0, 51, 102);
  doc.line(10, lineHeight, doc.internal.pageSize.width - 10, lineHeight);


  // Add Footer Content
  doc.setTextColor(128, 128, 128); // Black color for footer
  doc.setFontSize(10);
  doc.text('P.O. Box: 427, Pokhara Metropolitan City-30, Lekhnath, Kaski, Nepal. E-mail: info@pu.edu.np', 15, lineHeight+15 );
  doc.text('URL: https://pu.edu.np, Tel.: +977-61-504046/504039', 15, lineHeight + 20);
  doc.text('2023 © All Rights Reserved. Powered By OCTS', 15, lineHeight + 25);


  // Save the PDF and return it
  return doc.output('blob');
};

export default generatePDF;


