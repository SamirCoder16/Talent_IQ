import { Inngest } from "inngest";
import User from "../models/user_model.js";

export const inngest = new Inngest({ id: "talent-iq" });

const createUser = inngest.createFunction(
  { id: "sync/user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, email_addresses, first_name, image_url, last_name } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address || "",
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      profileImage: image_url || "",
    };
    await User.create(newUser);

    //  to do : create user in Stream Chat .
  }
);

const deleteUser = inngest.createFunction(
  { id: "delete/user" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findOneAndDelete({ clerkId: id });

    // to do : delete user in Stream Chat .
  }
);

export const functions = [createUser, deleteUser];