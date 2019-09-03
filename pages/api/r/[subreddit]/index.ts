import { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { subreddit } = req.query;

  try {
    const response = await got(`${process.env.API_BASE}/r/${subreddit}.json`);
    res.json(response.body);
  } catch (error) {
    res.status(500);
  }
};
