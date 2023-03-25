exports.parseError = (error) => {
  if (error.name == "ValidationError") {
    const errorMessages = Object.values(error.errors).map(
      (value) => value.message
    );
    
    let response = {
      errors: {},
      message: errorMessages,
    };
    return response;

  } else {
    
    const errorMessages = error.message.split('\n')
    let response = {
      errors: {},
      message: errorMessages,
    };
    return response;
  }
};
