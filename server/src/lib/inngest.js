import { Inngest } from "inngest";
import User from "../models/user_model.js";
import { upsertStreamUser, deleteStreamUser } from "../config/stream_config.js";

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

    //  Create Stream User .
    await upsertStreamUser({
      id: newUser.clerkId,
      name: newUser.name,
      image: newUser.profileImage
    });
  }
);

const deleteUser = inngest.createFunction(
  { id: "delete/user" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findOneAndDelete({ clerkId: id });
    //  Delete Stream User .
    await deleteStreamUser(id.toString());
  }
);


export const functions = [createUser, deleteUser];