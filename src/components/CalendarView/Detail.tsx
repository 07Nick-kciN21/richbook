import DayDetail from "./DateDetail/DayDetail";

const Detail = (date: string) => {
  return <div className="detail row">{DayDetail(date)}</div>;
};

export default Detail;
