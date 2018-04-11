const switchKey = (key) => {
  switch (key) {
    case 'title':
      return '專題題目'
      break;
    case 'email':
      return '電子信箱'
      break;
    case 'name':
      return '姓名'
      break;
    case 'phone':
      return '電話'
      break;
    case 'studentId':
      return '學號'
      break;
    case 'department':
      return '系所'
      break;
    case 'lineId':
      return 'Line ID'
      break;
    case 'roleId':
      return '權限'
      break;
    case 'verify':
      return '驗證'
      break;
    case 'leader':
      return '隊長'
      break;
    case 'teacher':
      return '老師'
      break;
    case 'process':
      return '上傳進度'
      break;
    default:
      return key;
  }
}

export default switchKey;
