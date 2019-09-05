import { format } from 'url';
import { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';
import { getFirstParam } from '~/utils/get-first-param';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { subreddit, sort, ...query } = req.query;

  const feeds = ['hot', 'new', 'controversial', 'top', 'rising'];

  if (!feeds.includes(getFirstParam(sort))) {
    return res
      .status(400)
      .json({ message: `'${sort}' is not a valid sort option` });
  }

  const url = format({
    host: process.env.API_BASE,
    pathname: `/r/${subreddit}/${sort}.json`,
    query,
  });

  try {
    const response = await got(url);
    return res.json(response.body);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
