import { Formik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import app_config from "../config";
import "./login.css";

const Login = () => {

    const url = app_config.api_url;
    const [mystate, setMystate] = useState("not intiliazed");

    useEffect(() => {

        setMystate('Initilized');
        console.log('Inside UseEffect');


    }, [])

    const loginform = {
        email: '',
        password: ''
    }

    const SubmitLogin = (values) => {
        console.log(values);
        const reqOptions = {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(url + '/user/login', reqOptions)
        .then((res) => {
            console.log(res.status);

            if (res.status == 200 ) {
                res.json()
                .then((data) => {
                    sessionStorage.setItem('user',JSON.stringify(data));
                    console.log(data);
                    window.location.replace('/chat')
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Signed Up!',
                    text: 'You have successfully Registered'
                });
            } else if(res.status==300) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Something went wrong'
                });
            }

            return res.json();
        })
       
}

    return (
       <div className = "bglogin">
        <div className="col-md-3 mx-auto">
            <div className="card" style={{ marginTop: '10rem', border: 'none', boxShadow: '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)' }}>
                <div className="card-body">

                    <h3 className="mt-5 text-center">Login Form</h3>
                    <hr />

                    <Formik initialValues={loginform} onSubmit={SubmitLogin}>
                        {({
                            values, handleChange, handleSubmit
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <label className="mt-3" htmlFor="email">Email</label>
                                <input id="email" className="form-control" type="email" value={values.email} onChange={handleChange} />

                                <label className="mt-3" htmlFor="password">Password</label>
                                <input id="password" className="form-control" type="password" value={values.password} onChange={handleChange} />

                                <button className="btn mt-5 w-100 bt">SUBMIT</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login;