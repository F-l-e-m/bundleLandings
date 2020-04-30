const defaultParams = {
    v: '2.0'
};

class Api {
    userRegistration(_params) {
        return createQuery({
            url: 'auth.register',
            params: {
                ...defaultParams,
                ..._params
            }
        });
    }
}

const api = new Api();
export default api;

function createQuery({ url = '/', params = {} }) {
    let queryParams = getStryngQuery(params);
    const fetchParams = {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };

    let _url = '/api/' + url;
    fetchParams.body = queryParams;

    return fetch(_url, fetchParams)
        .then(function(response) {
            return response.json();
        })
        .catch(function(e) {
            console.log(e);
        });
}

const getStryngQuery = params => {
    var data = '';
    for (var param in params) {
        data += `&${param}=${params[param]}`;
    }
    return data;
};
