import { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await got(`${process.env.API_BASE}/.json`);

    res.json(response.body);
  } catch (error) {
    res.status(500);
  }
};
