import PageHeader from "../components/PageHeader";
import useAuth from "../lib/hooks/global-states/useAuth";
import { Link } from "react-router-dom";

function About() {
  const [user, , , signOut] = useAuth();
  return (
    <div className="text-center">
      <PageHeader title="About" description=" " />
      {!user && (
        <p>
          This platform allows you to register in 2 ways <br />
          If you want only to get in you can register with <br />
          <Link to="/sign-up">Sign-Up</Link> <br /> <br />
          But my recommend for you{" "}
          <Link to="/sign-up-editor"> Sign-Up-Businnes</Link> <br />
          it allows you to create and update posts for your businnes!
        </p>
      )}
      {user && !user.biz && (
        <p>
          In this acount you can only get in! <br />
          If you want to add posts and to manage your business you need to{" "}
          <br />
          <Link to="/sign-up-editor" onClick={signOut}>
            {" "}
            Sign-up-business{" "}
          </Link>
        </p>
      )}
      {user?.biz && (
        <p>
          This account allows you to run your business in the best possibleway!{" "}
          <br />
          You can create, delete, update, your posts! <br />
          This will help you run your business efficiently and orderly! <br />
          <br />
          <Link to="/add-card">Create</Link> your first card! <br />
          <br />
          You already have posts? <br />
          you can to jump to <Link to="/posts"> Your posts</Link>
        </p>
      )}
    </div>
  );
}
export default About;
