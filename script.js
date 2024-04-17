// Event listeners for each checkbox to handle item selection
document.querySelectorAll('.food-item').forEach(item => {
    item.addEventListener('change', function() {
        const quantityInput = this.parentNode.nextElementSibling; // Get the related quantity input
        quantityInput.disabled = !this.checked; // Enable/disable based on checkbox state
        quantityInput.value = this.checked ? 1 : 0; // Set/reset quantity when item is checked/unchecked
        updateTotal(); // Update the total price
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
            total += price * quantity; // Calculate total by summing product of price and quantity
        }
    });
    document.getElementById('totalPrice').textContent = total.toFixed(2); // Display the updated total
}

// PayPal button configuration and handling
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: document.getElementById('totalPrice').textContent // Use the total for the transaction
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Thank you for your purchase, ' + details.payer.name.given_name + '!');
        });
    },
    onError: function(err) {
        console.error('Payment error:', err);
        alert('There was an issue with your payment. Please try again.');
    }
}).render('#payWithPayPal');

// Handle form submission for non-PayPal payments
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Please pay at the counter when you collect your food.');
});
