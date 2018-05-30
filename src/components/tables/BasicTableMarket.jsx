/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import BasicTableBid from './BasicTableBid';
import BasicTableAsk from './BasicTableAsk';
import BasicTableTrade from './BasicTableTrade';
import BreadcrumbCustom from '../BreadcrumbCustom';

const symbols = [
    {
        symbol:'btc_usdt',
        symbolt:'btc',
        symbolb:'usdt',
    },
    {
        symbol:'bch_usdt',
        symbolt:'bch',
        symbolb:'usdt',
    },
    {
        symbol:'eth_usdt',
        symbolt:'eth',
        symbolb:'usdt',
    },
    {
        symbol:'etc_usdt',
        symbolt:'etc',
        symbolb:'usdt',
    },
    {
        symbol:'ltc_usdt',
        symbolt:'ltc',
        symbolb:'usdt',
    },
    {
        symbol:'eos_usdt',
        symbolt:'eos',
        symbolb:'usdt',
    },
    {
        symbol:'xrp_usdt',
        symbolt:'xrp',
        symbolb:'usdt',
    },
    {
        symbol:'omg_usdt',
        symbolt:'omg',
        symbolb:'usdt',
    },
    {
        symbol:'dash_usdt',
        symbolt:'dash',
        symbolb:'usdt',
    },
    {
        symbol:'zec_usdt',
        symbolt:'zec',
        symbolb:'usdt',
    },
    {
        symbol:'iota_usdt',
        symbolt:'iota',
        symbolb:'usdt',
    },
    {
        symbol:'ada_usdt',
        symbolt:'ada',
        symbolb:'usdt',
    },
    {
        symbol:'steem_usdt',
        symbolt:'steem',
        symbolb:'usdt',
    },
    {
        symbol:'ctxc_usdt',
        symbolt:'ctxc',
        symbolb:'usdt',
    },
    {
        symbol:'act_usdt',
        symbolt:'act',
        symbolb:'usdt',
    },
    {
        symbol:'btm_usdt',
        symbolt:'btm',
        symbolb:'usdt',
    },
    {
        symbol:'bts_usdt',
        symbolt:'bts',
        symbolb:'usdt',
    },
    {
        symbol:'ont_usdt',
        symbolt:'ont',
        symbolb:'usdt',
    },
    {
        symbol:'iost_usdt',
        symbolt:'iost',
        symbolb:'usdt',
    },
    {
        symbol:'ht_usdt',
        symbolt:'ht',
        symbolb:'usdt',
    },

    // {
    //     symbol:'btc_usdt',
    //     symbolt:'btc',
    //     symbolb:'usdt',
    // },
    // {
    //     symbol:'eth_usdt',
    //     symbolt:'eth',
    //     symbolb:'usdt',
    // },
    // {
    //     symbol:'xrp_usdt',
    //     symbolt:'xrp',
    //     symbolb:'usdt',
    // },
    // {
    //     symbol:'bch_usdt',
    //     symbolt:'bch',
    //     symbolb:'usdt',
    // },
    // {
    //     symbol:'eos_usdt',
    //     symbolt:'eos',
    //     symbolb:'usdt',
    // },
    // {
    //     symbol:'ltc_usdt',
    //     symbolt:'ltc',
    //     symbolb:'usdt',
    // },
    // {
    //     symbol:'ada_usdt',
    //     symbolt:'ada',
    //     symbolb:'usdt',
    // },
    // {
    //     symbol:'xlm_usdt',
    //     symbolt:'xlm',
    //     symbolb:'usdt',
    // },
    // {
    //     symbol:'trx_usdt',
    //     symbolt:'trx',
    //     symbolb:'usdt',
    // },
    // {
    //     symbol:'miota_usdt',
    //     symbolt:'miota',
    //     symbolb:'usdt',
    // },
    // {
    //     symbol:'neo_usdt',
    //     symbolt:'neo',
    //     symbolb:'usdt',
    // }
];

export default class BasicTableMarket extends React.Component {

    clickHandler = (text, e) =>{
        console.log("text", text);
        this.refs.tableAsk.setSymbol(text)
        this.refs.tableBid.setSymbol(text)
        this.refs.tableTrade.setSymbol(text)
    };

    render() {

        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="行情" />

                {
                    symbols.map(
                        symbol => {
                            return (
                                <Button onClick={this.clickHandler.bind(this, symbol.symbol)} >{symbol.symbol}</Button>
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

                <style>{`
                    .button-demo .ant-btn {
                        margin-right: 8px;
                        margin-bottom: 12px;
                    }
                `}</style>
            </div>
        );
    }
}