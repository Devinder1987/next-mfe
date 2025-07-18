import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cartFilePath = path.join(
      process.cwd(),
      'apps',
      'shop',
      'public',
      'cart.json'
    );
    const data = await fs.readFile(cartFilePath, 'utf-8');
    const cart = JSON.parse(data);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart data.' });
  }
}
