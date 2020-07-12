import React from 'react';
import TableTemplate from '@trendmicro/react-table';
import { TablePagination } from '@trendmicro/react-paginations';
import '@trendmicro/react-paginations/dist/react-paginations.css';

const LocationTable = (props) => {
    return (
        <> 
            <TableTemplate
                rowKey={record => record.location}
                hoverable
                useFixedHeader
                columns={props.columns}
                data={props.displayData}
                width={window.innerWidth - 30}
            />
            <TablePagination
                page={props.pagination.page}
                pageLength={props.pagination.pageLength}
                totalRecords={props.data && props.data.length}
                onPageChange={props.fetchRecords}
            />
        </>
    )
}

export default LocationTable;