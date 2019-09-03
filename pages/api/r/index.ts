import { format } from 'url';
import { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = format({
    host: process.env.API_BASE,
    pathname: '/.json',
    query: req.query,
  });

  try {
    const response = await got(url);

    res.json(response.body);
  } catch (error) {
    res.status(500);
  }
};
