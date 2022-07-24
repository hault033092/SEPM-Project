export const validateStudentEmail = email => {
  const regex = /^(\w+\d+)@rmit.edu.vn$/;
  return regex.test(email);
};

export const removeWhitespace = text => {
  const regex = /\s/g;
  return text.replace(regex, '');
};
