import { groupBy, map, maxBy, meanBy, minBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const allRatings = await prisma.starRating.findMany();
  const grouped = groupBy(allRatings, (rating) => rating.userId);
  const averages = map(Object.values(grouped), (ratings) => {
    return {
      userId: ratings[0].userId,
      average: meanBy(ratings, (rating) => rating.score)
    }
  });

  return minBy(averages, (user) => user.average)?.userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const allRatings = await prisma.starRating.findMany();
  const grouped = groupBy(allRatings, (rating) => rating.userId);
  const averages = map(Object.values(grouped), (ratings) => {
    return {
      userId: ratings[0].userId,
      average: meanBy(ratings, (rating) => rating.score),
    };
  });

  return maxBy(averages, (user) => user.average)?.userId;
};
