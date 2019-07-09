import get from "lodash/get";
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
} from "react-admin";

import { token, domainName } from "./token";

const apiPatientsUser = 'patient';

/**
 * This constant prepare data for requests (URL and options)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  type
 * @param {string} resource
 * @param {shape}  params
 */
const convertDataRequestToHTTP = (type, resource, params) => {
    let url = "";
    const options = {};
    switch (type) {

        case GET_LIST: {
            url = `${domainName}/${resource}`;
            break;
        }

        case GET_ONE:
            url = `${domainName}/${resource}/${params.id}`;
            break;

        case UPDATE:
            const newText = getTextByHeading(params, resource);
            let updateData = Object.assign({
                    userId: localStorage.getItem('patientId'),
                },
                params.data);

            updateData.text = newText;
            url = `${domainName}/${apiPatientsUser}/${localStorage.getItem('patientId')}/${resource}/${params.id}`;
            options.method = "PUT";
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
                'X-Requested-With': "XMLHttpRequest",
            };
            options.body = JSON.stringify({
                data: updateData
            });
            break;

        case CREATE:
            let newData = Object.assign({ userId: localStorage.getItem('patientId') }, params.data);
            url = `${domainName}/${apiPatientsUser}/${localStorage.getItem('patientId')}/${resource}`;
            options.method = "POST";
            if (!options.headers) {
                options.headers = new Headers({ Accept: 'application/json' });
            }
            options.headers = {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json',
                'X-Requested-With': "XMLHttpRequest",
            };
            options.body = JSON.stringify({
                data: newData
            });
            break;

        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
};

function getTextByHeading(params, resource) {
    let result = '';
    if (resource === 'allergies') {
        result = get(params, 'data.cause', null);
    } else if (resource === 'problems') {
        result = get(params, 'data.problem', null);
    } else if (resource === 'medications') {
        result = get(params, 'data.name', null);
    }
    return result;
}

/**
 * This constant handle response data
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  response
 * @param {shape}  type
 * @param {string} resource
 * @param {shape}  params
 */
const convertHTTPResponse = (response, type, resource, params) => {
    switch (type) {

        case GET_LIST:
            const results = get(response, 'results', []);
            return {
                data: results,
                total: results.length,
            };

        case GET_ONE:

            console.log('response', response)

            return {
                data: response,
            };

        case UPDATE:
            params.data.text = getTextByHeading(params, resource)
            return params;

        case CREATE:
            const dataFromRequest = get(params, 'data', null);
            const compositionUid = get(response, 'compositionUid', null);
            let sourceID = '';
            if (compositionUid) {
                const compositionUidArray = compositionUid.split('::');
                sourceID = compositionUidArray[0];
            }
            dataFromRequest.id = get(response, 'host', null) + '-' + sourceID;
            dataFromRequest.text = getTextByHeading(params, resource);
            dataFromRequest.isNew = true;
            if (!get(params, 'source', null)) {
                dataFromRequest.source = 'ethercis';
            }
            return {
                data: dataFromRequest,
            };

        default:
            return { data: 'No results' };
    }
};

const dataProvider = (type, resource, params) => {
    let { url, options } = convertDataRequestToHTTP(type, resource, params);
    return fetch(url, options)
        .then(response => response.json())
        .then(res => convertHTTPResponse(res, type, resource, params));
};

/**
 * This function provides requests/response to server
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}  type
 * @param {string} resource
 * @param {shape}  params
 */
export default (type, resource, params) => {
    return dataProvider(type, resource, params);
};