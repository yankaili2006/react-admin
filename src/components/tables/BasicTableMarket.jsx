/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Row, Col, Card } from 'antd';
import BasicTableBid from './BasicTableBid';
import BasicTableAsk from './BasicTableAsk';
import BasicTableTrade from './BasicTableTrade';
import BreadcrumbCustom from '../BreadcrumbCustom';

const BasicTables = () => (
    <div className="gutter-example">
        <BreadcrumbCustom first="行情" second="btc/usdt" />

        <Row gutter={16}>
            <Col className="gutter-row" md={12}>
                <div className="gutter-box">
                    <Card title="卖单" bordered={false}>
                        <BasicTableAsk />
                    </Card>
                </div>
            </Col>
            <Col className="gutter-row" md={12}>
                <div className="gutter-box">
                    <Card title="买单" bordered={false}>
                        <BasicTableBid />
                    </Card>
                </div>
            </Col>

        </Row>

        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="最新成交" bordered={false}>
                        <BasicTableTrade />
                    </Card>
                </div>
            </Col>


        </Row>
    </div>
);

export default BasicTables;