const { encode, decode } = require("../services/crypt");
const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");
const otpGenerator = require("otp-generator");

const dates = require("../helpers/dates");
const AddMinutesToDate = require("../helpers/AddMinutesToDate");

const newOtp = async (req, res) => {
  const { phone_number } = req.body;
  // Generator OTP
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const now = new Date();
  const expiration_time = AddMinutesToDate(now, 3);

  const newOtp = await pool.query(
    `INSERT INTO otp(id,otp,expiration_time) VALUES ($1,$2,$3) returning id;`,
    [uuidv4(), otp, expiration_time]
  );

  const details = {
    Timestamp: now,
    check: phone_number,
    success: true,
    message: "OTP sent to user",
    otp_id: newOtp.rows[0].id,
  };
  const encoded = await encode(JSON.stringify(details));
  return res.send({ Status: "Success", Details: encoded });
};
const verifyOtp = async (req, res) => {
  const { verification_key, otp, check } = req.body;
  var currentdate = new Date();
  let decoded;
  try {
    decoded = await decode(verification_key);
  } catch (error) {
    const response = { Status: "Failure", Details: "Bad Request" };
    return res.status(400).send(response);
  }
  var obj = JSON.parse(decoded);
  const check_obj = obj.check;
  console.log(obj);
  if (check_obj != check) {
    const response = {
      Status: "Failure",
      Details: "Otp was not sent to this particular  phone number",
    };
    return res.status(400).send(response);
  }
  const otpResult = await pool.query(`select * from otp where id = $1;`, [
    obj.otp_id,
  ]);
  const result = otpResult.rows[0];
  if (result != null) {
    if (result.verified != true) {
      if (dates.compare(result.expiration_time, currentdate) == 1) {
        if (otp === result.otp) {
          await pool.query(`UPDATE otp SET verified=$2 WHERE id = $1;`, [
            result.id,
            true,
          ]);
          const clientResult = await pool.query(
            `select * from client where client_phone_number = $1;`,
            [check]
          );
          if (clientResult.rows.length == 0) {
            const response = {
              Status: "Success",
              Details: "new",
              Check: check,
            };
            return res.status(200).send(response);
          } else {
            const response = {
              Status: "Success",
              Details: "old",
              Check: check,
              ClientName: clientResult.rows[0].client_first_name,
            };
            return res.status(200).send(response);
          }
        } else {
          const response = { Status: "Failure", Details: "OTP NOT Matched" };
          return res.status(400).send(response);
        }
      } else {
        const response = { Status: "Failure", Details: "OTP Expiried" };
        return res.status(400).send(response);
      }
    } else {
      const response = { Status: "Failure", Details: "OTP Already Used" };
      return res.status(400).send(response);
    }
  } else {
    const response = { Status: "Failure", Details: "Bad Request" };
    return res.status(400).send(response);
  }
};
const deleteOTP = async (req, res) => {
  const { verification_key, check } = req.body;
  console.log(req.body);

  let decoded;

  try {
    decoded = await decode(verification_key);
  } catch (error) {
    console.error("Error decoding verification_key:", error);
    const response = { Status: "Failure", Details: "Bad Request" };
    return res.status(400).send(response);
  }
  var obj = JSON.parse(decoded);
  const check_obj = obj.check;

  if (check_obj != check) {
    const response = {
      Status: "Failure",
      Details: "OTP was not send to this particular phone number",
    };
    return res.status(400).send(response);
  }
  let params = { id: obj.otp_id };

  const deletedOTP = await pool.query(
    `DELETE FROM otp WHERE id=$1 RETURNING id`,
    [params.id]
  );
  if (deletedOTP.rows.length == 0) {
    return res.status(400).send("Invalid OTP");
  }
  return res.status(200).send(params);
};

const getOTPByID = async (req, res) => {
  let params = { id: req.params.id };
  const otpResult = await pool.query(`SELECT * FROM otp WHERE id=$1`, [
    params.id,
  ]);
  const result = otpResult.rows[0];
  if (otpResult.rows.length == 0) {
    return res.status(400).send("Invalid OTP");
  }
  return res.status(200).send(result);
};

module.exports = {
  newOtp,
  verifyOtp,
  getOTPByID,
  deleteOTP,
};
