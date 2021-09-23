import React from 'react';
import {  Image, Switch, Descriptions , Radio  , Row} from 'antd';
import { Redirect } from 'react-router-dom';
import {
  DeleteOutlined, EditOutlined  ,
} from '@ant-design/icons';
import { Modal, Button } from 'antd';
import Loader from '../widget/Loader';
import $ from 'jquery';
import BASE_URL from '../../BASE_URL';
import Filter from '../widget/Filter';
import { Link } from 'react-router-dom';
import Table from '../widget/Table';


class AllAds extends React.Component {

    state = {
      display:false,
      visible : false,
      listdata : [],
      range:0,
      deleteId : '',
    }


    deleteAds=(id)=>{
      this.setState({
        deleteId  : id ,
        visible : true ,
      })
    }


    deleteFinish=()=>{
      this.setState({visible: false});
      $.ajax({
        url: BASE_URL + '/delete_ad.php',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify({
          "username":localStorage.getItem('username'),
          "password":localStorage.getItem('password'),
          "ad_id": this.state.deleteId,
        }),
        success: (res) =>  {
            if(res.result === "ok"){
              this.setState({display:false , visible : false});
              this.componentDidMount();
            }
        },
        error:  () => {
          this.setState({ display:false })
            alert("عدم برقراری ارتباط با سرور")
        },
      });
    }



    nextPage=()=>{
      const range = this.state.range ;
      this.setState({range:range + 60});
      this.getAllAds(range+60);
    }

    beforePage=()=>{
      const range = this.state.range ;
      if(range -60 >= 0){
        this.setState({range:range - 60});
        this.getAllAds(range-60);
      }
      else {
        alert('صفحه قبلی وجود ندارد')
      }
      
    }




    getAllAds=(range)=>{
      this.setState({display:true});
      $.ajax({
        url: 'https://newreza.ir/agahi_farma/php/get_personal_ads.php',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify({
          "search": "",
          "province_id": "-1",
          "city_id": "-1",
          "range": `${range}`,
          "type": ""
        }),
        success: (res) =>  {
            if(res.result === "ok"){
              this.setState({display:false , listdata : res.ads});
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



  componentDidMount() {
    this.getAllAds(this.state.range)
  }


  render() {
   

    return (
      <>
        {this.state.display ? <Loader/> : null}
        <div className="cTable">
          <div className="cTable-head">
            <div className="cTable-head-item">آیدی آگهی</div>
            <div className="cTable-head-item">عنوان آگهی</div>
            <div className="cTable-head-item">مشاهده آگهی</div>
            <div className="cTable-head-item">ویرایش آگهی</div>
            <div className="cTable-head-item">حذف آگهی</div>
          </div>
          {this.state.listdata.map(item=>
          <div className="cTable-row">
            <div className="cTable-row-item">{item.id}</div>
            <div className="cTable-row-item">{item.title}</div>
            <div className="cTable-row-item"><a target="_blank" href={`https://agahipharma.com/post/${`${item.title} ${item.description.substring(0, 60)}`.split(' ').join('').split('/').join('')}/${item.id}`}  >مشاهده</a></div>
            <div className="cTable-row-item"><Link to={`edit/${item.id}`}><EditOutlined/></Link></div>
            <div className="cTable-row-item"><DeleteOutlined onClick={()=>this.deleteAds(item.id)}/></div>
          </div>
          )}
        </div>
        <div className="more-btn-cont">
          <button className="more-btn" onClick={()=>this.nextPage()}>مشاهده موارد بیشتر</button>
          <button className="more-btn" onClick={()=>this.beforePage()}>مشاهده موارد قبلی</button>
        </div>
        <Modal
            title="پیام"
            visible={this.state.visible}
            onCancel={()=>{this.setState({visible : false})}}
            onOk={()=>this.deleteFinish()}
          >
             ایا مایل به حدف آگهی {this.state.deleteId} هستید ؟
        </Modal>

      </>
      
    );
  }
}

export default AllAds;
