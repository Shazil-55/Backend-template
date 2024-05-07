import cors from 'cors';

const allowedOrigins = [
  'http://localhost:8000',
  'https://localhost:8000',
  'https://localhost:4000',
  'http://localhost:4000',
  'https://linkwave-frontend.vercel.app',
  'https://linkwave-website.vercel.app',
  'https://linkwave-admin.vercel.app',
  'htpps://admin.linkwave.io',
  'https://linkwave.io',
  'https://app.linkwave.io',
];

export const internalOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};
