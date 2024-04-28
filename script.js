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
  document.getElementById('totalPrice').textContent = '£' + total.toFixed(2);
}

// Function to generate a unique invoice ID
function generateInvoiceID() {
  return 'INV-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Function to get the selected items and their details
function getSelectedItems() {
  const selectedItems = [];
  document.querySelectorAll('.food-item:checked').forEach(item => {
    const name = item.parentNode.textContent.trim().split(' - ')[0];
    const price = parseFloat(item.value);
    const quantity = parseInt(item.parentNode.nextElementSibling.value);
    selectedItems.push({ name, price, quantity });
  });
  return selectedItems;
}

// Handle form submission for PayPal payment
document.getElementById('orderForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const selectedItems = getSelectedItems();
  const invoiceID = generateInvoiceID();
  const total = parseFloat(document.getElementById('totalPrice').textContent.replace('£', ''));
  const searchParams = new URLSearchParams();
  selectedItems.forEach(item => {
    searchParams.append('item[]', `${item.name} - £${item.price.toFixed(2)} x ${item.quantity}`);
  });
  searchParams.append('total', total.toFixed(2));
  searchParams.append('invoiceID', invoiceID);
  window.location.href = `confirm-order.html?${searchParams.toString()}`;
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