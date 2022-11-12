// src/api.js

// fragments microservice API, defaults to localhost:8080
const apiUrl = process.env.API_URL || "http://localhost:8080";

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user, fragmentId = null, isExpanded = null) {
  console.log("Requesting user fragments data...");

  if (!fragmentId && !isExpanded) {
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

  if(isExpanded === true) {
    try {
      const res = await fetch(`${apiUrl}/v1/fragments?expand=1`, {
        // Generate headers with the proper Authorization bearer token to pass
        headers: user.authorizationHeaders(),
      });
      console.log("working\n");
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

  try{
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}/info`, {
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got fragments data by id", { data });
  }
  catch (err) {
    console.error("Unable to call GET /v1/fragments/id", { err });
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
