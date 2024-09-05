import { /*React, */ useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const UserDashboard = () => {
  const [profile, setProfile] = useState("");

  useEffect(() => {
    fetch("/api/getme")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setProfile(result.user);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />



      <div className="container-fluid dashboard_container">
        <div className="row">
          <div className="col-sm-5">
            <div className="card card_dashboard">
              <div className="card-header">
                <b>User Dashboard</b>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"> Name : {profile.name}</li>
                <li className="list-group-item"> Email : {profile.email}</li>
                <li className="list-group-item"> Role : Registred {profile.role == 0 ?  'user' : 'admin'}</li>
                <li className="list-group-item">Created at : {new Date(profile.createdAt).toLocaleDateString({day: 'long', month: 'numeric', year: 'numeric'})}</li>
              </ul>
            </div>
          </div>
          <div className="col-sm-7">
            <h4>other Col</h4>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserDashboard;
