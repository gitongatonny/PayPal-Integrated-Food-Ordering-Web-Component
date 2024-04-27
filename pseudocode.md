// Index Page
Display menu categories and food items
For each item:
    Add event listener to checkbox
    Add event listener to quantity input
    On checkbox change:
        Enable/disable quantity input
        Update total cost
    On quantity change:
        Update total cost
On form submit:
    Redirect to Confirm Order page with selected items and total cost

// Confirm Order Page
Parse URL parameters to retrieve selected items and total cost
Display order summary with selected items, prices, quantities, and total cost
Initialize PayPal button:
    On payment approval:
        Retrieve transaction details
        Redirect to Thank You page with transaction details
    On payment error:
        Display error message
    On payment cancel:
        Log cancellation
On "Pay at Counter" button click:
    Display success message
    Redirect to Thank You page with order details

// Thank You Page
Parse URL parameters to retrieve order details
Display thank you message with order summary
On "Download Receipt" button click:
    Generate PDF receipt with order details
    Save PDF receipt with unique filename
Provide option to place another order

// Generate PDF Receipt
Create new PDF document
Add store name, invoice ID, and transaction time
Add order details table with selected items, prices, quantities, and total cost
Add payment details (paid to, paid by)
Save PDF with unique filename based on invoice ID