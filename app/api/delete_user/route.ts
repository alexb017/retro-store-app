import { NextRequest, NextResponse } from 'next/server';
import {
  deleteCartItems,
  deleteFavorites,
  deleteOrders,
  deleteAccount,
} from '@/lib/helpers';

export async function DELETE(req: NextRequest) {
  if (req.method !== 'DELETE') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await req.json();

    const { userId } = body;

    await deleteCartItems(userId);
    await deleteFavorites(userId);
    await deleteOrders(userId);
    await deleteAccount(userId);

    return NextResponse.json({ message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
