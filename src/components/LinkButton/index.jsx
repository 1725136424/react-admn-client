import React, {PureComponent, Fragment} from 'react';
import './index.less'

class LinkButton extends PureComponent {
    render() {
        return (
            <Fragment>
                <button {...this.props} className='diy-button'></button>
            </Fragment>
        );
    }
}

export default LinkButton;
