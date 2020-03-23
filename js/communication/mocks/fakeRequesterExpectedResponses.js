import {GetTrafficStatusEndpoint} from "../endpoints/GetTrafficStatusEndpoint.js";
import {GetTrafficStatusSuccessfulResponse} from "../responses/GetTrafficStatusSuccessfulResponse.js";


const fakeRequesterExpectedResponses = () => {
    return {
        [GetTrafficStatusEndpoint.name]: GetTrafficStatusSuccessfulResponse,
    }
};

export default fakeRequesterExpectedResponses;