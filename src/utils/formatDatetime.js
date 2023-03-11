export const formatDatetime = (dateString) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);
};
