import {
  body,
  endpoint,
  headers,
  pathParams,
  queryParams,
  request,
  response,
  String
} from "@airtasker/spot";
import { ErrorBody, UserBody } from "./models";

/** Retrieves a user in a company */
@endpoint({
  method: "POST",
  path: "/company/:companyId/users/:userId",
  tags: ["Company", "User"]
})
class GetUser {
  @request
  request(
    @pathParams
    pathParams: {
      /** company identifier */
      companyId: String;
      /** user identifier */
      userId: String;
    },
    @headers
    headers: {
      /** Auth Header */
      "x-auth-token": String;
    },
    @queryParams
    queryParams: {
      /** a demo query param */
      "sample-query"?: String;
    }
  ) {}

  /** Successful creation of user */
  @response({ status: 201 })
  successResponse(
    @headers
    headers: {
      /** Location header */
      Location: String;
    },
    /** User response body */
    @body body: UserBody
  ) {}

  /** Bad request response */
  @response({ status: 404 })
  badRequestResponse(
    /** Error response body */
    @body body: ErrorBody
  ) {}
}
