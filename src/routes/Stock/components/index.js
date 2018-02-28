import React from 'react'
import Table from './table'
import Filter from './filter'
import './style.scss'

const App = ({...rest}) => (
    <div>
        <Filter
            searchText={rest.stock.searchText}
            options={rest.stock.options}
            closeSearch={rest.closeSearch}
            chooseDate={rest.chooseDate}
            initData={rest.initData}
            chooseStatus={rest.chooseStatus}
        />
        <Table
            list={rest.stock.list}
            total={rest.stock.total}
            pageSize={rest.stock.pageSize}
            searchText={rest.stock.searchText}
            orderData={rest.orderData}
            pageData={rest.pageData}
            searchData={rest.searchData}/>
    </div>
)

export default App
