import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/ecommerce/orders';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('[E-COMMERCE WEBHOOK RECEIVED]:', body);

    const { orderId, status, courier, trackingNumber } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Missing orderId or status in payload' },
        { status: 400 }
      );
    }

    const result = await updateOrderStatus(orderId, status, courier, trackingNumber);

    return NextResponse.json({
      success: true,
      orderId,
      status,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
