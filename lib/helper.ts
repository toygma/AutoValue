export const formatDate = (date: string | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("tr-TR", options);
};


export const averageRating = (ratings: number[]) => {
  if (ratings.length === 0) return 0;
  const total = ratings.reduce((acc, rating) => acc + rating, 0);
  return total / ratings.length;
}