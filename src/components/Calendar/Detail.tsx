import DateDetail from "./DateDetail/DateDetailPage";

const Detail = (date: string) => {
  return <div className="detail row">{DateDetail(date)}</div>;
};

export default Detail;
