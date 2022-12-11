// src/app.js

import { Auth, getUser } from "./auth";
import {
  getUserFragments,
  postUserFragment,
  getFragmentData,
  getFragmentMetaData,
  getAllExpandedData,
  deleteUserFragment,
  updateUserFragment,
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
  const delFragButton = document.querySelector("#deleteFragBtn");
  const updateFragButton = document.querySelector("#updateFragBtn");
  const imageInput = document.querySelector("#imageFile");


  const convToText = document.querySelector("#convertToTxt");
  const convToMD = document.querySelector("#convertToMarkdown");
  const convToHTML = document.querySelector("#convertToHtml");
  const convToJSON = document.querySelector("#convertToJson");
  const convToPng = document.querySelector("#convertToPng");
  const convToJpeg = document.querySelector("#convertToJpeg");
  const convToWebp = document.querySelector("#convertToWebp");
  const convToGif = document.querySelector("#convertToGif");

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
  // if user selects any image from the dropdown menu, the image input will be displayed
  dropDownMenu.onchange = () => {
    if (
      dropDownMenu.value === "image/png" ||
      dropDownMenu.value === "image/jpeg" ||
      dropDownMenu.value === "image/gif" ||
      dropDownMenu.value === "image/webp"
    ) {
      //imageFile is displayed
      imageInput.style.display = "block";
      fragmentInput.style.display = "none";
    } else {
      //imageFile is hidden
      imageInput.style.display = "none";
      fragmentInput.style.display = "block";
    }
  };

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

  updateFragButton.onclick = () => {
    if (fragmentIdInput.value === "") {
      throw new Error("Please enter a fragment ID");
    }
    if (fragmentInput.value === "") {
      throw new Error("Please enter a fragment");
    }
    updateUserFragment(
      user,
      fragmentIdInput.value,
      fragmentInput.value,
      dropDownMenu.value
    );
  };

  fragExpandedBtn.onclick = () => {
    getAllExpandedData(user);
  };




  convToText.onclick = () => {
    if (fragmentIdInput.value != "") {
      getFragmentData(user, fragmentIdInput.value, '.txt');
      return;
    }
    throw new Error("Please enter a fragment ID");
  };

  convToMD.onclick = () => {
    if (fragmentIdInput.value != "") {
      getFragmentData(user, fragmentIdInput.value, '.md');
      return;
    }
    throw new Error("Please enter a fragment ID");
  };
  
  convToHTML.onclick = () => {
    if (fragmentIdInput.value != "") {
      getFragmentData(user, fragmentIdInput.value, '.html');
      return;
    }
    throw new Error("Please enter a fragment ID");
  };

  convToPng.onclick = () => {
    if (fragmentIdInput.value != "") {
      getFragmentData(user, fragmentIdInput.value, '.png');
      return;
    }
    throw new Error("Please enter a fragment ID");
  };

  convToJpeg.onclick = () => {
    if (fragmentIdInput.value != "") {
      getFragmentData(user, fragmentIdInput.value,'.jpg');
      return;
    }
    throw new Error("Please enter a fragment ID");
  };

  convToWebp.onclick = () => {
    if (fragmentIdInput.value != "") {
      getFragmentData(user, fragmentIdInput.value, '.webp');
      return;
    }
    throw new Error("Please enter a fragment ID");
  };

  convToGif.onclick = () => {
    if (fragmentIdInput.value != "") {
      getFragmentData(user, fragmentIdInput.value, '.gif');
      return;
    }
    throw new Error("Please enter a fragment ID");
  };

  convToJSON.onclick = () => {
    if (fragmentIdInput.value != "") {
      getFragmentData(user, fragmentIdInput.value, '.json');
      return;
    }
    throw new Error("Please enter a fragment ID");
  };

  sendBtn.onclick = () => {
    if (imageInput.style.display === "block") {
      if (imageInput.value === "") {
        throw new Error("Please enter a fragment");
      }
      postUserFragment(user, imageInput.value, dropDownMenu.value);
      return;
    }
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
