const Add = () => {
  return (
    <form className="Add-form">
      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          autocomplete="off"
          checked
        ></input>
        <label className="btn btn-outline-primary" for="btnradio1">
          收入
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2"
          autocomplete="off"
        ></input>
        <label className="btn btn-outline-primary" for="btnradio2">
          支出
        </label>
      </div>
      <div className="row row-cols-2">
        <p className="row">金額</p>
        <input className="cost row"></input>
        <p className="row">類別</p>
        <input className="type row"></input>
        <p className="row">備註</p>
        <input className="remark row"></input>
      </div>
      <div className="">
        <button type="button" class="btn btn-light">
          儲存
        </button>
        <button type="button" class="btn btn-dark">
          再記一筆
        </button>
      </div>
    </form>
  );
};

export default Add;
