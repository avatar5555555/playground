import dynamic from 'next/dynamic'
import Head from 'next/head'
import React, { Component, Fragment } from 'react'
import { defineMessages, InjectedIntlProps } from 'react-intl'

import { Center, Spinner } from 'src/ui'

const { title } = defineMessages({
  title: {
    defaultMessage: 'Record video',
    id: 'videos.new.title'
  }
})

const Recorder = dynamic(
  import('./ui/organisms').then((module) => module.Recorder),
  {
    ssr: false,
    loading: () => (
      <Center>
        <Spinner />
      </Center>
    )
  }
)

export class NewVideo extends Component<InjectedIntlProps> {
  render() {
    const { intl } = this.props

    return (
      <Fragment>
        <Head>
          <title key="title">{intl.formatMessage(title)}</title>
        </Head>
        <Recorder />
      </Fragment>
    )
  }
}
