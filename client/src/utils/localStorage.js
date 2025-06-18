
export function storeUser(user) {
  const now = new Date();
  const expires = now.getTime() + 7 * 24 * 60 * 60 * 1000;

  const userData = {
    user,
    expires,
  };

  localStorage.setItem('authUser', JSON.stringify(userData));
}

// Get stored user if not expired
export function getStoredUser() {
  const item = localStorage.getItem('authUser');
  if (!item) return null;

  try {
    const { user, expires } = JSON.parse(item);
    const now = Date.now();
    if (now > expires) {
      localStorage.removeItem('authUser');
      return null;
    }
    return user;
  } catch {
    localStorage.removeItem('authUser');
    return null;
  }
}
