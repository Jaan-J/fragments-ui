// src/api.js

// import { readFragmentData } from "../../fragments/src/model/data";

// fragments microservice API, defaults to localhost:8080
const apiUrl = process.env.API_URL || "http://localhost:8080";

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(
  user,
  fragmentId = null,
  isExpanded = null,
  getMetadata = null,
  isConversion = null
) {
  console.log("Requesting user fragments data...");

  if (!fragmentId && !isExpanded && !getMetadata) {
    try {
      const res = await fetch(`${apiUrl}/v1/fragments`, {
        // Generate headers with the proper Authorization bearer token to pass
        headers: user.authorizationHeaders(),
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log("Got user fragments data", { data });
    } catch (err) {
      console.error("Unable to call GET /v1/fragments", { err });
    }
    return;
  }

  if (isExpanded === true) {
    try {
      const res = await fetch(`${apiUrl}/v1/fragments?expand=1`, {
        // Generate headers with the proper Authorization bearer token to pass
        headers: user.authorizationHeaders(),
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log("Got expanded user fragments data", { data });
    } catch (err) {
      console.error("Unable to call GET /v1/fragments?expand=1", { err });
    }
    return;
  }

  if (getMetadata === true) {
    try {
      const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}/info`, {
        headers: user.authorizationHeaders(),
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log("Got fragments metadata by id", { data });
    } catch (err) {
      console.error("Unable to call GET /v1/fragments/id/info", { err });
    }
    return;
  }

  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}`, {
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();

    var loggedResponseSuccess = "Got fragments data by id";
    var loggedResponseError = "Unable to call GET /v1/fragments/{id}";
    
    if(isConversion === true) {
      var loggedResponseSuccess = "Got converted fragments data";
      var loggedResponseError = "Unable to call GET /v1/fragments/{id}.ext";
    }

    
    console.log(loggedResponseSuccess, { data });
  } catch (err) {
    console.error(loggedResponseError, { err });
  }
}

export async function postUserFragment(user, fragment, fragmentType) {
  console.log("Posting user fragment data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "POST",
      headers: {
        ...user.authorizationHeaders(fragmentType),
      },
      body: fragment,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Posted user fragment data", { data });
  } catch (err) {
    console.error("Unable to call POST /v1/fragments", { err });
  }
}
