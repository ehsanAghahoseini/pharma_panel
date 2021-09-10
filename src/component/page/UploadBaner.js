import React from 'react';
import { Button , Modal, Image, Descriptions , Alert , Upload , Divider } from 'antd';
import { Link } from 'react-router-dom';
import {
  DeleteOutlined  ,
} from '@ant-design/icons';
import Loader from '../widget/Loader';
import $ from 'jquery';
import BASE_URL_SITE from '../../BASE_URL_SITE';
import BASE_URL from '../../BASE_URL';
import ImgCrop from 'antd-img-crop';


class UploadBaner extends React.Component {

    state = {
      display:false,
      visible: false ,
      listdata:[],
      item_del_id : "",
      left_over_image:"",
      fileList : [],
    }

    // show modal delete and set id delete item
    showModal = (id) => {
      this.setState({
        visible: true,
        item_del_id : id ,
      });
    };
  
    // delete item after click on ok in modal
    handleOk = () => {
      this.setState({display:true});
      const postdata = {
        "username":localStorage.getItem('username'),
        "password":localStorage.getItem('password'),
        "banner_id": this.state.item_del_id,
        }  
      var fd = new FormData();    
      fd.append( 'data', JSON.stringify(postdata) );
      $.ajax({
        url: BASE_URL + '/delete_banner.php',
        type: 'post',
        data: fd,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: (res) =>  {
            var resu = JSON.parse(res);
            if(resu.result === "ok"){
              this.setState({ 
                display:false ,
                visible: false,
                fileList : [],
                 });
              this.componentDidMount();
            }
        },
        error:  () => {
          this.setState({ display:false })
            alert("عدم برقراری ارتباط با سرور")
        },
    });
    };
  

    // close modal for delete
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };


    // set image for upload in sate
    onChange = ({ fileList: newFileList }) => {
      this.setState({fileList :newFileList});
    };
  
    // display image upload list
    onPreview = async file => {
      let src = file.url;
      if (!src) {
        src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    };
  
    dummyRequest = ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    };

    // send image to server for save
    sendimage = () => {
      this.setState({display:true});
      const postdata = {
        "username":localStorage.getItem('username'),
        "password":localStorage.getItem('password'),
        "banner_id": 1,
        }  
      var fd = new FormData();  
      fd.append( 'data', JSON.stringify(postdata) );
      for(var i in this.state.fileList){
        fd.append("file",this.state.fileList[i].originFileObj );
      }
      $.ajax({
        url: BASE_URL + '/add_banner.php',
        type: 'post',
        data: fd,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: (res) =>  {
            var resu = JSON.parse(res);
            if(resu.result === "ok"){
              this.setState({ 
                display:false ,
                visible: false,
                fileList : [],
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
      url: BASE_URL_SITE + '/get_banner_images.php',
      type: 'post',
      dataType: 'json',
      success: (res) =>  {
          if(res.result === "ok"){
            this.setState({
              display:false ,
              listdata : res.banners,
              left_over_image : 6 - res.banners.length ,
            });
          }
      },
      error:  () => {
        this.setState({ display:false })
          alert("عدم برقراری ارتباط با سرور")
      },
  });
  }


  render() {
    return (
      <>
        {this.state.display ? <Loader/> : null}
        <Modal
          title="حذف تصویر"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          آیا مایل به حذف تصویر شماره {this.state.item_del_id} میباشید ؟
        </Modal>
        <div>
          {this.state.left_over_image === 0 ? 
           <Alert
           message="توجه"
           description="قادر به افزودن تصویر جدید نمیباشید.درصورت نیاز به افزودن عکس , از تصاویر موجود حذف نمایید"
           type="warning"
           showIcon
          />
           : 
           <>
              <h3>مجاز به افزودن {this.state.left_over_image} تصویر میباشید.</h3><br></br>
              {/* <ImgCrop aspect={2/1}> */}
                <Upload
                    accept=".png , .jpg , .jpeg"
                    listType="picture-card"
                    fileList={this.state.fileList}
                    onChange={this.onChange}
                    onPreview={this.onPreview}
                    customRequest={this.dummyRequest}
                    showUploadList ={{showPreviewIcon:false}}
                    >
                    {this.state.fileList.length < 1 && '+ Upload'}
                  </Upload>
                {/* </ImgCrop> */}
                {this.state.fileList.length != 0 ? 
                <Button onClick={this.sendimage} type="primary">بارگذاری عکس</Button>
                : null}
            </>
            }
          <Divider />
          <Descriptions
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            { this.state.listdata.map(item =>
            <Descriptions.Item label={item.id} span={1} className="list-image-banner" >
              <Image
                  width={200}
                  src={item.url}
                />   
              <Button onClick={() => this.showModal(item.id)} type="primary" danger>حذف</Button>
            </Descriptions.Item>
             )} 
          </Descriptions>
        </div>
      </>
      
    );
  }
}

export default UploadBaner;
