export function authenticate(username, password) {
  const hardcodedUsername = 'admin';
  const hardcodedPassword = 'p';

  if (username === hardcodedUsername && password === hardcodedPassword) {
    return true; 
  }

  return false; 
}
