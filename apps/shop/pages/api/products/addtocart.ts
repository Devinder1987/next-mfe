import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const CART_FILE = path.join(process.cwd(), 'data', 'cart.json');

type CartItem = {
  id: string;
  qty: number;
};

type Cart = Record<string, CartItem>;

function readCart(): Cart {
  try {
    const data = fs.readFileSync(CART_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function writeCart(cart: Cart) {
  fs.mkdirSync(path.dirname(CART_FILE), { recursive: true });
  fs.writeFileSync(CART_FILE, JSON.stringify(cart, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
    return;
  }

  const { id, qty } = req.body;

  if (!id || typeof qty !== 'number' || qty < 1) {
    res.status(400).json({ success: false, message: 'Invalid parameters' });
    return;
  }

  const cart = readCart();

  if (cart[id]) {
    cart[id].qty += qty;
  } else {
    cart[id] = { id, qty };
  }

  writeCart(cart);

  res.status(200).json({ success: true, cart });
}
