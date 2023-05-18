const jwt = require('./jwt')
import adminModel from 'api/modules/models/admin.model'

const checkAuth = async(req, res, next) => {
    // if (process.env.NODE_ENV === 'development') return next()
    try {
    let accessToken = null

    if (req.headers.authorization &&req.headers.authorization.split(' ')[0] === 'Bearer') {
        accessToken = req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.accessToken) {
        accessToken = req.query.accessToken
    } else {
        accessToken = req.body.accessToken
    }
    if (!accessToken) {
        return res.unauthorized('The user belonging to this token does no longer exist.')
    }

    let decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    let resultDecod = await decoded
    let currentUser = await adminModel.findById(resultDecod.userId); 

      if (!currentUser) {
        return res.unauthorized('The user belonging to this token does no longer exist.')
      }
      currentUser.password = ""
      req.adminInfo = currentUser;
      res.locals.user = currentUser;
      next();
    } catch (error) {
          return res.error('TAn error occurred during authentication.')
    }
}

const checkRole = (...roles) => {
    try {
     return (req, res, next) => {
      if (!roles.includes(req.adminInfo.role)) {
        return next(res.unauthorized('You do not have permission to perform this action') );
      }
  
      next();
     };
    } catch (error) {
      return res.error(error)
    }
};









const getOTP = (async (req, res, next) => {
  if(!req.body.mobile){
    return next(new AppError("Please input mobile number", 400));
  }

  const bodyData = {
    "otcId": "22eb31f0-6086-47e7-a799-1482a71490a4",
    "mobile": req.body.mobile
  };

  const data = {};
  await axios
    .post(`https://api-service.ants.co.th/otp/requestOTP`, bodyData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + config.otpToken.token,
      },
    })
    .then((res) => {
      // console.log('res', res);
      if(res.data.success.message == "Success")
      {
        data.otcId = res.data.otcId;
        data.otpId = res.data.otpId;
        data.referenceCode = res.data.referenceCode;
      }
      
    })
    .catch((err) => {
      return next(new AppError("ERROR " + err, 400));
    });

  res.status(200).json({
    status: 'success',
    data,
  });
});

const verifyOTP = (async (req, res, next) => {
  if(!req.body.otpId || !req.body.otpCode){
    return next(new AppError("Please input mobile number", 400));
  }

  const bodyData = {
    "otpId": req.body.otpId,
    "otpCode": req.body.otpCode
  }

  await axios
    .post(`https://api-service.ants.co.th/otp/verifyOTP`, bodyData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + config.otpToken.token,
      },
    })
    .then((res) => {
      if(res.data.result == true && res.data.isErrorCount == false && res.data.isExprCode == false)
      {
        
      }
      else if(res.data.result == false && res.data.isErrorCount == false && res.data.isExprCode == true){
        return next(new AppError("OTP Expire", 400));
      }
      else{
        return next(new AppError("OTP not match", 400));
      }
    })
    .catch((err) => {
      return next(new AppError("ERROR " + err, 400));
    });    
    
    res.status(200).json({
      status: 'success',
    });
});

module.exports = { checkAuth,checkRole }
