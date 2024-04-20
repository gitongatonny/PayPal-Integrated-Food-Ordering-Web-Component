// Event listeners for each checkbox to handle item selection
document.querySelectorAll('.food-item').forEach(item => {
    item.addEventListener('change', function() {
      const quantityInput = this.parentNode.nextElementSibling;
      quantityInput.disabled = !this.checked;
      quantityInput.value = this.checked ? 1 : 0;
      updateTotal();
    });
  });
  
  // Event listeners for quantity inputs to update the total when quantities change
  document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', function() {
      updateTotal();
    });
  });
  
  // Function to update the total cost
  function updateTotal() {
    let total = 0;
    document.querySelectorAll('.quantity').forEach(input => {
      if (!input.disabled) {
        const price = parseFloat(input.previousElementSibling.querySelector('.food-item').value);
        const quantity = parseInt(input.value);
        total += price * quantity;
      }
    });
    document.getElementById('totalPrice').textContent = total.toFixed(2);
  }
  
  // PayPal button configuration and handling
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: document.getElementById('totalPrice').textContent
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Thank you for your purchase, ' + details.payer.name.given_name + '!');
        clearSelections(); // Clear selections after successful payment
      });
    },
    onError: function(err) {
      console.error('Payment error:', err);
      alert('There was an issue with your payment. Please try again.');
    }
  }).render('#paypal-button-container');
  
  // Handle form submission for non-PayPal payments
  document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Please pay at the counter when you collect your food.');
    clearSelections(); // Clear selections after counter payment
  });
  
  // Function to clear all selections
  function clearSelections() {
    document.querySelectorAll('.food-item').forEach(item => {
      item.checked = false;
      const quantityInput = item.parentNode.nextElementSibling;
      quantityInput.disabled = true;
      quantityInput.value = 0;
    });
    updateTotal(); // Reset the total price to 0
  }
  
  // Clear selections on page load
  window.addEventListener('load', clearSelections);