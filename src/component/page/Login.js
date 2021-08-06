import React from 'react';
import { Form, Input, Button  } from 'antd';
import Logo from '../../image/logo.png';
import Loader from '../widget/Loader';
import $ from 'jquery';
import BASE_URL from '../../BASE_URL';


class Login extends React.Component {

  state = {
    display:false,
  }

  onFinish = values => {
    this.setState({display:true});
    $.ajax({
      url: BASE_URL + '/login.php',
      type: 'post',
      dataType: 'json',
      data: JSON.stringify({
        "username":values.username ,
        "password":values.password,
      }),
      success:  (res) => {
          if(res.result === "ok"){
            localStorage.setItem("username", res.username);
            localStorage.setItem("password", res.password);
            this.setState({display: false});
            return window.location.href = 'panel/advertisinglist'
          }
          else {
            this.setState({display: false});
            alert("رمز عبور یا نام کاربری صحیح نمیباشد")
          }
      },
      error:  () => {
          this.setState({display: false});
          alert("ارتباط با سرور برقرار نشد")
      },
  });
  };


  render() {


    return (
      <div className="login-wave">
      {this.state.display ? <Loader/> : null}
      <header className="login-wave-head"> 
        <div className="login-form">
          <div className="login-form-logo">
            <img src={Logo} alt="logo"></img>
            <Form
              name="basic"
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="نام کاربری"/>
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="رمز عبور"/>
              </Form.Item>
              <Form.Item >
                <Button type="primary" htmlType="submit">
                  ورود
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <svg className="login-form-wave-svg" id="svg"  viewBox="-300 0 950 270" >
          <path d="M-314,267 C105,364 400,100 812,279" fill="none" stroke="white" stroke-width="120" stroke-linecap="round"/>
        </svg>
      </header>
    </div>
    );
  }
}


export default Login;
