/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Table } from 'antd';
import { getProsTrade } from '../../axios';

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

const columns = [{
    title: '时间',
    dataIndex: 'time',
    key: 'time'
}, {
    title: '买/卖',
    dataIndex: 'direction',
    key: 'direction',
}, {
    title: '价格(usdt)',
    dataIndex: 'price',
    key: 'price',
}, {
    title: '数量(btc)',
    dataIndex: 'amount',
    key: 'amount',
}, {
    title: '金额(usdt)',
    dataIndex: 'money',
    key: 'money',
}];

// const data = [{
//     key: '1',
//     time: (new Date(1527523289629)).format("yyyy-MM-dd hh:mm:ss"),
//     direction: "buy",
//     price: 7234.02,
//     amount: 0.0031,
//     money: 7234.02 * 0.0031,
// }, {
//     key: '2',
//     time: (new Date(1527523289629)).format("yyyy-MM-dd hh:mm:ss"),
//     direction: "buy",
//     price: 7234.02,
//     amount: 0.0031,
//     money: 7234.02 * 0.0031,
// }, {
//     key: '3',
//     time: (new Date(1527523289629)).format("yyyy-MM-dd hh:mm:ss"),
//     direction: "buy",
//     price: 7234.02,
//     amount: 0.0031,
//     money: 7234.02 * 0.0031,
// }, ];


export default class BasicTableTrade extends React.Component {
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

    start = () => {
        this.setState({ });
        getProsTrade().then(res => {

            const tradeElements = [] // 保存每个用户渲染以后 JSX 的数组

            for(var i = 0;i < res.content.length;i++){


                for(var j = 0; j< res.content[i].data.length; j++){

                    tradeElements.push( {
                        time:(new Date(res.content[i].data[j].ts)).format("yyyy-MM-dd hh:mm:ss"),
                        direction:res.content[i].data[j].direction,
                        price:res.content[i].data[j].price,
                        amount:res.content[i].data[j].amount,
                        money:res.content[i].data[j].price * res.content[i].data[j].amount
                    });
                }
            }
            this.setState({
                data: tradeElements
            });
        });
    };

    render() {
        return (
            <Table columns={columns} dataSource={this.state.data} />
        );
    }
}
