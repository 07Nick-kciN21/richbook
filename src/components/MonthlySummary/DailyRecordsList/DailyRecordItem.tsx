import { DailyRecordItemModel } from "../../../interface/View";
const DailyRecordItem = (record: DailyRecordItemModel) => {
  if (record.data.length === 0) {
    return null;
  }

  return (
    <div className="DailyRecordItem col-md-12">
      <div>{record.date}</div>
      {record.data.length > 0
        ? record.data.map((item) => (
            <div className={item.income_or_expenditure}>
              <div
                key={item.id}
                className="row border"
                style={{
                  color:
                    item.income_or_expenditure === "income" ? "green" : "red",
                }}
              >
                <div className="col-sm-8">
                  <p>項目: {item.type}</p>
                  <p>金額: {item.cost}</p>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default DailyRecordItem;
