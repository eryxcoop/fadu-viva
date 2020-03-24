import {GetStatusEndpoint} from "../endpoints/GetStatusEndpoint.js";
import {GetStatusSuccessfulResponse} from "../responses/GetStatusSuccessfulResponse.js";


const fakeRequesterExpectedResponses = () => {
    return {
        [GetStatusEndpoint.name]: GetStatusSuccessfulResponse,
    }
};

export default fakeRequesterExpectedResponses;