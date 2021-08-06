import React from 'react';
import { Button } from 'antd';
import {connect} from "react-redux";
import {StepState} from '../../../action/AddAdsAction';

class TherapeuticRealestateStep extends React.Component {


  render() {


    return (
    <div className="group-button">
        <h4>املاک درمانی</h4>
        <Button danger onClick={()=>{this.props.StepState('mestep')}}>بازگشت</Button>
        <Button onClick={()=>{this.props.StepState('therapeutic_pharmacy')}}>داروخانه</Button>
        <Button onClick={()=>{this.props.StepState('therapeutic_office')}}> مطب</Button>
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

export default connect(mapStateToProps , mapDispatchToProps)(TherapeuticRealestateStep);
