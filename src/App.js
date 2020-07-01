import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [ //盒子背景颜色
                {
                    bg: "#f6f6f6"
                },
                {
                    bg: "#87d9e1"
                },
                {
                    bg: "#8185d7"
                },
                {
                    bg: "#e187cf"
                }
            ],
            offsetheight: document.documentElement.clientHeight, //获取当前页面的高度
            fullPage: 0, //当前在第几页
            fullPageNum: false //是否在滑动
        }
    }
    componentDidMount() {
        /*
            在dom加载完毕以后为大盒子添加鼠标滚轮监听事件
         */
        let box = document.querySelector('.section');
        /*
            这里因为在封装的函数里，this会指向div
            所以需要改变this指向，bing一下
         */
        this.addEvent(box,'mousewheel',this.scroll.bind(this));
        this.addEvent(box,'DOMMouseScroll',this.scroll.bind(this));
    }
    /*
        addeventlistener兼容事件
     */
    addEvent(div,xEvent,fn){
        if (div.attachEvent) {
            div.attachEvent('on' + xEvent, fn);
        } else {
            div.addEventListener(xEvent, fn, false);
        }
    }
    /*
        点击左侧小点时跳转到相应的page
    */
    pageInfo(index) {
        this.setState({
            fullPage: index
        })
    }
    /*
        鼠标事件
    */
    scroll(e) {
        let event = e || window.event;

        /*
            是否正在滑动
        */
        if (this.state.fullPageNum) {
            return false;
        }

        /*
           e.wheelDelta为负数时向下滑动
        */
        if (event.wheelDelta < 0) {
            if (this.state.fullPage >= 3) {
                return false;
            }
            this.setState({ fullPageNum: true });
            this.pageInfo(this.state.fullPage + 1);
            /*
                css设置动画事件为1000，所以等到1000ms后滚动状态为false
            */
            setTimeout(() => {
                this.setState({ fullPageNum: false });
            }, 1000);
            /*
                否则就是向上划
            */
        } else {
            if (this.state.fullPage <= 0) {
                return false;
            }
            this.setState({ fullPageNum: true });
            this.pageInfo(this.state.fullPage - 1);
            setTimeout(() => {
                this.setState({ fullPageNum: false })
            }, 1000)
        }
    }

    render() {
        let fullPage = this.state.bannerList.map((i, index) => {
            return <div key={index} style={{'height':this.state.offsetheight+'px','background':i.bg}}></div>
        })
        let fullList = this.state.bannerList.map((i, index) => {
            return <div key={index} className={this.state.fullPage===index?'color':''} onClick={this.pageInfo.bind(this,index)}></div>
        })
        return (
            <div className="section" style={{'height':this.state.offsetheight+'px'}}>
                <div className="container" style={{'transform': 'translate3d(0px,-'+ this.state.fullPage*this.state.offsetheight +'px, 0px)'}}>
                    {fullPage}
                </div>
                <div className="fixed-list">
                    {fullList}
                </div>
            </div>
        );
    }
}

export default App;