import React from 'react';
import { Table, Tag, Switch, Descriptions , Image , Row } from 'antd';
import { Link } from 'react-router-dom';
import {
  DeleteOutlined  ,
} from '@ant-design/icons';
import { Modal, Button } from 'antd';
import Loader from '../widget/Loader';
import $ from 'jquery';
import BASE_URL from '../../BASE_URL';
import Filter from '../widget/Filter';


class ListShop extends React.Component {

    state = {
      visibleAds:false,
      display:false,
      listdata : [],
      listAds:[],
    }


  ListAdsShop = (id) => {
    this.setState({display : true});
    $.ajax({
      url: 'https://newreza.ir/agahi_farma/php/get_shop_ads.php',
      type: 'post',
      dataType: 'json',
      data: JSON.stringify({
        "username":localStorage.getItem('username'),
        "password":localStorage.getItem('password'),
        "user_id": id,
      }),
      success: (res) =>  {
          if(res.result === "ok"){
            this.setState({
              display:false ,
              listAds : res.ads ,
              visibleAds : true
            });
            this.componentDidMount();
          }
      },
      error:  () => {
        this.setState({ display:false })
          alert("عدم برقراری ارتباط با سرور")
      },
    });
  }


  componentDidMount() {
    this.setState({display:true});
    $.ajax({
      url: 'https://newreza.ir/agahi_farma/php/get_shops.php',
      type: 'post',
      dataType: 'json',
      success: (res) =>  {
          if(res.result === "ok"){
            this.setState({
              display:false ,
              listdata : res.shops,
            });
          }
          else {
            this.setState({display:false , listdata:[]});
            alert("داده ای برای نمایش وجود ندارد")
          }
      },
      error:  () => {
        this.setState({ display:false })
          alert("عدم برقراری ارتباط با سرور")
      },
  });
  }


  render() {
    const DescriptionItem = ({title, content}) => (
      <div className="ProductDetailsDescribeDiv">
        <div className="ProductDetailsDescribeLabel">{title} : </div>
        <div className="ProductDetailsDescribecontent">{content}</div>
      </div>
  );

    const columns = [

      {
        title: 'نام فروشگاه',
        dataIndex: 'name',
      },
      {
        title: 'مشاهده آگهی های فروشگاه',
        render: (text , row) =>  <span className="title-list-name" onClick={()=>this.ListAdsShop(row.username)} >مشاهده</span>,
      },
    ];

    const Adscolumns = [
      {
        title: 'آیدی آگهی',
        dataIndex: 'id',
      },
      {
        title: 'مشاهده آگهی',
        render: (text , row) =>  <a target="_blank" href={`https://agahipharma.com/post/${`${row.title} ${row.description.substring(0, 60)}`.split(' ').join('').split('/').join('')}/${row.id}`}  >مشاهده</a>,
      },
    ];

    return (
      <>
        {this.state.display ? <Loader/> : null}
        <Modal
          title="لیست آگهی ها"
          visible={this.state.visibleAds}
          onCancel={()=>{this.setState({visibleAds:false})}}
          footer={null}
          className="detail-property-modal"
          width={1000}
        >    
        <Table columns={Adscolumns} dataSource={this.state.listAds} />
      </Modal>
      <Table columns={columns} dataSource={this.state.listdata} />
      </>
      
    );
  }
}

export default ListShop;
