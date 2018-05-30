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

        getProsTrade(symbol).then(res => {

            const tradeElements = []; // 保存每个用户渲染以后 JSX 的数组

            var idx = 1;
            var tradeSum = 0;
            for(var i = 0;i < res.content.length;i++){
                for(var j = 0; j< res.content[i].data.length; j++){
                    tradeSum = tradeSum + (res.content[i].data[j].price * res.content[i].data[j].amount);
                    tradeElements.push(
                        {
                            idx: idx++,
                            time:(new Date(res.content[i].data[j].ts)).format("yyyy-MM-dd hh:mm:ss"),
                            direction:res.content[i].data[j].direction,
                            price: (res.content[i].data[j].price).toFixed(2),
                            amount: (res.content[i].data[j].amount).toFixed(8),
                            money: (res.content[i].data[j].price * res.content[i].data[j].amount).toFixed(8),
                            sum: tradeSum.toFixed(8),
                        }
                    );
                }
            }


            var symbolt = symbol.split('_')[0];
            var symbolb = symbol.split('_')[1];

            this.setState({
                symbol: symbol,
                columns: [
                    {
                        title: '序号',
                        dataIndex: 'idx',
                        key: 'idx',
                        align: 'right',
                        width: 5,
                    },
                    {
                        title: '时间',
                        dataIndex: 'time',
                        key: 'time',
                        align: 'right',
                        width: 5,
                    },
                    {
                        title: '买/卖',
                        dataIndex: 'direction',
                        key: 'direction',
                        align: 'right',
                        width: 5,
                    },
                    {
                        title: '价格(' + symbolb + ')',
                        dataIndex: 'price',
                        key: 'price',
                        align: 'right',
                        width: 100,
                    },
                    {
                        title: '数量(' + symbolt + ')',
                        dataIndex: 'amount',
                        key: 'amount',
                        align: 'right',
                        width: 100,
                    },
                    {
                        title: '金额(' + symbolb + ')',
                        dataIndex: 'money',
                        key: 'money',
                        align: 'right',
                        width: 100,
                    },
                    {
                        title: '成交量(' + symbolb + ')',
                        dataIndex: 'sum',
                        key: 'sum',
                        align: 'right',
                        width: 100,
                    }],
                data: tradeElements
            });
        });
    };

    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.state.data} />
        );
    }
}
