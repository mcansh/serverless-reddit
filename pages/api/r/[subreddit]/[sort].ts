import { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';
import { getFirstParam } from '~/utils/get-first-param';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { subreddit, sort } = req.query;

  const feeds = ['hot', 'new', 'controversial', 'top', 'rising'];

  if (!feeds.includes(getFirstParam(sort))) {
    res
      .status(400)
      .json({ message: `Sort '${sort}' not one of ${feeds.join(', ')}` });
  }
  try {
    const response = await got(
      `${process.env.API_BASE}/r/${subreddit}/${sort}.json`
    );
    res.json(response.body);
  } catch (error) {
    res.status(500);
  }
};
