import * as yup from 'yup'

import {LocaleOptions} from '../redux'

const VALID_LOCALES: LocaleOptions[] = ['af', 'en-US', 'ja-JP']

export default yup
  .object({
    address: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        areAttrIdentifying: yup.boolean().required(),
        hasEmail: yup.boolean().required(),
        hasName: yup.boolean().required(),
        hasPhone: yup.boolean().required(),
        isFieldset: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeField: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isLabelled: yup.boolean().required(),
        isLabelledWithFor: yup.boolean().required(),
        isLocaleChanged: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
        locale: yup
          .string()
          .oneOf(VALID_LOCALES)
          .required(),
      })
      .required()
      .strict(true)
      .noUnknown(),
    creditCard: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        areAttrIdentifying: yup.boolean().required(),
        isFieldset: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isLabelled: yup.boolean().required(),
        isLabelledWithFor: yup.boolean().required(),
        isLocaleChanged: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
        locale: yup
          .string()
          .oneOf(VALID_LOCALES)
          .required(),
      })
      .required()
      .strict(true)
      .noUnknown(),
    login: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        areAttrIdentifying: yup.boolean().required(),
        isFieldset: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isLabelled: yup.boolean().required(),
        isLabelledWithFor: yup.boolean().required(),
        isLocaleChanged: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isThreeField: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
        locale: yup
          .string()
          .oneOf(VALID_LOCALES)
          .required(),
      })
      .required()
      .strict(true)
      .noUnknown(),
    passwordReset: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        areAttrIdentifying: yup.boolean().required(),
        hasConfirmNew: yup.boolean().required(),
        hasConfirmOld: yup.boolean().required(),
        hasEmail: yup.boolean().required(),
        isFieldset: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isLabelled: yup.boolean().required(),
        isLabelledWithFor: yup.boolean().required(),
        isLocaleChanged: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
        locale: yup
          .string()
          .oneOf(VALID_LOCALES)
          .required(),
      })
      .required()
      .strict(true)
      .noUnknown(),
  })
  .strict(true)
  .noUnknown()