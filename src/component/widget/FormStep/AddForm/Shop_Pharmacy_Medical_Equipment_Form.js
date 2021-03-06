import React from 'react';
import {connect} from "react-redux";
import {StepState} from '../../../../action/AddAdsAction';
import {Form, Input, Select, Button, Modal, Upload, InputNumber, Tag, Cascader} from 'antd';
import ImgCrop from 'antd-img-crop';
import $ from 'jquery';
import {RollbackOutlined, UploadOutlined, ArrowRightOutlined} from "@ant-design/icons"
import {Map, Marker, TileLayer} from "react-leaflet";
import {DatePicker} from "jalali-react-datepicker";
import moment from "jalali-moment";
import Checkbox from "antd/es/checkbox";
import Loader from '../../Loader';
import BASE_URL_SITE from '../../../../BASE_URL_SITE';
import BASE_URL from '../../../../BASE_URL';
import { Redirect } from 'react-router-dom';


class Shop_Pharmacy_Medical_Equipment_Form extends React.Component {

  state = {
    display : false ,
    visible : false ,
    redirect : false ,
    textModal : "",
    fileList : [],
    allCity : [],
    allProvinces : []
  }
  formRef = React.createRef();



  onChange = ({ fileList: newFileList }) => {
    this.setState({fileList :newFileList});
  };

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


  onFinish=(values)=>{
    let imgCheck = "false" ;
    if(this.state.fileList.length != 0){
      imgCheck = "true" ;
    }
    for(let i in values){
      if(values[i] === undefined){
          values[i] = "";
      }
    }
    this.setState({display:true});
    let ProduceTime = values.produce_time;
    ProduceTime = ProduceTime.replace("/0","/");
    ProduceTime = ProduceTime.replace("/0","/");
    let ExpireTime = values.expire_time;
    ExpireTime = ExpireTime.replace("/0","/");
    ExpireTime = ExpireTime.replace("/0","/");
    const TypeTitle = document.getElementsByClassName("ant-cascader-picker-label")[0].innerText;
    const postData = {
      "username": localStorage.getItem('username'),
      "password": localStorage.getItem('password'),
      "type": "shop_pharmacy",
      "type2": values.TypeMakeUp[0],
      "type3": values.TypeMakeUp[1],
      "type4": "",
      "title": TypeTitle,
      "province_id": "",
      "city_id": "",
      "demand":  "",
      "license": "",
      "shift": "",
      "description": values.description,
      "name": "",
      "mobile": "",
      "address": "",
      "lat": "",
      "lng": "",
      "experience_time": "",
      "document": "",
      "place_name": "",
      "work_type": "",
      "raw_points_amount": "",
      "earned_points_amount": "",
      "daily_sales_amount": "",
      "insurance_amount": "",
      "rent_amount": "",
      "documents_last_time": "",
      "tender_deposit": "",
      "result_time": "",
      "pharmacy_experience": "",
      "mortgage_offer": "",
      "rent_offer": "",
      "storage": "",
      "width": "",
      "length": "",
      "street": "",
      "corner": "",
      "water": "",
      "power": "",
      "phone_line": "",
      "internet": "",
      "gas": "",
      "stair": "",
      "elevator": "",
      "clinic_experience": "",
      "floor_number": "",
      "prescription": "",
      "product_name": "",
      "urgent_need": "",
      "place_type": "",
      "phone": "",
      "count":values.count,
      "brand": values.brand,
      "colors": values.colors,
      "guarantee": values.guarantee,
      "purchase_points": values.purchase_points,
      "price": values.price,
      "discount": values.discount,
      "image_detail": imgCheck,
      "persian_name": values.persian_name,
      "english_name": values.english_name,
      "produce_country": values.produce_country,
      "volume": values.volume,
      "expire_time": ExpireTime,
      "produce_time": ProduceTime
    };
    let fd = new FormData();
    fd.append( 'data', JSON.stringify(postData) );
    for(let i in this.state.fileList){
      fd.append("file",this.state.fileList[i].originFileObj );
    }
    $.ajax({
      url: BASE_URL + '/add_unique_ad.php',
      type: 'post',
      dataType: 'json',
      data: fd,
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      success: (res) =>  {
          if (res.result == "ok") {
            this.setState({
              display:false ,
              visible : true ,
              textModal : "???????????????? ?????? ??????????" ,
              redirect : true ,
            });
          }
          else {
            this.setState({
              display:false ,
              visible : true ,
              textModal : "???? ???????? ?????? ???????????? ???? ???????? ??????"
            });
          }
      },
      error: function () {
        this.setState({ display:false })
        alert("?????? ?????????????? ???????????? ???? ????????")
      },
    });
  }


  componentDidMount() {

  }

  render() {

    const optionsCase = [
        {
            value: 'temperature',
            label: '?????? - ????',
            children: [
                {
                    value: 'thermometer1',
                    label: '???? ??????',
                },
                {
                    value: 'thermometer2',
                    label: '?????? ??????',
                },
            ],
        },
        {
            value: 'pulse_meter',
            label: '?????????? ??????',
            children: [
                {
                    value: 'stethoscope',
                    label: '???????? ??????????',
                },
                {
                    value: 'hearing_sound',
                    label: '???????? ??????',
                },
                {
                    value: 'wrist',
                    label: '???? ??????',
                },
            ],
        },
        {
            value: 'sugar_test',
            label: '?????? ??????',
            children: [
                {
                    value: 'sugar_machine',
                    label: '???????????? ??????',
                },
                {
                    value: 'strip_test',
                    label: '???????? ??????',
                },
                {
                    value: 'machine_needle',
                    label: '???????? ????????????',
                },
                {
                    value: 'machine_needle',
                    label: '??????',
                },
            ],
        },
        {
            value: 'hearing_aids',
            label: '????????',
            children: [
                {
                    value: 'hearing_aids',
                    label: '????????',
                },
                {
                    value: 'battery',
                    label: '??????????',
                },
                {
                    value: 'box',
                    label: '????????/????????',
                },
                {
                    value: 'prob',
                    label: '????????',
                },
                {
                    value: 'dehumidifiers',
                    label: '?????????? ??????',
                },
                {
                    value: 'bag',
                    label: '??????',
                },
                {
                    value: 'battery_tester',
                    label: '???????? ??????????',
                },
            ],
        },
        {
            value: 'massage',
            label: '??????????????',
            children: [
                {
                    value: 'electric',
                    label: '????????',
                },
                {
                    value: 'manual',
                    label: '????????',
                },
                {
                    value: 'chair',
                    label: '??????????',
                },
            ],
        },
        {
            value: 'scale',
            label: '??????????',
            children: [
                {
                    value: 'digital',
                    label: '??????????????',
                },
                {
                    value: 'mechanical',
                    label: '??????????????',
                },
                {
                    value: 'laboratory',
                    label: '????????????????????',
                },
            ],
        },
        {
            value: 'aerator',
            label: '???????????? ????????',
            children: [
                {
                    value: 'cold',
                    label: '??????',
                },
                {
                    value: 'hot',
                    label: '??????',
                },
                {
                    value: 'hotcold',
                    label: '?????? ?? ??????',
                },
            ],
        },
        {
            value: 'body_medical',
            label: '?????????? ?????? ??????',
            children: [
                {
                    value: 'hand',
                    label: '??????',
                    children: [
                        {
                            value: 'wrist',
                            label: '???? ??????',
                        },
                        {
                            value: 'arnchband',
                            label: '???????? ??????',
                        },
                        {
                            value: 'ketfband',
                            label: '?????? ??????',
                        },
                        {
                            value: 'ceiling',
                            label: '?????? ??????',
                        },
                        {
                            value: 'obesband',
                            label: '??????????????',
                        },
                        {
                            value: 'fingerband',
                            label: '?????? ??????????',
                        },
                    ]
                },
                {
                    value: 'leg',
                    label: '????',
                    children: [
                        {
                            value: 'kneeband',
                            label: '??????????????',
                        },
                        {
                            value: 'sandal',
                            label: '????????',
                        },
                        {
                            value: 'heelstrap',
                            label: '?????????? ??????',
                        },
                        {
                            value: 'anklestrap',
                            label: '???????? ??????',
                        },
                        {
                            value: 'varicosebocks',
                            label: '?????????? ??????????',
                        },
                        {
                            value: 'plastershoes',
                            label: '?????? ????',
                        },
                    ]
                },
                {
                    value: 'body',
                    label: '??????',
                    children: [
                        {
                            value: 'abdominalband',
                            label: '?????? ??????',
                        },
                        {
                            value: 'beltband',
                            label: '????????????',
                        },
                        {
                            value: 'ghozband',
                            label: '????????????',
                        },
                        {
                            value: 'gan',
                            label: '????',
                        },
                        {
                            value: 'fatgh_band',
                            label: '?????? ??????'
                        }
                    ]
                },
                {
                    value: 'necklaces',
                    label: '???????? ??????',
                    children: [
                        {
                            value: 'necklaces_soft',
                            label: '???????? ?????? ??????',
                        },
                        {
                            value: 'necklaces_hard',
                            label: '???????? ?????? ??????',
                        },
                    ]
                }
            ],
        },
        {
            value: 'calender_box',
            label: '?????????? - ????????',
            children: [
                {
                    value: 'reminder',
                    label: '????????????',
                },
                {
                    value: 'box',
                    label: '????????',
                },
            ]
        },
        {
            value: 'dropper',
            label: '???????? ????????',
            children: [
                {
                    value: 'dropper',
                    label: '???????? ????????',
                },
            ]
        },
        {
            value: 'inflatable',
            label: '??????????',
            children: [
                {
                    value: 'ballon_device',
                    label: '????????????',
                },
                {
                    value: 'glass',
                    label: '??????????',
                },
            ]
        },
        {
            value: 'medical_rest',
            label: '?????????????? ??????',
            children: [
                {
                    value: 'mathress',
                    label: '??????',
                },
                {
                    value: 'patoo',
                    label: '??????',
                },
                {
                    value: 'chair',
                    label: '??????????',
                },
                {
                    value: 'pillow',
                    label: '??????????',
                },
                {
                    value: 'blindfold',
                    label: '?????? ??????',
                },
                {
                    value: 'spa_bag',
                    label: '?????? ???? ??????',
                }
            ]
        },
        {
            value: 'air_conditioner',
            label: '??????????',
            children: [
                {
                    value: 'air',
                    label: '?????????? ??????',
                },
                {
                    value: 'watter',
                    label: '?????????? ????',
                },
                {
                    value: 'filter',
                    label: '??????????',
                },
                {
                    value: 'anti_door',
                    label: '??????????',
                },
            ]
        },
        {
            value: 'disinfection',
            label: '??????????????',
            children: [
                {
                    value: 'device',
                    label: '????????????',
                },
                {
                    value: 'spary',
                    label: '??????????',
                },
                {
                    value: 'solution',
                    label: '??????????',
                },
                {
                    value: 'gel',
                    label: '????',
                },
                {
                    value: 'pad',
                    label: '???? ????????',
                },
            ]
        },
        {
            value: 'adhesive',
            label: '?????? - ???? - ????',
            children: [
                {
                    value: 'pad',
                    label: '????',
                },
                {
                    value: 'adhesive',
                    label: '??????',
                },
                {
                    value: 'gel',
                    label: '????',
                },
                {
                    value: 'gas',
                    label: '??????',
                },
                {
                    value: 'band',
                    label: '????????',
                },
            ]
        },
        {
            value: 'tool',
            label: '??????????',
            children: [
                {
                    value: 'cane',
                    label: '??????',
                },
                {
                    value: 'chair',
                    label: '??????????',
                },
                {
                    value: 'container',
                    label: '??????',
                },
                {
                    value: 'toilet',
                    label: '??????????',
                },
                {
                    value: 'handle',
                    label: '??????????????',
                },
                {
                    value: 'test',
                    label: '??????',
                },
                {
                    value: 'earning',
                    label: '??????????????',
                },
                {
                    value: 'box',
                    label: '???????? ?????? ??????????',
                },
            ]
        },
        {
            value: 'gloves',
            label: '??????????',
            children: [
                {
                    value: 'surgery',
                    label: '??????????',
                },
                {
                    value: 'latex',
                    label: '??????????',
                },
                {
                    value: 'vinyl',
                    label: '??????????',
                },
                {
                    value: 'nitrile',
                    label: '????????????',
                }
            ]
        },
        {
            value: 'barometer',
            label: '??????????????',
            children: [
                {
                    value: 'arm',
                    label: '????????????',
                },
                {
                    value: 'wrist',
                    label: '??????',
                },
                {
                    value: 'scarf',
                    label: '?????????? ????',
                },
                {
                    value: 'mercury',
                    label: '???????? ????',
                }
            ]
        },
    ];

  const formItemLayout = {
      labelCol: {
          xs: {span: 23},
          sm: {span: 8},
      },
      wrapperCol: {
          xs: {span: 24},
          sm: {span: 16},
      },
  };
  const tailFormItemLayout = {
      wrapperCol: {
          xs: {
              span: 24,
              offset: 0,
          },
          sm: {
              span: 24,
              offset: 0,
          },
      },
  };
  const {Option} = Select;  
    return (
    <div className="group-button">
        {this.state.redirect ? (<Redirect to='/panel/adminadvertisinglist' />) : null}
        {this.state.display ? <Loader/> : null}
        <Modal
            title="????????"
            visible={this.state.visible}
            onCancel={()=>{this.setState({visible : false})}}
            footer={null}
          >
             {this.state.textModal}
        </Modal>
        <Button danger onClick={()=>{this.props.StepState('shop_pharmacy')}}>????????????</Button>
        <Form {...formItemLayout} ref={this.formRef} name="form" onFinish={this.onFinish} >
        <Form.Item
              name="TypeMakeUp"
              label="?????? ?????????? ??????????"
          >
              <Cascader popupClassName="casCader"
                  popupPlacement={"bottomLeft"}
                  suffixIcon={<ArrowRightOutlined />}
                  expandIcon={<ArrowRightOutlined />}
                  placeholder="?????? ?????????? ??????????"
                  options={optionsCase}
                  changeOnSelect
              />
          </Form.Item>

          <Form.Item
              name="brand"
              label="????????"
              rules={[{required: true, message: '?????? ???????? ????????????????'}]}
          >
              <Input/>
          </Form.Item>

          <Form.Item name="description" label="?????????????? ????????">
              <Input.TextArea placeholder="?????????????? ???????? ???? ???????? ????????" autoSize={{minRows: 2}}/>
          </Form.Item>

          <Form.Item
              name="colors"
              label="??????"
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="guarantee"
              label="??????????????"
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="persian_name"
              label="?????? ???????? ???? ??????????"
              rules={[{required: true, message: '?????? ???????? ????????????????'}]}
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="english_name"
              label="?????? ???????? ???? ??????????????"
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="produce_time"
              label="?????????? ??????????"
              help={"???????? :  1400/01/02"}
              rules={[{required: false},
                  () => (
                      {
                          validator(rule, value) {
                              if ((value.charAt(4) === "/" && value.charAt(7) === "/" && value.length === 10 ) || value === "") {
                                  return Promise.resolve();
                              }
                              return Promise.reject('???????? ?????????? ???? ?????? ???????? ???????? ????????');
                          }
                      })
              ]}
          >
              <Input style={{width:"100%"}} />
          </Form.Item>

          <Form.Item
              name="expire_time"
              label="?????????? ??????????"
              help={"???????? :  1400/01/02"}
              rules={[{required: false},
                  () => ({
                      validator(rule, value) {
                          if ((value.charAt(4) === "/" && value.charAt(7) === "/" && value.length === 10 ) || value === "") {
                              return Promise.resolve();
                          }
                          return Promise.reject('???????? ?????????? ???? ?????? ???????? ???????? ????????');
                      }
                  })
              ]}
          >
              <Input style={{width:"100%"}} />
          </Form.Item>

          <Form.Item
              name="produce_country"
              label="???????? ????????????"
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="volume"
              label="?????? ??????????"
          >
              <Input/>
          </Form.Item>

          <Form.Item
              name="purchase_points"
              label="???????????? ????????"
          >
              <InputNumber style={{display:"block",width:"16rem"}} />
          </Form.Item>

          <Form.Item
              name="count"
              label="???????????? ????????"
              rules={[{required: true, message: '?????????? ???? ???????? ????????'}]}
          >
              <InputNumber placeholder="??????????"  style={{display:"block",width:"16rem"}} />
          </Form.Item>


          <Form.Item
              name="price"
              label="???????? ????????"
              rules={[{required: true, message: '?????? ???? ???????? ????????'}]}
          >
              <InputNumber style={{display:"block",width:"16rem"}} />
          </Form.Item>

          <Form.Item
              dependencies={['price']}
              name="discount"
              label="???????? ?????????? ????????"
              rules={[
                  {
                      required: true,
                      message: '???????? ?????????? ???? ???????? ????????',
                  },
                  ({getFieldValue}) => ({
                      validator(rule, value) {
                          if (getFieldValue("price") < value) {
                              return Promise.reject('???????? ?????????? ?????? ?????????? ?????? ???? ???????? ???????? ????????');
                          }
                          return Promise.resolve();
                      },
                  }),
              ]}
          >
              <InputNumber style={{display:"block",width:"16rem"}} />
          </Form.Item>

          <Form.Item name="image" label="???????????????? ??????">
              <ImgCrop rotate>
                  <Upload listType="picture-card"
                          action=''
                          fileList={this.state.fileList }
                          onChange={this.onChange}
                          onPreview={this.onPreview}
                          accept=".png,.jpg"
                          customRequest={this.dummyRequest}>
                      {this.state.fileList .length < 1 && <UploadOutlined/>}
                  </Upload>
              </ImgCrop>
          </Form.Item>
 
          <Form.Item {...tailFormItemLayout}>
              <Button block style={{marginTop: "1rem"}} type="primary" htmlType="submit">
                  ?????? ????????
              </Button>
          </Form.Item>
        </Form>
        
    </div>
    );
  }
}


const mapStateToProps = state => {
  return({
    Displaystep: state.step,
  })
}
const mapDispatchToProps = {StepState};

export default connect(mapStateToProps , mapDispatchToProps)(Shop_Pharmacy_Medical_Equipment_Form);
