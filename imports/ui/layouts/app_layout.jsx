import React from 'react';
import PropTypes from 'prop-types';


class AppLayout extends React.PureComponent {
  render() {
    return (
      <div id="content">
        {this.props.content}
      </div>
    );
  }
}

AppLayout.propTypes = {
  content: PropTypes.object.isRequired,
};
export default AppLayout;
