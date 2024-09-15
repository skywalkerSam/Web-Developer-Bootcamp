import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import Stripe from "stripe";
import { HTTPException } from "hono/http-exception";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const app = new Hono();

app.get("/hello", (c) => {
  return c.text("Welcome to Starboy Payments API...");
});

app.get("/success", (c) => {
  return c.json("Payment Successful🎉🎉");
});

app.get("/cancel", (c) => {
  return c.json("Payment Cancelled❗");
});

app.post("/checkout", async (c) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.PRICE_ID!,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:" + port + "/success",
      cancel_url: "http://localhost:" + port + "/cancel",
    });

    return c.json(session);
  } catch (error: any) {
    console.error(error);
    throw new HTTPException(500, { message: error?.message });
  }
});

// cheap SSR.)
app.get("/", (c) => {
  const html: any = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Stripe Payments</title>
        <script src="https://js.stripe.com/v3/"></script>
      </head>
      <body>
        <h1>Checkout</h1>
        <button id="checkoutButton">Checkout</button>

        <script>
          const checkoutButton = document.getElementById("checkoutButton");
          checkoutButton.addEventListener("click", async () => {
            const response = await fetch("/checkout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const { id } = await response.json();
            const stripe = Stripe("${process.env.STRIPE_PUBLISHABLE_KEY}");
            await stripe.redirectToCheckout({ sessionId: id });
          });
        </script>
      </body>
    </html>
  `;
  return c.html(html);
});

const port: number = process.env.PORT ? Number(process.env.port) : 3000;
console.log(`\nServer is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

/** .env
 * PORT
 * STRIPE_PUBLISHABLE_KEY=
 * STRIPE_SECRET_KEY=
 * STRIPE_WEBHOOK_SECRET=
 * PRICE_ID=
 */

/** Example cards
 * https://docs.stripe.com/testing
 *
 */

/**
 * bun run dev
 */
