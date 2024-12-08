import { db } from "../Config/FirebaseConfig";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

import { generateOTP } from "../Utils/otp";
import emailjs from "@emailjs/browser";
import { sendOTPRequest } from "./api";

export async function sendOTPEmail(email) {
  console.log("send change OTP");

  const otp = generateOTP();
  console.log("gen again update otp", otp);

  try {
    await addDoc(collection(db, "otps"), {
      email,
      otp,
      createdAt: Timestamp.now(),
      expiresAt: Timestamp.fromDate(new Date(Date.now() + 10 * 60 * 1000)), // 10 minutes expiry
    });
    // use backend server
    //const done=await sendOTPRequest(email);
    console.log("Done");

    console.log(`OTP for ${email}: ${otp}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }

  //  change;
  console.log("email:",email);
  
  const result = await emailjs.send(
    "service_zbpvqdn", // Replace with your EmailJS service ID
    "template_kw94dpi", // Replace with your email template ID
    {
      to_email: email,
      otp: otp,
      expiry: "10 minutes",
    },
    "6QYr_EIxlMyc8JJjw" // Replace with your EmailJS public key
  );

  console.log("OTP Email sent successfully Result :", result);

  // In a real application, you would send this via your backend
  console.log(`OTP for ${email}: ${otp}`);

  return otp;
}

export async function verifyOTP(email, userOTP) {
  const otpQuery = query(
    collection(db, "otps"),
    where("email", "==", email),
    where("otp", "==", userOTP)
  );

  const querySnapshot = await getDocs(otpQuery);

  if (querySnapshot.empty) {
    return false;
  }

  const otpDoc = querySnapshot.docs[0];
  const otpData = otpDoc.data();

  // Check if OTP is expired
  if (otpData.expiresAt.toDate() < new Date()) {
    await deleteDoc(otpDoc.ref);
    return false;
  }

  // Delete the used OTP
  await deleteDoc(otpDoc.ref);
  return true;
}
