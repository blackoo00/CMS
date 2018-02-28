import React from 'react';

const SnapProd = ({info}) => (
    <div>
        <div>当时价格：{info.price}</div>
        <div>是否有折扣：{info.is_discount == 1 ? '是' : '否'}</div>
        <div>当时库存：{info.stock}</div>
    </div>
)

export default SnapProd
