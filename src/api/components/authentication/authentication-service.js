const authenticationRepository = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');
const LoginAttempt = require('../../../models/login-schema');

/**
 * Check username and password for login.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */

async function handleFailedLoginAttempt(email, password) {
  try {
    let loginAttempt = await LoginAttempt.findOne({ email, password });

    if (!loginAttempt) {
      loginAttempt = new LoginAttempt({ email, password });
    }

    loginAttempt.attempts += 1;
    loginAttempt.lastAttempt = Date.now();

    await loginAttempt.save();

    return loginAttempt;
  } catch (error) {
    throw new Error('Failed to handle login attempt');
  }
}

async function clearLoginAttempts(email, password) {
  try {
    await LoginAttempt.deleteOne({ email, password });
  } catch (error) {
    throw new Error('Failed to clear login attempts');
  }
}

async function checkLoginCredentials(email, password) {
  try {
    const user = await authenticationRepository.getUserByEmail(email);
    const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
    const passwordChecked = await passwordMatched(password, userPassword);

    if (user && passwordChecked) {
      await clearLoginAttempts(email, password);

      return {
        email: user.email,
        name: user.name,
        user_id: user.id,
        token: generateToken(user.email, user.id),
      };
    }

    await handleFailedLoginAttempt(email, password);

    return null;
  } catch (error) {
    throw new Error('Failed to check login');
  }
}

module.exports = {
  checkLoginCredentials
};