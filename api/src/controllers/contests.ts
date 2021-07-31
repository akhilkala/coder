import { route } from '../config/utils';

export const getAll = route(async (req, res) =>
  res.redirect('https://kontests.net/api/v1/all')
);
