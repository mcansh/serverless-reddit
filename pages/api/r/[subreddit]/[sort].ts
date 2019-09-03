import { format } from 'url';
import { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';
import { getFirstParam } from '~/utils/get-first-param';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { subreddit, sort, ...query } = req.query;

  const feeds = ['hot', 'new', 'controversial', 'top', 'rising'];

  if (!feeds.includes(getFirstParam(sort))) {
    res
      .status(400)
      .json({ message: `Sort '${sort}' not one of ${feeds.join(', ')}` });
  }

  const url = format({
    host: process.env.API_BASE,
    pathname: `/r/${subreddit}/${sort}.json`,
    query,
  });

  try {
    const response = await got(url);
    res.json(response.body);
  } catch (error) {
    res.status(500);
  }
};
