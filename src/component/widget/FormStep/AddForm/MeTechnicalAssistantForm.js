import React from 'react';
import {connect} from "react-redux";
import {StepState} from '../../../../action/AddAdsAction';
import { Form, Input, InputNumber, Button , Select , Upload} from 'antd';
import $ from 'jquery';

class MeTechnicalAssistantForm extends React.Component {


  componentDidMount() {
  //   this.setState({display:true});
  //   $.ajax({
  //     url: BASE_URL_SITE + '/get_banner_images.php',
  //     type: 'post',
  //     dataType: 'json',
  //     success: (res) =>  {
  //         if(res.result === "ok"){
  //           this.setState({
  //             display:false ,
  //             listdata : res.banners,
  //             left_over_image : 6 - res.banners.length ,
  //           });
  //         }
  //     },
  //     error:  () => {
  //       this.setState({ display:false })
  //         alert("عدم برقراری ارتباط با سرور")
  //     },
  // });
  }

  render() {
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
              span: 16,
              offset: 8,
          },
      },
  };
  
    return (
    <div className="group-button">
        <Button danger onClick={()=>{this.props.StepState('job_search')}}>بازگشت</Button>
        <Form {...formItemLayout} name="nest-messages" onFinish={this.onFinish} >
          <Form.Item
            name="experience_time"
            label="نام و نام خانوادگی"
            rules={[{required: true, message: ' نام و نام خانوادگی را وارد کنید', whitespace: true}]}
            >
            <Input/>
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

export default connect(mapStateToProps , mapDispatchToProps)(MeTechnicalAssistantForm);
