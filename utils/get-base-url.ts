import { IncomingMessage } from 'http';

function getBaseURL(req?: IncomingMessage) {
  if (req) {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;

    return `${protocol}://${host}`;
  }

  return window.location.origin;
}

export { getBaseURL };
