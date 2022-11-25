// src/api.js

// fragments microservice API, defaults to localhost:8080
const apiUrl = process.env.API_URL || "http://localhost:8080";

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user) {
  console.log("Requesting user fragments data...");
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

export async function getAllExpandedData(user) {
  console.log("Requesting all expanded data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments?expand=1`, {
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

export async function getFragmentMetaData(user, id) {
  console.log(`Requesting a fragment metadata by id: ${id}`);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}/info`, {
      headers: user.authorizationHeaders(),
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Got fragment metadata by ID:", { data });
  } catch (err) {
    console.error("Unable to call GET /v1/fragments/:id/info", { err });
  }
}

export async function getFragmentData(user, id) {
  console.log(`Requesting a fragment data by id: ${id}`);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      headers: user.authorizationHeaders(),
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    let data;
    if (res.headers.get("content-type").startsWith("text/")) {
      data = await res.text();
    } else if (res.headers.get("content-type").startsWith("application/json")) {
      data = await res.json();
    } else {
      data = await res.blob();
    }
    console.log("Got fragment data by id", { data });
    return { contentType: res.headers.get("content-type"), data: data };
  } catch (err) {
    console.error("Unable to call GET /v1/fragments/:id", { err });
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
