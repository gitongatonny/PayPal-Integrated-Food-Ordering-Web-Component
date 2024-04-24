// Parse the URL parameters to display the order summary
const urlParams = new URLSearchParams(window.location.search);
const itemTable = document.querySelector('#itemTable tbody');
const selectedItems = [];

let overallTotal = 0;

urlParams.getAll('item[]').forEach(item => {
  const [name, priceQuantity] = item.split(' - ');
  const [price, quantity] = priceQuantity.split(' x ');
  const itemTotal = parseFloat(price.replace('$', '')) * parseInt(quantity);
  overallTotal += itemTotal;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${name}</td>
    <td>${price}</td>
    <td>${quantity}</td>
    <td>$${itemTotal.toFixed(2)}</td>
  `;
  itemTable.appendChild(row);
  
  selectedItems.push({
    name: name.trim(),
    unit_amount: { currency_code: 'USD', value: price.replace('$', '') },
    quantity: parseInt(quantity)
  });
});

document.getElementById('overallTotal').textContent = `$${overallTotal.toFixed(2)}`;
document.getElementById('invoiceID').textContent = urlParams.get('invoiceID');

// PayPal button configuration and handling
paypal.Buttons({
  createOrder: function(data, actions) {
    const invoiceID = urlParams.get('invoiceID');

    return actions.order.create({
      purchase_units: [{
        amount: {
          value: overallTotal.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: overallTotal.toFixed(2)
            }
          }
        },
        items: selectedItems,
        invoice_id: invoiceID
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      // Retrieve customer and business details from PayPal
      const customerName = details.payer.name.given_name + ' ' + details.payer.name.surname;
      const customerEmail = details.payer.email_address;
      const businessName = details.purchase_units[0].payee.email_address;
      const businessEmail = details.purchase_units[0].payee.merchant_id;

      // Pass the details to the thank you page
      const params = new URLSearchParams(urlParams);
      params.append('customerName', customerName);
      params.append('customerEmail', customerEmail);
      params.append('businessName', businessName);
      params.append('businessEmail', businessEmail);

      window.location.href = `thank-you.html?${params.toString()}`;
    });
  },
  onError: function(err) {
    console.error('Payment error:', err);
    alert('There was an issue with your payment. Please try again.');
  },
  onCancel: function(data) {
    console.log('Payment cancelled by the user.');
  }
}).render('#paypal-button-container');

// Pay at the Counter button click event handler
document.getElementById('payAtCounterBtn').addEventListener('click', function() {
  // Show a success pop-up
  alert('Payment at the counter successful!');
  
  // Redirect to the thank you page with the order details
  window.location.href = `thank-you.html?${urlParams.toString()}`;
});