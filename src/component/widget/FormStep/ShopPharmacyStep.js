import React from 'react';
import { Button } from 'antd';
import {connect} from "react-redux";
import {StepState} from '../../../action/AddAdsAction';

class ShopPharmacyStep extends React.Component {


  render() {


    return (
    <div className="group-button">
        <h4>داروخانه</h4>
        <Button danger onClick={()=>{this.props.StepState('shopstep')}}>بازگشت</Button>
        <Button onClick={()=>{this.props.StepState('shop_cosmetic')}}>آرایشی</Button>
        <Button onClick={()=>{this.props.StepState('shop_health')}}>بهداشتی</Button>
        <Button onClick={()=>{this.props.StepState('shop_perfume')}}>عطر / ادکلن</Button>
        <Button onClick={()=>{this.props.StepState('shop_pharmacy_medical_equipment')}}>لوازم پزشکی</Button>
        <Button onClick={()=>{this.props.StepState('shop_complement')}}>مکمل</Button>

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

export default connect(mapStateToProps , mapDispatchToProps)(ShopPharmacyStep);
