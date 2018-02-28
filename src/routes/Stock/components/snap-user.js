import React from 'react';

const SnapUser = ({info}) => (
    <div>
        <div style={{textAlign:'center'}}><img style={{width:'100px'}} src={info.avatarUrl}/></div>
        <div>关注时间:{info.create_time}</div>
    </div>
)

export default SnapUser
