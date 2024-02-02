import { stripe } from "@/lib/stripe";
import { auth } from "@/auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export async function POST(
  req: Request
) {
  const { price, quantity = 1 } =
    await req.json();
  const userSession = await auth();
  const userId = userSession?.user?.id;
  const userEmail =
    userSession?.user?.email;

  if (!userId) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
      }),
      {
        status: 401,
      }
    );
  }

  const user =
    await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
  let customer;

  if (user?.stripeCustomerId) {
    customer = {
      id: user.stripeCustomerId,
    };
  } else {
    const customerData: {
      metadata: {
        dbId: string;
      };
    } = {
      metadata: {
        dbId: userId,
      },
    };

    const response =
      await stripe.customers.create(
        customerData
      );

    customer = { id: response.id };

    await db
      .update(users)
      .set({
        stripeCustomerId: customer.id,
      })
      .where(eq(users.id, userId));
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  try {
    const session =
      await stripe.checkout.sessions.create(
        {
          success_url: `${baseUrl}/payment/success`,
          customer: customer.id,
          payment_method_types: [
            "card",
          ],
          line_items: [
            {
              price,
              quantity,
            },
          ],
          mode: "subscription",
        }
      );

    if (session) {
      return new Response(
        JSON.stringify({
          sessionId: session.id,
        }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          error:
            "Failed to create session",
        }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error(
      "Error creating checkout session",
      error
    );
  }
}
