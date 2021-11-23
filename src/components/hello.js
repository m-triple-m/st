import { Formik } from 'formik';
import Swal from 'sweetalert2';
import "./login.css";
const Login = ()=>{
    const loginform = {
        
        EmailId : '',
        Password : ''
  }
     const SubmitLogin = (values)=>{
      console.log(values);
      Swal.fire({
         title: 'Congratulations',
         text: 'You have successfully login',
         icon: 'warning',
         confirmButtonText: 'You did it'
       });
}

    return(
    
       <div>
       <Formik initialValues = {loginform } onSubmit = {SubmitLogin}>
       { (
          {
             values,handleChange,handleSubmit
          }
       )=>(
        <form  onSubmit= {handleSubmit}>
       
        <div className="card-body  row mt-5" >
                
        <div className="card w-25 col-md-8 mx-auto">
               <h1>Login</h1>

              <input type="email" placeholder="EmailId" id="EmailId"  value={values.EmailId}  onChange={handleChange}></input><br/>
              <input type="password" placeholder="Password" id="Password"  value={values. Password}  onChange={handleChange}></input><br/>
              <button className="btn btn-success">Log-In</button>
    
    
          </div>
         </div>
         </form>
       )}
             </Formik>
             </div>
    )

}
export default Login;  
// this is signup
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import app_config from '../config';

const Signup = () => {

    const url = app_config.api_url;
    const signupform = {
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    }

    const signupSubmit = (values) => {
        console.log(values);

        const reqOptions = {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(url + '/user/add', reqOptions)
            .then((res) => {
                console.log(res.status);

                if (res.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Signed Up!',
                        text: 'You have successfully Registered'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Something went wrong'
                    });
                }

                return res.json();
            })
            .then((data) => {
                console.log(data);
            })

    }

    return (
        <div className = "bgsignup" >
        <div className="row">
            <div className="col-md-7">

            </div>
            <div className="col-md-5 form-container">
                <div className="card h-100">
                    <div className="card-body my-card-body" >

                        <h3 className="text-center">SIGN UP HERE </h3>
                        <hr />

                        <Formik initialValues={signupform} onSubmit={signupSubmit} >
                            {({
                                values,
                                handleChange,
                                handleSubmit
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <label>Name</label>
                                    <input className="form-control" type="text"
                                        placeholder="name" id="name" value={values.name} onChange={handleChange} />

                                    <label>Email</label>
                                    <input className="form-control" type="email"
                                        placeholder="email" id="email" value={values.email} onChange={handleChange} />

                                    <label>Password</label>
                                    <input className="form-control" type="password"
                                        placeholder="password" id="password" value={values.password} onChange={handleChange} />

                                        <label> Confirm-Password</label>
                                    <input className="form-control" type="password"
                                        placeholder=" confirm_password" id="confirm_password" value={values.Confirm_password} onChange={handleChange} />

                                    <button type="submit" className="btn btn-dark mt-5">SIGN UP</button>

                                </form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Signup;



const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:3000"] },
});
const port = 5000;
const cors = require("cors");
const userRouter = require("./router/userRouter");
const chatRouter = require("./router/chatRouter");

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("sendmsg", (data) => {
    console.log(data);
    data.sent = false;
    socket.broadcast.emit("recmsg", data);
  });
});

app.use("/user", userRouter);
app.use("/chat", chatRouter);

app.get("/", (req, res) => {
    console.log("request from client!!");
    res.send("you got a response");
  });

app.listen(port, () => {
  console.log("server started ...");
});