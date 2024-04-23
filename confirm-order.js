// Parse the URL parameters to display the order summary
const urlParams = new URLSearchParams(window.location.search);
const itemList = document.getElementById('itemList');
const selectedItems = [];

urlParams.getAll('item[]').forEach(item => {
  const [name, priceQuantity] = item.split(' - ');
  const [price, quantity] = priceQuantity.split(' x ');
  const li = document.createElement('li');
  li.textContent = `${name} - ${price} x ${quantity}`;
  itemList.appendChild(li);
  selectedItems.push({
    name: name.trim(),
    unit_amount: { currency_code: 'USD', value: price.replace('$', '') },
    quantity: parseInt(quantity)
  });
});

document.getElementById('totalAmount').textContent = urlParams.get('total');
document.getElementById('invoiceID').textContent = urlParams.get('invoiceID');

// PayPal button configuration and handling
paypal.Buttons({
  createOrder: function(data, actions) {
    const total = parseFloat(urlParams.get('total'));
    const invoiceID = urlParams.get('invoiceID');

    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: total.toFixed(2)
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
      window.location.href = `thank-you.html?${urlParams.toString()}`;
    });
  },
  onError: function(err) {
    console.error('Payment error:', err);
    alert('There was an issue with your payment. Please try again.');
  },
  onCancel: function(data) {
    console.log('Payment cancelled by the user.');
  }
}).render('#confirmButton');