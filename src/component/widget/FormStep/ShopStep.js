import React from 'react';
import { Button } from 'antd';
import {connect} from "react-redux";
import {StepState} from '../../../action/AddAdsAction';

class ShopStep extends React.Component {


  render() {


    return (
    <div className="group-button">
        <Button danger onClick={()=>{this.props.StepState('first')}}>بازگشت</Button>
        {/* <Button onClick={()=>{this.props.StepState('shop_medical_equipment')}}>لوازم پزشکی / اورتوپدی</Button> */}
        <Button onClick={()=>{this.props.StepState('shop_pharmacy')}}>داروخانه</Button>
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

export default connect(mapStateToProps , mapDispatchToProps)(ShopStep);
