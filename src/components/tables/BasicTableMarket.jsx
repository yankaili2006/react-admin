/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Row, Col, Card } from 'antd';
import BasicTableBid from './BasicTableBid';
import BasicTableAsk from './BasicTableAsk';
import BasicTableTrade from './BasicTableTrade';
import BreadcrumbCustom from '../BreadcrumbCustom';

const symbols = [
    {
        symbol:'btc/usdt',
        symbolt:'btc',
        symbolb:'usdt',
    },
    {
        symbol:'eth/usdt',
        symbolt:'eth',
        symbolb:'usdt',
    },
    {
        symbol:'xrp/usdt',
        symbolt:'xrp',
        symbolb:'usdt',
    },
    {
        symbol:'bch/usdt',
        symbolt:'bch',
        symbolb:'usdt',
    },
    {
        symbol:'eos/usdt',
        symbolt:'eos',
        symbolb:'usdt',
    },
    {
        symbol:'ltc/usdt',
        symbolt:'ltc',
        symbolb:'usdt',
    },
    {
        symbol:'ada/usdt',
        symbolt:'ada',
        symbolb:'usdt',
    },
    {
        symbol:'xlm/usdt',
        symbolt:'xlm',
        symbolb:'usdt',
    },
    {
        symbol:'trx/usdt',
        symbolt:'trx',
        symbolb:'usdt',
    },
    {
        symbol:'miota/usdt',
        symbolt:'miota',
        symbolb:'usdt',
    },
    {
        symbol:'neo/usdt',
        symbolt:'neo',
        symbolb:'usdt',
    }
];

export default class BasicTableMarket extends React.Component {

    clickHandler = (text, e) =>{
        // console.log("text", text);
        this.refs.tableAsk.start(text)
        this.refs.tableBid.start(text)
        this.refs.tableTrade.start(text)
    };

    render() {

        // let boundClick = this.clickHandler.bind(this, 'btc/usdt');

        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="行情" />
                {
                    symbols.map(
                        symbol => {
                            return (
                                <button onClick={this.clickHandler.bind(this, symbol.symbol)} >{symbol.symbol}</button>
                            );
                        }
                    )
                }

                <Row gutter={16}>

                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="卖单" bordered={false}>
                                <BasicTableAsk ref="tableAsk" />
                            </Card>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="买单" bordered={false}>
                                <BasicTableBid ref="tableBid" />
                            </Card>
                        </div>
                    </Col>

                </Row>

                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="最新成交" bordered={false}>
                                <BasicTableTrade ref="tableTrade" />
                            </Card>
                        </div>
                    </Col>


                </Row>
            </div>
        );
    }
}