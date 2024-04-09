import './App.css';
import React, { useState } from 'react';
import { Col, Row, Card } from 'antd';
import ReportTable from './components/ReportTable';
import TimeTable from './components/TimeTable/TimeTable';


function App() {
  const [totalTimeInParent, setTotalTimeInParent] = useState('');
  const handleTotalTimeUpdate = (formattedTime) => {
    setTotalTimeInParent(formattedTime);
  };
  return (
    <div className="App">
      <Row>
        <Col span={18} push={6}>
          <Card title="Time Table" bordered={false} style={{ margin: '1vw', textAlign: 'left' }}>
            <TimeTable onTotalTimeUpdate={handleTotalTimeUpdate} />
          </Card>
        </Col>
        <Col span={6} pull={18}>
          <Card title="Today's Report" bordered={false} style={{ margin: '1vw', textAlign: 'left' }}>
            <ReportTable totalTimeInParent={totalTimeInParent} />
          </Card>
        </Col>
      </Row>
    </div >
  );
}

export default App;
