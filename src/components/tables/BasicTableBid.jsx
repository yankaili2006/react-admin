/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table} from 'antd';
import { getProsAsk } from '../../axios';

const columns = [{
    title: '价格(usdt)',
    dataIndex: 'price',
    key: 'price'
}, {
    title: '数量(btc)',
    dataIndex: 'quantity',
    key: 'quantity',
}, {
    title: '金额(usdt)',
    dataIndex: 'amount',
    key: 'amount',
}];

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
        this.setState({ });
        getProsAsk().then(res => {
            this.setState({
                data: [...res.content[0].bids.map(item=>{
                    return {
                        price: item[0],
                        quantity: item[1],
                        amount: item[0]*item[1]
                    }
                })
                ]
            });
            // console.log("getProsAsk")
        });
    };

    render() {
        return (
            <Table columns={columns} dataSource={this.state.data} />
        );
    }
}