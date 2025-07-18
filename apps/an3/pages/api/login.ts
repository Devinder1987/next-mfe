import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ status: 'failed', message: 'Method Not Allowed' });
    return;
  }

  const { username, password } = req.body;

  if (username === 'Admin' && password === 'Test@123') {
    res.status(200).json({ status: 'success', username: 'Admin' });
  } else {
    res.status(401).json({ status: 'failed' });
  }
}
