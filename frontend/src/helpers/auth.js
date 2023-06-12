const token = localStorage.getItem('token');
console.log(token);

const getAuthHeader = () => (token ? { Authorization: `Bearer ${token}` } : {});

export default getAuthHeader;
