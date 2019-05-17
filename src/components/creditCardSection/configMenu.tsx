import React from 'react';
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

type TProps = {
  areIdsUnique: boolean
  isForm: boolean
  toggleIsForm: () => void
  toggleUniqueIds: () => void
};

export default function configMenu(props: TProps) {
  const popoverContent = (
    <div>
      <SettingWrap key="unique">
        Disable Unique IDs
        :&nbsp;
        <Checkbox
          checked={!props.areIdsUnique}
          onChange={props.toggleUniqueIds}
        />
      </SettingWrap>
      <SettingWrap key="form">
        Wrap each in {'<form>'}
        :&nbsp;
        <Checkbox
          checked={props.isForm}
          onChange={props.toggleIsForm}
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