export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem("user");
}

export function hasRole(role) {
  const user = getCurrentUser();
  return user && user.role === role;
} 