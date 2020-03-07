import { format } from 'url';

import { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { subreddit, ...query } = req.query;

  const url = format({
    host: process.env.API_BASE,
    pathname: `/r/${subreddit}/about.json`,
    query,
  });

  try {
    const response = await got(url);
    return res.json(response.body);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
