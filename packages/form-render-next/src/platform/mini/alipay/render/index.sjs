const getClassByTheme = (props) => {
  let resultClassName = '';
  if (!props || !props.theme) {
    resultClassName = 'c-form-container';
  }

  switch (props.theme) {
    case 'transparent':
      resultClassName = 'c-form-container-transparent';
      break;
    case 'tiny':
      resultClassName = 'c-form-container-tiny';
      break;
    default:
      resultClassName = 'c-form-container';
      break;
  }

  return resultClassName;
};

export default {
  getClassByTheme,
};
