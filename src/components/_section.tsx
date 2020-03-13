import React from 'react'
import styled from 'styled-components'
import {Icon, Select, Tooltip} from 'antd'
import {IntlProvider} from 'react-intl'

import {
  LocaleOptions,
  SectionTypes,
  setSettings,
  StoreSettingsAddress,
  StoreSettingsCreditCard,
  StoreSettingsLogin,
} from '../modules/settings/redux'
import {dispatch} from '../store'
import {SingleSectionDisplay} from '../modules/app/redux/bootstrap'
import {ConfigMenuItems} from './_configMenu'
import intlConfig from '../lib/intl'

import ConfigMenu from './_configMenu'
import AddressFields from './addressSection/fields'
import CreditCardFields from './creditCardSection/fields'
import LoginFields from './loginSection/fields'
import PasswordResetFields from './passwordResetSection/fields'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
`
const Header = styled.div`
  font-size: 16px;
`
const SpecificSettings = styled.div`
  margin-top: 3px;
  margin-bottom: 7px;
  display: flex;
  justify-content: center;
`

const ICON_STYLE = {
  marginRight: 3,
  marginLeft: 3,
  fontSize: 18,
}
const DISABLED_ICON_STYLE = {
  ...ICON_STYLE,
  opacity: 0.5,
  cursor: 'initial',
}

type Props = {
  configMenuItems: ConfigMenuItems
  description: string
  fieldsComponent:
    | typeof AddressFields
    | typeof CreditCardFields
    | typeof LoginFields
    | typeof PasswordResetFields
  iterationHeight: number
  label: string
  section: SectionTypes
  settings: StoreSettingsAddress | StoreSettingsCreditCard | StoreSettingsLogin
  singleSectionDisplay: SingleSectionDisplay
}

const LoginSection: React.FC<Props> = props => {
  function toggleField(field: string): void {
    dispatch(
      setSettings({
        section: props.section,
        settings: {
          // @ts-ignore ignoring for now
          [field]: !props.settings[field],
        },
      })
    )
  }

  function increaseIterations(): void {
    dispatch(
      setSettings({
        section: props.section,
        settings: {
          iterations: props.settings.iterations + 1,
        },
      })
    )
  }
  function decreaseIterations(): void {
    if (props.settings.iterations > 1) {
      dispatch(
        setSettings({
          section: props.section,
          settings: {
            iterations: props.settings.iterations - 1,
          },
        })
      )
    }
  }

  function renderIterations(): JSX.Element[] {
    const iNodes = []
    for (let i = 0; i < props.settings.iterations; i++) {
      if (props.settings.isIframeSection && !props.singleSectionDisplay) {
        iNodes.push(
          <iframe
            key={i}
            title={`${props.section}${i + 1}`}
            src={`${window.location.href}?singleSection=${props.section}&iteration=${i + 1}`}
            width="320"
            height={props.iterationHeight}
            style={{border: 0}}
          />
        )
      } else {
        // @ts-ignore
        iNodes.push(<props.fieldsComponent key={i} iteration={i + 1} />)
      }
    }
    return iNodes
  }

  function changeLocale(locale: LocaleOptions): void {
    dispatch(
      setSettings({
        section: props.section,
        settings: {
          locale,
        },
      })
    )
  }

  const configMenuItems = [
    [
      {
        key: 'isLocaleChanged',
        label: (
          <>
            Simulate locale&nbsp;
            <Select value={props.settings.locale} onChange={changeLocale}>
              <Select.Option value="af">af</Select.Option>
              <Select.Option value="en-US">en-US</Select.Option>
              <Select.Option value="ja-JP">ja-JP</Select.Option>
            </Select>
          </>
        ),
        value: props.settings.isLocaleChanged,
      },
      {
        key: 'isForm',
        label: 'Wrap each section in <form>',
        value: props.settings.isForm,
      },
      {
        key: 'isFieldset',
        label: 'Wrap each section in <fieldset>',
        value: props.settings.isFieldset,
      },
      {
        key: 'isIframeSection',
        label: 'Wrap each section in <iframe>',
        value: props.settings.isIframeSection,
      },
      {
        key: 'isMultiButton',
        label: 'Multiple buttons',
        value: props.settings.isMultiButton,
      },
    ],

    [
      {
        key: 'isWrappedInDiv',
        label: 'Wrap in <div>',
        value: props.settings.isWrappedInDiv,
      },
      {
        key: 'isAdjacentInput',
        label: 'Add <input> adjacent',
        value: props.settings.isAdjacentInput,
      },
      {
        key: 'isDeeperInput',
        label: 'Add <input> deeper',
        value: props.settings.isDeeperInput,
      },
      {
        key: 'isLabelled',
        label: 'Add a <label> with text',
        value: props.settings.isLabelled,
      },
      {
        key: 'isLabelledOnlyText',
        label: 'Exclude wrapping <label>',
        masterValid: props.settings.isLabelled,
        value: props.settings.isLabelledOnlyText,
      },
      {
        key: 'isLabelledWithFor',
        label: "Exclude 'for' on <label>",
        masterValid: props.settings.isLabelled && !props.settings.isLabelledOnlyText,
        value: !props.settings.isLabelledWithFor,
      },
      {
        key: 'isInputNested',
        label: 'Nest primary <input> in <div>s',
        value: props.settings.isInputNested,
      },
      {
        key: 'isInputNestedWithRandomText',
        label: 'Add random text halfway',
        masterValid: props.settings.isInputNested,
        value: props.settings.isInputNestedWithRandomText,
      },
      {
        key: 'isInputNestedWithShallowInput',
        label: 'Add <input> halfway',
        masterValid: props.settings.isInputNested,
        value: props.settings.isInputNestedWithShallowInput,
      },
      {
        key: 'isInputNestedWithDeepInput',
        label: 'Add <input> at same depth',
        masterValid: props.settings.isInputNested,
        value: props.settings.isInputNestedWithDeepInput,
      },
      {
        key: 'areAttrIdentifying',
        label: 'Remove identifying attributes',
        value: !props.settings.areAttrIdentifying,
      },
      {
        key: 'areIdsUnique',
        label: 'Remove unique IDs',
        masterValid: props.settings.areAttrIdentifying,
        value: !props.settings.areIdsUnique,
      },
    ],

    ...props.configMenuItems,
  ]

  const locale = props.settings.isLocaleChanged ? props.settings.locale : 'en-US'

  return (
    <IntlProvider locale={locale} messages={intlConfig[locale][props.section]}>
      <Wrap>
        <Header>
          <div>
            <Icon
              type={props.settings.isVisible ? 'eye' : 'eye-invisible'}
              theme="filled"
              style={ICON_STYLE}
              onClick={() => toggleField('isVisible')}
            />
            &nbsp; {props.label} &nbsp;
            <Tooltip title={props.description}>
              <Icon type="question-circle" theme="filled" style={ICON_STYLE} />
            </Tooltip>
          </div>

          {props.settings.isVisible && (
            <SpecificSettings>
              <Icon
                type="plus-circle"
                theme="filled"
                style={ICON_STYLE}
                onClick={increaseIterations}
              />
              <Icon
                type="minus-circle"
                theme="filled"
                style={props.settings.iterations > 1 ? ICON_STYLE : DISABLED_ICON_STYLE}
                onClick={decreaseIterations}
              />
              <ConfigMenu items={configMenuItems} toggleFunc={toggleField} />
            </SpecificSettings>
          )}
        </Header>

        {props.settings.isVisible && renderIterations()}
      </Wrap>
    </IntlProvider>
  )
}

export default React.memo(LoginSection)
