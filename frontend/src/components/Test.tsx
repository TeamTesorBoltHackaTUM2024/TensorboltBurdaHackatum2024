import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function Test() {
  const navigate = useNavigate();
  return (
    <>
      <div className="di">
        <h1>Hello! This is Test</h1>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Home!
        </Button>
      </div>
    </>
  );
}
export default Test;
