import * as yup from 'yup'

import {LocaleOptions} from '../redux'

const VALID_LOCALES: LocaleOptions[] = ['af', 'en-US', 'ja-JP']

function getDefaults() {
  return {
    areAttrIdentifying: yup.boolean().required(),
    areIdsUnique: yup.boolean().required(),
    isAdjacentInput: yup.boolean().required(),
    isDeeperInput: yup.boolean().required(),
    isFieldset: yup.boolean().required(),
    isForm: yup.boolean().required(),
    isIframeSection: yup.boolean().required(),
    isInputNested: yup.boolean().required(),
    isInputNestedWithDeepInput: yup.boolean().required(),
    isInputNestedWithRandomText: yup.boolean().required(),
    isInputNestedWithShallowInput: yup.boolean().required(),
    isLabelled: yup.boolean().required(),
    isLabelledOnlyText: yup.boolean().required(),
    isLabelledWithFor: yup.boolean().required(),
    isLocaleChanged: yup.boolean().required(),
    isMultiButton: yup.boolean().required(),
    isVisible: yup.boolean().required(),
    isWrappedInDiv: yup.boolean().required(),
    iterations: yup.number().required(),
    locale: yup.string().oneOf(VALID_LOCALES).required(),
  }
}

export default yup
  .object({
    address: yup
      .object({
        ...getDefaults(),
        hasEmail: yup.boolean().required(),
        hasName: yup.boolean().required(),
        hasPhone: yup.boolean().required(),
        isIframeField: yup.boolean().required(),
      })
      .required()
      .strict(true)
      .noUnknown(),
    creditCard: yup
      .object({
        ...getDefaults(),
      })
      .required()
      .strict(true)
      .noUnknown(),
    login: yup
      .object({
        ...getDefaults(),
        is2FA: yup.boolean().required(),
        isAccountId: yup.boolean().required(),
        isOrgId: yup.boolean().required(),
        isPassword: yup.boolean().required(),
        isUsername: yup.boolean().required(),
        isUsernameTypePassword: yup.boolean().required(),
      })
      .required()
      .strict(true)
      .noUnknown(),
    passwordReset: yup
      .object({
        ...getDefaults(),
        hasConfirmNew: yup.boolean().required(),
        hasConfirmOld: yup.boolean().required(),
        hasEmail: yup.boolean().required(),
      })
      .required()
      .strict(true)
      .noUnknown(),
  })
  .strict(true)
  .noUnknown()
