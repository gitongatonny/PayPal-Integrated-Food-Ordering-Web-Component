# University Catering Service - Food Ordering System

## Index Page (index.html)

- Display menu categories: **Main Meals**, **Drinks**, and **Snacks**
- For each food item:
  - Checkbox for selection
  - Quantity input (disabled by default)
- Event listeners:
  - On checkbox change: Enable/disable quantity input and update total
  - On quantity change: Update total cost
- Form submission:
  - Generate unique invoice ID
  - Redirect to **Confirm Order** page with selected items and total

## Confirm Order Page (confirm-order.html)

1. Parse URL parameters for order details
2. Display order summary table:
   - Item name, price, quantity, and total
   - Overall total
3. Show invoice ID
4. Initialize PayPal button:
   - Create order with selected items
   - On approval: Capture payment and redirect to *Thank You* page
5. "Pay at Counter" option available

## Thank You Page (thank-you.html)

- Parse URL parameters for transaction details
- Display:
  - Thank you message
  - Order summary table
  - Invoice ID
  - Transaction time
- "Download Receipt" button:
  - Generate PDF with order details
  - Save with unique filename: `{invoiceID}-food-order.pdf`
- Option to place another order

## PDF Receipt Generation (generate-pdf.js)

1. Create new jsPDF instance
2. Add:
   - University Catering Service header
   - Invoice ID
   - Transaction time
   - Order details table
   - Payment information
3. Save PDF with unique invoice ID-based filename

## Styling (style.css)

- Responsive design with media queries
- Consistent styling for forms, tables, and buttons
- Color scheme: 
  - Primary: #007bff
  - Hover: #0056b3
  - Background: #f9f9f9
