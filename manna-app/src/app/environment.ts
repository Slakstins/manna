
export const environment = {
  production: false,
  baseUrl: "http://localhost:3000/api/"
};

if (window.location.hostname !== 'localhost') {
  environment.baseUrl = window.location.protocol + '//' + window.location.hostname + "/api/"
}