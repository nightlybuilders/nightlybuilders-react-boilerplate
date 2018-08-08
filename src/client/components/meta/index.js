import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

export const Meta = props => (
  <Helmet>
    <title>{props.title}</title>
    <meta name="description" content={props.description} />
    {props.children}
  </Helmet>
)

Meta.displayName = 'Meta'
Meta.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  description: PropTypes.string,
  title: PropTypes.string,
}
Meta.defaultProps = {
  children: [],
  description: '',
  title: '',
}
