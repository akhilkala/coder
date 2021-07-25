import { Req } from '../config/types';
import { route } from '../config/utils';
import Question from '../models/Question';

export const getQuestions = route(async (req, res) => {
  const data = await Question.find(req.body.filter || {});

  res.status(200).json({
    data,
  });
});

export const postQuestion = route(async (req: Req, res) => {
  const { name, link, description } = req.body;

  // TODO: Change
  if (!link) throw new Error('Illegal req');

  const question = await new Question({
    name,
    link,
    description,
    user: req.user._id,
  }).save();

  res.status(200).json({
    data: question,
  });
});

export const incrementShare = route(async (req, res) => {
  const { id } = req.params;

  //TODO: check what error when illegal ID
  await Question.updateOne(
    { _id: id },
    {
      $inc: {
        shares: 1,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
});

export const like = route((req, res) => {});

export const unlike = route((req, res) => {});
