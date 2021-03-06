/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table} from 'antd';
import { getProsAsk } from '../../axios';

// const data = [{
//     key: '1',
//     price: 7256.46,
//     quantity: 0.1292,
//     amount: 7256.46 * 0.1292,
// }, {
//     key: '2',
//     price: 7256.27,
//     quantity: 0.49,
//     amount: 7256.27 * 0.49,
// }, {
//     key: '3',
//     price: 7256.05,
//     quantity: 0.312,
//     amount: 7256.05 * 0.312,
// }];

export default class BasicTableBid extends React.Component {
    state = {
        symbol: 'btc_usdt',
        columns: [],
        data: []
    };

    componentDidMount() {

        // this.props.onRef(this);

        this.start(this.state.symbol);
        this.timer = setInterval(
            () => {
                this.start(this.state.symbol);
            },
            2000
        );

    }

    //
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    setSymbol = (symbol) => {
        this.setState({
            symbol: symbol});
        this.start(symbol);
    };

    start = (symbol) => {

        // this.setState({ });
        // console.log("start", symbol);

        getProsAsk(symbol).then(res => {

            var ind = 1;
            var depth = 0;

            var symbolt = symbol.split('_')[0];
            var symbolb = symbol.split('_')[1];

            this.setState(
                {
                    symbol: symbol,
                    columns: [
                        {
                            title: '序号',
                            dataIndex: 'idx',
                            key: 'idx',
                            align: 'right',
                        },
                        {
                            title: '价格(' + symbolb + ')',
                            dataIndex: 'price',
                            key: 'price',
                            align: 'right',
                        },
                        {
                            title: '数量(' + symbolt + ')',
                            dataIndex: 'quantity',
                            key: 'quantity',
                            align: 'right',
                        },
                        {
                            title: '金额(' + symbolb + ')',
                            dataIndex: 'amount',
                            key: 'amount',
                            align: 'right',
                        },
                        {
                            title: '深度(' + symbolb + ')',
                            dataIndex: 'depth',
                            key: 'depth',
                            align: 'right',
                        }
                    ],
                    data: [...res.content[0].bids.map(
                        item =>
                        {
                            depth = depth + item[0]*item[1];
                            return {
                                idx: ind++,
                                price: item[0].toFixed(2),
                                quantity: item[1].toFixed(8),
                                amount: (item[0]*item[1]).toFixed(8),
                                depth: depth.toFixed(8)
                            }
                        }
                    )
                ]
            });
            // console.log("getProsAsk")
        });
    };

    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.state.data} />
        );
    }
}