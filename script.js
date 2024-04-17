paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '5'  // Adjust based on actual order value
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
            // Optionally, you could send transaction details to your server here
        });
    }
}).render('#payWithPayPal');  // This element has to exist on the DOM

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Please pay at the counter when you collect your food.');
});
