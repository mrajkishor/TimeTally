import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';

const columns = [
    {
        title: 'Col1',
        dataIndex: 'col1',
        key: 'col1',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Col2',
        dataIndex: 'col2',
        key: 'col2',
    }
];


function formatDate(date) {
    const nth = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    let day = date.getDate();
    let month = date.toLocaleString('default', { month: 'long' });
    let year = date.getFullYear();

    return `${day}${nth(day)} ${month} ${year}`;
}



const ReportTable = ({ totalTimeInParent }) => {



    const [rowData, setRowData] = useState([
        {
            key: '1',
            col1: 'Date',
            col2: formatDate(new Date())
        },
        {
            key: '2',
            col1: 'Tasks',
            col2: JSON.parse(localStorage.getItem('timetable') ?? "[]").length
        },
        {
            key: '3',
            col1: 'Effective Time',
            col2: `${totalTimeInParent}`
        }
    ]);

    window.addEventListener('storage', () => {
        console.log("Change to local storage!");
        const newData = [...rowData]; // Clone the array
        newData[1] = { ...newData[1], col2: JSON.parse(localStorage.getItem('timetable') ?? "[]").length }; // Update the item
        setRowData(newData);
    })

    useEffect(() => {

        rowData ?? console.log(rowData[1].col2);

        const newData = [...rowData]; // Clone the array
        newData[2] = { ...newData[2], col2: totalTimeInParent }; // Update the item
        setRowData(newData);


    }, [rowData[1].col2, totalTimeInParent]);

    return <Table showHeader={false} pagination={false} columns={columns} dataSource={rowData} />

};
export default ReportTable;