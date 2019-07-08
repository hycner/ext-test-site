export default {
  'en-US': enUs(),
  'ja-JP': jaJP(),
}

function enUs() {
  return {
    address: undefined,
    creditCard: undefined,
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
    address: undefined,
    creditCard: undefined,
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
