import { z } from "zod";

// Here Iam creating a Schema That would validate the data for every message.
export const MessageSchema = z.object({
  id: z.string(),
  isUserMessage: z.boolean(),
  text: z.string(),
});

// Here a Schema is created for array of messages.
export const MessageArraySchema = z.array(MessageSchema);

//Message is a new type. Now when the data (message) is defined with this type(Message)
// the validation will performed on the data(message).
export type Message = z.infer<typeof MessageSchema>;
