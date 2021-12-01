import dotenv from 'dotenv';

const envPath = (environment) => {
  const path = {
    prod: '.env',
    test: '.env.test',
    dev: '.env.dev',
  };
  return path[environment];
};

dotenv.config({
  path: envPath(process.env.NODE_ENV),
});
