import React, { Component } from 'react'

class AudioComponent extends Component {
  render () {
    const url = this.props.isLocal ? this.props.path : `${process.env.URL_SERVER}/${this.props.path}`
    return (
      <React.Fragment>
        <audio ref='audio_tag' src={url} controls />
      </React.Fragment>
    )
  }
}

export default AudioComponent
