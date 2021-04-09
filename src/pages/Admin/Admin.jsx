import React, {Component} from 'react';
import memoryUtils from "../../utils/memoryUtils";

class Admin extends Component {

    state = {
        user: memoryUtils.user
    }

    render() {
        let {user: {username}} = this.state
        return (
            <div>
                {
                    username
                }
            </div>
        );
    }
}

export default Admin;
