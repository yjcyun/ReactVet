import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  // check if logged in user has created streams
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/edit/${stream.id}`} className='ui button primary' >Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className='ui button negative'>Delete</Link>
        </div>
      )
    }
  }

  // render a create stream button
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/streams/new' className='ui button primary'>Create Stream</Link>
        </div>
      )
    }
  }

  // render list of streams
  renderList() {
    return this.props.streams.map(stream => (
      <div className='item' key={stream.id}>
        {this.renderAdmin(stream)}
        <i className='large middle aligned icon camera' />
        <div className='content'>
           <Link to={`/streams/${stream.id}`} className='header'>{stream.title}</Link>
          <div className='description'>{stream.description}</div>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className='ui celled list'>
          {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    streams: Object.values(state.streams)
  }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList)