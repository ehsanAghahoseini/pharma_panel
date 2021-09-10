import React from 'react';
import {
  DeleteOutlined  ,
} from '@ant-design/icons';

class Table extends React.Component {


  render() {


    return (
      <div className="cTable">
        <div className="cTable-head">
          <div className="cTable-head-item">عنوان آگهی</div>
          <div className="cTable-head-item">مشاهده آگهی</div>
          <div className="cTable-head-item">حذف آگهی</div>
        </div>
        {this.props.data.map(item=>
        <div className="cTable-row">
          <div className="cTable-row-item">{item.id}</div>
          <div className="cTable-row-item"><span>مشاهده</span></div>
          <div className="cTable-row-item"><DeleteOutlined/></div>
        </div>
        )}
      </div>

    );
  }
}

export default Table;
