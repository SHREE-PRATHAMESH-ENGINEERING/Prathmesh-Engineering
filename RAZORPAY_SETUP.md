# Razorpay Integration Setup

## Environment Variables Setup

1. Sign up for a Razorpay account at https://razorpay.com/
2. Get your API keys from the Razorpay Dashboard
3. Update the `.env.local` file with your actual Razorpay credentials:

```bash
# Payment Gateway
RAZORPAY_KEY_ID=your_actual_razorpay_key_id
RAZORPAY_KEY_SECRET=your_actual_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_actual_razorpay_key_id
```

## How it Works

1. **Checkout Process**: When a user clicks "Pay Now with Razorpay", the system:
   - Validates the form data
   - Creates a Razorpay order via `/api/razorpay`
   - Opens the Razorpay payment modal
   
2. **Payment Verification**: After successful payment:
   - Verifies payment signature via `/api/verify-payment`
   - Creates order in database with status "paid"
   - Adds products to the order
   - Clears the cart and redirects

3. **Payment Security**: 
   - Uses Razorpay's signature verification
   - Validates payment server-side
   - Only creates order after successful payment verification

## API Endpoints Added

- `POST /api/razorpay` - Creates Razorpay order
- `POST /api/verify-payment` - Verifies payment signature
- Updated `POST /api/orders` - Now supports "paid" status

## Testing

For testing, you can use Razorpay's test mode:
- Test Key ID and Secret from Razorpay Dashboard
- Use test card numbers provided by Razorpay
- No real money is charged in test mode

## Production Deployment

1. Replace test keys with live keys
2. Ensure HTTPS is enabled
3. Test thoroughly before going live
4. Monitor payment webhooks (optional for additional security)
