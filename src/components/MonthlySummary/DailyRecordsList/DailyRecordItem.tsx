import { DailyRecordItemModel } from "../../../interface/View";

const DailyRecordItem = (record: DailyRecordItemModel) => {
  if (record.data.length === 0) {
    return null;
  }

  return (
    <div className="DailyRecordItem col-md-12">
      <div>{record.date}</div>
      {record.data.length > 0
        ? record.data.map((item, index) => (
            <div className={item.income_or_expenditure}>
              <div
                key={item.id}
                className="row border"
                style={{
                  color:
                    item.income_or_expenditure === "income" ? "green" : "red",
                }}
              >
                <div className="d-flex align-items-center">
                  {record.pic[index] ? (
                    <img
                      src={record.pic[index]}
                      alt={record.pic[index]}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                      }}
                    />
                  ) : null}
                  <div className="mb-0">
                    <p>項目: {item.type}</p>
                    <p>金額: {item.cost}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default DailyRecordItem;
