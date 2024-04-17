document.querySelectorAll('.food-item, .quantity').forEach(item => {
    item.addEventListener('change', updateTotal);
});

function updateTotal() {
    let total = 0;
    document.querySelectorAll('.menu-item').forEach(item => {
        const select = item.querySelector('.food-item');
        const quantity = item.querySelector('.quantity').value;
        const price = select.options[select.selectedIndex].value;
        total += price * quantity;
    });
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

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
            alert('Transaction completed by ' + details.payer.name.given_name + '! Thank you for your purchase.');
        });
    }
}).render('#payWithPayPal');

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Please pay at the counter when you collect your food.');
});
