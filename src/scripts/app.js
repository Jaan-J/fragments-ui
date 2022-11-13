// src/app.js

import { Auth, getUser } from "./auth";
import { getUserFragments, postUserFragment } from "../api";
async function init() {
  // Get our UI elements
  const userSection = document.querySelector("#user");
  const loginBtn = document.querySelector("#login");
  const logoutBtn = document.querySelector("#logout");
  const sendBtn = document.querySelector("#send");
  const fragmentInput = document.querySelector("#fragment");
  const dropDownMenu = document.querySelector("#dropdown");
  const getUserFragBtn = document.querySelector("#getUserFragBtn");
  const getFragMetadataBtn = document.querySelector("#getFragInfoByIdBtn");
  const fragmentIdInput = document.querySelector("#fragID");
  const fragExpandedBtn = document.querySelector("#fragExpandedBtn");
  const getFragByIdBtn = document.querySelector("#getFragByIdBtn");

  // Wire up event handlers to deal with login and logout.
  loginBtn.onclick = () => {
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    Auth.federatedSignIn();
  };
  logoutBtn.onclick = () => {
    // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
    Auth.signOut();
  };

  // See if we're signed in (i.e., we'll have a `user` object)
  const user = await getUser();
  if (!user) {
    // Disable the Logout button
    logoutBtn.disabled = true;
    return;
  }

  getUserFragBtn.onclick = () => {
    getUserFragments(user);
  };

  getFragByIdBtn.onclick = () => {
    if (fragmentIdInput.value != "") {
      getUserFragments(user, fragmentIdInput.value, false, false);
      return;
    }
    throw new Error("Please enter a fragment ID");
  };

  getFragMetadataBtn.onclick = () => {
    if (fragmentIdInput.value != "") {
      getUserFragments(user, fragmentIdInput.value, false, true);
      return;
    }
    throw new Error("Please enter a fragment ID");
  };

  fragExpandedBtn.onclick = () => {
    getUserFragments(user, null, true);
  };

  sendBtn.onclick = () => {
    postUserFragment(user, fragmentInput.value, dropDownMenu.value);
  };

  // Log the user info for debugging purposes
  console.log({ user });

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector(".username").innerText = user.username;

  // Disable the Login button
  loginBtn.disabled = true;

  // getUserFragments(user);
}

// Wait for the DOM to be ready, then start the app
addEventListener("DOMContentLoaded", init);
