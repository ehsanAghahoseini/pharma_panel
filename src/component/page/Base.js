import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  LogoutOutlined ,
} from '@ant-design/icons';
import PrivateRoute from '../../PrivateRoute';
import Logo from '../../image/logo.png';
import { Table, Tag, Space } from 'antd';
import AdvertisingList from './AdvertisingList';
import { BrowserRouter as Router, Route , Link} from 'react-router-dom';
import UserList from './UserList';
import NewShopList from './NewShopList';
import UploadBaner from './UploadBaner';
import AddAdvertising from './AddAdvertising';
import PaymentList from './PaymentList';
import OrderList from './OrderList';
import ProfitCalculation from './ProfitCalculation';
import AdminAdvertisingList from './AdminAdvertisingList';
import ListShop from './ListShop';
import AllAds from './AllAds';
import TopShop from './TopShop';
import EditAds from './EditAds';


const { Header, Content, Footer, Sider } = Layout;

class Base extends React.Component {

 
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
 
  logout = () => {
    localStorage.clear(); 
    // return window.location.href = '/'
  }

  render() {
    const { SubMenu } = Menu;
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="panel-logo" >
            <img src={Logo} alt="logo"></img>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<DesktopOutlined />}>
              <Link to="/panel/advertisinglist">  آگهی های جدید</Link>
            </Menu.Item>
            <Menu.Item key="24" icon={<DesktopOutlined />}>
              <Link to="/panel/allads">همه آگهی ها</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              <Link to="/panel/newshoplist">آگهی های فروشگاه</Link>
            </Menu.Item>
            <Menu.Item key="23" icon={<DesktopOutlined />}>
              <Link to="/panel/listshop"> لیست فروشگاه ها</Link>
            </Menu.Item>
            <Menu.Item key="25" icon={<DesktopOutlined />}>
              <Link to="/panel/topshop">فروشگاه برتر</Link>
            </Menu.Item>
            <Menu.Item key="11" icon={<DesktopOutlined />}>
              <Link to="/panel/adminadvertisinglist"> آگهی ادمین</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/panel/userlist"> مدیریت کاربران</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<DesktopOutlined />}>
              <Link to="/panel/addads"> افزودن آگهی</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<DesktopOutlined />}>
              <Link to="/panel/upload">  مدیریت آپلود بنر</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<DesktopOutlined />}>
              <Link to="/panel/paymentlist">لیست پرداختی ها</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<DesktopOutlined />}>
              <Link to="/panel/orderlist">لیست سفارشات </Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<DesktopOutlined />}>
              <Link to="/panel/profitcalculation"> محاسبه سود </Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<LogoutOutlined />}>
               <Link onClick={() => this.logout()}>خروج </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {this.props.children}
              <PrivateRoute exact path='/panel/allads' component={AllAds} />
              <PrivateRoute exact path='/panel/edit/:id' component={EditAds} />

              <PrivateRoute exact path='/panel/advertisinglist' component={AdvertisingList} />
              <PrivateRoute exact path='/panel/adminadvertisinglist' component={AdminAdvertisingList} />
              <PrivateRoute exact path='/panel/userlist' component={UserList} />
              <PrivateRoute exact path='/panel/listshop' component={ListShop} />
              <PrivateRoute exact path='/panel/topshop' component={TopShop} />
              <PrivateRoute exact path='/panel/newshoplist' component={NewShopList} />
              <PrivateRoute exact path='/panel/upload' component={UploadBaner} />
              <PrivateRoute exact path='/panel/paymentlist' component={PaymentList} />
              <PrivateRoute exact path='/panel/orderlist' component={OrderList} />
              <PrivateRoute exact path='/panel/profitcalculation' component={ProfitCalculation} />
              <PrivateRoute exact path='/panel/addads' component={AddAdvertising} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>TPSB</Footer>
        </Layout>
      </Layout>
      
    );
  }
}

export default Base;
