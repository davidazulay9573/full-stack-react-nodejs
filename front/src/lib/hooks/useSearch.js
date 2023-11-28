import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function useSearch(){
  
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e) => {
      e.preventDefault(); 
      if (location.pathname.startsWith("/posts")) {
        navigate(`/posts?search=${searchValue}`);
      } else if (location.pathname.startsWith("/users")) {
        navigate(`/users?search=${searchValue}`);
      }
      window.location.reload();
    };

    const onSearchChange = (e) => {
      setSearchValue(e.target.value);
    };
   return [searchValue,onSearchChange, handleSearch];
}

export default useSearch;