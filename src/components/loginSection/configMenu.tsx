import React, {useState} from 'react';
import styled from 'styled-components';
import {Checkbox, Icon, Popover} from 'antd'

const SettingWrap = styled.div`
  margin-bottom: 10px;
  text-align: right;
`;

const ICON_STYLE = {
  marginRight: 3,
  marginLeft: 3,
  fontSize: 18,
};

type TProps = {};

export default function configMenu(props: TProps) {
  const [isUnique, setIsUnique] = useState<boolean>(true);

  function toggleUniqueIds () {
    setIsUnique(!isUnique)
  }

  const popoverContent = (
    <div>
      <SettingWrap key="unique">
        Disable Unique IDs
        :&nbsp;
        <Checkbox
          checked={!isUnique}
          onChange={toggleUniqueIds}
        />
      </SettingWrap>
    </div>
  );

  return (
    <Popover content={popoverContent} title="Configuration" placement="bottomLeft">
      <Icon
        type="setting"
        theme="filled"
        style={ICON_STYLE}
      />
    </Popover>
  );
}