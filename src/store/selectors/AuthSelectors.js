export const isAuthenticated = (state) => {
  if (state.auth.auth.clientId) return true;
};
