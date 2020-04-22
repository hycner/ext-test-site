import React, {useState} from 'react'
import styled from 'styled-components'
import {Button, Icon, Input, Tooltip} from 'antd'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 300px;
`

const Header = styled.div`
  font-size: 16px;
`

const IframeWrap = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`

const ICON_STYLE = {
  fontSize: 18,
}
const BTN_STYLE = {
  marginTop: 5,
  marginBottom: 20,
}

type Props = {}
type Iframe = {
  url: string
}

const IFrameSpawner: React.FC<Props> = props => {
  const [url, setUrl] = useState<string>('')
  const [iframes, setIframes] = useState<Array<Iframe>>([])

  function onUrlChange(e: React.FormEvent<HTMLInputElement>): void {
    setUrl(e.currentTarget.value)
  }

  function onSubmit(): void {
    console.log(`spawn iframe button clicked. URL: ${url}`)
    setUrl('')
    setIframes([...iframes, {url}])
  }

  return (
    <Wrap>
      <Header>
        IFrame Spawner &nbsp;
        <Tooltip title="Spawns iframes below. If you spawn an iframe with the same url that this site is hosted at, then DOM iframe access tests will fail.">
          <Icon type="question-circle" theme="filled" style={ICON_STYLE} />
        </Tooltip>
      </Header>
      <Input placeholder="URL" value={url} onChange={onUrlChange} />
      <Button
        type="primary"
        style={BTN_STYLE}
        onClick={onSubmit}
        disabled={!url}
      >
        Spawn New IFrame
      </Button>

      {iframes.map((x: Iframe, i: number) => (
        <IframeWrap key={`${i}${x.url}`}>
          <div>URL: {x.url}</div>
          <iframe src={x.url} width={500} height={350} title={`${i}${x.url}`} />
        </IframeWrap>
      ))}
    </Wrap>
  )
}

export default React.memo(IFrameSpawner)
