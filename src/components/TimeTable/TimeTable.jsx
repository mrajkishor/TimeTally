import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Space, Divider, Form, Input, Popconfirm, Table } from 'antd';
import AddItemForm from './components/AddItemForm';
import { v4 as uuidv4 } from 'uuid';
import Timer from './components/Timer';



const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};
const TimeTable = () => {
    const [dataSource, setDataSource] = useState([...JSON.parse(localStorage.getItem('timetable') ?? "[]")]);
    const [count, setCount] = useState(2);

    const defaultColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'Context Switches',
            dataIndex: 'contextSwitches',
        },
        {
            title: 'Timer',
            key: 'operation',
            render: (_, record) => (
                <Space size="middle">
                    <Timer rowKey={record.key} updateContextSwitches={updateContextSwitches} onReset={resetContextSwitches}
                    />
                </Space>
            ),
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    const handleFinish = (e) => {
        const newData = {
            key: uuidv4(),
            name: `${e.task}`,
            contextSwitches: 0,
        };
        if (localStorage.getItem('timetable')) {
            // update the existing 
            const obj = JSON.parse(localStorage.getItem('timetable'));
            obj.push(newData);
            localStorage.setItem('timetable', JSON.stringify(obj));


        } else {
            //add for the first time
            localStorage.setItem('timetable', JSON.stringify([newData]));
        }
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
        window.dispatchEvent(new Event("storage"));
    }
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });



    const updateContextSwitches = (rowKey) => {
        const newData = dataSource.map(row => {
            if (row.key === rowKey) {
                return { ...row, contextSwitches: row.contextSwitches + 1 };
            }
            return row;
        });
        setDataSource(newData);
    };
    const resetContextSwitches = (rowKey) => {
        const newData = dataSource.map(row => {
            if (row.key === rowKey) {
                return { ...row, contextSwitches: 0 }; // Reset context switches to 0
            }
            return row;
        });
        setDataSource(newData);
    };

    return (
        <div>
            <AddItemForm onFinish={handleFinish} />

            <Divider />

            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    );
};
export default TimeTable;