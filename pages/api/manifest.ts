import { format } from 'url';
import { NextApiRequest, NextApiResponse } from 'next';

const getFirstParam = (input: string | string[]) =>
  Array.isArray(input) ? input[0] : input;

const manifest = (req: NextApiRequest, res: NextApiResponse) => {
  const { path, ...query } = req.query;
  const startUrl = format({
    pathname: getFirstParam(path) || '.',
    query,
  });

  return res.status(200).json({
    name: 'Serverless Reddit',
    short_name: 'Reddit',
    start_url: startUrl,
    scope: '.',
    background_color: '#fff',
    theme_color: '#fff',
    display: 'standalone',
    icons: [
      {
        src: '/logo/android-icon-36x36.png',
        sizes: '36x36',
        type: 'image/png',
        density: '0.75',
      },
      {
        src: '/logo/android-icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
        density: '1.0',
      },
      {
        src: '/logo/android-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        density: '1.5',
      },
      {
        src: '/logo/android-icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        density: '2.0',
      },
      {
        src: '/logo/android-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        density: '3.0',
      },
      {
        src: '/logo/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        density: '4.0',
      },
    ],
  });
};

export default manifest;
