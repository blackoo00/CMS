import React from 'react';
import { DatePicker,Checkbox,Tag,Icon } from 'antd';
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

// const options = [
//     { label: '售卖', value: '1' },
//     { label: '后台操作', value: '2,3,4' },
// ];

const Filter = ({searchText,closeSearch,chooseDate,chooseStatus,initData,options}) => (
    <div className="table-filter">
        <Icon type="reload" onClick={initData}/>
        {searchText.prodSearchText ? <Tag closable onClose={() => {closeSearch({prodSearchText:''})}}>{searchText.prodSearchText}</Tag> : ''}
        {searchText.buyerSearchText ? <Tag closable onClose={() => {closeSearch({buyerSearchText:''})}}>{searchText.buyerSearchText}</Tag> : ''}
        {searchText.operatorSearchText ? <Tag closable onClose={() => {closeSearch({operatorSearchText:''})}}>{searchText.operatorSearchText}</Tag> : ''}
        <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD"
            placeholder={['Start Time', 'End Time']}
            showToday={false}
            // onChange={chooseDate}
            onOk={chooseDate}
        />
        <CheckboxGroup options={options} value={searchText.status} onChange={chooseStatus}/>
    </div>
)
export default Filter
