import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: NextRequest) {
  console.log("🔥 API HIT");

  try {
    const { phone, message } = await req.json();

    const msg = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: phone,
      body: message,
    });

    console.log("✅ SMS SENT", msg.sid);

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("❌ ERROR", e);
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}
