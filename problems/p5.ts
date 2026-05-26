import { groupBy, sumBy } from "remeda";
import { prisma } from "./prisma";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const ratings = await prisma.starRating.findMany({
    include: {
      movie: true
    }
  });
  
  const groupedRatings = groupBy(ratings, (rating) => rating.movieId);

  return Object.values(groupedRatings).map((movieRatings) => {
    const average = sumBy(movieRatings, (rating) => rating.score) / movieRatings.length;

    return {
      averageScore: average,
      movie: movieRatings[0].movie,
    };
  })
  .filter((movieData) => movieData.averageScore > n)
  .map((movieData) => movieData.movie);

};
