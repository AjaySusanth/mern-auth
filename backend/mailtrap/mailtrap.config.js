import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient  = new MailtrapClient({endpoint:process.env.MAILTRAP_ENDPOINT, token:process.env.MAILTRAP_TOKEN})
export const sender = {
	email: "mailtrap@demomailtrap.com",
	name: "Ajay",
};


/*
TESTING CODE
const sender = {
	email: "mailtrap@demomailtrap.com",
	name: "Burak",
};

const recipients =[
    {
        email:"ajaysusanth10@gmail.com"
    }
]

client.send({
    from:sender,
    to:recipients,
    subject:"test mail",
    text:"successfull test",
    category:"Integration test"

})
.then(console.log,console.error)
*/