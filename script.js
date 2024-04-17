document.querySelectorAll('.food-item').forEach(item => {
    item.addEventListener('change', function() {
        const quantityInput = this.parentNode.nextElementSibling;
        if (this.checked) {
            quantityInput.disabled = false;
            quantityInput.value = 1; 
        } else {
            quantityInput.disabled = true;
            quantityInput.value = 0; 
        }
        updateTotal();
    });
});

document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', function() {
        updateTotal();
    });
});

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

// PayPal Buttons setup
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
            alert('Thank you for your purchase, ' + details.payer.name.given_name + '! Your transaction has been completed successfully in GBP.');
        });
    },
    onError: function(err) {
        console.error('There was an issue with your payment:', err);
        alert('There was an issue with your payment. Please try again.');
    }
}).render('#payWithPayPal');

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Please pay at the counter when you collect your food.');
});
