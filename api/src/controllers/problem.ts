import { route } from '../config/utils';
import Problem from '../models/Problem';

export const getRandom20 = route(async (req, res) => {
  const random = Math.floor(Math.random() * 1930);
  const data = await Problem.find().limit(20).skip(random);
  //TODO: write script to shuffle json file otherwise getting same topic
  res.status(200).json(data);
});
