const FormatDate = ({ dateString }) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", { timeZone: "UTC" }).format(date);
};

export default FormatDate;
