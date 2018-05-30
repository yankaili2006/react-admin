/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Row, Col, Card } from 'antd';
import { getPros } from '../../axios';
import BreadcrumbCustom from '../BreadcrumbCustom';

const columns = [
    {
        title: '序号',
        dataIndex: 'idx',
        key: 'idx',
        width: 5,
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 200,
    },
    {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        width: 400,
    },
    {
        title: '来源',
        dataIndex: 'src',
        key: 'src',
        width: 5,
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width: 5,
    },
    ];

class AsynchronousTable extends React.Component {
    state = {
        news: [],
        notices: [],
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
        this.setState({ });
        getPros().then(
            res => {
                var idx = 1;
            this.setState(
                {
                    news: [...res.news.content.map(
                            val => {
                                val.key = val.time;
                                val.idx = idx++;
                                return val;
                            }
                        )
                    ],
                    notices: [...res.notices.content.map(
                        val => {
                            val.key = val.time;
                            val.idx = idx++;
                            return val;
                        }
                    )
                    ]
            });
        });
    };

    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="区块链" second="热点" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="7*24快讯" bordered={false}>
                                <Table columns={columns} dataSource={this.state.news} />
                            </Card>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="交易所公告" bordered={false}>
                                <Table columns={columns} dataSource={this.state.notices} />
                            </Card>
                        </div>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default AsynchronousTable;