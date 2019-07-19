import get from "lodash/get";
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    GET_MANY,
} from "react-admin";
import sort, { ASC, DESC } from 'sort-array-objects';
import { stringify } from 'query-string';

import { token, domainName } from "./token";

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
            url = `${domainName}/${resource}/${params.id}`;
            options.method = "PUT";
            options.headers = new Headers({ Accept: 'application/json' });
            options.headers = {
                'Content-Type': 'application/json',
            };
            options.body = JSON.stringify({
                data: params.data
            });
            break;

        case CREATE:
            url = `${domainName}/${resource}/create`;
            options.method = "POST";
            options.headers = new Headers({ Accept: 'application/json' });
            options.headers = {
                'Content-Type': 'application/json',
            };

            options.body = JSON.stringify({
                data: params.data
            });
            break;


        case GET_MANY: {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            url = `${domainName}/${resource}?${stringify(query)}`;
            break;
        }

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
 * This function sorts response array
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {array}  results
 * @param {shape}  params
 * @return {array}
 */
function getSortedResults(results, params) {
    const sortField = get(params, 'sort.field', 'id');
    const sortOrder = (get(params, 'sort.order', 'ASC') === 'DESC') ? DESC : ASC;
    return sort(results, [sortField], sortOrder);
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
            const resultsSorting = getSortedResults(results, params);
            return {
                data: resultsSorting,
                total: resultsSorting.length,
            };

        case GET_ONE:
            return {
                data: response,
            };

        case UPDATE:
            params.data.text = getTextByHeading(params, resource)
            return params;

        case CREATE:
            const dataFromRequest = get(params, 'data', null);
            dataFromRequest.id = 'redis-' + Math.floor(Math.random() * Math.floor(100500));
            dataFromRequest.text = getTextByHeading(params, resource);
            dataFromRequest.isNew = true;
            if (!get(params, 'source', null)) {
                dataFromRequest.source = 'ethercis';
            }

            return {
                data: dataFromRequest,
            };

        case GET_MANY: {
            return  {
                data: [],
            }
        }

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