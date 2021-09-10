import React from 'react';
import {  Image, Switch, Descriptions , Radio  , Row} from 'antd';
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
import Table from '../widget/Table';


class AllAds extends React.Component {

    state = {
      display:false,
      listdata : [],
      range:0,
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
          "type": "needs"
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
        <Table data={this.state.listdata}/>
        <button className="more-btn" onClick={()=>this.getAllAds(this.state.range + 1)}>مشاهده موارد بیشتر</button>
      </>
      
    );
  }
}

export default AllAds;
