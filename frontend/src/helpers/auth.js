const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return (token ? { Authorization: `Bearer ${token}` } : {});
};

export default getAuthHeader;
