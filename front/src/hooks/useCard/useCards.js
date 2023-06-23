import { useState, useEffect } from "react";
import cardService from "../../services/cardService";
import useAuth from "../useAuth";

function useCards() {
  const [cards, setCards] = useState([]);
  const [user] = useAuth()
  useEffect(() => {
    (async () => {
      if(user?.biz){
        const { data } = await cardService.getCards();
          setCards(data);
        }
    })();
  }, [user]);

  return cards;
}

export default useCards;
