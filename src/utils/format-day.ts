export const formatDate = (dateToFormat: string) => {
  const date = new Date(dateToFormat);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);

  return formattedDate;
};
