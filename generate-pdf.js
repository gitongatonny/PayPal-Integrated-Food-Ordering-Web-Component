document.getElementById('downloadReceiptBtn').addEventListener('click', function() {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Set the font and size for the PDF
    doc.setFont('helvetica');
    doc.setFontSize(16);
  
    // Add the store name and invoice ID
    doc.text('University Catering Service', 20, 20);
    doc.setFontSize(12);
    doc.text(`Invoice ID: ${urlParams.get('invoiceID')}`, 20, 30);
  
    // Add the order details table
    doc.autoTable({
      startY: 40,
      head: [['Item', 'Price', 'Quantity', 'Total']],
      body: Array.from(document.querySelectorAll('#itemTable tbody tr')).map(row => [
        row.cells[0].textContent,
        row.cells[1].textContent,
        row.cells[2].textContent,
        row.cells[3].textContent
      ]),
      foot: [['', '', 'Overall Total:', document.getElementById('overallTotal').textContent]]
    });
  
    // Add the payment details
    doc.text('Payment Details:', 20, doc.lastAutoTable.finalY + 20);
    doc.text(`Paid to: University Catering Service`, 20, doc.lastAutoTable.finalY + 30);
    doc.text(`Paid by: ${urlParams.get('customerName')}`, 20, doc.lastAutoTable.finalY + 40);
  
    // Generate the unique filename with the invoice number
    const invoiceNumber = urlParams.get('invoiceID');
    const filename = `${invoiceNumber}-food-order.pdf`;
  
    // Save the PDF with the unique filename
    doc.save(filename);
  });