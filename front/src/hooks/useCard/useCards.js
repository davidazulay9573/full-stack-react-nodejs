import { useState, useEffect } from "react";
import cardService from "../../services/cardService";

function useCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      try{
        const { data } = await cardService.getCards();
        setCards(data);
      }
      catch{
         
      }
     
    };
    getCards();
  }, []);
  return cards;
}

export default useCards;
