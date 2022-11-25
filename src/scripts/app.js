// src/app.js

import { Auth, getUser } from "./auth";
import {
  getUserFragments,
  postUserFragment,
  getFragmentData,
  getFragmentMetaData,
  getAllExpandedData,
  deleteUserFragment,
} from "../api";
async function init() {
  // Get our UI elements
  const userSection = document.querySelector("#user");
  XMLDocument;
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
  const mdToHtmlBtn = document.querySelector("#mdToHtmlBtn");
  const delFragButton = document.querySelector("#deleteFragBtn");
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
      getFragmentData(user, fragmentIdInput.value);
      return;
    }
    throw new Error("Please enter a fragment ID");
  };

  delFragButton.onclick = () => {
    if (fragmentIdInput.value != "") {
      deleteUserFragment(user, fragmentIdInput.value);
      return;
    }
    throw new Error("Please enter a fragment ID");
  };

  getFragMetadataBtn.onclick = () => {
    if (fragmentIdInput.value != "") {
      getFragmentMetaData(user, fragmentIdInput.value);
      return;
    }
    throw new Error("Please enter a fragment ID");
  };

  fragExpandedBtn.onclick = () => {
    getAllExpandedData(user);
  };

  mdToHtmlBtn.onclick = () => {
    if (fragmentIdInput.value != "") {
      const routeWithExtension = fragmentIdInput.value + ".html";
      getFragmentData(user, routeWithExtension);
      return;
    }
    throw new Error("Please enter a fragment ID");
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
