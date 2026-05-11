// Direct redirect to Stripe Payment Link — same tab, no backend required
const PAYMENT_LINK_URL = 'https://buy.stripe.com/3cI6oJ6U18KHfpZ0rVfw400';
 
export async function redirectToStripeCheckout() {
  window.location.href = PAYMENT_LINK_URL; // same tab — user can use back button to return
}
 