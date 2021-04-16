import React, { Component } from 'react';
import { connect } from 'react-redux'
import { decrement, incremenAsync, increment } from '../../redux/actions/count'
import { changeName } from "../../redux/actions/person";

class Test extends Component {

    increment = () => {
        const value = this.select.value * 1
        // this.setState(state => ({ count: state.count + value }))
        this.props.increment(value)
    }

    decrement = () => {
        const value = this.select.value * 1
        // this.setState(state => ({ count: state.count - value }))
        this.props.decrement(value)
    }

    oddIncrement = () => {
        const value = this.select.value * 1
        if (this.props.count % 2 !== 0) {
            // this.setState(state => ({ count: state.count + value }))
            this.props.increment(value)
        }
    }

    asyncIncrement = () => {
        const value = this.select.value * 1
        /*  setTimeout(() => {
              // this.setState(state => ({ count: state.count + value }))
              store.dispatch(increment(value))
          }, 1000)*/
        // 异步增加
        this.props.incremenAsync(value)
    }

    changeName = () => {
        this.props.changeName('我是你爹')
    }

    render() {
        const { count, person } = this.props

        return (
            <div>
                <select ref={ a => this.select = a }>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="2">3</option>
                </select>
                &nbsp;&nbsp;&nbsp;
                <button onClick={ this.increment }>增加一</button>
                &nbsp;
                <button onClick={ this.decrement }>减一</button>
                &nbsp;
                <button onClick={ this.oddIncrement }>奇数加</button>
                &nbsp;
                <button onClick={ this.asyncIncrement }>异步加一</button>
                &nbsp;
                <button onClick={ this.changeName }>改变名字</button>
                <br/>
                <div>
                    {
                        '当前数组的和为:' + count
                    }
                </div>

                <div>
                    {
                        '当前名字为:' + person
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        count: state.count,
        person: state.person
    }),
    {
        increment,
        decrement,
        incremenAsync,
        changeName
    }
)(Test);
