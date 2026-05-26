import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const ratings = await prisma.starRating.aggregate({
    where: {
      userId: userId
    },
    _avg: {
      score: true
    }
  })
  return ratings._avg.score;
};
