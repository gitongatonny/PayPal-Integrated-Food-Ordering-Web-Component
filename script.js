// Listen to changes on all food items to set the initial quantity and update total
document.querySelectorAll('.food-item').forEach(item => {
    item.addEventListener('change', function() {
        // Automatically set quantity to 1 if an item is selected and quantity was zero
        const quantityInput = this.closest('.menu-item').querySelector('.quantity');
        if (this.value !== "0" && quantityInput.value === "0") {
            quantityInput.value = 1;
        }
        updateTotal();
    });
});

// Listen to quantity changes to update total price
document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', function() {
        // Prevent negative quantities
        if (parseInt(this.value) < 0) {
            this.value = 0;
        }
        updateTotal();
    });
});

// Calculate the total price based on selected items and their quantities
function updateTotal() {
    let total = 0;
    document.querySelectorAll('.menu-item').forEach(item => {
        const select = item.querySelector('.food-item');
        const quantity = parseInt(item.querySelector('.quantity').value);
        const price = parseFloat(select.options[select.selectedIndex].value);
        total += price * quantity;
    });
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// PayPal Button integration
paypal.Buttons({
    // Create the order when the PayPal button is clicked
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: document.getElementById('totalPrice').textContent  // Use the current total from the webpage
                }
            }]
        });
    },
    // Handle the approval of the order by the user
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Show a success message to the user upon successful payment
            alert('Thank you for your purchase, ' + details.payer.name.given_name + '! Your transaction has been completed successfully.');
            // Here you might also redirect the user or update the page to reflect the order status
        });
    },
    // Handle errors in the payment process
    onError: function(err) {
        console.error('Payment did not succeed!', err);
        alert('There was an issue with your payment. Please try again.');
    }
}).render('#payWithPayPal');  // This tells the script where to draw the PayPal button

// Handle non-PayPal form submissions (e.g., pay at counter)
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Please pay at the counter when you collect your food.');
});
