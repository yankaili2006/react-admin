/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Button, Row, Col, Card } from 'antd';
import { getPros } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';

const columns = [{
    title: 'Id',
    dataIndex: 'newsId',
    width: 5
}, {
    title: '时间',
    dataIndex: 'time',
    width: 5
}, {
    title: '标题',
    dataIndex: 'title',
    width: 200
}, {
    title: '内容',
    dataIndex: 'content',
    width: 400
}];

class AsynchronousTable extends React.Component {
    state = {
        data: []
    };

    componentDidMount() {

        this.start();
        this.timer = setInterval(
            () => {
                this.start();
            },
            2000
        );
    }

    //
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    start = () => {
        this.setState({  });
        getPros().then(res => {
            this.setState({
                data: [...res.content.map(val => {
                    val.key = val.time;
                    return val;
                })]
            });
        });
    };

    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="区块链" second="7*24快讯" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="区块链快讯" bordered={false}>
                                <Table columns={columns} dataSource={this.state.data} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AsynchronousTable;