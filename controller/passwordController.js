const Sib = require("sib-api-v3-sdk");
const uuid = require('uuid');
const { ForgotPasswordRequests, Users } = require("../models");
const bcrypt = require("bcrypt");

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({ where: { email } });

        if (user) {
            const id = uuid.v4();
            await ForgotPasswordRequests.create({ id, isActive: true ,UserId:user.id});
            const client = Sib.ApiClient.instance;
            const apiKey = client.authentications["api-key"];
            apiKey.apiKey = process.env.SIB_API_KEY;

            const transEmailApi = new Sib.TransactionalEmailsApi();

            const sender = {
                email: "iqramomin2023@gmail.com"
            };

            const receiver = {
                email: email
            };

            const response = await transEmailApi.sendTransacEmail({
                sender: sender,
                to: [receiver],
                subject: "Reset Password",
                htmlContent: `<a href="http://localhost:3000/password/resetPassword/${id}">Reset Password</a>`
            });


            console.log("Email Sent");

            return res.status(200).json({ message: "Email sent successfully" });
        }



    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await ForgotPasswordRequests.findOne({ where: { id } })
        if (request) {
            await request.update({ isActive: false });
            res.status(200).send(`
            <html>
            <script>
                function formsubmitted(e){
                    e.preventDefault();
                    console.log('called')
                }
            </script>
            <form action="/password/updatePassword/${id}" method="get">
                <label for="newpassword">Enter New password</label>
                <input name="newPassword" type="password" required></input>
                <button>reset password</button>
                </form>
            </html>
            `)
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }

}

const updatePassword = async(req,res)=>{
    try{
        const {newPassword} = req.query;
        const {id} = req.params;
        const request = await ForgotPasswordRequests.findOne({where:{id}});
        if(!request){
            return res.status(404).json({ message: "Request Not Found!" });
        }
        const user = await Users.findOne({where:{id:request.UserId}});
        if(user){
            console.log(user);
            bcrypt.hash(newPassword,10,async(err,hash)=>{
                if(err){
                    throw new Error(err);
                }
                console.log(hash);
                await user.update({password:hash});
                console.log("Password changed");
                return res.status(200).json({message:"Password Updated successfully"});
            });
        }

    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { forgotPassword, resetPassword ,updatePassword}