export default {
  'en-US': enUs(),
  'ja-JP': jaJP(),
}

function enUs() {
  return {
    address: {
      city: 'City',
      clear: 'Clear',
      country: 'Country',
      email: 'Email',
      name: 'Name',
      nothing: 'Nothing',
      phone: 'Phone',
      save: 'Save',
      state: 'State',
      street1: 'Street 1',
      street2: 'Street 2',
      zip: 'Zip',
    },
    creditCard: {
      clear: 'Clear',
      expDate: 'Expiration Date',
      expMonth: 'Expiration Month',
      expYear: 'Expiration Year',
      name: 'Name on Card',
      nothing: 'Nothing',
      number: 'Card Number',
      cvv: 'CVV',
      save: 'Save Credit Card',
    },
    login: {
      accountId: 'Account ID',
      clear: 'Clear',
      nothing: 'Nothing',
      password: 'Password',
      submit: 'Submit',
      username: 'Username',
    },
    passwordReset: undefined,
  }
}

function jaJP() {
  return {
    address: {
      city: '都市', // 'シティ'
      clear: '消す', // 'クリア'
      country: '国',
      email: '電子メイル', // 'Eメール'
      name: '名',
      nothing: '何も',
      phone: '電話',
      save: '保存', // 'セーブ'
      state: '県',
      street1: '通り一', // '通り1', '道1', '道一'
      street2: '通り二', // '通り2', '道2', '道二'
      zip: '郵便番号',
    },
    creditCard: {
      clear: '消す', // 'クリア'
      cvv: 'CVV番号', // 'CVV'
      expDate: '有効期限',
      expMonth: '有効期限月',
      expYear: '有効期限年',
      name: '名',
      nothing: '何も',
      number: '数',
      save: '保存', // 'セーブ'
    },
    login: {
      accountId: '口座ID', // 'アカウントID'
      clear: '消す', // 'クリア'
      nothing: '何も',
      password: '合言葉', // 'パスワード'
      submit: '提出',
      username: 'ユーザー名', // '名前'
    },
    passwordReset: undefined,
  }
}
