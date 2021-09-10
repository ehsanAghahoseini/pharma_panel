import React from 'react';
import { Table , Image, Switch, Descriptions , Radio  , Row} from 'antd';
import { Redirect } from 'react-router-dom';
import {
  DeleteOutlined  ,
} from '@ant-design/icons';
import { Modal, Button } from 'antd';
import Loader from '../widget/Loader';
import $ from 'jquery';
import BASE_URL from '../../BASE_URL';
import Filter from '../widget/Filter';
import { Link } from 'react-router-dom';


class TopShop extends React.Component {

    state = {
      display:false,
      listdata : [],
    }





  componentDidMount() {
    this.setState({display:true});
    $.ajax({
      url: 'https://newreza.ir/agahi_farma/php/get_top_shops.php',
      type: 'post',
      dataType: 'json',
      data: JSON.stringify({}),
      success: (res) =>  {
          if(res.result === "ok"){
            this.setState({display:false , listdata : res.shops});
          }
          else {
            this.setState({display:false , listdata : []});
            alert("داده ای برای نمایش وجود ندارد ");
          }
      },
      error:  () => {
        this.setState({ display:false })
          alert("عدم برقراری ارتباط با سرور")
      },
  });
  }


  render() {

    const columns = [

      {
        title: 'نام فروشگاه',
        dataIndex: 'id',
      },
      {
        title: 'حذف آگهی',
        render: row => <DeleteOutlined onClick={() => this.showModaldelete(row.id , row.title)} />,
      },
    ];

    return (
      <>
        {this.state.display ? <Loader/> : null}
        <Table columns={columns} dataSource={this.state.listdata} />
      </>
      
    );
  }
}

export default TopShop;
