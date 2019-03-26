import React, {useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Button, Icon, Input, Tooltip} from 'antd';

import {TStore} from '../modules/rootReducer';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 15px;
  width: 300px;
`;

const Header = styled.div`
  font-size: 16px;
`;

const IframeWrap = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ICON_STYLE = {
  fontSize: 18,
};
const BTN_STYLE = {
  marginTop: 5,
  marginBottom: 20,
};

type TProps = {
  areTestsRunning: boolean;
};
type TIframe = {
  url: string;
};

function IFrameSpawner(props: TProps) {
  const [url, setUrl] = useState<string>('');
  const [iframes, setIframes] = useState<Array<TIframe>>([]);

  function onUrlChange(e: React.FormEvent<HTMLInputElement>) {
    setUrl(e.currentTarget.value);
  }

  function onSubmit() {
    console.log(`spawn iframe button clicked. URL: ${url}`);
    setUrl('');
    setIframes([...iframes, {url}]);
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
        loading={props.areTestsRunning}
      >
        Spawn New IFrame
      </Button>

      {iframes.map((x: TIframe, i: number) => (
        <IframeWrap key={`${i}${x.url}`}>
          <div>URL: {x.url}</div>
          <iframe src={x.url} width={500} height={350} />
        </IframeWrap>
      ))}
    </Wrap>
  );
}

function mapStateToProps(state: TStore) {
  return {
    areTestsRunning: state.test.run.isLoading,
  };
}

export default connect(mapStateToProps)(IFrameSpawner);
